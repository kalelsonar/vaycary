import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  } else if (values.title && values.title.toString().trim() == '') {
    errors.title = messages.required;
  } else if (values?.title?.length > inputTextLimit) {
    errors.title = messages.inputFieldRestriction
  }

  if (!values.content) {
    errors.content = messages.required;
  } else if (values.content && values.content.toString().trim() == '') {
    errors.content = messages.required;
  } else if (values?.content?.length > inputDescLimit) {
    errors.content = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validate;