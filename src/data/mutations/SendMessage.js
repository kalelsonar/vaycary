// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import ThreadItemsType from '../types/ThreadItemsType';
// Sequelize models
import { ThreadItems, Threads, User, UserProfile, Listing, Reservation } from '../../data/models';
import { sendNotifications } from '../../helpers/sendNotifications';
import { sendServerEmail } from '../../core/email/sendServerEmail';
import { list } from 'postcss';
import moment from 'moment';
import sequelize from '../sequelize';
// import sendSocketNotification from '../../socket/sendSocketNotification';

const sendMessage = {
  type: ThreadItemsType,
  args: {
    threadId: { type: new NonNull(IntType) },
    content: { type: StringType },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
    reservationId: { type: IntType },
  },
  async resolve({ request, response }, {
    threadId,
    content,
    type,
    startDate,
    endDate,
    personCapacity,
    reservationId
  }) {
    // Check if user already logged in
    if (request.user && (request.user.admin || request.user.id)) {
      let userId, notifyUserId, guestId, hostId, notifyUserType;
      let userName, listId, emailContent, receiverId;
      let convertedStartDate, convertedEndDate;
      convertedStartDate = moment(startDate).format('YYYY-MM-DD');
      convertedEndDate = moment(endDate).format('YYYY-MM-DD');
      // Check whether User banned by admin

      if (request?.user?.admin && (type == 'approved' || type == 'declined' || type == 'preApproved')) {

        const threadsData = await Threads.findOne({
          where: {
            id: threadId
          }
        });

        const user = await Listing.findOne({
          attributes: ['userId'],
          where: {
            id: threadsData.listId
          },
          raw: true
        });

        userId = user && user.userId;
      } else {
        userId = request && request.user && request.user.id
      }

      const isUserBan = await User.findOne({
        attributes: ['id'],
        where: {
          id: userId,
          userBanStatus: 1
        },
        raw: true
      });


      if (!isUserBan) {

        if (type == 'preApproved') {

          const isDateAvailable = await ThreadItems.findAll({
            attributes: ['id', 'threadId', 'reservationId', 'sentBy', 'content',
              [sequelize.literal('TIMESTAMPDIFF(HOUR,createdAt,NOW())'), 'timeDiff']
            ],
            where: {
              threadId,
              type: 'preApproved',
              $and: [
                {
                  startDate: {
                    $lte: endDate
                  },
                },
                {
                  endDate: {
                    $gte: startDate
                  }
                }
              ],
            },
            having: {
              timeDiff: { lt: 24 }
            },
            raw: true
          });

          if (isDateAvailable && isDateAvailable.length > 0) {
            return {
              status: 'approvedForThisDates'
            }
          }

        }

        if (type == 'approved' || type == 'declined') {
          let statusFilter = {
            $in: ['approved', 'declined']
          };
          const checkStatus = await ThreadItems.findOne({
            where: {
              threadId,
              sentBy: userId,
              startDate: convertedStartDate,
              endDate: convertedEndDate,
              personCapacity,
              reservationId,
              $or: [
                {
                  type: statusFilter
                }
              ]
            }
          });

          if (checkStatus) {
            return {
              status: 'alreadyPerformed',
            }
          }

        }

        await ThreadItems.update({
          status: 'preApproved'
        },
          {
            where: {
              threadId,
              type: 'inquiry'
            }
          }
        )
        // Create a thread item
        const threadItems = await ThreadItems.create({
          threadId,
          sentBy: userId,
          content,
          type,
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          personCapacity,
          reservationId
        });

        if (threadItems) {
          const updateThreads = await Threads.update({
            isRead: false,
            messageUpdatedDate: new Date()
          },
            {
              where: {
                id: threadId
              }
            }
          );

          const getThread = await Threads.findOne({
            attributes: ['host', 'guest', 'listId'],
            where: {
              id: threadId
            },
            raw: true
          });

          if (getThread && getThread.host && getThread.guest && getThread.listId) {
            notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
            notifyUserType = getThread.host === userId ? 'guest' : 'host';
            guestId = getThread.host === userId ? getThread.guest : getThread.host;
            hostId = getThread.host === userId ? getThread.host : getThread.guest;
            listId = getThread.listId;
          }


          const hostProfile = await UserProfile.findOne({
            attributes: ['displayName', 'picture', 'profileId', 'firstName'],
            where: {
              userId: getThread.host
            },
            raw: true
          });

          const guestProfile = await UserProfile.findOne({
            attributes: ['displayName', 'picture', 'profileId', 'firstName'],
            where: {
              userId: getThread.guest
            },
            raw: true
          });

          if (hostProfile && guestProfile && getThread) {
            userName = getThread.host === userId ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName);
          }

          let messageType = 'newMessage';

          let notifyContent = {
            "screenType": "message",
            "title": "New Message",
            "userType": notifyUserType.toString(),
            "threadId": threadId.toString(),
            "guestId": guestId.toString(),
            "guestName": guestProfile && ((guestProfile.firstName).toString()),
            "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
            "hostId": hostId.toString(),
            "hostName": hostProfile && ((hostProfile.firstName).toString()),
            "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
            "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
            "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
            "listId": listId.toString(),
            "userName": userName,
            "content": content
          };

          if (type == 'preApproved') {
            messageType = 'preApprove';

            notifyContent = {
              "screenType": "message",
              "title": "New Booking",
              "userType": "guest",
              "threadId": threadId.toString(),
              "guestId": guestId.toString(),
              "guestName": guestProfile && ((guestProfile.firstName).toString()),
              "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
              "hostId": hostId.toString(),
              "hostName": hostProfile && ((hostProfile.firstName).toString()),
              "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
              "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
              "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
              "listId": listId.toString(),
              "userName": userName,
            };

            const listData = await Listing.findOne({
              attributes: ['id', 'title'],
              where: {
                id: listId
              },
              raw: true
            });

            // Email template - Pre-Approve
            emailContent = {
              guestName: guestProfile && guestProfile.firstName,
              hostName: hostProfile && hostProfile.firstName,
              listTitle: listData && listData.title,
              threadId,
            };

            sendServerEmail(getThread.guest, 'bookingPreApproval', emailContent);
          }

          if (type !== 'approved' && type !== 'declined') {
            sendNotifications(messageType, notifyContent, notifyUserId);
          }

          if (type === 'message') { // Send Message - Email template
            emailContent = {
              receiverName: (notifyUserType === 'guest' ? (guestProfile && guestProfile.firstName) : (hostProfile && hostProfile.firstName)),
              senderName: (notifyUserType === 'guest' ? (hostProfile && hostProfile.firstName) : (guestProfile && guestProfile.firstName)),
              receiverType: notifyUserType,
              type: notifyUserType,
              message: content,
              threadId
            };

            sendServerEmail(notifyUserId, 'message', emailContent);
          }

          receiverId = (notifyUserType === 'guest' ? getThread?.guest : getThread?.host)
          // sendSocketNotification(`messageThread-${receiverId}`, '');
          // sendSocketNotification(`viewMessageThread-${receiverId}`, { threadId, type: notifyUserType });

          return threadItems;
        } else {
          return {
            status: 'failed to create thread items'
          }
        }
      } else {
        return {
          status: 'userbanned'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};
export default sendMessage;
