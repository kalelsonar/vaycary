import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { User, Listing, DocumentVerification, Threads, Reviews, Reservation, ThreadItems } from '../../models';
import DeleteUserType from '../../types/siteadmin/DeleteUserType';
import showErrorMessage from '../../../helpers/showErrorMessage';
// import sendSocketNotification from '../../../socket/sendSocketNotification';

const deleteUser = {

  type: DeleteUserType,

  args: {
    userId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { userId }) {

    if (request.user && request.user.admin == true) {

      const findActiveReservation = await Reservation.count({
        where: {
          paymentState: 'completed',
          reservationState: {
            $in: ['pending', 'approved']
          },
          $or: [{
            hostId: userId,
          }, {
            guestId: userId
          }]
        }
      });

      if (findActiveReservation > 0) {
        return {
          status: 400,
          errorMessage: showErrorMessage({ errorCode: 'findActiveReservation' })
        };
      }

      const updateUserStatus = await User.update({
        userDeletedAt: new Date()
      }, {
        where: {
          id: userId
        }
      });


      if (updateUserStatus) {

        await Reviews.destroy({
          where: {
            authorId: userId
          }
        });

        await Listing.destroy({
          where: {
            userId
          }
        });

        await DocumentVerification.destroy({
          where: {
            userId
          }
        });

        const findThreads = await Threads.findAll({
          attributes: ['id', 'host'],
          where: {
            $or: [
              {
                host: userId
              },
              {
                guest: userId
              }
            ]
          },
          raw: true
        });

        if (findThreads && findThreads.length > 0) {
          findThreads.map(async (item, key) => {
            const checkEnquiry = await ThreadItems.findOne({
              attributes: ['id', 'type', 'startDate', 'endDate', 'personCapacity'],
              where: {
                threadId: item.id,
              },
              limit: 1,
              order: [['createdAt', 'DESC']],
              raw: true
            });

            if (checkEnquiry && checkEnquiry.type == 'inquiry') {
              await ThreadItems.create({
                threadId: item.id,
                sentBy: userId,
                type: userId === item.host ? 'cancelledByHost' : 'cancelledByGuest',
                startDate: checkEnquiry.startDate,
                endDate: checkEnquiry.endDate,
                personCapacity: checkEnquiry.personCapacity
              });
            }
          });
        }

        // sendSocketNotification(`updateUserLogout-${userId}`, '')
      }

      // Check Both Tables are deleted
      return {
        status: updateUserStatus ? 200 : 400,
        errorMessage: updateUserStatus ? null : showErrorMessage({ errorCode: 'commonError' })
      };

    } else {
      return { status: 500, errorMessage: showErrorMessage({ errorCode: 'loginError' }) };
    }

  },
};

export default deleteUser;
