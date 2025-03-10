// For sequelize functions
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
import { Reservation } from '../../models';
import ReservationType from '../../types/ReservationType';

const getCancellationData = {

    type: ReservationType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user.admin) {
            return await Reservation.findOne({
                where: {
                    id
                }
            });
        }
    }
};

export default getCancellationData;