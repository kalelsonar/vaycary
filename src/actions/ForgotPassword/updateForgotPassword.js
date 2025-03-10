import { gql } from 'react-apollo';
import history from '../../core/history';
import {
  UPDATE_FORGOT_PASSWORD_START,
  UPDATE_FORGOT_PASSWORD_SUCCESS,
  UPDATE_FORGOT_PASSWORD_ERROR,
} from '../../constants';
import showToaster from '../../helpers/showToaster';

export function updatePassword(email, newPassword) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: UPDATE_FORGOT_PASSWORD_START,
    });

    try {

      let mutation = gql`
       mutation changeForgotPassword($email: String!, $newPassword: String!) {
        changeForgotPassword (email: $email, newPassword: $newPassword) {
          status
        }
      }
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          email,
          newPassword
        }
      });

      if (data && data.changeForgotPassword) {

        if (data.changeForgotPassword.status === '200') {
          showToaster({ messageId: 'changeForgotPassword', toasterType: 'success' })
          history.push('/login');
        } else {
          showToaster({ messageId: 'commonError', toasterType: 'error' })
          return false;
        }

        dispatch({
          type: UPDATE_FORGOT_PASSWORD_SUCCESS,
        });
      }

    } catch (error) {
      dispatch({
        type: UPDATE_FORGOT_PASSWORD_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}