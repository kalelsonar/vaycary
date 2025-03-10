import { gql } from 'react-apollo';
import {
  ADMIN_DELETE_USER_START,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_ERROR
} from '../../constants';
import history from '../../core/history';
import showToaster from '../../helpers/showToaster';


const mutation = gql`
  mutation deleteUser ($userId:String!) {
      deleteUser (userId:$userId) {
        status
        errorMessage
      }
    }
  `;

export function deleteUser(userId, profileId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_DELETE_USER_START,
      data: userId
    });

    try {

      const { data } = await client.mutate({
        mutation,
        variables: { userId },
      });

      if (data.deleteUser.status == 200) {
        dispatch({
          type: ADMIN_DELETE_USER_SUCCESS,
        });
        showToaster({ messageId: 'deleteUser', toasterType: 'success' })
        history.push('/siteadmin/users');
      } else {
        dispatch({
          type: ADMIN_DELETE_USER_ERROR,
        });
        showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.deleteUser?.errorMessage })
      }

    } catch (error) {
      dispatch({
        type: ADMIN_DELETE_USER_ERROR,
        payload: {
          error
        }
      });

    }

  };
}
