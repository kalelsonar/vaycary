import {
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';
import { User, Listing, UserProfile, SiteSettings } from '../../../data/models';
import UserManagementType from '../../types/siteadmin/UserManagementType';

import { sendServerEmail } from '../../../core/email/sendServerEmail';
import { adminEmail } from '../../../config';

const updateBanServiceHistoryStatus = {
	type: UserManagementType,
	args: {
		id: { type: StringType },
		banStatus: { type: IntType }
	},
	async resolve({ request }, {
		id,
		banStatus
	}) {
		let emailContent;

		if (request.user && request.user.admin == true) {

			const Update = await User.update({
				userBanStatus: banStatus,
			}, {
				where: {
					id
				}
			});

			const adminEmail = await SiteSettings.findOne({
				attributes: ['value'],
				where: {
					name: 'email'
				},
				raw: true
			});

			if (banStatus == 1) {
				const UpdateListingStatus = await Listing.update({
					isPublished: 0,
				}, {
					where: {
						userId: id
					}
				});
			}

			const userData = await User.findOne({
				attributes: ['email', 'id'],
				where: {
					id
				},
				include: [{
					model: UserProfile, as: 'profile', required: true,
					attributes: ['firstName']
				}],
				raw: true
			})

			// Email template
			emailContent = {
				userName: userData && (userData['profile.firstName'] || userData['profile']['firstName']),
				userMail: userData && userData.email,
				adminMail: adminEmail.value
			};

			if (banStatus === 1) {
				await sendServerEmail(userData.email, 'banStatusServiceStatusBanned', emailContent);
			} else if (banStatus === 0) {
				await sendServerEmail(userData.email, 'banStatusServiceStatusUnBanned', emailContent);
			}

			return {
				status: 'success'
			}
		} else {
			return {
				status: 'failed'
			}
		}
	},
};
export default updateBanServiceHistoryStatus;
