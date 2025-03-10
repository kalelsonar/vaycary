import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import { Reservation } from '../../models';
import AllReservationType from '../../types/AllReservationType';
import sequelize from '../../sequelize';

const getAllReservationAdmin = {

  type: AllReservationType,

  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
    searchType: { type: StringType }
  },

  async resolve({ request }, { currentPage, searchList, searchType }) {

    if (request.user.admin) {
      let paymentState = 'completed';
      let limit = 10, offset = 0;
      // Offset from Current Page
      if (currentPage) {
        offset = (currentPage - 1) * limit;
      }

      let reservationData, count, KeyWordFilter, where = {};

      if (searchList) {
        KeyWordFilter = {
          $or: [
            {
              confirmationCode: {
                $like: '%' + searchList + '%'
              }
            },
            {
              id: {
                $like: '%' + searchList + '%'
              }
            },
            {
              reservationState: {
                $like: '%' + searchList + '%'
              }
            },
            {
              listId: {
                $in: [
                  sequelize.literal(`
                  SELECT
                    id
                  FROM
                    Listing
                  WHERE title like '%${searchList}%'
                `)
                ]
              }
            },
          ],
        }
      }
      
      where = {
        paymentState
      }

      if (searchType) {
        where['reservationState'] = searchType
      }
      if (KeyWordFilter) {
        where['$and'] = KeyWordFilter
      }

      count = await Reservation.count({
        where
      });
      reservationData = await Reservation.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where
      });

      return {
        reservationData,
        count
      };
    } else {
      return {
        status: 'Not loggedin'
      };
    }
  }
};

export default getAllReservationAdmin;

/**

query getAllReservationAdmin{
  getAllReservationAdmin{
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    messageData {
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
    status
  }
}

**/