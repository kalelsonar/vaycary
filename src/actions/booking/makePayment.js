import { gql } from "react-apollo"
import {
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR,
} from "../../constants"
import { sendPayment } from "../../core/payment/sendPayment"
import { convert } from "../../helpers/currencyConvertion"
import showToaster from "../../helpers/showToaster"
import { processRazorpayPayment } from "../../core/payment/razorpay/processRazorpayPayment"

export function makePayment(
  listId,
  title,
  hostId,
  guestId,
  checkIn,
  checkOut,
  guests,
  message,
  basePrice,
  cleaningPrice,
  taxPrice,
  currency,
  discount,
  discountType,
  guestServiceFee,
  hostServiceFee,
  total,
  bookingType,
  paymentCurrency,
  paymentType,
  guestEmail,
  specialPricing,
  isSpecialPriceAssigned,
  isSpecialPriceAverage,
  dayDifference,
  paymentMethodId,
  taxRate,
  checkInStart,
  checkInEnd,
  hostServiceFeeType,
  hostServiceFeeValue,
  threadId
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: BOOKING_PAYMENT_START,
      payload: {
        paymentLoading: true,
      },
    })

    try {
      const mutation = gql`
        mutation createReservation(
          $listId: Int!
          $hostId: String!
          $guestId: String!
          $checkIn: String!
          $checkOut: String!
          $guests: Int!
          $message: String!
          $basePrice: Float!
          $cleaningPrice: Float
          $taxPrice: Float
          $currency: String!
          $discount: Float
          $discountType: String
          $guestServiceFee: Float
          $hostServiceFee: Float
          $total: Float!
          $bookingType: String
          $paymentType: Int!
          $cancellationPolicy: Int!
          $specialPricing: String
          $isSpecialPriceAssigned: Boolean
          $isSpecialPriceAverage: Float
          $dayDifference: Float
          $taxRate: Float
          $checkInStart: String
          $checkInEnd: String
          $hostServiceFeeType: String
          $hostServiceFeeValue: Float
          $threadId: Int
        ) {
          createReservation(
            listId: $listId
            hostId: $hostId
            guestId: $guestId
            checkIn: $checkIn
            checkOut: $checkOut
            guests: $guests
            message: $message
            basePrice: $basePrice
            cleaningPrice: $cleaningPrice
            taxPrice: $taxPrice
            currency: $currency
            discount: $discount
            discountType: $discountType
            guestServiceFee: $guestServiceFee
            hostServiceFee: $hostServiceFee
            total: $total
            bookingType: $bookingType
            paymentType: $paymentType
            cancellationPolicy: $cancellationPolicy
            specialPricing: $specialPricing
            isSpecialPriceAssigned: $isSpecialPriceAssigned
            isSpecialPriceAverage: $isSpecialPriceAverage
            dayDifference: $dayDifference
            taxRate: $taxRate
            checkInStart: $checkInStart
            checkInEnd: $checkInEnd
            hostServiceFeeType: $hostServiceFeeType
            hostServiceFeeValue: $hostServiceFeeValue
            threadId: $threadId
          ) {
            id
            listId
            hostId
            guestId
            checkIn
            checkOut
            guests
            message
            basePrice
            cleaningPrice
            taxPrice
            currency
            discount
            discountType
            guestServiceFee
            hostServiceFee
            total
            confirmationCode
            createdAt
            status
            paymentMethodId
            cancellationPolicy
            isSpecialPriceAverage
            dayDifference
            taxRate
            checkInStart
            checkInEnd
            hostServiceFeeType
            hostServiceFeeValue
          }
        }
      `

      let preApprove = getState().book.bookDetails.preApprove,
        bookingTypeData,
        cancellationPolicy = getState().book.data.listingData.cancellation.id

      bookingTypeData = preApprove === true ? "instant" : bookingType

      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
          hostId,
          guestId,
          checkIn,
          checkOut,
          guests,
          message,
          basePrice,
          cleaningPrice,
          taxPrice,
          currency,
          discount,
          discountType,
          guestServiceFee,
          hostServiceFee,
          total,
          bookingType: bookingTypeData,
          paymentType,
          cancellationPolicy,
          specialPricing,
          isSpecialPriceAssigned,
          isSpecialPriceAverage,
          dayDifference,
          taxRate,
          checkInStart,
          checkInEnd,
          hostServiceFeeType,
          hostServiceFeeValue,
          threadId,
        },
      })

      if (data?.createReservation) {
        let reservationId = data?.createReservation.id,
          amount = total + guestServiceFee,
          rates = getState().currency.rates
        let isAmount = 0
        let baseCurrency = getState().currency.base,
          convertedAmount = 0,
          overAllAmount = amount && amount.toString().split(".")

        if (overAllAmount && overAllAmount[1] == "00") {
          isAmount = overAllAmount && overAllAmount[0]
        } else {
          isAmount = amount
        }

        if (paymentType == 1) {
          convertedAmount = convert(
            baseCurrency,
            rates,
            isAmount,
            currency,
            paymentCurrency
          )
          const { status, errorMessage } = await sendPayment(
            reservationId,
            convertedAmount.toFixed(2),
            paymentCurrency,
            title
          )

          if (status === 200) {
            await dispatch({
              type: BOOKING_PAYMENT_SUCCESS,
              payload: { paymentLoading: true },
            })
          } else {
            if (status === 422) {
              showToaster({ messageId: "paypalError", toasterType: "error" })
            } else {
              errorMessage
                ? showToaster({
                    messageId: "commonError",
                    toasterType: "error",
                    requestContent: errorMessage,
                  })
                : ""
            }
            await dispatch({
              type: BOOKING_PAYMENT_ERROR,
              payload: { paymentLoading: false },
            })
          }
        } else {
          let reservationDetails = {
            reservationId,
            listId,
            hostId,
            guestId,
            guestEmail,
            title,
            amount,
            currency,
          }
          const { status, errorMessage, rzpOrder } =
            await processRazorpayPayment("reservation", reservationDetails)

          if (status === 200) {
            await dispatch({
              type: BOOKING_PAYMENT_SUCCESS,
              payload: { paymentLoading: true },
            })

            return {
              status,
            }
          } else {
            errorMessage
              ? showToaster({
                  messageId: "commonError",
                  toasterType: "error",
                  requestContent: errorMessage,
                })
              : ""
            await dispatch({
              type: BOOKING_PAYMENT_ERROR,
              payload: { paymentLoading: false },
            })
            return {
              status,
              reservationId,
              rzpOrderId: rzpOrder.id,
            }
          }
        }
      }
    } catch (error) {
      dispatch({
        type: BOOKING_PAYMENT_ERROR,
        payload: {
          error,
          paymentLoading: false,
        },
      })
      return false
    }

    return true
  }
}
