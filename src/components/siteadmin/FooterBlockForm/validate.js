import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.title1) {
    errors.title1 = messages.required;
  } else if (values.title1 && values.title1.toString().trim() == "") {
    errors.title1 = messages.blankSpace;
  } else if (values?.title1?.length > inputTextLimit) {
    errors.title1 = messages.inputFieldRestriction;
  }

  if (!values.content1) {
    errors.content1 = messages.required;
  } else if (values.content1 && values.content1.toString().trim() == "") {
    errors.content1 = messages.blankSpace;
  } else if (values?.content1?.length > inputDescLimit) {
    errors.content1 = messages.descriptionFieldRestriction;
  }

  if (!values.title2) {
    errors.title2 = messages.required;
  } else if (values.title2 && values.title2.toString().trim() == "") {
    errors.title2 = messages.blankSpace;
  } else if (values?.title2?.length > inputTextLimit) {
    errors.title2 = messages.inputFieldRestriction;
  }

  if (!values.content2) {
    errors.content2 = messages.required;
  } else if (values.content2 && values.content2.toString().trim() == "") {
    errors.content2 = messages.blankSpace;
  } else if (values?.content2?.length > inputDescLimit) {
    errors.content2 = messages.descriptionFieldRestriction;
  }

  if (!values.title3) {
    errors.title3 = messages.required;
  } else if (values.title3 && values.title3.toString().trim() == "") {
    errors.title3 = messages.blankSpace;
  } else if (values?.title3?.length > inputTextLimit) {
    errors.title3 = messages.inputFieldRestriction;
  }

  if (!values.content3) {
    errors.content3 = messages.required;
  } else if (values.content3 && values.content3.toString().trim() == "") {
    errors.content3 = messages.blankSpace;
  } else if (values?.content3?.length > inputDescLimit) {
    errors.content3 = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validate;