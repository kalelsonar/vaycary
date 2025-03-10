import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';
import sequelize from '../../../sequelize';
import moment from 'moment';
import { Reviews } from '../../../models';
import ReviewsCommonType from '../../../types/ReviewsCommonType';

const getReviewsDetails = {

    type: ReviewsCommonType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType },
    },

    async resolve({ request }, { currentPage, searchList }) {

        if (request.user && request.user.admin == true) {
            const limit = 10;
            let offset = 0, keywordFilter = {};
            if (currentPage) {
                offset = (currentPage - 1) * limit;
            }
            if (searchList && searchList.length > 0 && searchList.toString().trim() != '') {
                const checkIn = moment(searchList, 'DD-MM-YYYY').format('YYYY-MM-DD'), checkOut = moment(searchList, 'DD-MM-YYYY').format('YYYY-MM-DD');
                keywordFilter = {
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
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE listId LIKE "%${searchList}%"`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE listId IN(SELECT listId FROM Reservation WHERE confirmationCode LIKE "%${searchList}%")`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE listId IN(SELECT listId FROM Reservation WHERE checkIn like '%${checkIn}%')`
                                            )]
                                    },
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE listId IN(SELECT listId FROM Reservation WHERE checkOut like '%${checkOut}%')`
                                            )]
                                    },

                                ]
                            },
                        },
                        {
                            userId: {
                                $in: [
                                    sequelize.literal(`
                                      SELECT
                                          userId
                                      FROM
                                          UserProfile
                                      WHERE firstName like '%${searchList}%' OR lastName like '%${searchList}%'
                                    `)
                                ]
                            },
                        },
                        {
                            authorId: {
                                $in: [
                                    sequelize.literal(`
                                      SELECT
                                          userId
                                      FROM
                                          UserProfile
                                      WHERE firstName like '%${searchList}%' OR lastName like '%${searchList}%'
                                    `)
                                ]
                            }
                        }]
                }
            }

            const count = await Reviews.count({
                where: {
                    $and: [
                        { isAdmin: false },
                        keywordFilter
                    ]
                }
            });

            const results = await Reviews.findAll({
                where: {
                    $and: [
                        { isAdmin: false },
                        keywordFilter
                    ]
                },
                order: [['createdAt', 'DESC']],
                limit,
                offset,
            });

            return {
                results,
                count,
                status: 200
            };

        }
    }
}

export default getReviewsDetails;
