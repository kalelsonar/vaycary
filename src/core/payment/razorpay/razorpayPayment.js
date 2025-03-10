import Razorpay from "razorpay"
import { payment } from "../../../config"
import showErrorMessage from "../../../helpers/showErrorMessage"
import { getCustomer } from "../helpers/getCustomer"
import { updateUserProfile } from "../helpers/updateUserProfile"
import { updateRzpPaymentData } from "../helpers/razorpayHelper"

const razorpay = new Razorpay({
  key_id: payment.razorpay.key_id,
  key_secret: payment.razorpay.key_secret,
})

const razorpayPayment = (app) => {
  app.post("/razorpay-reservation", async function (req, res) {
    const reservationDetails = req?.body?.reservationDetails
    let createCustomer,
      status = 200,
      errorMessage,
      customer,
      customerId

    if (reservationDetails) {
      customer = await getCustomer(reservationDetails.guestId)
      customerId = customer?.rzpCustId
    } else {
      status = 400
      errorMessage = await showErrorMessage({ errorCode: "commonError" })
    }

    if (!customerId && status === 200) {
      try {
        createCustomer = await razorpay.customers.create({
          email: reservationDetails.guestEmail,
        })

        customerId = createCustomer.id

        await updateUserProfile(reservationDetails.guestId, customerId)
      } catch (error) {
        status = 400
        errorMessage = error.message
      }
    }
    let rzpOrder

    if (status === 200) {
      try {
        rzpOrder = await razorpay.orders.create({
          amount: reservationDetails.amount * 100,
          currency: "INR",
          customer_id: customerId,
          payment: {
            capture: "manual",
            capture_options: {
              refund_speed: "normal",
              manual_expiry_period: 1440,
            },
          },
          payment_capture: false,
          receipt: reservationDetails.reservationId.toString(),
          notes: {
            reservationId: reservationDetails.reservationId,
            description: `Reservation from the Web - Booking ID: ${reservationDetails.reservationId}`,
          },
        })

        if (rzpOrder && rzpOrder.status === "created") {
          status = 200
        } else {
          status = 400
        }
      } catch (error) {
        status = 400
        errorMessage = error.message
      }
    }

    res.send({ status, errorMessage, rzpOrder, customerId, customer })
  })

  app.post("/rzp-update-paymentData", async function (req, res) {
    const { reservationDetails, orderId, paymentId, customerId } = req.body
    let status = 200,
      errorMessage
    try {
      const result = await updateRzpPaymentData(
        reservationDetails,
        orderId,
        customerId,
        paymentId
      )
      if (!result) {
        status = 400
        errorMessage = "Error updating payment data"
      }
    } catch (error) {
      status = 400
      errorMessage = error.message
    }

    res.send({ status, errorMessage })
  })
}

export default razorpayPayment
