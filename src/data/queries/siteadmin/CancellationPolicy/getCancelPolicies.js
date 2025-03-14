import { Cancellation } from '../../../models';
import CancellationCommonType from '../../../types/CancellationCommonType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const getCancelPolicies = {

    type: CancellationCommonType,

    async resolve({ request }) {
        try {

            const results = await Cancellation.findAll({
                attributes: [
                    'id', 'policyName', 'policyContent', 'subContent', 'subTitle', 'content1', 'content2', 'content3', 'priorDays'
                ]
            });

            return {
                status: 200,
                results
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: showErrorMessage({ errorCode: 'catchError', error })
            }
        }
    }
};

export default getCancelPolicies;

