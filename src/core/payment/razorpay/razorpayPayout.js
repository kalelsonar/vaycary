import { payment } from "../../../config"
import {
  CancellationDetails,
  Reservation,
  TransactionHistory,
} from "../../../data/models"
import showErrorMessage from "../../../helpers/showErrorMessage"
import { createTransactionHistory } from "../helpers/createTransactionHistory"
import { createFailedTransactionHistory } from "../payout/createFailedTransactionHistory"

const razorpayPayout = (app) => {
  app.post("/razorpay-payout", async function (req, res) {
    if (req.user && req.user.admin == true) {
      const reservationDetails = req.body.reservationDetails
      const credentials = btoa(
        `${payment.razorpay.key_id}:${payment.razorpay.key_secret}`
      )
      let destination, transfer_group, amount, reservationId, currency
      let status = 200,
        errorMessage,
        payout,
        userId,
        hostEmail,
        payoutId
      if (reservationDetails) {
        destination = reservationDetails.destination
        transfer_group = reservationDetails.transfer_group
        amount = reservationDetails.amount
        currency = reservationDetails.currency
        reservationId = reservationDetails.reservationId
        userId = reservationDetails.userId
        hostEmail = reservationDetails.hostEmail
        payoutId = reservationDetails.payoutId

        const transactionHistory = await TransactionHistory.findOne({
          where: {
            reservationId,
          },
        })
        if (transactionHistory) {
          status = 400
          errorMessage = "Invalid request"
        } else {
          const reservation = await Reservation.findOne({
            where: {
              id: reservationId,
            },
            raw: true,
          })

          if (reservation) {
            if (reservation.reservationState == "completed") {
              let reservationPayoutAmount =
                reservation.total - reservation.hostServiceFee

              amount <= reservationPayoutAmount.toFixed(2)
                ? (status = 200)
                : ((status = 400),
                  (errorMessage = await showErrorMessage({
                    errorCode: "requestError",
                  })))
            } else if (reservation.reservationState == "cancelled") {
              let cancelData = await CancellationDetails.findOne({
                where: {
                  reservationId,
                },
              })

              amount <= cancelData.payoutToHost.toFixed(2)
                ? (status = 200)
                : ((status = 400),
                  (errorMessage = await showErrorMessage({
                    errorCode: "requestError",
                  })))
            } else {
              status = 400
              errorMessage = await showErrorMessage({
                errorCode: "requestError",
              })
            }
          } else {
            status = 400
            errorMessage = await showErrorMessage({ errorCode: "requestError" })
          }
        }
      } else {
        status = 400
        errorMessage = await showErrorMessage({ errorCode: "commonError" })
      }

      if (status === 200) {
        try {
          const res = await fetch("https://api.razorpay.com/v1/payouts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify({
              account_number: payment.razorpay.x_customer_id, // razorpay x customer ac no.
              fund_account_id: destination,
              amount: Math.round(amount * 100),
              currency: "INR",
              mode: "NEFT",
              purpose: "payout",
              queue_if_low_balance: true,
              reference_id: `vaycray reservationId ${reservationId}`,
              narration: "Vaycray Host Payout",
              notes: {
                hostEmail: hostEmail,
              },
            }),
          })

          payout = await res.json()
          if (!payout.id) {
            status = 400
            errorMessage = payout.error.description
          }
        } catch (error) {
          status = 400
          errorMessage = await showErrorMessage({
            errorCode: "catchError",
            error: error.message,
          })
        }
      }

      if (status === 200 && payout && "id" in payout) {
        await createTransactionHistory(
          reservationDetails.reservationId,
          hostEmail,
          payoutId,
          payout.id,
          reservationDetails.amount,
          reservationDetails.currency,
          userId,
          3
        )
      } else {
        await createFailedTransactionHistory(
          reservationDetails.reservationId,
          userId,
          reservationDetails.amount,
          reservationDetails.currency,
          errorMessage,
          3
        )
      }
      res.send({ status, errorMessage })
    } else {
      return res.send({
        status: 400,
        errorMessage: await showErrorMessage({ errorCode: "authUser" }),
      })
    }
  })
}

export default razorpayPayout
