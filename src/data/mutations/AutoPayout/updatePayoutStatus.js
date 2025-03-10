import {
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';
import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';
import showErrorMessage from '../../../helpers/showErrorMessage';

const updatePayoutStatus = {
    type: ReservationType,

    args: {
        id: { type: new NonNull(IntType) },
        isHold: { type: new NonNull(BooleanType) }
    },

    async resolve({ request }, { id, isHold }) {
        let isUpdated = false;
        if (request.user && request.user.admin) {
            await Reservation.update({
                isHold: isHold
            }, {
                where: {
                    id
                }
            }).then(function (instance) {
                if (instance > 0) {
                    isUpdated = true
                }
            });

            return {
                status: isUpdated ? '200' : '400',
                errorMessage: isUpdated ? null : showErrorMessage({ errorCode: 'isUpdated' })
            }
        } else {
            return {
                status: '500',
                errorMessage: showErrorMessage({ errorCode: 'loginError' })
            }
        }
    }
}

export default updatePayoutStatus;