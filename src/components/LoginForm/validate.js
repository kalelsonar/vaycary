import messages from '../../locale/messages';
import { inputTextLimit } from '../../helpers/textRestriction';

const validate = (values) => {
  const errors = {};

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

  return errors;
};

export default validate;
