import { blockDates } from "./blockDates"
import { createThread } from "./createThread"
import { createTransaction } from "./createTransaction"
import { emailBroadcast } from "./email"
import { updateReservation } from "./updateReservation"

const updateRzpPaymentData = async (
  reservationDetails,
  razorpayOrderId,
  customerId,
  paymentId
) => {
  try {
    await updateReservation(reservationDetails.reservationId, razorpayOrderId)
    await createThread(reservationDetails.reservationId)
    await blockDates(reservationDetails.reservationId)
    await createTransaction({
      reservationId: reservationDetails.reservationId,
      payerEmail: reservationDetails.guestEmail,
      payerId: customerId,
      transactionId: paymentId,
      total: reservationDetails.amount,
      currency: reservationDetails.currency,
      paymentType: "booking",
      paymentMethodId: 3,
    })
    emailBroadcast(reservationDetails.reservationId)
    return true
  } catch (error) {
    return false
  }
}

export { updateRzpPaymentData }
