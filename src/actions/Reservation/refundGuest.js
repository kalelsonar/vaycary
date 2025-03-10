import {
  ADMIN_REFUND_GUEST_START,
  ADMIN_REFUND_GUEST_SUCCESS,
  ADMIN_REFUND_GUEST_ERROR,
} from "../../constants"
import { processRazorpayRefund } from "../../core/payment/razorpay/processRazorpayPayment"
import { refundToGuest } from "../../core/payment/refund/refundToGuest"
import { convert } from "../../helpers/currencyConvertion"
import showToaster from "../../helpers/showToaster"

export function refundGuest(
  reservationId,
  receiverEmail,
  receiverId,
  payerEmail,
  payerId,
  amount,
  currency,
  paymentCurrency,
  paymentMethodId,
  transactionId,
  changeState
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADMIN_REFUND_GUEST_START,
      payload: {
        refundLoading: true,
        reservationId,
      },
    })

    try {
      let rates = getState().currency.rates,
        baseCurrency = getState().currency.base,
        convertedAmount = 0
      if (paymentMethodId == 1) {
        // PayPal
        convertedAmount = convert(
          baseCurrency,
          rates,
          amount,
          currency,
          paymentCurrency
        )

        const { status, errorMessage } = await refundToGuest(
          reservationId,
          receiverEmail,
          receiverId,
          payerEmail,
          payerId,
          convertedAmount.toFixed(2),
          paymentCurrency,
          transactionId
        )

        if (status && status === "SUCCESS") {
          dispatch({
            type: ADMIN_REFUND_GUEST_SUCCESS,
            payload: {
              refundLoading: false,
              completed: true,
            },
          })
          if (changeState) changeState("successRefund", reservationId)
          showToaster({ messageId: "refundToGuest", toasterType: "success" })
        } else {
          if (errorMessage) {
            showToaster({
              messageId: "commonError",
              toasterType: "error",
              requestContent: errorMessage,
            })
          } else {
            showToaster({
              messageId: "refundToGuestError",
              toasterType: "error",
            })
          }
          dispatch({
            type: ADMIN_REFUND_GUEST_ERROR,
            payload: {
              refundLoading: false,
            },
          })
        }
      } else {
        //Razorpay
        let cardDetails = {}
        let reservationDetails = {
          reservationId,
          amount: amount.toFixed(2),
          currency,
          transactionId,
          payerEmail,
          customerId: receiverId,
        }

        const { status, errorMessage } = await processRazorpayRefund(
          reservationDetails
        )

        if (status === 200) {
          dispatch({
            type: ADMIN_REFUND_GUEST_SUCCESS,
            payload: {
              refundLoading: false,
              completed: true,
            },
          })
          if (changeState) changeState("successRefund", reservationId)

          showToaster({ messageId: "refundToGuest", toasterType: "success" })
        } else {
          showToaster({
            messageId: "commonError",
            toasterType: "error",
            requestContent: errorMessage,
          })
          dispatch({
            type: ADMIN_REFUND_GUEST_ERROR,
            payload: {
              refundLoading: false,
            },
          })
        }
      }
      if (changeState) changeState("removeRefund", reservationId)
    } catch (error) {
      dispatch({
        type: ADMIN_REFUND_GUEST_ERROR,
        payload: {
          error,
          refundLoading: false,
        },
      })
      if (changeState) changeState("removeRefund", reservationId)

      return false
    }

    return true
  }
}
