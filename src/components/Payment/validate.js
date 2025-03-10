import { inputDescLimit } from "../../helpers/textRestriction";
import messages from "../../locale/messages";

const validate = values => {

  const errors = {}

  if (!values.message) {
    errors.message = messages.required;
  } else if (values?.message?.length > inputDescLimit) {
    errors.message = messages.descriptionFieldRestriction;
  }

  if (!values.paymentCurrency) {
    errors.paymentCurrency = messages.required;
  }

  return errors;
}

export default validate;