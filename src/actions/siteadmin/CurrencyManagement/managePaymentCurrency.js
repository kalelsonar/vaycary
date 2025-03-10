import { gql } from 'react-apollo';
import {
  ADMIN_MANAGE_PAYMENT_CURRENCY_START,
  ADMIN_MANAGE_PAYMENT_CURRENCY_SUCCESS,
  ADMIN_MANAGE_PAYMENT_CURRENCY_ERROR,
} from '../../../constants';
import showToaster from '../../../helpers/showToaster';
import getAllCurrencyQuery from './getAllCurrency.graphql';

export function managePaymentCurrency(currencyId, type) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_MANAGE_PAYMENT_CURRENCY_START,
    });

    try {

      let mutation = gql`
          mutation managePaymentCurrency(
            $currencyId: Int!, 
            $type: String!
          ){
              managePaymentCurrency(
                currencyId: $currencyId, 
                type: $type
              ) {
                  status
              }
          }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          currencyId,
          type
        },
        refetchQueries: [{ query: getAllCurrencyQuery }]
      });

      if (data && data.managePaymentCurrency) {
        dispatch({
          type: ADMIN_MANAGE_PAYMENT_CURRENCY_SUCCESS,
          payload: {
            status: data.managePaymentCurrency.status
          }
        });
        showToaster({ messageId: 'PaymentCurrency', toasterType: 'success' })
      }

    } catch (error) {
      dispatch({
        type: ADMIN_MANAGE_PAYMENT_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'PaymentCurrencyError', toasterType: 'error' })
      return false;
    }

    return true;
  };
}