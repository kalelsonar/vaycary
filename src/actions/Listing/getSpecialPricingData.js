import { gql } from 'react-apollo';
import moment from 'moment';

import {
    GET_LISTING_SPECIAL_PRICING_START,
    GET_LISTING_SPECIAL_PRICING_SUCCESS,
    GET_LISTING_SPECIAL_PRICING_ERROR,
    GET_LISTING_BLOCKED_DATES_START,
    GET_LISTING_BLOCKED_DATES_SUCCESS,
    GET_LISTING_BLOCKED_DATES_ERROR,
    GET_FULL_LISTING_BLOCKED_DATES_START,
    GET_FULL_LISTING_BLOCKED_DATES_SUCCESS,
    GET_FULL_LISTING_BLOCKED_DATES_ERROR,
} from '../../constants';

const query = gql`
    query (
        $listId:Int!,  
        $startDate: String!, 
        $endDate: String!
    ) {
        getSpecialPricing (
            listId:$listId, 
            startDate:$startDate, 
            endDate: $endDate
        ) {
            id
            listId
            blockedDates
            calendarStatus
            isSpecialPrice
            dayStatus
        }
    }
`;

const listBlockedDates = gql`query ListingBlockedDates ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
    id
    viewListBlockedDates {
        calendarId
        calendarStatus
        dayStatus
        blockedDates
        isSpecialPrice
      }
      fullBlockDates {
        calendarId
        calendarStatus
        dayStatus
        blockedDates
        isSpecialPrice
      }  
    }
  }
`;

export function getSpecialPricingData(listId, startDate, endDate) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_LISTING_SPECIAL_PRICING_START,
            payload: {
                isLoading: true,
                specialPricing: []
            }
        });

        try {
            // Send Request to get listing data
            const { data } = await client.query({
                query,
                variables: {
                    listId,
                    startDate,
                    endDate
                },
                fetchPolicy: 'network-only',
            });

            if (data && data.getSpecialPricing && data.getSpecialPricing.length > 0) {
                let convertedResponse = [];
             

                let specialPricingArray = [];
                specialPricingArray = data.getSpecialPricing;
                specialPricingArray.map((item) => {
                    if (item.calendarStatus === 'available') {
                        convertedResponse.push({
                            listId: item.listId,
                            blockedDates: moment(item.blockedDates)
                                .utc()
                                .format('MM/DD/YYYY'),
                            isSpecialPrice: item.isSpecialPrice,
                            dayStatus: item.dayStatus
                        });
                    }
                });

                // remove duplicates dates
                convertedResponse = convertedResponse.reduce((data, o) => {
                    if (
                        !data.some(
                            (obj) =>
                                moment(obj.blockedDates).format('YYYY-MM-DD') ===
                                moment(o.blockedDates).format('YYYY-MM-DD')
                        )
                    ) {
                        data.push(o);
                    }
                    return data;
                }, []);

                dispatch({
                    type: GET_LISTING_SPECIAL_PRICING_SUCCESS,
                    payload: {
                        // specialPricing: data.getSpecialPricing,
                        specialPricing: convertedResponse ? convertedResponse : [],
                        isLoading: false,
                    }
                });
            } else {
                dispatch({
                    type: GET_LISTING_SPECIAL_PRICING_ERROR,
                    payload: {
                        specialPricing: [],
                        isLoading: false,
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: GET_LISTING_SPECIAL_PRICING_ERROR,
                payload: {
                    error,
                    isLoading: false,
                },
            });
            return false;
        }

        return true;
    };
}

export function getListBlockedDates(listId, preview) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_LISTING_BLOCKED_DATES_START,
            payload: {
                isListBlocked: []
            }
        });

        try {
            // Send Request to get listing data
            const { data } = await client.query({
                query: listBlockedDates,
                variables: {
                    listId,
                    preview
                },
                fetchPolicy: 'network-only',
            });


            if (data && data.UserListing && data.UserListing.viewListBlockedDates && data.UserListing.viewListBlockedDates.length > 0) {
                dispatch({
                    type: GET_LISTING_BLOCKED_DATES_SUCCESS,
                    payload: {
                        isListBlocked: data.UserListing.viewListBlockedDates
                    }
                });
            } else {
                dispatch({
                    type: GET_LISTING_BLOCKED_DATES_ERROR,
                    payload: {
                        isListBlocked: [],
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: GET_LISTING_BLOCKED_DATES_ERROR,
                payload: {
                    error
                },
            });
            return false;
        }

        return true;
    };
}

export function getFullBlockDates(listId, preview) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: GET_FULL_LISTING_BLOCKED_DATES_START,
            payload: {
                isFullDayBlock: []
            }
        });

        try {
            // Send Request to get listing data
            const { data } = await client.query({
                query: listBlockedDates,
                variables: {
                    listId,
                    preview
                },
                fetchPolicy: 'network-only',
            });


            if (data && data.UserListing && data.UserListing.fullBlockDates && data.UserListing.fullBlockDates.length > 0) {
                dispatch({
                    type: GET_FULL_LISTING_BLOCKED_DATES_SUCCESS,
                    payload: {
                        isFullDayBlock: data.UserListing.fullBlockDates
                    }
                });
            } else {
                dispatch({
                    type: GET_FULL_LISTING_BLOCKED_DATES_ERROR,
                    payload: {
                        isFullDayBlock: [],
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: GET_FULL_LISTING_BLOCKED_DATES_ERROR,
                payload: {
                    error
                },
            });
            return false;
        }

        return true;
    };
}
