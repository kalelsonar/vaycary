import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { AdminReviews } from '../../../models';
import WhyHostReviewType from '../../../types/siteadmin/WhyHostReviewType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const deleteWhyHostReview = {

    type: WhyHostReviewType,

    args: {
        reviewId: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, {
        reviewId
    }) {
        try {
            if (!request.user) {
                return {
                    status: 500,
                    errorMessage: showErrorMessage({ errorCode: 'loginError' })
                };
            }
            await AdminReviews.destroy({
                where: {
                    id: reviewId
                }
            });

            return { status: 200 };

        } catch (error) {
            return {
                status: 400,
                errorMessage: showErrorMessage({ errorCode: 'catchError', error })
            };
        }
    }
}

export default deleteWhyHostReview;