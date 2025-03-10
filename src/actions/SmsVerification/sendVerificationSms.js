import { gql } from 'react-apollo';
import {
    SEND_VERIFICATION_SMS_START,
    SEND_VERIFICATION_SMS_SUCCESS,
    SEND_VERIFICATION_SMS_ERROR
} from '../../constants';
import getPhoneData from '../../components/PhoneVerificationModal/getUserData.graphql';
import { openSmsVerificationModal } from '../SmsVerification/modalActions';
import { processSms } from '../../core/sms/processSms';
import { decode } from '../../helpers/queryEncryption';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import showToaster from '../../helpers/showToaster';
import showErrorMessage from '../../helpers/showErrorMessage';

export function sendVerificationSms(countryCode, phoneNumber, countryName) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SEND_VERIFICATION_SMS_START,
        });

        dispatch(setLoaderStart('smsLoading'));

        try {

            const mutation = gql`
                mutation AddPhoneNumber($countryCode: String!, $phoneNumber: String!, $countryName: String) {
                    AddPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber, countryName: $countryName) {
                        status
                        countryCode
                        phoneNumber
                        userProfileNumber
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    countryCode,
                    phoneNumber,
                    countryName
                },
                refetchQueries: [{
                    query: getPhoneData
                }]
            });

            if (data && data.AddPhoneNumber && data.AddPhoneNumber.status == '200') {

                const { status, errorMessage } = await processSms('verification',
                    data.AddPhoneNumber.countryCode,
                    decode(data.AddPhoneNumber.phoneNumber),
                    data.AddPhoneNumber.userProfileNumber);

                if (status == 200) {
                    dispatch(openSmsVerificationModal('verifyPhoneNumber'));
                    dispatch({
                        type: SEND_VERIFICATION_SMS_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: SEND_VERIFICATION_SMS_ERROR,
                    });
                }

                dispatch(setLoaderComplete('smsLoading'));

                if (errorMessage) {
                    showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: errorMessage })
                    return {
                        status: '400',
                        errorMessage
                    }
                }
            } else {
                dispatch({
                    type: SEND_VERIFICATION_SMS_ERROR,
                });

                dispatch(setLoaderComplete('smsLoading'));

                return {
                    status: '400',
                    errorMessage: showErrorMessage({ errorCode: 'commonError' })
                };
            }
        } catch (error) {
            dispatch({
                type: SEND_VERIFICATION_SMS_ERROR,
            });
            dispatch(setLoaderComplete('smsLoading'));
            return {
                status: '400'
            };
        }

        return {
            status: '200'
        };
    };

}