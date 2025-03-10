import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.listId) {
    errors.listId = messages.provideListId;
  } else if (isNaN(values.listId)) {
    errors.listId = messages.onlyNumericKey;
  } else if (values?.listId?.length > inputTextLimit) {
    errors.listId = messages.inputFieldRestriction;
  }

  if (!values.reviewContent) {
    errors.reviewContent = messages.reviewError1;
  } else if (values.reviewContent.trim() == "") {
    errors.reviewContent = messages.reviewError1;
  } else if (values?.reviewContent?.length > inputDescLimit) {
    errors.reviewContent = messages.descriptionFieldRestriction;
  }

  if (!values.rating) {
    errors.rating = messages.reviewError2;
  }

  return errors
}

export default validate;