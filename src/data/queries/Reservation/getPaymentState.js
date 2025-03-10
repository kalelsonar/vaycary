import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import moment from 'moment';
import { ListBlockedDates, Reservation } from '../../models';
import showErrorMessage from '../../../helpers/showErrorMessage';
import ReservationType from '../../types/ReservationType';

const getPaymentState = {
    type: ReservationType,
    args: {
        reservationId: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { reservationId }) {
        try {

            let checkInSecondHalf = [], checkOutFirstHalf = [];

            const data = await Reservation.findOne({
                attributes: ['paymentState', 'checkIn', 'checkOut', 'listId'],
                where: {
                    id: reservationId
                },
                raw: true
            });

            if (!data) {
                return {
                    status: '400',
                    errorMessage: await showErrorMessage({ errorCode: 'commonError' })
                }
            }

            if (data?.paymentState === 'completed') {
                return {
                    status: '400',
                    errorMessage: await showErrorMessage({ errorCode: 'paymentCompleted' })
                }
            }

            const checkAvailableDates = await ListBlockedDates.findAll({
                where: {
                    listId: data.listId,
                    blockedDates: {
                        $between: [data?.checkIn, data?.checkOut],
                    },
                    calendarStatus: {
                        $notIn: ["available"],
                    },
                },
            });

            if (checkAvailableDates?.length > 0) {
                checkInSecondHalf = checkAvailableDates?.filter(
                    (o) =>
                        moment(o?.blockedDates).format("YYYY-MM-DD") ==
                        moment(data?.checkIn).format("YYYY-MM-DD") &&
                        o?.dayStatus == "firstHalf"
                );

                checkOutFirstHalf = checkAvailableDates?.filter(
                    (o) =>
                        moment(o?.blockedDates).format("YYYY-MM-DD") ==
                        moment(data?.checkOut).format("YYYY-MM-DD") &&
                        o?.dayStatus == "secondHalf"
                );

                if (checkAvailableDates?.length > 0 &&
                    (checkInSecondHalf?.length === 1 || checkOutFirstHalf?.length === 1)) {
                    return {
                        status: '200',
                        ...data
                    };
                } else {
                    return {
                        status: '400',
                        errorMessage: await showErrorMessage({ errorCode: 'datesNotAvailable' })
                    }
                }
            } else {
                return {
                    status: '200',
                    ...data
                };
            }

        } catch (error) {
            return {
                status: '400',
                errorMessage: await showErrorMessage({ errorCode: 'catchError', error })
            }
        }
    }
};

export default getPaymentState;