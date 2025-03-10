import { gql } from 'react-apollo';
import {
  CANCEL_RESERVATION_START,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_STATE_ERROR
} from '../../constants';
import history from '../../core/history';
import showToaster from '../../helpers/showToaster';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import getAllReservationQuery from './getAllReservationQuery.graphql';

export function cancel(
  reservationId,
  cancellationPolicy,
  refundToGuest,
  payoutToHost,
  guestServiceFee,
  hostServiceFee,
  total,
  currency,
  threadId,
  cancelledBy,
  message,
  checkIn,
  checkOut,
  guests,
  userType,
  isTaxRefunded
) {
  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CANCEL_RESERVATION_START
    });

    try {
      dispatch(setLoaderStart('cancelLoading'));
    
      const isAuthenticated = getState().runtime;

      const mutation = gql`
        mutation cancelReservation(
		  $reservationId: Int!,
		  $cancellationPolicy: String!,
		  $refundToGuest: Float!,
		  $payoutToHost: Float!,
		  $guestServiceFee: Float!,
		  $hostServiceFee: Float!,
		  $total: Float!,
		  $currency: String!,
		  $threadId: Int!,
		  $cancelledBy: String!,
		  $message: String!,
		  $checkIn: String!,
      $checkOut: String!,
      $guests: Int!,
      $isTaxRefunded: Boolean!,
		){
		    cancelReservation(
		      reservationId: $reservationId,
		      cancellationPolicy: $cancellationPolicy,
		      refundToGuest: $refundToGuest,
		      payoutToHost: $payoutToHost,
		      guestServiceFee: $guestServiceFee,
		      hostServiceFee: $hostServiceFee,
		      total: $total,
		      currency: $currency,
		      threadId: $threadId,
		      cancelledBy: $cancelledBy,
		      message: $message,
		      checkIn: $checkIn,
		      checkOut: $checkOut,
		      guests: $guests,
          isTaxRefunded: $isTaxRefunded
		    ) {
		        status
		    }
		}
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          reservationId,
          cancellationPolicy,
          refundToGuest,
          payoutToHost,
          guestServiceFee,
          hostServiceFee,
          total,
          currency,
          threadId,
          cancelledBy,
          message,
          checkIn,
          checkOut,
          guests,
          isTaxRefunded
        },
        refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType,
              currentPage: 1,
              dateFilter: 'current'
            },
          }
        ]
      });

      if (data?.cancelReservation?.status === '200') {
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        });
        showToaster({ messageId: 'cancelReservation', toasterType: 'success' })
        if (isAuthenticated?.isAdminAuthenticated) {
          history.push('/siteadmin/reservations');
        } else {
          if (cancelledBy === 'host') {
            history.push('/reservation/current');
          } else {
            history.push('/trips/current');
          }
        }
      }

      if (data?.cancelReservation?.status === '400') {
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        });
        showToaster({ messageId: 'cancelReservationError', toasterType: 'error' })
        if (isAuthenticated?.isAdminAuthenticated) {
          history.push('/siteadmin/reservations');
        }
      }
      dispatch(setLoaderComplete('cancelLoading'));
    } catch (error) {
      dispatch({
        type: CANCEL_RESERVATION_STATE_ERROR,
        payload: {
          error
        }
      });
      dispatch(setLoaderComplete('cancelLoading'));

      return false;
    }

    return true;
  };
}