import { SubmissionError } from 'redux-form';
import messages from '../../locale/messages';
import history from '../../core/history';
import fetch from '../../core/fetch';
import { setRuntimeVariable } from '../../actions/runtime';
import { loadAccount } from '../../actions/account';
import { closeLoginModal } from '../../actions/modalActions';
import { referralURL } from '../../helpers/formatURL';
import { encode } from '../../helpers/queryEncryption'

async function submit(values, dispatch) {

  const query = `query (
    $email: String!,
    $password: String!,
  ) {
      userLogin (
        email: $email,
        password: $password,
      ) {
        status
      }
    }`;

  const params = {
    email: values?.email,
    password: encode(values?.password),
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: params,
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data?.userLogin?.status == 'success') {
    dispatch(closeLoginModal());
    const loginScreen = true;
    let currentLocation, refer;
    currentLocation = referralURL(history?.location);
    refer = values?.refer ? values?.refer : currentLocation;
    dispatch(loadAccount(loginScreen, refer));
    dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: true,
    }));
  } else if (data?.userLogin?.status == 'email') {
    throw new SubmissionError({ _error: messages.emailNotExists });
  } else if (data?.userLogin?.status == 'password') {
    throw new SubmissionError({ _error: messages.passwordWrong });
  } else if (data?.userLogin?.status == 'loggedIn') {
    dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: true,
    }));
    dispatch(loadAccount());
    throw new SubmissionError({ _error: messages.loggedIn });
  } else if (data?.userLogin?.status == 'adminLoggedIn') {
    throw new SubmissionError({ _error: messages.adminLoggedIn });
  } else if (data?.userLogin?.status == 'userbanned') {
    dispatch(closeLoginModal());
    history.push('/userbanned');
  } else if (data?.userLogin?.status == 'userDeleted') {
    throw new SubmissionError({ _error: messages.emailNotExists });
  } else {
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }
}

export default submit;
