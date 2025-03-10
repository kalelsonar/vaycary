import {
  ADMIN_PAYOUT_HOST_START,
  ADMIN_PAYOUT_HOST_SUCCESS,
  ADMIN_PAYOUT_HOST_ERROR,
} from "../../constants"
import { sendPaymentToHost } from "../../core/payment/payout/sendPaymentToHost"
import { processRazorpayPayout } from "../../core/payment/razorpay/processRazorpayPayment"
import { convert } from "../../helpers/currencyConvertion"
import showToaster from "../../helpers/showToaster"

export function payoutHost(
  reservationId,
  destination,
  payoutId,
  amount,
  currency,
  paymentCurrency,
  userId,
  paymentMethodId,
  hostEmail,
  changeState
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADMIN_PAYOUT_HOST_START,
      payload: {
        loading: true,
        reservationId,
      },
    })

    try {
      let rates = getState().currency.rates
      let baseCurrency = getState().currency.base
      let convertedAmount = convert(
        baseCurrency,
        rates,
        amount,
        currency,
        paymentCurrency
      )
      if (paymentMethodId == 1) {
        // Pay Pal
        const { status, errorMessage } = await sendPaymentToHost(
          reservationId,
          destination,
          payoutId,
          convertedAmount.toFixed(2),
          paymentCurrency,
          userId,
          paymentMethodId
        )

        if (status && (status === "SUCCESS" || status === "PENDING")) {
          dispatch({
            type: ADMIN_PAYOUT_HOST_SUCCESS,
            payload: {
              loading: false,
              completed: true,
            },
          })
          if (changeState) changeState("successPayout", reservationId)
          showToaster({ messageId: "paymentToHost", toasterType: "success" })
        } else {
          if (errorMessage) {
            showToaster({
              messageId: "commonError",
              toasterType: "error",
              requestContent: errorMessage,
            })
          } else {
            showToaster({
              messageId: "paymentToHostError",
              toasterType: "error",
            })
          }
          dispatch({
            type: ADMIN_PAYOUT_HOST_ERROR,
            payload: {
              loading: false,
            },
          })
        }
      } else {
        // Razorpay
        let reservationDetails = {
          reservationId,
          amount: convertedAmount.toFixed(2),
          currency: paymentCurrency,
          hostEmail,
          payoutId,
          userId,
          destination,
          transfer_group: "Payout to Host",
        }
        const { status, errorMessage } = await processRazorpayPayout(
          reservationDetails
        )

        if (status && status === 200) {
          dispatch({
            type: ADMIN_PAYOUT_HOST_SUCCESS,
            payload: {
              loading: false,
              completed: true,
            },
          })
          if (changeState) changeState("successPayout", reservationId)
          showToaster({ messageId: "paymentToHost", toasterType: "success" })
        } else {
          showToaster({
            messageId: "commonError",
            toasterType: "error",
            requestContent: errorMessage,
          })
          dispatch({
            type: ADMIN_PAYOUT_HOST_ERROR,
            payload: {
              loading: false,
            },
          })
        }
      }
      if (changeState) changeState("removePayout", reservationId)
    } catch (error) {
      dispatch({
        type: ADMIN_PAYOUT_HOST_ERROR,
        payload: {
          error,
          loading: false,
        },
      })
      if (changeState) changeState("removePayout", reservationId)
      return false
    }

    return true
  }
}
