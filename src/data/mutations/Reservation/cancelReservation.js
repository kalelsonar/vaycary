// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';
// Sequelize models
import {
  Reservation,
  ListBlockedDates,
  CancellationDetails,
  ThreadItems,
  Threads,
  UserProfile,
  Listing
} from '../../models';
import ReservationType from '../../types/ReservationType';

import { sendNotifications } from '../../../helpers/sendNotifications';
import { sendServerEmail } from '../../../core/email/sendServerEmail';
// import sendSocketNotification from '../../../socket/sendSocketNotification';

const cancelReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    cancellationPolicy: { type: new NonNull(StringType) },
    refundToGuest: { type: new NonNull(FloatType) },
    payoutToHost: { type: new NonNull(FloatType) },
    guestServiceFee: { type: new NonNull(FloatType) },
    hostServiceFee: { type: new NonNull(FloatType) },
    total: { type: new NonNull(FloatType) },
    currency: { type: new NonNull(StringType) },
    threadId: { type: new NonNull(IntType) },
    cancelledBy: { type: new NonNull(StringType) },
    message: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
    isTaxRefunded: { type: new NonNull(BooleanType) },
  },

  async resolve({ request, response }, {
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
  }) {
    let isReservationUpdated = false, emailContent, userId, receiverId;
    // Check if user already logged in
    if (request.user) {

      if (request?.user && request?.user?.admin) {
        const reservationData = await Reservation.findOne({
          attributes: ['hostId', 'guestId'],
          where: {
            id: reservationId
          },
          raw: true
        });

        cancelledBy == "host" ? userId = reservationData && reservationData.hostId : userId = reservationData && reservationData.guestId;

      } else {
        userId = request.user.id;
      }
      let notifyUserId, notifyUserType, notifyContent, userName;

      const getThread = await Threads.findOne({
        attributes: ['host', 'guest'],
        where: {
          id: threadId
        },
        raw: true
      });

      const reservationData = await Reservation.findOne({
        attributes: ['id', 'confirmationCode', 'checkIn', 'listId'],
        where: {
          id: reservationId
        },
        raw: true
      });

      const listData = await Listing.findOne({
        attributes: ['title', 'country'],
        where: {
          id: reservationData && reservationData.listId
        }
      })

      if (getThread?.host && getThread?.guest) {
        notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
        notifyUserType = getThread.host === userId ? 'guest' : 'host';
      }

      const hostProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
          userId: getThread.host
        },
        raw: true
      });

      const guestProfile = await UserProfile.findOne({
        attributes: ['firstName'],
        where: {
          userId: getThread.guest
        },
        raw: true
      });

      if (hostProfile && guestProfile && getThread) {
        userName = getThread.host === userId ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName);
      }

      const count = await Reservation.count({
        where: {
          id: reservationId,
          reservationState: 'cancelled'
        }
      });

      if (count > 0) {
        return {
          status: '400'
        };
      }

      // Update Reservation table
      await Reservation.update({
        reservationState: 'cancelled'
      }, {
        where: {
          id: reservationId
        }
      }).then(function (instance) {
        // Check if any rows are affected
        if (instance > 0) {
          isReservationUpdated = true;
        }
      });

      // Unblock the blocked dates only if guest cancels the reservation
      if (cancelledBy === 'guest') {
        await ListBlockedDates.update({
          reservationId: null,
          calendarStatus: 'available'
        }, {
          where: {
            reservationId,
            calendarStatus: 'blocked',
            isSpecialPrice: {
              $ne: null
            }
          }
        });

        await ListBlockedDates.destroy({
          where: {
            reservationId,
            calendarStatus: 'blocked',
            isSpecialPrice: {
              $eq: null
            }
          }
        });

      }

      // Create record for cancellation details
      await CancellationDetails.create({
        reservationId,
        cancellationPolicy,
        refundToGuest,
        payoutToHost,
        guestServiceFee,
        hostServiceFee,
        total,
        currency,
        cancelledBy,
        isTaxRefunded
      });

      // Create thread items
      await ThreadItems.create({
        threadId,
        reservationId,
        sentBy: userId,
        content: message,
        type: cancelledBy === 'host' ? 'cancelledByHost' : 'cancelledByGuest',
        startDate: checkIn,
        endDate: checkOut,
        personCapacity: guests
      });

      await Threads.update({
        isRead: false,
        messageUpdatedDate: new Date()
      },
        {
          where: {
            id: threadId
          }
        }
      );

      notifyContent = {
        "screenType": "trips",
        "userType": notifyUserType.toString(),
        "userName": userName,
        "content": message
      };

      if (isReservationUpdated) {
        sendNotifications('cancelReservation', notifyContent, notifyUserId);

        emailContent = {
          hostName: hostProfile && hostProfile.firstName,
          guestName: guestProfile && guestProfile.firstName,
          confirmationCode: reservationData && reservationData.confirmationCode,
          checkIn: reservationData && reservationData.checkIn,
          listTitle: listData && listData.title,
          payoutToHost,
          refundToGuest,
          currency,
          country: listData && listData.country
        };

        if (cancelledBy === 'host') { // Email
          await sendServerEmail(getThread.guest, 'cancelledByHost', emailContent);
        } else {
          await sendServerEmail(getThread.host, 'cancelledByGuest', emailContent);
        }
        receiverId = (cancelledBy === 'host' ? getThread.guest : getThread.host);
        // sendSocketNotification(`messageThread-${receiverId}`, '')
        // sendSocketNotification(`viewMessageThread-${receiverId}`, { threadId, type: cancelledBy === 'host' ? 'guest' : 'host' })
        return {
          status: '200'
        }
      } else {
        return {
          status: '400'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default cancelReservation;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $payoutToHost: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $threadId: Int!,
  $cancelledBy: String!,
  $message: String!
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
      message: $message
    ) {
        status
    }
}
**/
