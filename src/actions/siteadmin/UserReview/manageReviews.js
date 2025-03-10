import { gql } from 'react-apollo';
import getReviewsDetails from '../../../components/siteadmin/UserReviewsManagement/userReviewsQuery.graphql';
import showToaster from '../../../helpers/showToaster';
import {
    UPDATE_REVIEW_START,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR,
} from '../../../constants';

export function updateReviewStatus(id, type, currentPage, searchList) {
    return async (dispatch, getState, { client }) => {

        dispatch({
            type: UPDATE_REVIEW_START,
        });

        let mutation = gql`
        mutation updateReview($id: Int, $type: String){
            updateReview(id: $id, type: $type) {
              status
            }
          }
    `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: { id, type },
                refetchQueries: [{
                    query: getReviewsDetails,
                    variables: {
                        currentPage,
                        searchList
                    }
                }]
            });

            if (data?.updateReview?.status === "success") {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                });
                showToaster({ messageId: 'updateBanner', toasterType: 'success' })
            } else {
                dispatch({
                    type: UPDATE_REVIEW_ERROR,
                    payload: {
                        status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_REVIEW_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}
