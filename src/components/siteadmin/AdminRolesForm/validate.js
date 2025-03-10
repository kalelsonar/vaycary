import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.name) {
    errors.name = messages.required;
  } else if (values.name && values.name.toString().trim() == "") {
    errors.name = messages.required;
  } else if (values.name && values.name.length > inputTextLimit) {
    errors.name = messages.inputFieldRestriction;
  }

  if (values.description && values.description.toString().trim() == "") {
    errors.description = messages.required;
  } else if (values?.description?.length > inputDescLimit) {
    errors.description = messages.descriptionFieldRestriction;
  }

  if (!values.privileges || (values.privileges && values.privileges.length <= 0)) {
    errors.privileges = messages.required;
  }

  return errors
}

export default validate
