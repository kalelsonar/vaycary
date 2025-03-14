// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ListCalendarPriceType from '../../types/ListCalendarPriceType';
import { ListBlockedDates } from '../../models';

const getSpecialPricing = {

    type: new List(ListCalendarPriceType),

    args: {
        listId: { type: new NonNull(IntType) },
        startDate: { type: new NonNull(StringType) },
        endDate: { type: new NonNull(StringType) },
    },

    async resolve({ request, response }, { listId, startDate, endDate }) {

        let convertStart = new Date(startDate);
        let convertEnd = new Date(endDate);
        convertStart.setHours(0, 0, 0, 0);
        convertEnd.setHours(23, 59, 59, 999);

        const listingSpecialPricingData = await ListBlockedDates.findAll({
            where: {
                listId,
                blockedDates: {
                    $between: [convertStart, convertEnd]
                },
                calendarStatus: 'available',
                dayStatus: {
                    $in: ['full', 'secondHalf']
                }
            },
            order: [['id', 'DESC']],
            raw: true
        });

        if (listingSpecialPricingData && listingSpecialPricingData.length > 0) {
            return listingSpecialPricingData;
        } else {
            return [];
        }
    }
};

export default getSpecialPricing;

/**
query($listId:Int!,  $startDate: String!, $endDate: String!) {
    getSpecialPricing (listId:$listId, startDate:$startDate, endDate: $endDate) {
      id
      listId
      blockedDate
      calendarStatus
      isSpecialPrice
    }
}
 */