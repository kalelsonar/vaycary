import { gql } from 'react-apollo';
import history from '../../core/history';
import showToaster from '../../helpers/showToaster';
import {
    ADMIN_DELETE_POPULARLOCATION_START,
    ADMIN_DELETE_POPULARLOCATION_SUCCESS,
    ADMIN_DELETE_POPULARLOCATION_ERROR
} from '../../constants';

const query = gql`
    query getPopularLocation($currentPage: Int) {
        getPopularLocation(currentPage: $currentPage) {
          count
          results {
            id
            location
            locationAddress
            image
            isEnable
            createdAt
            updatedAt
            status
          }
        }
      }
`;

const mutation = gql`
  mutation deletePopularLocation ($id: Int!) {
    deletePopularLocation (id: $id) {
        status
      }
    }
  `;

export function deletePopularLocation(id, currentPage) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_POPULARLOCATION_START,
            data: id
        });
        try {
            const { data } = await client.mutate({
                mutation,
                variables: { id },
                refetchQueries: [{ query, variables: { currentPage } }]
            });


            if (data?.deletePopularLocation?.status == "200") {
                dispatch({
                    type: ADMIN_DELETE_POPULARLOCATION_SUCCESS,
                });
                showToaster({ messageId: 'deleteSuccess', toasterType: 'success' })
                history.push('/siteadmin/popularlocation');
            } else {
                showToaster({ messageId: 'deleteFailed', toasterType: 'error' })
            }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_POPULARLOCATION_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}

export function updateLocationStatus(id, isEnable, currentPage) {
    return async (dispatch, getState, { client }) => {

        try {
            let mutation = gql`
                  mutation updatePopularLocationStatus ($id: Int, $isEnable: String){
                    updatePopularLocationStatus(id: $id, isEnable: $isEnable){
                          status
                      }
                  }
              `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isEnable },
                refetchQueries: [{ query, variables: { currentPage } }]
            });

            if (data?.updatePopularLocationStatus?.status === "success") {
                showToaster({ messageId: 'updatePopularLoc', toasterType: 'success' })
            }

        } catch (error) {
            showToaster({ messageId: 'updateLocationError', toasterType: 'error' })
            return false;
        }
        return true;
    };
}