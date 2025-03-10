import {
    ON_CHANGE_LISTING_START
} from '../../constants';
export function onChangeListing({ listId, startDate, endDate, order, payoutId }) {
    return (dispatch, getState) => {
        dispatch({
            type: ON_CHANGE_LISTING_START,
            listId,
            startDate,
            endDate,
            order,
            payoutId,
        });
    };
}