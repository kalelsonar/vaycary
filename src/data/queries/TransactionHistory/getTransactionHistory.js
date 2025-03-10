import {
	GraphQLString as StringType,
	GraphQLInt as IntType
} from 'graphql';
import sequelize from '../../sequelize';
import { Reservation } from '../../models';
import AllReservationType from '../../types/AllReservationType';
const getTransactionHistory = {

	type: AllReservationType,

	args: {
		mode: { type: StringType },
		payoutId: { type: IntType },
		listId: { type: IntType },
		currentPage: { type: IntType },
		searchKey: { type: StringType },
	},

	async resolve({ request }, { mode, payoutId, listId, currentPage, searchKey }) {
		if (request.user && !request.user.admin) {
			const hostId = request.user.id, limit = 5;
			let offset = 0, totalWhere = {}, searchFilter = {};
			if (currentPage) {
				offset = (currentPage - 1) * limit;
			}
			let reservationRule = {
				hostId,
				paymentState: 'completed',
				$or: []
			};
			if (mode === 'completed' || mode === 'grossEarnings') {
				reservationRule['$or'].push({ reservationState: 'completed' });
				reservationRule['$or'].push({
					reservationState: 'cancelled',
					id: {
						$in: [
							sequelize.literal(`SELECT reservationId FROM CancellationDetails where payoutToHost > 0`)
						]
					}
				});
				totalWhere = { ...reservationRule };
				if (payoutId && payoutId > 0) {
					reservationRule['id'] = {
						$in: [
							sequelize.literal(`SELECT reservationId FROM TransactionHistory where payoutId=${payoutId}`)
						]
					};
				}
			} else {
				reservationRule['$or'].push({ reservationState: 'approved' });
				reservationRule['id'] = {
					$notIn: [
						sequelize.literal("SELECT reservationId FROM TransactionHistory")
					]
				};
				totalWhere = { ...reservationRule };
			}

			if (listId && listId > 0) reservationRule['listId'] = listId;

			if (searchKey) {
				searchFilter = {
					$or: [
						{
							listId: {
								$in: [
									sequelize.literal(`SELECT id FROM Listing WHERE title like '%${searchKey}%'`)
								]
							}
						},
						{
							guestId: {
								$in: [
									sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchKey}%'`)
								]
							}
						},
						{
							id: {
								$in: [
									sequelize.literal(`SELECT id FROM Reservation WHERE confirmationCode like '%${searchKey}%'`)
								]
							}
						},
					]
				};
				reservationRule['$and'] = searchFilter;
			}

			const totalCount = await Reservation.count({ where: totalWhere });
			const totalReservations = await Reservation.findAll({ attributes: ['id', 'total', 'hostServiceFee', 'currency'], where: reservationRule });
			const count = await Reservation.count({ where: reservationRule });
			const reservationData = await Reservation.findAll({
				where: reservationRule,
				order: [['checkIn', 'ASC']],
				limit: limit,
				offset: offset,
			});

			return {
				reservationData,
				count: count,
				totalCount,
				totalData: totalReservations
			};
		}
	}
};

export default getTransactionHistory;