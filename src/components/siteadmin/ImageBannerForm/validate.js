import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  } else if (values.title && values.title.toString().trim() == '') {
    errors.title = messages.required;
  } else if (values?.title?.length > inputTextLimit) {
    errors.title = messages.inputFieldRestriction;
  }

  if (!values.description) {
    errors.description = messages.required;
  } else if (values.description && values.description.toString().trim() == '') {
    errors.description = messages.required;
  } else if (values?.description?.length > inputDescLimit) {
    errors.description = messages.descriptionFieldRestriction;
  }

  if (!values.buttonLabel) {
    errors.buttonLabel = messages.required;
  } else if (values.buttonLabel && values.buttonLabel.toString().trim() == '') {
    errors.buttonLabel = messages.required;
  } else if (values?.buttonLabel?.length > inputTextLimit) {
    errors.buttonLabel = messages.inputFieldRestriction;
  }

  return errors
}

export default validate