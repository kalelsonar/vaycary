import { gql } from 'react-apollo';
import {
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from '../../constants';
import { updateReservation } from '../Reservation/updateReservation';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import showToaster from '../../helpers/showToaster';

const ThreadItemsQuery = gql`
query getThread($threadType: String, $threadId: Int){
  getThread(threadType: $threadType, threadId: $threadId) {
    id
    listId
    guest
    host
    listData {
      title
      city
      state
      country
      listingData {
        basePrice
        cleaningPrice
        currency
        monthlyDiscount
        weeklyDiscount
      }
    }
    threadItemForType {
      id
      threadId
      reservationId
      content
      sentBy
      type
      startDate
      endDate
      personCapacity
      createdAt
      cancelData {
        id
        reservationId
        cancellationPolicy
        guestServiceFee
        hostServiceFee
        refundToGuest
        payoutToHost
        total 
        currency
      }
      reservation {
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        basePrice
        cleaningPrice
        total
        currency
        guests
        confirmationCode
        guestServiceFee
        discount
        discountType
        createdAt
        updatedAt
        hostServiceFee
        bookingSpecialPricing {
          id
          reservationId
          blockedDates
          isSpecialPrice
        }
      }
    }
    threadItems {
      id
      threadId
      reservationId
      content
      sentBy
      type
      startDate
      endDate
      createdAt
    }
    threadItemsCount
    guestProfile {
      profileId
      displayName
      firstName
      location
      reviewsCount
      userVerification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
      }
    }
    guestUserData {
      email
      userBanStatus
    }
    hostProfile {
      profileId
      displayName
      firstName
      picture
      location
      reviewsCount
      userVerification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
      }
    }
    hostUserData {
      email
    }
    status
  }
}
`;
export function sendMessageAction(
  threadId,
  threadType,
  content,
  type,
  startDate,
  endDate,
  personCapacity,
  reservationId,
  receiverName,
  senderName,
  receiverType,
  receiverEmail,
  currentPage,
  searchKey,
  listIdKey,
  startDateFilter,
  endDateFilter,
  orderBy,
  dateFilter
) {
  return async (dispatch, getState, { client }) => {

    try {
      dispatch({
        type: SEND_MESSAGE_START,
      });
      dispatch(setLoaderStart('hostAction'));

      let mutation = gql`
          mutation sendMessage(
          $threadId: Int!, 
          $content: String, 
          $type: String,
          $startDate: String,
          $endDate: String,
          $personCapacity: Int,
          $reservationId: Int
          ) {
            sendMessage(
            threadId: $threadId, 
            content: $content, 
            type: $type,
            startDate: $startDate,
            endDate: $endDate,
            personCapacity: $personCapacity,
            reservationId: $reservationId
            ){
              id
              sentBy
              content
              type
              reservationId
              startDate
              endDate
              personCapacity
              createdAt
              status
            }
          }
      `;
      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          threadId,
          content,
          type,
          startDate,
          endDate,
          personCapacity,
          reservationId
        },
        refetchQueries: [
          {
            query: ThreadItemsQuery,
            variables: {
              threadId,
              threadType
            },
          }
        ]
      });

      if (data && data.sendMessage && data.sendMessage.status == 'alreadyPerformed') {
        showToaster({ messageId: 'sendMessageError1', toasterType: 'error' })
        dispatch({
          type: SEND_MESSAGE_ERROR,
        });
      } else if (data && data.sendMessage && data.sendMessage.status == 'approvedForThisDates') {
        showToaster({ messageId: 'sendMessageError2', toasterType: 'error' })
        dispatch({
          type: SEND_MESSAGE_ERROR,
        });
      } else if (data && data.sendMessage && data.sendMessage.status != 'userbanned') {
        if (reservationId != null && reservationId != undefined) {
          dispatch(updateReservation(reservationId, type, threadType, threadId, currentPage, searchKey, listIdKey,
            startDateFilter,
            endDateFilter,
            orderBy,
            dateFilter));
        }
        dispatch({
          type: SEND_MESSAGE_SUCCESS,
        });
      }
      dispatch(setLoaderComplete('hostAction'));

    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_ERROR,
        payload: {
          error
        }
      });
      dispatch(setLoaderComplete('hostAction'));

      return false;
    }
    return true;
  };
}