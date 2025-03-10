import messages from '../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../helpers/textRestriction';

const validateStep2 = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  } else if (values.title && values.title.trim() == "") {
    errors.title = messages.required;
  } else if (values?.title?.length > inputTextLimit) {
    errors.title = messages.inputFieldRestriction;
  }

  if (!values.description) {
    errors.description = messages.required;
  } else if (values.description && values.description.trim() == "") {
    errors.description = messages.required;
  } else if (values?.description?.length > inputDescLimit) {
    errors.description = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validateStep2
