import { gql } from 'react-apollo';
import history from '../../core/history';
import showToaster from '../../helpers/showToaster';
import {
    ADMIN_DELETE_BlOGDETAILS_START,
    ADMIN_DELETE_BlOGDETAILS_SUCCESS,
    ADMIN_DELETE_BlOGDETAILS_ERROR
} from '../../constants';

const query = gql`
query getBlogDetails($currentPage: Int) {
    getBlogDetails(currentPage: $currentPage) {
      count
      results {
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        footerCategory
        isEnable
        createdAt
      }
    }
  }
`;

export function deleteBlogDetails(id, currentPage) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_BlOGDETAILS_START,
            data: id
        });
        try {

            let mutation = gql`
                mutation deleteBlogDetails ($id: Int!) {
                    deleteBlogDetails (id: $id) {
                        status
                    }
                    }
                `;

            const { data } = await client.mutate({
                mutation,
                variables: { id },
                refetchQueries: [{ query, variables: { currentPage } }]
            });


            if (data.deleteBlogDetails.status == "200") {
                dispatch({
                    type: ADMIN_DELETE_BlOGDETAILS_SUCCESS,
                });
                showToaster({ messageId: 'deleteSuccess', toasterType: 'success' })
                history.push('/siteadmin/content-management');
            } else {
                showToaster({ messageId: 'deleteFailed', toasterType: 'error' })
            }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_BlOGDETAILS_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}

export function updateBlogStatus(id, isEnable, currentPage) {

    return async (dispatch, getState, { client }) => {
        try {
            let mutation = gql`
                  mutation updateBlogStatus ($id: Int, $isEnable: Boolean){
                    updateBlogStatus(id: $id, isEnable: $isEnable){
                          status
                      }
                  }
              `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isEnable },
                refetchQueries: [{ query, variables: { currentPage } }]
            });


            if (data.updateBlogStatus.status === "success") {
                showToaster({ messageId: 'updateStatus', toasterType: 'success' })
            }

        } catch (error) {
            showToaster({ messageId: 'updateFailed', toasterType: 'error' })
            return false;
        }
        return true;
    };
}