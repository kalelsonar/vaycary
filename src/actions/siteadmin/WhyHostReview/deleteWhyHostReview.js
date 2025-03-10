import {
    ADMIN_DELETE_REVIEW_START,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_ERROR,
    UPDATE_REVIEW_START,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR
} from '../../../constants';
import history from '../../../core/history';
import showToaster from '../../../helpers/showToaster';
import deleteMutation from './deleteReview.graphql';
import updateReviewMutation from './updateReview.graphql';

export function deleteWhyHostReview({ reviewId }) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_REVIEW_START,
            data: reviewId
        });
        try {

            const { data } = await client.mutate({
                mutation: deleteMutation,
                variables: { reviewId }
            });

            let result = data?.deleteWhyHostReview?.status

            dispatch({
                type: result === 200 ? ADMIN_DELETE_REVIEW_SUCCESS : ADMIN_DELETE_REVIEW_ERROR
            })
            showToaster({
                messageId: result === 200 ? 'deleteReview' : 'commonError',
                toasterType: result === 200 ? 'success' : 'error',
                requestContent: result === 200 ? null : data?.deleteWhyHostReview?.errorMessage

            })

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

export function updateReview(values) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: UPDATE_REVIEW_START
        });
        try {

            const { data } = await client.mutate({
                mutation: updateReviewMutation,
                variables: {
                    id: values.id,
                    userName: values.userName,
                    reviewContent: values.reviewContent,
                    image: values.image,
                    isEnable: values.isEnable == 'false' ? 0 : 1
                },
            });

            let result = data?.updateWhyHostReview?.status

            dispatch({
                type: result === 200 ? UPDATE_REVIEW_SUCCESS : UPDATE_REVIEW_ERROR
            })
            showToaster({
                messageId: result === 200 ? 'updateReview' : 'commonError',
                toasterType: result === 200 ? 'success' : 'error',
                requestContent: result === 200 ? null : data?.updateWhyHostReview?.errorMessages
            })

            result === 200 && history.push('/siteadmin/whyHost/review');

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