import messages from '../../../locale/messages';
import { inputTextLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  console.log(values, "values")

  if (!values.address1 || (values.address1 && values.address1.toString().trim() == '')) {
    errors.address1 = messages.required;
  } else if (values?.address1?.length > inputTextLimit) {
    errors.address1 = messages.inputFieldRestriction;
  }

  if (values?.address2?.length > inputTextLimit) {
    errors.address2 = messages.inputFieldRestriction;
  }

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.city || (values.city && values.city.toString().trim() == '')) {
    errors.city = messages.required;
  } else if (values?.city?.length > inputTextLimit) {
    errors.city = messages.inputFieldRestriction;
  }

  if (!values.state || (values.state && values.state.toString().trim() == '')) {
    errors.state = messages.required;
  } else if (values?.state?.length > inputTextLimit) {
    errors.state = messages.inputFieldRestriction;
  }


  if (!values.payEmail) {
    errors.payEmail = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.payEmail)) {
    errors.payEmail = messages.payoutError5;
  }

  if (!values.currency) {
    errors.currency = messages.required;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  } else if (values?.zipcode?.length > inputTextLimit) {
    errors.zipcode = messages.inputFieldRestriction;
  }

  return errors
}

export default validate;