var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);
import sequelize from '../../data/sequelize';
import { Reservation, ListBlockedDates, ThreadItems, SiteSettings, Threads } from '../../data/models';
import { emailBroadcast } from './expiredEmail';

const reservationExpire = app => {

	new CronJob('0 55 23 * * *', async function () { // Run every day on 11.55 PM

		console.log("/********************************************/");
		console.log("HOLY MOLY RESERVATION EXPIRE CRON STARTED");

		let emailLogo, offset = 0, limit = 100, totalPages = 1;

		let getEmailLogo = await SiteSettings.findOne({
			where: {
				name: 'emailLogo'
			},
			raw: true
		});

		emailLogo = getEmailLogo && getEmailLogo.value;


		const getTodayReservations = await sequelize.query(`SELECT id, reservationState, hostId, checkIn, checkOut, guests, paymentState, createdAt,  DATE_FORMAT(checkIn,'%Y%m%d') AS formatCheckout, DATE_FORMAT(NOW(),'%Y%m%d') as today , TIMESTAMPDIFF(HOUR, createdAt, NOW()) as hours_difference FROM Reservation having (formatCheckout <= today OR hours_difference > 24) AND reservationState = 'pending' AND paymentState = 'completed';
		`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		// Store them in an array
		if (getTodayReservations && getTodayReservations.length > 0) {

			totalPages = Math.floor((getTodayReservations.length - 1) / limit) + 1;

			for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
				offset = (currentPage - 1) * limit;

				const todayReservations = await sequelize.query(`SELECT id, reservationState, hostId, checkIn, checkOut, guests, paymentState, createdAt,  DATE_FORMAT(checkIn,'%Y%m%d') AS formatCheckout, DATE_FORMAT(NOW(),'%Y%m%d') as today , TIMESTAMPDIFF(HOUR, createdAt, NOW()) as hours_difference FROM Reservation having (formatCheckout <= today OR hours_difference > 24) AND reservationState = 'pending' AND paymentState = 'completed' LIMIT ${offset}, ${limit};`,
					{ type: sequelize.QueryTypes.SELECT });

				if (todayReservations && todayReservations.length > 0) {
					todayReservations.map(async (item) => {

						if (item && item.id) {

							await AllowedLimit();

							// Update Reservation Status
							await Reservation.update({
								reservationState: 'expired',
							}, {
								where: { id: item?.id }
							});

							let getThreadId = await ThreadItems.findOne({
								where: { reservationId: item.id },

							});

							// Update ThreadItems
							await ThreadItems.update({
								type: 'expired',
								isRead: false
							}, {
								where: { reservationId: item.id }
							});

							if (getThreadId) {
								await Threads.update({
									isRead: false,
									messageUpdatedDate: new Date()
								}, {
									where: { id: getThreadId?.threadId }
								});
							}

							// Unblock blocked dates
							await ListBlockedDates.destroy({
								where: {
									reservationId: item?.id
								}
							});

							await emailBroadcast(item.id, emailLogo);
						}
					})
				}
			}
		}

		console.log("HOLY MOLY RESERVATION EXPIRE CRON COMPLETED");
		console.log("/********************************************/");

	}, null, true, 'America/Los_Angeles');

};

export default reservationExpire;