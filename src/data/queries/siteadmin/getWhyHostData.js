import { WhyHost } from '../../models';
import WhyHostCommonType from '../../types/WhyHostCommonType';
import showErrorMessage from '../../../helpers/showErrorMessage';

const getWhyHostData = {
    type: WhyHostCommonType,

    async resolve({ request }) {
        if (request.user && request.user.admin == true) {
            let dataList = [];
            dataList = await WhyHost.findAll({
                attributes: [
                    'id',
                    'title',
                    'imageName',
                    'buttonLabel'
                ],
            });

            return await {
                dataList,
                status: 200
            }
        } else {
            return {
                status: 500,
                errorMessage: showErrorMessage({ errorCode: 'loginError' })
            }
        }
    }
}

export default getWhyHostData;