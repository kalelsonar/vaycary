import sequelize from '../../sequelize';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import { Reservation } from '../../models';
import AllReservationType from '../../types/AllReservationType';

const getAllReservation = {

  type: AllReservationType,

  args: {
    userType: { type: StringType },
    currentPage: { type: IntType },
    dateFilter: { type: StringType },
    listId: { type: IntType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    orderBy: { type: StringType },
    searchKey: { type: StringType },
  },

  async resolve({ request }, { userType, currentPage, dateFilter, listId, startDate, endDate, orderBy, searchKey }) {
    const limit = 5;
    let offset = 0, startDateFilter = {};
    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }
    if (request.user && !request.user.admin) {
      const userId = request.user.id;
      let where, totalWhere;
      let order, searchFilter = {}, statusFilter = {
        $in: ['pending', 'approved']
      };

      let paymentState = 'completed';
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateFilter == 'previous') {
        statusFilter = {
          $in: ['expired', 'completed', 'declined', 'cancelled']
        };
      }

      if (startDate && endDate) {
        startDateFilter = {
          $and: [
            {
              checkOut: {
                $lte: endDate
              },
            },
            {
              checkIn: {
                $gte: startDate
              }
            }
          ],
        };
      }

      if (userType === 'host') {
        totalWhere = {
          hostId: userId,
          paymentState,
        }
      } else {
        totalWhere = {
          guestId: userId,
          paymentState,
        }
      }

      if (searchKey) {
        searchFilter = {
          listId: {
            $in: [
              sequelize.literal(`
              SELECT
                id
              FROM
                Listing
              WHERE title like '%${searchKey}%'
            `)
            ]
          }
        }
      }

      if (userType === 'host') {
        where = {
          hostId: userId,
          paymentState,
          $and: [
            searchFilter,
            startDateFilter,
            {
              reservationState: statusFilter
            }
          ],
        };
      } else {
        where = {
          guestId: userId,
          paymentState,
          $and: [
            searchFilter,
            {
              reservationState: statusFilter
            }
          ],
        };
      }

      if (listId && listId > 0) where['listId'] = listId;

      order = orderBy ? [['checkIn', orderBy]] : (dateFilter == 'previous' ? [['checkIn', 'DESC']] : [['checkIn', 'ASC']]);

      const count = await Reservation.count({ where });
      const totalCount = await Reservation.count({ where: totalWhere });

      const reservationData = await Reservation.findAll({
        where,
        order,
        limit: limit,
        offset: offset
      });

      return {
        reservationData,
        count,
        currentPage,
        totalCount
      };

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getAllReservation;

/**

query getAllReservation ($userType: String){
  getAllReservation(userType: $userType){
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    message {
      id
    }
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
  }
}

**/