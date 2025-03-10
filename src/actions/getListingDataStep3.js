import { gql } from 'react-apollo';
import moment from 'moment';
import {
  GET_LISTING_DATA_STEP3_START,
  GET_LISTING_DATA_STEP3_SUCCESS,
  GET_LISTING_DATA_STEP3_ERROR
} from '../constants';

import { initialize, change } from 'redux-form';

const query = gql`
  query ($listId:String!, $preview: Boolean) {
    UserListing (listId:$listId, preview: $preview) {
      id
      userId
      bookingType
      isPublished
      listApprovalStatus
      houseRules {
        houseRulesId
      }
      listingData {
        bookingNoticeTime,
        checkInStart,
        checkInEnd,
        maxDaysNotice,
        minNight,
        maxNight,
        basePrice,
        cleaningPrice,
        tax,
        currency,
        weeklyDiscount,
        monthlyDiscount,
        cancellationPolicy,
        taxRate
      }
      blockedDates {
        blockedDates
        reservationId
        calendarStatus
        isSpecialPrice
        dayStatus
      }
      calendars {
        id
        name
        url
        listId
        status
      }
      listBlockedPrice {
          listId
          calendarStatus
          isSpecialPrice
          blockedDates
          calendarId
          reservationId
          dayStatus
      }
    }
  }
`;

export function getListingDataStep3(listId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_LISTING_DATA_STEP3_START,
    });

    try {
      let formValues = null, settingFieldsData = {}, listData = {}, calendars = {}, updatedAvailableDatesPrices = [];
      const houseRules = [], updatedBlockedDates = [], updatedDisabledDates = [], updatedAvailableDates = [], firstHalfBlocked = [];
      const secondHalfBlocked = [], firstHalfAvailable = [], secondHalfAvailable = [], firstHalfDisabled = [], secondHalfDisabled = [], fullBlockedDates = [];

      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, preview: true },
        fetchPolicy: 'network-only',
      });


      if (data?.UserListing) {
        // Preparing List data
        listData = data?.UserListing?.listingData;
        calendars = data?.UserListing?.calendars;

        // Preparing for house rules
        if (data?.UserListing?.houseRules?.length > 0) {
          data?.UserListing?.houseRules?.map((item, value) => {
            houseRules.push(parseInt(item?.houseRulesId));
          });
          settingFieldsData = Object.assign({}, listData, { houseRules });
        }

        // Preparing for blocked dates
        if (data?.UserListing?.blockedDates?.length > 0) {

          const todayDate = moment.utc(new Date()).format('YYYY-MM-DD');
          data?.UserListing?.blockedDates?.map((item, value) => {
            const itemDate = moment.utc(item?.blockedDates).format('YYYY-MM-DD');
            const newItemDate = new Date(
              moment.utc(new Date(item?.blockedDates)).format('l LT')
            );
            if (itemDate >= todayDate) {
              if (item?.reservationId) {
                updatedDisabledDates.push(newItemDate);
                if (item?.dayStatus === 'firstHalf') {
                  firstHalfDisabled.push(newItemDate);
                } else if (item?.dayStatus === 'secondHalf') {
                  secondHalfDisabled.push(newItemDate);
                } else if (item?.reservationId && (item?.dayStatus !== 'firstHalf' || item?.dayStatus !== 'secondHalf')) {
                  fullBlockedDates.push(newItemDate);
                }
              }
              if (item?.calendarStatus === 'available') {
                updatedAvailableDates.push(newItemDate);
                updatedAvailableDatesPrices.push({
                  date: newItemDate,
                  isSpecialPrice: item?.isSpecialPrice,
                });
                if (item?.dayStatus === 'firstHalf') {
                  firstHalfAvailable.push(newItemDate);
                } else if (item?.dayStatus === 'secondHalf') {
                  secondHalfAvailable.push(newItemDate);
                }
 
              }
              if (item?.calendarStatus && item?.calendarStatus === 'blocked' && !item.reservationId) {
                updatedBlockedDates.push(newItemDate);
                if (item?.dayStatus === 'firstHalf') {
                  firstHalfBlocked.push(newItemDate);
                } else if (item?.dayStatus === 'secondHalf') {
                  secondHalfBlocked.push(newItemDate);
                }
              }
            }
          });

          updatedAvailableDatesPrices = updatedAvailableDatesPrices.reduce(
            (data, o) => {
              if (
                !data.some(
                  (obj) =>
                    moment(obj.date).format('YYYY-MM-DD') ===
                    moment(o.date).format('YYYY-MM-DD')
                )
              ) {
                data.push(o);
              }
              return data;
            },
            []
          );
          settingFieldsData = {
            ...listData,
            ...settingFieldsData,
            disabledDates: updatedDisabledDates,
            blockedDates: updatedBlockedDates,
            availableDates: updatedAvailableDates,
            availableDatesPrices: updatedAvailableDatesPrices,
            halfDates: {
              firstHalfAvailable,
              secondHalfAvailable,
              firstHalfBlocked,
              secondHalfBlocked,
              firstHalfDisabled,
              secondHalfDisabled,
            },
            fullBlockedDates,
          };
        }

        await dispatch(change('ListPlaceStep3', 'calendars', calendars));
        if (updatedBlockedDates) {
          await dispatch(change('ListPlaceStep3', 'blockedDates', updatedBlockedDates));
        } else if (updatedAvailableDates) {
          await dispatch(change('ListPlaceStep3', 'blockedDates', updatedAvailableDates));
        } else if (updatedAvailableDatesPrices) {
          await dispatch(change('ListPlaceStep3', 'blockedDates', updatedAvailableDatesPrices));
        }

        formValues = Object.assign({}, data.UserListing, settingFieldsData, listData, calendars);

        // Reinitialize the form values
        await dispatch(initialize('ListPlaceStep3', formValues));

        // Dispatch a success action
        dispatch({
          type: GET_LISTING_DATA_STEP3_SUCCESS,
          step3DataIsLoaded: true,
          isExistingList: true,
          calendars: data.UserListing.calendars
        });
      } else {
        dispatch({
          type: GET_LISTING_DATA_STEP3_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LISTING_DATA_STEP3_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
