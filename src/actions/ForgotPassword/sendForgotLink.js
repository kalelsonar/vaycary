import { gql } from 'react-apollo';
import showToaster from '../../helpers/showToaster';
import { closeForgotPasswordModal } from '../modalActions';
import {
  SEND_FORGOT_PASSWORD_START,
  SEND_FORGOT_PASSWORD_SUCCESS,
  SEND_FORGOT_PASSWORD_ERROR,
} from '../../constants';

export function sendForgotLink(email) {

  return async (dispatch, getState, { client }) => {

    try {
      let mutation;

      dispatch({
        type: SEND_FORGOT_PASSWORD_START,
      });

      dispatch(closeForgotPasswordModal());

      mutation = gql`
        mutation sendForgotPassword($email: String!) {
          sendForgotPassword (email: $email) {
            status
            errorMessage
          }
        }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          email
        }
      });

      if (data?.sendForgotPassword) {
        if (data?.sendForgotPassword?.status == '404') {
          showToaster({ messageId: 'adminUserLogged', toasterType: 'error' })
          return false;
        }

        if (data?.sendForgotPassword?.status == 'accountNotFound') {
          showToaster({ messageId: 'noAccountExist', toasterType: 'error' })
          return false;
        }

        if (data?.sendForgotPassword?.status == '400') {
          showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.sendForgotPassword?.errorMeserrorMessagesage })
          return false;
        }
        showToaster({ messageId: 'forgotPasswordLink', toasterType: 'success' })
        dispatch({
          type: SEND_FORGOT_PASSWORD_SUCCESS,
        });
      }

    } catch (error) {
      dispatch({
        type: SEND_FORGOT_PASSWORD_ERROR,
        payload: {
          error
        }
      });
      return false;
    }
    return true;
  };
}