import { gql } from 'react-apollo';
import {
  SITE_ADMIN_REMOVE_LISTING_START,
  SITE_ADMIN_REMOVE_LISTING_SUCCESS,
  SITE_ADMIN_REMOVE_LISTING_ERROR
} from '../../../constants';
import showToaster from '../../../helpers/showToaster';

const getUpcomingBookingQuery = gql`
query getUpcomingBookings ($listId: Int!){
    getUpcomingBookings(listId: $listId){
      count
    }
  }`;

export function removeListing(listId, userRole) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SITE_ADMIN_REMOVE_LISTING_START,
    });

    try {

      let upcomingBookingCount;
      const bookedData = await client.query({
        query: getUpcomingBookingQuery,
        variables: {
          listId
        },
        fetchPolicy: 'network-only'
      });

      if (bookedData && bookedData.data && bookedData.data.getUpcomingBookings) {
        upcomingBookingCount = bookedData.data.getUpcomingBookings.count;
      }

      if (upcomingBookingCount > 0) {
        showToaster({ messageId: 'upcomingBooking', toasterType: 'error' })
      }
      else {
        const mutation = gql`
            mutation adminRemoveListing($listId:Int!) {
              adminRemoveListing (listId:$listId) {
                status
                id
                name
              }
            }
          `;
        // Send Request to get listing data
        const { data } = await client.mutate({
          mutation,
          variables: { listId },
        });

        if (data && data.adminRemoveListing) {
          dispatch({
            type: SITE_ADMIN_REMOVE_LISTING_SUCCESS,
          });
          showToaster({ messageId: 'adminRemoveListing', toasterType: 'success' })

          if (data.adminRemoveListing.length > 0) {
            const removeFiles = await fetch('/removeMultiFiles', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                files: data.adminRemoveListing,
              }),
              credentials: 'include',
            });
          }
        } else {
          dispatch({
            type: SITE_ADMIN_REMOVE_LISTING_ERROR,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: SITE_ADMIN_REMOVE_LISTING_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
