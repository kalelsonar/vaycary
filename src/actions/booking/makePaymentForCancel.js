import { gql } from 'react-apollo';
import {
  BOOKING_PAYMENT_FOR_CANCEL_START,
  BOOKING_PAYMENT_FOR_CANCEL_SUCCESS,
  BOOKING_PAYMENT_FOR_CANCEL_ERROR,
} from '../../constants';
import { sendPayment } from '../../core/payment/sendPayment';
import { convert } from '../../helpers/currencyConvertion';
import showToaster from '../../helpers/showToaster';

export function makePaymentForCancel(
  reservationId,
  amount,
  currency,
  paymentCurrency,
  title
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: BOOKING_PAYMENT_FOR_CANCEL_START,
      payload: {
        paymentLoading: true
      }
    });

    try {
      let rates = getState().currency.rates, baseCurrency = getState().currency.base;
      let convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);

      let query = gql`
      query getPaymentState($reservationId: Int!){
        getPaymentState(reservationId: $reservationId){
          paymentState
          errorMessage
          status
        }
      }
    `;

      const { data } = await client.query({
        query,
        variables: {
          reservationId
        },
      });

      if (data?.getPaymentState?.status != 200) {
        showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.getPaymentState?.errorMessage })
        dispatch({
          type: BOOKING_PAYMENT_FOR_CANCEL_ERROR,
          payload: { paymentLoading: false }
        });
        return false;
      }

      const { status, errorMessage } = await sendPayment(reservationId, convertedAmount.toFixed(2), paymentCurrency, title);

      if (status === 200) {
        dispatch({
          type: BOOKING_PAYMENT_FOR_CANCEL_SUCCESS
        });
      } else {
        if (status === 422) {
          showToaster({ messageId: 'paypalError', toasterType: 'error' })
        }
        else {
          errorMessage ? showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: errorMessage }) : '';
        }
        dispatch({
          type: BOOKING_PAYMENT_FOR_CANCEL_ERROR,
          payload: {
            paymentLoading: false
          }
        });
      }
    } catch (error) {
      dispatch({
        type: BOOKING_PAYMENT_FOR_CANCEL_ERROR,
        payload: {
          error,
          paymentLoading: false
        }
      });
      return false;
    }
    return true;
  };
}

