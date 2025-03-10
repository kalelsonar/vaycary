import messages from '../../locale/messages';
import { inputDescLimit } from '../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.message) {
    errors.message = messages.required;
  } else if (values.message && values.message.toString().trim() == '') {
    errors.message = messages.required;
  } else if (values?.message?.length > inputDescLimit) {
    errors.message = messages.descriptionFieldRestriction;
  }

  return errors;
}

export default validate;