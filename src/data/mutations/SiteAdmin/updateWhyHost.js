import {
	GraphQLString as StringType
} from 'graphql';
import showErrorMessage from '../../../helpers/showErrorMessage';
import { WhyHost } from '../../models';
import WhyHostCommonType from '../../types/WhyHostCommonType';

const updateWhyHost = {
	type: WhyHostCommonType,

	args: {
		dataList: { type: StringType }
	},

	async resolve({ request, response }, {
		dataList
	}) {

		try {

			if (request.user && request.user.admin) {

				let data = JSON.parse(dataList)

				if (data.length > 0) {

					let documentId = data && data.map((doc) => doc.id);


					await WhyHost.destroy({
						where: {
							id: {
								notIn: [...documentId]
							}
						}
					});

					await WhyHost.bulkCreate(data, {
						updateOnDuplicate: ['imageName', 'title', 'buttonLabel']
					});

					return {
						status: 200
					}

				} else {
					return {
						status: 400,
						errorMessage: showErrorMessage({ errorCode: 'noRecord' })
					}
				}

			} else {
				return {
					status: 500,
					errorMessage: showErrorMessage({ errorCode: 'commonError' })
				}
			}
		} catch (error) {
			return {
				errorMessage: showErrorMessage({ errorCode: 'catchError', error }),
				status: 400
			}
		}
	}

};

export default updateWhyHost;