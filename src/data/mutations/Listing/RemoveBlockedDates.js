import ListBlockedDatesType from '../../types/ListBlockedDatesType';

import { ListBlockedDates } from '../../models';
import moment from 'moment';
import sequelize from 'sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType
} from 'graphql';

const RemoveBlockedDates = {

    type: ListBlockedDatesType,

    args: {
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
    },

    async resolve({ request }, { listId, blockedDates }) {

        // Check whether user is logged in
        try {
            if (request.user || request.user.admin) {
                let dayStatus;
                // Collect all records of Blocked Dates except Reservation Dates

                await Promise.all(blockedDates.map(async (item, index) => {
                    let day = moment.utc(item).format('YYYY-MM-DD');
                    let dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

                    let blockedDatesFind = await ListBlockedDates.findAll({
                        where: {
                            blockedDates: dayList,
                            listId: listId,
                            reservationId: null
                        },
                        raw: true
                    })

                    if (index === 0) {
                        dayStatus = 'secondHalf';
                    } else if (index === blockedDates.length - 1) {
                        dayStatus = 'firstHalf';
                    } else {
                        dayStatus = 'full';
                    }

                    if (blockedDatesFind && blockedDatesFind.length == 1) {
                        let value = blockedDatesFind[0];
                        if (value?.dayStatus == 'full' && ['firstHalf', 'secondHalf'].includes(dayStatus)) {
                            const updatedStatus = dayStatus === 'secondHalf' ? 'firstHalf' : 'secondHalf';
                            const calendarStatus = value?.isSpecialPrice > 0 ? 'available' : 'blocked';

                            await ListBlockedDates.update({
                                dayStatus: updatedStatus,
                                calendarStatus,
                                isSpecialPrice: value?.isSpecialPrice || 0
                            }, {
                                where: {
                                    id: value.id,
                                    reservationId: null
                                }
                            });


                        } else if ((value?.dayStatus === 'secondHalf' && dayStatus !== 'firstHalf') || dayStatus === 'full' || value?.dayStatus === dayStatus) {
                            await ListBlockedDates.destroy({
                                where: {
                                    listId,
                                    reservationId: {
                                        $eq: null
                                    },
                                    blockedDates: dayList
                                }
                            });
                        }
                    } else if (blockedDatesFind && blockedDatesFind.length == 2) {
                        if (dayStatus === 'full') {
                            await ListBlockedDates.destroy({
                                where: {
                                    id: blockedDatesFind.map(item => item.id)
                                }
                            });
                        } else {
                            let updateId = blockedDatesFind.find(item => item.dayStatus === dayStatus);
                            if (updateId) {
                                await ListBlockedDates.destroy({
                                    where: {
                                        listId,
                                        reservationId: {
                                            $eq: null
                                        },
                                        id: updateId.id
                                    }
                                });
                            }
                        }
                    }

                    return {
                        status: '200'
                    }
                }));

            } else {
                return {
                    status: "Not loggedIn"
                };
            }
        } catch (error) {
            return {
                status: '400'
            }
        }
    },
};

export default RemoveBlockedDates;