import {
    ON_CHANGE_LISTING_START
} from '../constants';
export default function onChangeListing(state = {}, action) {
    switch (action.type) {
        case ON_CHANGE_LISTING_START:
            return {
                ...state,
                listId: action.listId,
                startDate: action.startDate,
                endDate: action.endDate,
                order: action.order,
                payoutId: action.payoutId
            };

        default:
            return {
                ...state,
            };
    }
}
