import { gql } from 'react-apollo';
import {
    ADMIN_DELETE_REVIEW_START,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_ERROR
} from '../../../constants';
import history from '../../../core/history';
import showToaster from '../../../helpers/showToaster';

const query = gql`
    query getAdminReviews {
        getAdminReviews {
            id
            listId
            listData {
            id
            title
            }
            authorId
            reviewContent
            rating
            createdAt
            updatedAt
        }
    }
`;

const mutation = gql`
  mutation deleteAdminReview ($reviewId: Int!) {
      deleteAdminReview (reviewId: $reviewId) {
        status
      }
    }
  `;

export function deleteAdminReview(reviewId) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_REVIEW_START,
            data: reviewId
        });
        try {

            const { data } = await client.mutate({
                mutation,
                variables: { reviewId },
                refetchQueries: [{ query, variables: { currentPage: 1 }, fetchPolicy: 'network-only', }]
            });

            dispatch({
                type: data?.deleteAdminReview?.status == "200" ? ADMIN_DELETE_REVIEW_SUCCESS : ADMIN_DELETE_REVIEW_ERROR,
            });
            showToaster({
                messageId: data?.deleteAdminReview?.status == "200" ? 'deleteReview' : 'deleteReviewError',
                toasterType: data?.deleteAdminReview?.status == "200" ? 'success' : 'error'
            })

            data?.deleteAdminReview?.status == "200" && history.push('/siteadmin/reviews');


        } catch (error) {
            dispatch({

                type: ADMIN_DELETE_REVIEW_ERROR,
                payload: {
                    error
                }
            });
        }

    };
}