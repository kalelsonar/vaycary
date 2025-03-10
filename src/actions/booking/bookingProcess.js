import { gql } from "react-apollo"

import history from "../../core/history"
import {
  BOOKING_PROCESS_START,
  BOOKING_PROCESS_SUCCESS,
  BOOKING_PROCESS_ERROR,
} from "../../constants"
import getPaymentMethodsQuery from "../../components/Payout/PayoutForm/getPaymentMethods.graphql"

export function bookingProcess(
  listId,
  guests,
  startDate,
  endDate,
  preApprove,
  restrictEdit,
  threadId
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: BOOKING_PROCESS_START,
      payload: {
        bookingLoading: true,
      },
    })

    try {
      let query = gql`
        query UserListing($listId: String!) {
          UserListing(listId: $listId) {
            id
            userId
            title
            coverPhoto
            country
            city
            state
            personCapacity
            bookingType
            reviewsCount
            reviewsStarRating
            beds
            listPhotos {
              id
              name
            }
            user {
              id
              email
              profile {
                profileId
                displayName
                firstName
                picture
              }
            }
            settingsData {
              id
              settingsId
              listsettings {
                id
                itemName
                settingsType {
                  typeName
                }
              }
            }
            houseRules {
              houseRulesId
              listsettings {
                itemName
                isEnable
                settingsType {
                  typeName
                }
              }
            }
            listingData {
              checkInStart
              checkInEnd
              basePrice
              cleaningPrice
              tax
              currency
              weeklyDiscount
              monthlyDiscount
              taxRate
              cancellation {
                id
                policyName
                policyContent
              }
            }
            listBlockedPrice {
              id
              listId
              isSpecialPrice
              blockedDates
            }
          }
        }
      `

      const { data } = await client.query({
        query,
        variables: {
          listId,
        },
      })

      let payPalPayment = false,
        razorpayPayment = false
      const getPaymentMethods = await client.query({
        query: getPaymentMethodsQuery,
        fetchPolicy: "network-only",
      })

      getPaymentMethods?.data?.getPaymentMethods &&
        getPaymentMethods?.data?.getPaymentMethods?.results &&
        getPaymentMethods?.data?.getPaymentMethods?.results?.length > 0 &&
        getPaymentMethods?.data?.getPaymentMethods?.results.forEach(
          (item, index) => {
            console.log({ item })
            if (item.isEnable && item.id == 1) payPalPayment = true

            if (item.isEnable && item.id == 3) razorpayPayment = true
          }
        )

      if (data?.UserListing) {
        dispatch({
          type: BOOKING_PROCESS_SUCCESS,
          payload: {
            data: data?.UserListing,
            bookDetails: {
              guests,
              startDate,
              endDate,
              preApprove,
              threadId,
            },
            bookingLoading: false,
            payPalPayment,
            razorpayPayment,
            restrictEdit,
          },
        })
        history.push("/book/" + listId)
      }
    } catch (error) {
      dispatch({
        type: BOOKING_PROCESS_ERROR,
        payload: {
          error,
          bookingLoading: false,
        },
      })
      return false
    }

    return true
  }
}
