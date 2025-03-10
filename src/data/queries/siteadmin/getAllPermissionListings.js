import {
	GraphQLInt as IntType,
	GraphQLString as StringType
} from 'graphql';
import sequelize from '../../sequelize';
import { Listing } from '../../../data/models';
import ListingPermissionCommonType from '../../types/ListingPermissionCommonType';
import showErrorMessage from '../../../helpers/showErrorMessage';

const getAllPermissionListings = {

	type: ListingPermissionCommonType,

	args: {
		searchList: { type: StringType },
		currentPage: { type: IntType }
	},

	async resolve({ request }, { currentPage, searchList }) {

		try {
			const limit = 10;
			let offset = 0, keywordFilter = {};

			if (currentPage) {
				offset = (currentPage - 1) * limit;
			}

			if (request.user && request.user.admin == true) {

				let where = {
					$and: [
						{
							$or: [
								{
									listApprovalStatus: 'pending'
								},
								{
									listApprovalStatus: 'declined'
								}
							]
						},
					],
					isReady: true
				};

				if (searchList && searchList.length > 0 && searchList.toString().trim() != '') {

					keywordFilter = {
						id: {
							$or: [
								{
									$in: [sequelize.literal(`SELECT id FROM Listing WHERE id LIKE '%${searchList}%'`)]
								},
								{
									$in: [sequelize.literal(`SELECT id FROM Listing WHERE userId IN (SELECT id FROM User WHERE email LIKE '%${searchList}%')`)]
								},
								{
									$in: [sequelize.literal(`SELECT id FROM Listing WHERE title LIKE '%${searchList}%'`)]
								},
								{
									$in: [sequelize.literal(`SELECT id FROM Listing WHERE userId IN (SELECT userId FROM UserProfile WHERE firstName LIKE '%${searchList}%')`)]
								},
								{
									$in: [sequelize.literal(`SELECT id FROM Listing WHERE createdAt LIKE '%${searchList}%'`)]
								}
							]
						}
					};

					where.$and[2] = [keywordFilter];
				}

				const count = await Listing.count({ where });

				const results = await Listing.findAll({
					where,
					offset,
					limit,
					order: [['updatedAt', 'DESC']],
				});

				return {
					count,
					status: 200,
					results,
					currentPage
				};

			} else {
				return {
					status: 500,
					errorMessage: showErrorMessage({ errorCode: 'loginError' })
				};
			}
		} catch (error) {
			return {
				status: 404,
				errorMessage: showErrorMessage({ errorCode: 'catchError', error })
			};
		}
	}
};

export default getAllPermissionListings;
