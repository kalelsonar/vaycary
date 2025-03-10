// GrpahQL
import {
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql';
import sequelize from '../../sequelize';
import AllReservationType from '../../types/AllReservationType';

// Sequelize models
import { Reviews, Reservation } from '../../models';

const pendingReviews = {

    type: AllReservationType,

    args: {
        offset: { type: IntType },
        loadCount: { type: IntType },
    },

    async resolve({ request, response }, { loadCount, offset }) {

        let where = {}, limit = loadCount ? loadCount : 10;

        if (request.user) {

            const userId = request.user.id;

            where = {

                reservationState: 'completed',
                $or: [
                    {
                        hostId: userId
                    },
                    {
                        guestId: userId
                    }
                ],
                id: {
                    $notIn: [
                        sequelize.literal(`SELECT reservationId FROM Reviews WHERE authorId='${userId}'`)
                    ]
                }
            }

            const count = await Reservation.count({
                where
            });

            const reservation = await Reservation.findAll({
                where,
                limit,
                offset,
            });

            return {
                reservationData: reservation,
                count
            }
        } else {
            return {
                status: 'notLoggedIn'
            };
        }
    },
};

export default pendingReviews;

/**
query PendingReviews{
  pendingReviews{
    id
    listId
    hostData {
      userId
      profileId
      firstName
      lastName
      picture
      userData {
        email
      }
    }
    guestData {
      userId
      profileId
      firstName
      lastName
      picture
      userData {
        email
      }
    }
  }
}
**/