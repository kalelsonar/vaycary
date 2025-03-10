import { PaymentMethods } from '../../models';
import PaymentMethodsType from '../../types/PaymentMethodsType';
import showErrorMessage from '../../../helpers/showErrorMessage';

const getAllPaymentMethods = {
    type: PaymentMethodsType,

    async resolve({ request }) {
        try {
            if (request.user && request.user.admin) {
                let results = await PaymentMethods.findAll();
                return {
                    status: 200,
                    results
                }
            } else {
                return {
                    status: 500,
                    errorMessage: showErrorMessage({ errorCode: 'loginError' })
                };
            }
        } catch (error) {
            return await {
                status: 400,
                errorMessage: showErrorMessage({ errorCode: 'catchError', error })
            };
        }
    }
}

export default getAllPaymentMethods;