import messages from '../../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.userName) {
    errors.userName = messages.required;
  } else if (values.userName.trim() == "") {
    errors.userName = messages.required;
  } else if (values?.userName?.length > inputTextLimit) {
    errors.userName = messages.inputFieldRestriction;

  }

  if (!values.reviewContent) {
    errors.reviewContent = messages.required;
  } else if (values.reviewContent.trim() == "") {
    errors.reviewContent = messages.required;
  } else if (values?.reviewContent?.length > inputDescLimit) {
    errors.reviewContent = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validate;