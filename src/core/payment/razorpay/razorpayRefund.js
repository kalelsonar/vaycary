import { payment } from "../../../config"
import showErrorMessage from "../../../helpers/showErrorMessage"
import { createTransaction } from "../helpers/createTransaction"

const razorpayRefund = (app) => {
  app.post("/razorpay-refund", async function (req, res) {
    if (req.user && req.user.admin === true) {
      const { reservationDetails } = req.body

      let status = 200,
        errorMessage

      const { transactionId, amount } = reservationDetails

      const credentials = btoa(
        `${payment.razorpay.key_id}:${payment.razorpay.key_secret}`
      )

      if (transactionId && amount) {
        try {
          const resp = await fetch(
            `https://api.razorpay.com/v1/payments/${transactionId}/refund`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${credentials}`,
              },
              body: JSON.stringify({
                amount: amount * 100,
              }),
            }
          )

          const response = await resp.json()
          if (response.id) {
            await createTransaction({
              reservationId: reservationDetails.reservationId,
              payerEmail: null,
              payerId: null,
              transactionId: response.id,
              total: reservationDetails.amount,
              currency: reservationDetails.currency,
              paymentType: "cancellation",
              paymentMethodId: 3,
            })
          } else {
            status = 400
            errorMessage =
              response?.error?.description ||
              response?.message ||
              "Failed to create Refund"
          }
        } catch (error) {
          status = 400
          errorMessage = error.message
        }
      } else {
        status = 400
        errorMessage = await showErrorMessage({ errorCode: "commonError" })
      }
      return res.send({ status, errorMessage })
    } else {
      return res.send({
        status: 400,
        errorMessage: await showErrorMessage({ errorCode: "authUser" }),
      })
    }
  })
}

export default razorpayRefund
