import {
    GraphQLInt as IntType,
} from 'graphql';
import { InquiryType } from '../../../types/ThreadItemsType';
import { ThreadItems } from '../../../models';

const viewInquiryAdmin = {

    type: InquiryType,

    args: {
        id: { type: IntType },
    },

    async resolve({ request }, { id }) {
        if (request.user.admin) {

            const inquiries = await ThreadItems.findOne({
                where: {
                    id
                },
                order: [['createdAt', 'DESC']],
                raw: true
            });

            if (inquiries) {
                return {
                    inquiries
                };
            }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    }
};

export default viewInquiryAdmin;