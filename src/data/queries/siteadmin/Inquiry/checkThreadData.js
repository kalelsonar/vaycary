// For sequelize functions
import sequelize from '../../../sequelize';
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';
import { ThreadItems } from '../../../models';
import { InquiryType } from '../../../types/ThreadItemsType';

const checkThreadData = {

    type: InquiryType,

    args: {
        threadId: { type: IntType }
    },

    async resolve({ request }, { threadId }) {
        if (request.user.admin) {
            const data = await ThreadItems.findOne({
                attributes: ['type'],
                where: {
                    threadId
                },
                order: [['createdAt', 'DESC']],
                raw: true
            });

            return { status: data?.type == 'inquiry' ? "200" : "400" };
        }
    }
};

export default checkThreadData;