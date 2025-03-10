import { Reservation, ListBlockedDates } from '../../../data/models';
import sequelize from 'sequelize';

export async function blockDates(
    reservationId
) {
    var dates = [];
    const reservation = await Reservation.findOne({
        where: {
            id: reservationId,
        }
    });

    if (reservation) {
        var dates = [];
        var start = new Date(reservation?.checkIn);
        var end = new Date(reservation?.checkOut);

        //Check IN date
        dates.push({
            date: new Date(start),
            dayStatus: 'secondHalf',
        });

        //In between dates
        while (start < end) {
            dates.push({
                date: start,
                dayStatus: 'full',
            });
            let newDate = start.setDate(start.getDate() + 1);
            start = new Date(newDate);
        }

        //Check Out date
        dates[dates.length - 1] = {
            date: dates[dates.length - 1]['date'],
            dayStatus: 'firstHalf',
        };

        dates.map(async (blockedDates) => {

            let dayList = sequelize.where(
                sequelize.fn('DATE', sequelize.col('blockedDates')),
                blockedDates.date.toISOString().substring(0, 10)
            );

            let blockedDatesFind = await ListBlockedDates.findAll({
                where: {
                    blockedDates: dayList,
                    listId: reservation.listId,
                    calendarStatus: 'available',
                },
            });

            if (blockedDatesFind?.length == 0) {
                await ListBlockedDates.create({
                    listId: reservation.listId,
                    blockedDates: blockedDates.date.toISOString().substring(0, 10),
                    dayStatus: blockedDates.dayStatus,
                    calendarStatus: 'blocked',
                    reservationId,
                });
            } else if (blockedDatesFind?.length === 1) {
                let updateRequired = false, createRequired = false, value = blockedDatesFind[0];
                if (blockedDates.dayStatus === 'full' || blockedDates.dayStatus === value.dayStatus && value.dayStatus !== 'full') {
                    updateRequired = true;
                } else if (
                    blockedDates.dayStatus !== value.dayStatus &&
                    value.dayStatus !== 'full'
                ) {
                    createRequired = true;
                } else if (value.dayStatus === 'full') {
                    await ListBlockedDates.update(
                        {
                            dayStatus:
                                blockedDates.dayStatus === 'firstHalf'
                                    ? 'secondHalf'
                                    : 'firstHalf',
                        },
                        {
                            where: {
                                listId: reservation.listId,
                                id: value.id,
                            },
                        }
                    );
                    createRequired = true;
                }

                if (updateRequired) {
                    await ListBlockedDates.update(
                        {
                            listId: reservation.listId,
                            blockedDates: blockedDates.date.toISOString().substring(0, 10),
                            calendarStatus: 'blocked',
                            dayStatus: blockedDates.dayStatus,
                            reservationId,
                            calendarId: null,
                        },
                        {
                            where: {
                                listId: reservation.listId,
                                id: value.id,
                            },
                        }
                    );
                }

                if (createRequired) {
                    await ListBlockedDates.create({
                        listId: reservation.listId,
                        dayStatus: blockedDates.dayStatus,
                        blockedDates: blockedDates.date.toISOString().substring(0, 10),
                        calendarStatus: 'blocked',
                        reservationId,
                    });
                }
            } else if (blockedDatesFind && blockedDatesFind.length === 2) {
                if (blockedDates.dayStatus === 'full') {
                    await ListBlockedDates.destroy({
                        where: {
                            blockedDates: dayList,
                            listId: reservation.listId,
                        },
                    });
                    await ListBlockedDates.create({
                        listId: reservation.listId,
                        dayStatus: blockedDates.dayStatus,
                        blockedDates: blockedDates.date.toISOString().substring(0, 10),
                        calendarStatus: 'blocked',
                        reservationId,
                    });
                } else {
                    await Promise.all(
                        blockedDatesFind.map(async (value, keys) => {
                            if (blockedDates.dayStatus === value.dayStatus) {
                                await ListBlockedDates.update(
                                    {
                                        listId: reservation.listId,
                                        blockedDates: blockedDates.date
                                            .toISOString()
                                            .substring(0, 10),

                                        calendarStatus: 'blocked',
                                        dayStatus: blockedDates.dayStatus,
                                        reservationId,
                                        calendarId: null,
                                    },
                                    {
                                        where: {
                                            blockedDates: dayList,
                                            listId: reservation?.listId,
                                            dayStatus: blockedDates?.dayStatus,
                                        },
                                    }
                                );
                            }
                        })
                    );
                }
            }
        });
    }
}