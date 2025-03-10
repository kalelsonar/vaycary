import { Reservation, Threads, ThreadItems, UserProfile } from '../../../data/models';
import { sendNotifications } from '../../../helpers/sendNotifications';
// import sendSocketNotification from '../../../socket/sendSocketNotification';

export async function createThread(
    reservationId
) {

    const reservation = await Reservation.findOne({
        where: {
            id: reservationId,
        }
    });
    let thread;
    if (reservation) {

        let notifyUserId, notifyUserType, notifyContent, userName;
        notifyUserId = reservation.hostId;
        notifyUserType = 'host';

        //Find or create a thread
        if (reservation.threadId) {
            //Find or create a thread
            thread = await Threads.findOne({
                where: {
                    id: reservation?.threadId,
                },
                raw: true,
            });

            if (thread) {
                await Threads.update({
                    reservationId
                },
                    { where: { id: reservation?.threadId } }
                );
            }
        }
        if (!thread) {
            thread = await Threads.create({
                listId: reservation?.listId,
                host: reservation?.hostId,
                guest: reservation?.guestId,
                reservationId,
                messageUpdatedDate: new Date(),

            });
        }

        if (thread) {
            let bookType;

            bookType = reservation.reservationState === 'pending' ? 'requestToBook' : 'instantBooking';

            await ThreadItems.update({
                status: 'booked'
            },
                {
                    where: {
                        threadId: thread?.id,
                        type: 'inquiry'
                    }
                }
            )

            await ThreadItems.findOrCreate({
                where: {
                    threadId: thread?.id,
                    reservationId: reservation?.id,
                    sentBy: reservation?.guestId,
                    startDate: reservation?.checkIn,
                    endDate: reservation?.checkOut,
                    type: bookType,
                },
                defaults: {
                    //properties you want on create
                    threadId: thread?.id,
                    reservationId: reservation?.id,
                    sentBy: reservation?.guestId,
                    content: reservation?.message,
                    type: bookType,
                    startDate: reservation?.checkIn,
                    endDate: reservation?.checkOut,
                    personCapacity: reservation?.guests
                }
            });

            await Threads.update({
                isRead: false,
                messageUpdatedDate: new Date()
            },
                {
                    where: {
                        id: thread.id
                    }
                }
            );

            const guestProfile = await UserProfile.findOne({
                where: {
                    userId: reservation?.guestId
                }
            });

            userName = guestProfile?.firstName;

            notifyContent = {
                "screenType": "trips",
                "userType": notifyUserType.toString(),
                "userName": userName,
                "content": reservation.message
            };

            sendNotifications('newBooking', notifyContent, notifyUserId);
            // sendSocketNotification(`messageThread-${notifyUserId}`, '')
            // sendSocketNotification(`viewMessageThread-${notifyUserId}`, { threadId: thread.id, type: notifyUserType })

        }
    }
}