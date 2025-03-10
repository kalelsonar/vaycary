import { Reservation } from "../../../data/models"

export async function updateReservation(id, razorpayOrderId) {
  const reservation = await Reservation.update(
    {
      paymentState: "completed",
      razorpayOrderId: razorpayOrderId,
    },
    {
      where: {
        id,
      },
    }
  )

  return {
    status: reservation ? "updated" : "failed to update the reservation",
  }
}
