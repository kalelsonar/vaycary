import {
	GraphQLBoolean as BooleanType,
	GraphQLInt as IntType,
	GraphQLNonNull as NonNull,
} from 'graphql';
import showErrorMessage from '../../../helpers/showErrorMessage';
import { PaymentMethods, Payout } from '../../models';
import PaymentMethodsType from '../../types/PaymentMethodsType';

const updatePaymentGatewayStatus = {
	type: PaymentMethodsType,
	args: {
		id: { type: new NonNull(IntType) },
		isEnable: { type: new NonNull(BooleanType) }
	},

	async resolve({ request }, { id, isEnable }) {
		try {

			if (request.user && request.user.admin) {
				let isAllow = 0;

				const getUserPayouts = await Payout.findOne({
					attributes: ["id"],
					where: { methodId: id, default: true },
					raw: true
				});

				if (getUserPayouts && !isEnable) {
					return {
						status: 400,
						errorMessage: showErrorMessage({ errorCode: 'inActivePayment' })
					}
				}

				let getStatus = await PaymentMethods.findAll({
					where: {
						isEnable: 1
					},
					raw: true
				});

				if (getStatus && getStatus.length == 1 && isEnable == false) {
					isAllow = 1;
				}
				if (isAllow === 0) {
					let updateStatus = await PaymentMethods.update({
						isEnable
					}, {
						where: {
							id
						}
					});
					if (!isEnable) {
						await Payout.update({
							default: false
						}, {
							where: {
								methodId: id
							}
						});
					}
					return {
						status: updateStatus ? 200 : 400,
						errorMessage: updateStatus ? null : showErrorMessage({ errorCode: 'commonError' })
					}
				} else {
					return {
						status: 400,
						errorMessage: showErrorMessage({ errorCode: 'isAllow' })
					}
				}
			}
		} catch (error) {
			return await {
				status: 400,
				errorMessage: showErrorMessage({ errorCode: 'catchError', error })
			};
		}
	}
}

export default updatePaymentGatewayStatus;