import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
import { Reservation } from '../../models';
import ReservationType from '../../types/ReservationType';
import showErrorMessage from '../../../helpers/showErrorMessage';

const checkReservationData = {

    type: ReservationType,

    args: {
        id: { type: IntType },
        type: { type: StringType },
    },

    async resolve({ request }, { id, type }) {
        if (request.user.admin) {
            const data = await Reservation.findOne({
                attributes: ['reservationState'],
                where: {
                    id
                },
                raw: true
            });

            if (type == 'request') return { status: data?.reservationState == 'pending' ? "200" : "400", errorMessage: showErrorMessage({ errorCode: 'approved' }) }
            else return { status: data?.reservationState != 'cancelled' ? "200" : "400", errorMessage: showErrorMessage({ errorCode: 'cancelBooking' }) }
        }
    }
};

export default checkReservationData;