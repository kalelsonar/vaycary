import WhyHostBlockType from '../../types/WhyHostBlockType';
import { WhyHostInfoBlock } from '../../models'

import {
    GraphQLString as StringType
} from 'graphql';

const removeWhyHostImages = {

    type: WhyHostBlockType,

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, {
        name
    }) {

        if (request.user && request.user.admin == true) {
            let isWhyHostBlockUpdated = false;

            const updatehostBannerImage1 = await WhyHostInfoBlock.update(
                { value: null },
                { where: { name: name } })
                .then(function (instance) {
                    if (instance > 0) {
                        isWhyHostBlockUpdated = true;
                    } else {
                        isWhyHostBlockUpdated = false;
                    }
                });

            return {
                status: isWhyHostBlockUpdated ? 200 : 400
            }


        } else {
            return {
                status: 400
            }
        }

    },
};

export default removeWhyHostImages;
