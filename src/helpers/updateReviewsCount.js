import { Reviews, Listing } from '../data/models';

export const updateReviewsCount = async ({ listId, userId }) => {

    const listing = await Listing.findOne({
        attributes: ['id'],
        where: {
            id: listId,
            userId
        }
    });

    if (listing) {
        let reviewsCount = 0, reviewsStarRating = 0;

        reviewsCount = await Reviews.count({
            where: {
                listId,
                userId,
                isAdminEnable: true
            }
        });

        reviewsStarRating = await Reviews.sum('rating', {
            where: {
                listId,
                userId,
                isAdminEnable: true
            }
        });

        if (reviewsCount > 0 && reviewsStarRating > 0) {
            await Listing.update({
                reviewsCount: Math.round(reviewsStarRating / reviewsCount)
            }, { where: { id: listId } });
        }
    }
}