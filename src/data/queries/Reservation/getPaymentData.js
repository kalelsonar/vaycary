import moment from 'moment';
import ReservationType from '../../types/ReservationType';
import { Reservation, ListBlockedDates } from '../../models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull
} from 'graphql';

const getPaymentData = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) }
  },

  async resolve({ request }, { reservationId }) {
    if (request.user) {
      const userId = request.user.id;

      const data = await Reservation.findOne({
        where: {
          id: reservationId,
          paymentState: 'pending',
          guestId: userId,
          checkIn: {
            $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
          },
          $or: [
            {
              reservationState: 'pending'
            },
            {
              reservationState: 'approved'
            }
          ]
        }
      });

      if (data) {
        let checkInSecondHalf = [], checkOutFirstHalf = [];

        const checkAvailableDates = await ListBlockedDates.findAll({
          where: {
            listId: data.listId,
            blockedDates: {
              $between: [data.checkIn, data.checkOut],
            },
            calendarStatus: {
              $notIn: ["available"],
            },
          },
        });

        if (checkAvailableDates?.length > 0) {
          checkInSecondHalf = checkAvailableDates?.filter(
            (o) =>
              moment(o?.blockedDates).format("YYYY-MM-DD") ==
              moment(data.checkIn).format("YYYY-MM-DD") &&
              o?.dayStatus == "firstHalf"
          );

          checkOutFirstHalf = checkAvailableDates?.filter(
            (o) =>
              moment(o?.blockedDates).format("YYYY-MM-DD") ==
              moment(data.checkOut).format("YYYY-MM-DD") &&
              o?.dayStatus == "secondHalf"
          );

          if (checkAvailableDates?.length > 0 &&
            (checkInSecondHalf?.length === 1 || checkOutFirstHalf?.length === 1)) {
            return data;
          } else {
            return null;
          }
        } else {
          return data;
        }
      }

      return data;
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getPaymentData;


/**

query getPaymentData ($reservationId: Int!){
  getPaymentData(reservationId: $reservationId){
    id
    listId
    hostId
    guestId
    checkIn
    checkOut
    listData {
      id
      title
      street
      city
      state
      country
      listingData {
        checkInStart
        checkInEnd
      }
      coverPhoto
      listPhotos {
        id
        name
      }
    }
    hostData {
      displayName
      picture
    }
  }
}

**/