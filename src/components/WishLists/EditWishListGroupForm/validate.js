import messages from '../../../locale/messages';
import { inputTextLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.name) {
    errors.name = messages.required;
  } else if (values.name.trim() == "") {
    errors.name = messages.required;
  } else if (values.name && values.name.length > inputTextLimit) {
    errors.name = messages.inputFieldRestriction;
  }

  return errors
}

export default validate
