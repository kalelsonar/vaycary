import {
    GraphQLInt as IntType
} from 'graphql';
import showErrorMessage from '../../../../helpers/showErrorMessage';
import { AdminReviews } from '../../../models';
import WhyHostReviewType from '../../../types/siteadmin/WhyHostReviewType';

const getWhyHostReview = {

    type: WhyHostReviewType,
    args: {
        reviewId: { type: IntType },
    },

    async resolve({ request }, { reviewId }) {
        try {

            if (!request.user) {
                return {
                    status: 500,
                    errorMessage: showErrorMessage({ errorCode: 'loginError' })
                }
            }

            const result = await AdminReviews.findOne({
                attributes: ['id', 'userName', 'reviewContent', 'image', 'isEnable'],
                where: {
                    id: reviewId
                }
            });

            return {
                result,
                status: result ? 200 : 400,
                errorMessage: result ? null : showErrorMessage({ errorCode: 'fetchRecord' })
            }

        } catch (e) {
            return {
                status: 400,
                errorMessage: showErrorMessage({ errorCode: 'catchError', error: e.message })
            }
        }
    }
};

export default getWhyHostReview;
