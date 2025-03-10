import { gql } from 'react-apollo';
import {
  CHANGE_CURRENCY_STATUS_START,
  CHANGE_CURRENCY_STATUS_SUCCESS,
  CHANGE_CURRENCY_STATUS_ERROR,
  SET_BASE_CURRENCY_START,
  SET_BASE_CURRENCY_SUCCESS,
  SET_BASE_CURRENCY_ERROR
} from '../../../constants';
import showToaster from '../../../helpers/showToaster';
import getAllCurrencyQuery from './getAllCurrency.graphql';


export function updateCurrencyStatus(id, isEnable) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CHANGE_CURRENCY_STATUS_START,
    });

    try {
      let baseCurrencyId;
      // Get Base currency data
      let subQuery = gql`
          {
              getBaseCurrency{
                id
                symbol
              }
          }
        `;
      const { data } = await client.query({ query: subQuery, fetchPolicy: 'network-only' });
      if (data && data.getBaseCurrency) {
        baseCurrencyId = data.getBaseCurrency.id;
      }

      // Warn admind if he/she try to disable the base currency
      if (baseCurrencyId === id) {
        showToaster({ messageId: 'disableBaseCurrency', toasterType: 'error' })
      } else {
        let mutation = gql`
                mutation currencyManagement ($id: Int, $isEnable: Boolean){
                    currencyManagement(id: $id, isEnable: $isEnable){
                        status
                    }
                }
            `;

        const { data } = await client.mutate({
          mutation,
          variables: { id, isEnable },
          refetchQueries: [{ query: getAllCurrencyQuery }]
        });

        if (data.currencyManagement.status === "success") {
          dispatch({
            type: CHANGE_CURRENCY_STATUS_SUCCESS,
          });
          showToaster({ messageId: 'currencyStatus', toasterType: 'success' })
        }
      }

    } catch (error) {

      dispatch({
        type: CHANGE_CURRENCY_STATUS_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'currencyStatusError', toasterType: 'error' })
      return false;
    }
    return true;
  };
}


export function setBaseCurrency(id) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SET_BASE_CURRENCY_START,
    });

    try {

      let mutation = gql`
            mutation setBaseCurrency($id: Int){
                baseCurrency(id: $id){
                    status
                }
            }
        `;

      const { data } = await client.mutate({
        mutation,
        variables: { id },
        refetchQueries: [{ query: getAllCurrencyQuery }]
      });

      if (data.baseCurrency.status === "success") {
        dispatch({
          type: SET_BASE_CURRENCY_SUCCESS,
        });
        showToaster({ messageId: 'baseCurrency', toasterType: 'success' })
      }

    } catch (error) {
      dispatch({
        type: SET_BASE_CURRENCY_ERROR,
        payload: {
          error
        }
      });
      showToaster({ messageId: 'baseCurrencyError', toasterType: 'error' })
      return false;
    }
    return true;
  };
}
