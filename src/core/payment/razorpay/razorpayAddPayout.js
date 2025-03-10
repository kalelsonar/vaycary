import { payment } from "../../../config"

const razorpayAddPayout = (app) => {
  app.post("/razorpay-add-payout", async function (req, res) {
    const { userDetails, bankDetails } = req.body
    let status = 200,
      accountId,
      contactId,
      errorMessage

    const credentials = btoa(
      `${payment.razorpay.key_id}:${payment.razorpay.key_secret}`
    )

    try {
      const resp = await fetch("https://api.razorpay.com/v1/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          name: userDetails.name,
          email: userDetails.email,
          // contact: "9000090000",
          type: "vendor",
          reference_id: userDetails.userId,
          // notes: {
          //   notes_key_1: "Tea, Earl Grey, Hot",
          //   notes_key_2: "Tea, Earl Grey… decaf.",
          // },
        }),
      })
      const contact = await resp.json()
      if (!contact || !contact.id) {
        status = 400
        errorMessage = "Error creating contact"
      }

      contactId = contact.id
    } catch (error) {
      status = 400
      errorMessage = error.message
    }

    if (status === 200) {
      try {
        const fa_resp = await fetch(
          "https://api.razorpay.com/v1/fund_accounts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify({
              contact_id: contactId,
              account_type: "bank_account",
              bank_account: {
                name: userDetails.name,
                ifsc: bankDetails.ifsc,
                account_number: bankDetails.accountNumber,
              },
            }),
          }
        )
        const fa = await fa_resp.json()

        if (!fa || !fa.id) {
          status = 400
          errorMessage = fa?.error?.description || "Error creating fund account"
        }
        accountId = fa.id
      } catch (error) {
        status = 400
        errorMessage = error.message
      }
    }
    res.send({ status, errorMessage, accountId })
  })
}

export default razorpayAddPayout
