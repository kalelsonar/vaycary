export async function processRazorpayPayment(type, reservationDetails) {
  let URL,
    variables = {
      reservationDetails,
    }
  if (type === "reservation") {
    URL = "/razorpay-reservation"
  }
  const resp = await fetch(URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
    credentials: "include",
  })

  const { status, errorMessage, rzpOrder, customerId, customer } =
    await resp.json()

  if (status === 200) {
    const rzp = new Razorpay({
      key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
      amount: rzpOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Vaycray",
      description: rzpOrder.notes?.description,
      order_id: rzpOrder.id, // This is the order_id created in the backend
      handler: async (response) => {
        const paymentId = response.razorpay_payment_id
        const orderId = response.razorpay_order_id
        if (paymentId) {
          const res = await fetch("/rzp-update-paymentData", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reservationDetails,
              orderId,
              paymentId,
              customerId,
            }),
            credentials: "include",
          })
          const { status, errorMessage } = await res.json()
          if (status === 200) {
            const redirect =
              "/users/trips/itinerary/" + reservationDetails.reservationId
            window.location = redirect
          }
        } else {
          status = 400
          errorMessage = "Error Processing payment!"
        }
      },
      prefill: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: reservationDetails.guestEmail,
        contact: customer.phoneNumber,
      },
      theme: {
        color: "#FF5483",
      },
    })
    rzp.open()
  }
  // if (status === 200 && redirect) {
  //   window.location = redirect
  // }
  return {
    status,
    errorMessage,
    rzpOrder,
  }
}

export async function addRazorpayBankPayout(userDetails, bankDetails) {
  const URL = "/razorpay-add-payout"
  const resp = await fetch(URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userDetails,
      bankDetails,
    }),
    credentials: "include",
  })

  const { status, accountId, errorMessage } = await resp.json()

  return { status, accountId, errorMessage }
}

export async function processRazorpayRefund(reservationDetails) {
  const resp = await fetch("/razorpay-refund", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reservationDetails,
    }),
    credentials: "include",
  })

  const { status, errorMessage } = await resp.json()

  return { status, errorMessage }
}

export async function processRazorpayPayout(reservationDetails) {
  const resp = await fetch("/razorpay-payout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reservationDetails,
    }),
    credentials: "include",
  })

  const { status, errorMessage } = await resp.json()

  return { status, errorMessage }
}
