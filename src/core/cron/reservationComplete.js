var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);
import sequelize from '../../data/sequelize';
import { Reservation, ThreadItems, SiteSettings, Threads } from '../../data/models';
import { emailBroadcast } from './completedEmail';

const reservationComplete = app => {
	new CronJob('0 55 23 * * *', async function () { // Run every day on 11.55 PM
		console.log("/********************************************/");
		console.log("HOLY MOLY RESERVATION COMPLETE CRON STARTED");

		try {
			let emailLogo, offset = 0, limit = 100, totalPages = 1, where = {};

			where = {
				checkOut: { $lte: sequelize.literal('CURDATE()') },
				reservationState: 'approved'
			}

			const reservationCount = await Reservation.count({
				where
			})

			if (reservationCount && reservationCount > 0) {

				const getEmailLogo = await SiteSettings.findOne({
					attributes: ['value'],
					where: { name: 'emailLogo' },
					raw: true
				});

				emailLogo = getEmailLogo?.value;

				totalPages = Math.floor((reservationCount - 1) / limit) + 1;

				for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

					offset = (currentPage - 1) * limit;

					const getReservationIds = await Reservation.findAll({
						attributes: ['id', 'hostId', 'checkIn', 'checkOut', 'guests'],
						limit,
						offset,
						where,
						raw: true
					});

					// Update Reservation Status to completed
					if (getReservationIds && getReservationIds.length > 0) {

						getReservationIds.map(async (item) => {

							await AllowedLimit();

							// Get ThreadId
							let getThreadId = await ThreadItems.findOne({
								where: {
									reservationId: item.id
								}
							});

							// Create new ThreaItem for completion
							if (getThreadId) {
								await ThreadItems.create({
									threadId: getThreadId.threadId,
									sentBy: item.hostId,
									type: 'completed',
									startDate: item.checkIn,
									endDate: item.checkOut,
									personCapacity: item.guests,
									reservationId: item.id
								});

								await Threads.update({
									isRead: false,
									messageUpdatedDate: new Date()
								},
									{ where: { id: getThreadId.threadId } });
							}

							// Update Reservation Status
							await Reservation.update({
								reservationState: 'completed'
							}, {
								where: { id: item.id }
							});

							await emailBroadcast(item.id, emailLogo)
						})
					}
				}
			}

			console.log("HOLY MOLY RESERVATION COMPLETE CRON COMPLETED");
			console.log("/********************************************/");
		} catch (error) {
			console.log("HOLY MOLY RESERVATION COMPLETE CRON ERROR");
			console.log("ERROR: ", error);
			console.log("/********************************************/");
		}
	}, null, true, 'America/Los_Angeles');
};

export default reservationComplete;