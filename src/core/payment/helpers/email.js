import {
    Reservation,
    ThreadItems,
    SiteSettings
} from '../../../data/models';
import { sendServerEmail } from '../../email/sendServerEmail';
import { getData, getListingData } from './commonHelper';

export async function emailBroadcast(id) {
    // Get Reservation Data
    const reservation = await Reservation.findOne({
        where: { id }
    });

    let emailLogo, getEmailLogo;
    getEmailLogo = await SiteSettings.findOne({
        where: {
            name: 'emailLogo'
        },
        raw: true
    });

    emailLogo = getEmailLogo?.value

    if (reservation) {
        // Get Host Data
        const host = await getData({ id: reservation.hostId })

        // Get Guest Data
        const guest = await getData({ id: reservation.guestId })

        // Get List Data
        const list = await getListingData({ id: reservation.listId })
        
        // Get Thread Data
        const threadData = await ThreadItems.findOne({
            where: { reservationId: id }
        });

        let reservationId = reservation?.id, confirmationCode = reservation?.confirmationCode,
            hostEmail = host?.email, hostName = host?.profile?.firstName, guestEmail = guest?.email,
            guestName = guest?.profile?.firstName, guestLastName = guest?.profile?.lastName,
            guestLocation = guest?.profile?.location, guestProfilePic = guest?.profile?.picture,
            guestJoinedDate = guest?.profile?.createdAt;

        let checkIn = reservation?.checkIn, checkOut = reservation?.checkOut,
            guests = reservation?.guests, listTitle = list?.title, listCity = list?.city;

        let allowedCheckInTime = list?.listingData?.checkInStart, allowedCheckOutTime = list?.listingData?.checkInEnd,
            basePrice = reservation?.basePrice, total = reservation?.total,
            hostServiceFee = reservation?.hostServiceFee, currency = reservation?.currency, isTour = reservation?.isTour;

        let threadId, hostTotal = 0;
        if (threadData) {
            threadId = threadData?.threadId;
        }

        // For Booking Request
        if (reservation?.reservationState === 'pending') {
            // hostTotal = total - (insurance + tax + guestServiceFee);        
            hostTotal = total;
            // Send email to host
            let contentForHost = {
                reservationId,
                confirmationCode,
                hostName,
                guestName,
                checkIn,
                checkOut,
                listTitle,
                basePrice,
                total: hostTotal,
                hostServiceFee,
                threadId,
                currency,
                logo: emailLogo
            };

            await sendServerEmail(hostEmail, !isTour ? 'bookingRequest' : 'bookingTourRequest', contentForHost)

            // Send email to guest
            let contentForguest = {
                reservationId,
                confirmationCode,
                hostName,
                guestName,
                checkIn,
                listTitle,
                threadId,
                logo: emailLogo
            };

            await sendServerEmail(guestEmail, !isTour ? 'bookingRequestGuest' : 'bookingTourRequestGuest', contentForguest)
    
        }

        if (reservation.reservationState === 'approved') {
            // Send email to host
            let contentForHost = {
                reservationId,
                threadId,
                confirmationCode,
                guestName,
                guestLastName,
                guestLocation,
                guestProfilePic,
                guestJoinedDate,
                checkIn,
                checkOut,
                guests,
                allowedCheckInTime,
                allowedCheckOutTime,
                logo: emailLogo
            };
            await sendServerEmail(hostEmail, 'bookingConfirmedToHost', contentForHost);

            // Send email to guest
            let contentForguest = {
                reservationId,
                hostName,
                guestName,
                listTitle,
                listCity,
                threadId,
                logo: emailLogo
            };
            await sendServerEmail(guestEmail, 'bookingConfirmedToGuest', contentForguest);
        }


        return {
            status: 'email is sent'
        };
    } else {
        return {
            status: 'failed to send email'
        }
    }
}