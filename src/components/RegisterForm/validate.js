import messages from '../../locale/messages';
import { inputTextLimit } from '../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.firstName) {
    errors.firstName = messages.required;
  } else if (values.firstName.trim() == "") {
    errors.firstName = messages.required;
  } else if (values?.firstName?.length > inputTextLimit) {
    errors.firstName = messages.inputFieldRestriction;
  }

  if (!values.lastName) {
    errors.lastName = messages.required;
  } else if (values.lastName.trim() == "") {
    errors.lastName = messages.required;
  } else if (values?.lastName?.length > inputTextLimit) {
    errors.lastName = messages.inputFieldRestriction;
  }

  if (!values.email) {
    errors.email = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.password) {
    errors.password = messages.required;
  } else if (values.password.length < 8) {
    errors.password = messages.passwordInvalid;
  } else if (values?.password?.length > inputTextLimit) {
    errors.password = messages.inputFieldRestriction;
  }

  return errors
}

export default validate
