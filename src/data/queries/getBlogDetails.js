import {
    GraphQLInt as IntType
} from 'graphql';
import { BlogDetails } from '../models';
import BlogCommonType from '../types/BlogCommonType';

const getBlogDetails = {

    type: BlogCommonType,

    args: {
        currentPage: { type: IntType }
    },

    async resolve({ request }, { currentPage }) {
        try {

            let limit = 10, offset = 0;

            if (currentPage) offset = (currentPage - 1) * limit;

            const results = await BlogDetails.findAll({
                limit,
                offset,
                order: [['id', 'DESC']]
            });

            const count = await BlogDetails.count();

            return {
                results,
                count,
                status: 200
            };

        } catch (error) {
            return {
                status: 400
            }
        }
    }
};

export default getBlogDetails;

