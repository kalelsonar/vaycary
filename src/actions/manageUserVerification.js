import { gql } from 'react-apollo';
import {
    UPDATE_VERIFICATION_START,
    UPDATE_VERIFICATION_SUCCESS,
    UPDATE_VERIFICATION_ERROR,
    EMAIL_VERIFICATION_START,
    EMAIL_VERIFICATION_SUCCESS,
    EMAIL_VERIFICATION_ERROR,
    RESEND_EMAIL_VERIFICATION_START,
    RESEND_EMAIL_VERIFICATION_SUCCESS,
    RESEND_EMAIL_VERIFICATION_ERROR
} from '../constants';
import { setLoaderStart, setLoaderComplete } from './loader/loader';
import { loadAccount } from './account';
import showToaster from '../helpers/showToaster';

// To Refresh the verification status
const query = gql` 
    query ($userId: String!) {
        getUserVerifiedInfo (userId: $userId) {
            id
            isEmailConfirmed
            isFacebookConnected
            isGoogleConnected
            isIdVerification
            status
        }
    }`;


export function disconnectVerification(item, userId) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: UPDATE_VERIFICATION_START });

        let mutation = gql`
            mutation updateUserVerifiedInfo($item: String!){
                updateUserVerifiedInfo(item: $item) {
                    status
                }
            }
        `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: {
                    item
                },
                refetchQueries: [{ query, variables: { userId } }]
            });

            if (data.updateUserVerifiedInfo.status === "success") {
                dispatch({ type: UPDATE_VERIFICATION_SUCCESS });
            } else {
                dispatch({
                    type: UPDATE_VERIFICATION_ERROR,
                    payload: {
                        status: data.updateUserVerifiedInfo.status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_VERIFICATION_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}


export function emailVerification(token, email, userId) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: EMAIL_VERIFICATION_START });

        let emailQuery = gql`
            query EmailVerification($token: String!, $email: String!){
                EmailVerification(token: $token, email: $email) {
                    userId
                    status 
                }
            }
        `;

        try {

            const { data } = await client.query({
                query: emailQuery,
                variables: {
                    token,
                    email
                },
            });

            if (data.EmailVerification.status === "confirmed") {
                dispatch({ type: EMAIL_VERIFICATION_SUCCESS });
                dispatch(disconnectVerification('email', userId));
                dispatch(loadAccount());
            }

        } catch (error) {
            dispatch({
                type: EMAIL_VERIFICATION_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}


export function resendEmailVerification() {

    return async (dispatch, getState, { client }) => {
        dispatch({ type: RESEND_EMAIL_VERIFICATION_START });
        dispatch(setLoaderStart('resendEmailLoading'));

        let resendQuery = gql`
            query ResendConfirmEmail{
                ResendConfirmEmail {
                    status
                    errorMessage
                }
            }
        `;

        try {

            const { data } = await client.query({
                query: resendQuery,
                fetchPolicy: 'network-only'
            });

            if (data.ResendConfirmEmail && data.ResendConfirmEmail.status == 200) {
                showToaster({ messageId: 'resendVerifyEmail', toasterType: 'success' })

                dispatch({ type: RESEND_EMAIL_VERIFICATION_SUCCESS });
                dispatch(setLoaderComplete('resendEmailLoading'));
            } else {
                showToaster({ messageId: 'resentEmailError', toasterType: 'error' })
                dispatch(setLoaderComplete('resendEmailLoading'));
                dispatch({
                    type: RESEND_EMAIL_VERIFICATION_ERROR,
                    payload: {
                        error: data.ResendConfirmEmail && data.ResendConfirmEmail.errorMessage || 'Something went wrong!'
                    }
                });
            }

        } catch (error) {
            dispatch({
                type: RESEND_EMAIL_VERIFICATION_ERROR,
                payload: {
                    error
                }
            });
            dispatch(setLoaderComplete('resendEmailLoading'));
        }
    };
}
