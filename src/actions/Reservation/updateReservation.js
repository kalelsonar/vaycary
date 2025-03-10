import { gql } from 'react-apollo';
import history from '../../core/history';


import {
  UPDATE_RESERVATION_STATE_START,
  UPDATE_RESERVATION_STATE_SUCCESS,
  UPDATE_RESERVATION_STATE_ERROR
} from '../../constants';

import getAllReservationQuery from '../../components/ManageReservation/getAllReservationQuery.graphql';


export function updateReservation(reservationId, actionType, userType, threadId, currentPage, searchKey, listIdKey,
  startDateFilter,
  endDateFilter,
  orderBy,
  dateFilter) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: UPDATE_RESERVATION_STATE_START,
    });

    try {
      const isAuthenticated = getState().runtime;
      let mutation = gql`
          mutation updateReservation(
            $reservationId: Int!, 
            $actionType: String!,
            $threadId: Int
          ){
              updateReservation(
                reservationId: $reservationId,
                actionType: $actionType,
                threadId: $threadId
              ) {
                  status
              }
          }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          reservationId,
          actionType,
          threadId
        },
        refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType,
              currentPage,
              searchKey,
              listId: listIdKey,
              startDate: startDateFilter,
              endDate: endDateFilter,
              orderBy,
              dateFilter
            },
          }
        ]
      });

      if (data && data.updateReservation && data.updateReservation.status === '200') {
        if (isAuthenticated?.isAuthenticated) {
          if (userType == 'host') {
            history.push('/reservation/current');
          } else {
            history.push('/trips/current');
          }
        }

        dispatch({
          type: UPDATE_RESERVATION_STATE_SUCCESS,
        });

      }

    } catch (error) {
      dispatch({
        type: UPDATE_RESERVATION_STATE_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}