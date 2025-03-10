import { reset } from 'redux-form';
import fetch from '../../core/fetch';
import showToaster from '../../helpers/showToaster';

async function submit(values, dispatch) {

  if (values.newPassword != values.confirmPassword) {
    showToaster({ messageId: 'passwordMismatch', toasterType: 'error' })
    return;
  }

  const query = `
    mutation (
        $oldPassword: String,
        $newPassword: String,
        $confirmPassword: String,
        $registeredType: String,
    ) {
        ChangePassword (
            oldPassword: $oldPassword,
            newPassword: $newPassword,
            confirmPassword: $confirmPassword,
            registeredType: $registeredType
        ) {
            status
        }
    }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.ChangePassword.status === 'success') {
    showToaster({ messageId: 'changePassword', toasterType: 'success' })
    dispatch(reset('ChangePasswordForm'));
  } else if (data.ChangePassword.status === 'WrongPassword') {
    showToaster({ messageId: 'wrongPassword', toasterType: 'error' })
  } else if (data.ChangePassword.status === 'notLoggedIn') {
    showToaster({ messageId: 'loginError', toasterType: 'error' })
  } else if (data.ChangePassword.status === 'WrongConfirmPassword') {
    showToaster({ messageId: 'wrongConfirmPassword', toasterType: 'error' })
  } else {
    showToaster({ messageId: 'commonError', toasterType: 'error' })
  }

}

export default submit;
