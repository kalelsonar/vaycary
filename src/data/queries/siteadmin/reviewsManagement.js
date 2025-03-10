import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
import { Reviews } from '../../../data/models';
import ReviewsWholeType from '../../types/siteadmin/ReviewsWholeType';
import sequelize from '../../sequelize';

const reviewsManagement = {
    type: ReviewsWholeType,
    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType },
        type: { type: StringType }
    },
    async resolve({ request, response }, { currentPage, searchList, type }) {
        if (request.user && request.user.admin == true) {
            const limit = 10;
            let offset = 0;
            if (currentPage) {
                offset = (currentPage - 1) * limit;
            }

            let reviewsData, userCountLength, where = {};
            
            if (searchList) {
                where = {
                    $or: [
                        {
                            id: {
                                $or: [
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE listId IN(SELECT id FROM Listing WHERE title LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE reviewContent LIKE "%${searchList}%"`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE rating LIKE "%${searchList}%"`
                                            )]
                                    },

                                ]
                            },

                        }
                    ],
                }
            }
            where['isAdmin'] = type == 'admin';
            userCountLength = await Reviews.count({ where });
            
            reviewsData = await Reviews.findAll({
                where,
                limit,
                offset,
                order: [
                    ['id', 'DESC']
                ],
            });

            return {
                reviewsData,
                count: userCountLength
            };
        }
    },
};
export default reviewsManagement;
