// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ThreadItemsType from '../types/ThreadItemsType';

// Sequelize models
import { Threads, ThreadItems, UserProfile } from '../../data/models';
import { sendNotifications } from '../../helpers/sendNotifications';
import { sendServerEmail } from '../../core/email/sendServerEmail';
import moment from 'moment';
import sequelize from '../sequelize';
// import sendSocketNotification from '../../socket/sendSocketNotification';

const CreateThreadItems = {

  type: ThreadItemsType,

  args: {
    listId: { type: new NonNull(IntType) },
    host: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
  },

  async resolve({ request, response }, {
    listId,
    host,
    content,
    type,
    startDate,
    endDate,
    personCapacity
  }) {

    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;
      let notifyUserId, notifyGuestId, notifyHostId, notifyUserType;
      let userName, emailContent;
      let convertedStartDate, convertedEndDate;
      convertedStartDate = moment(startDate).format('YYYY-MM-DD');
      convertedEndDate = moment(endDate).format('YYYY-MM-DD');
      // Check if a thread is already there or create a new one

      const isThreadData = await Threads.findAll({
        attributes: [
          'id', 'listId',
          [sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'timeDiff']
        ],
        where: {
          listId,
          host,
          guest: userId,
          checkOut: convertedEndDate,
          checkIn: convertedStartDate,
        },
        having: {
          timeDiff: { lt: 24 }
        },
        raw: true
      })

      if (isThreadData && isThreadData.length > 0) {
        return {
          status: '400'
        }
      }

      const thread = await Threads.findOrCreate({
        where: {
          listId,
          host,
          guest: userId,
          checkIn: convertedStartDate,
          checkOut: convertedEndDate,
          reservationId: null,
        },
        defaults: {
          //properties you want on create
          listId,
          host,
          guest: userId,
          messageUpdatedDate: new Date(),
          isRead: false,
          checkIn: convertedStartDate,
          checkOut: convertedEndDate,
          createdAt: new Date(),
        }
      });

      if (thread) {
        // Create a thread item
        const threadItems = await ThreadItems.create({
          threadId: thread[0].dataValues.id,
          sentBy: userId,
          content,
          type,
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          personCapacity,
          status: "inquiry"
        });

        if (threadItems) {
          const updateThreads = await Threads.update({
            isRead: false,
            messageUpdatedDate: new Date()
          },
            {
              where: {
                id: thread[0].dataValues.id
              }
            }
          );

          const getThread = await Threads.findOne({
            attributes: ['host', 'guest'],
            where: {
              id: thread[0].dataValues.id
            },
            raw: true
          });

          if (getThread && getThread.host && getThread.guest) {
            notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
            notifyUserType = getThread.host === userId ? 'guest' : 'host';
            notifyGuestId = getThread.host === userId ? getThread.guest : getThread.host;
            notifyHostId = getThread.host === userId ? getThread.host : getThread.guest;
          }

          const guestProfile = await UserProfile.findOne({
            attributes: ['displayName', 'firstName', 'picture', 'profileId'],
            where: {
              userId
            }
          });

          const hostProfile = await UserProfile.findOne({
            attributes: ['displayName', 'firstName', 'picture', 'profileId'],
            where: {
              userId: host
            }
          });

          if (guestProfile && getThread) {
            userName = (guestProfile && guestProfile.firstName) ? guestProfile.firstName : null;
          }

          let notifyContent = {
            "screenType": "message",
            "title": "New Inquiry",
            "userType": notifyUserType.toString(),
            "threadId": (thread[0].dataValues.id).toString(),
            "guestId": notifyGuestId.toString(),
            "guestName": guestProfile && ((guestProfile.firstName).toString()),
            "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
            "hostId": notifyHostId.toString(),
            "hostName": hostProfile && ((hostProfile.firstName).toString()),
            "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
            "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
            "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
            "listId": listId.toString(),
            "userName": userName,
            "content": content
          };

          sendNotifications('newEnquiry', notifyContent, notifyUserId);

          // Email to the host for inquiry
          emailContent = {
            receiverName: hostProfile && ((hostProfile.firstName).toString()),
            senderName: guestProfile && ((guestProfile.firstName).toString()),
            type: 'host',
            message: content,
            threadId: thread && thread[0] && thread[0].dataValues && thread[0].dataValues.id,
            checkIn: startDate,
            checkOut: endDate,
            personCapacity
          };

          sendServerEmail(host, 'inquiry', emailContent);
          // sendSocketNotification(`messageThread-${notifyUserId}`, '')
          // sendSocketNotification(`viewMessageThread-${notifyUserId}`, { threadId: thread[0]?.dataValues?.id, type: notifyUserType })

          return threadItems;
        } else {
          return {
            status: 'failed to create thread items'
          }
        }
      } else {
        return {
          status: 'failed to create a thread'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default CreateThreadItems;

/**
mutation CreateThreadItems(
  $listId: Int!,
  $host: String!,
  $content: String!,
  $type: String,
  $startDate: String,
  $endDate: String,
  $personCapacity: Int
){
    CreateThreadItems(
      listId: $listId,
      host: $host,
      content: $content,
      type: $type,
      startDate: $startDate,
      endDate: $endDate,
      personCapacity: $personCapacity
    ) {
        id
        sentBy
        content
        type
        startDate
        endDate
        personCapacity
        createdAt
    }
}
**/
