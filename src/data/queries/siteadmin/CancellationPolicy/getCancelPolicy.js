import {
	GraphQLInt as IntType,
	GraphQLNonNull as NonNull,
} from 'graphql';
import { Cancellation } from '../../../models';
import EditCancellationCommonType from '../../../types/EditCancellationCommonType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const getCancelPolicy = {

	type: EditCancellationCommonType,

	args: {
		id: { type: new NonNull(IntType) },
	},

	async resolve({ request }, { id }) {
		try {
			if (request.user && request.user.admin === true) {

				const result = await Cancellation.findOne({
					where: {
						id
					}
				});

				return await {
					status: result ? 200 : 400,
					result,
					errorMessage: result ? null : showErrorMessage({ errorCode: 'noRecord' })
				}

			} else {
				return {
					status: 500,
					errorMessage: showErrorMessage({ errorCode: 'loginError' })
				}
			}
		} catch (error) {
			return {
				status: 400,
				errorMessage: showErrorMessage({ errorCode: 'catchError', error: error.message })
			}
		}
	}
};

export default getCancelPolicy;

