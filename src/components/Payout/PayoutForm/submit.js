// Redux Form
import { reset } from "redux-form"

import { addPayout } from "../../../actions/Payout/addPayoutAction"

async function submit(values, dispatch) {
  let paymentType = values.methodId
  // PayPal
  let payEmail = paymentType == 1 ? values.payEmail : values.email

  let firstname = values.firstname
  let lastname = values.lastname
  let accountNumber = values.accountNumber
  let ifsc = values.ifsc
  let routingNumber = values.routingNumber
  let ssn4Digits = values.ssn4Digits
  let businessType = values.businessType

  dispatch(
    addPayout(
      values.methodId,
      payEmail,
      values.address1,
      values.address2,
      values.city,
      values.state,
      values.country,
      values.zipcode,
      values.currency,
      firstname,
      lastname,
      accountNumber,
      routingNumber,
      ssn4Digits,
      businessType,
      values.userId,
      values.accountToken,
      values.personToken,
      ifsc
    )
  )
  //dispatch(reset('PayoutForm'));
}

export default submit
