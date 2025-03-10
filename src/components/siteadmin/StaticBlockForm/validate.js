import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.headerTitle) {
    errors.headerTitle = messages.required;
  } else if (values.headerTitle.trim() == "") {
    errors.headerTitle = messages.blankSpace;
  } else if (values?.headerTitle?.length > inputTextLimit) {
    errors.headerTitle = messages.inputFieldRestriction;
  }

  if (!values.headerContent) {
    errors.headerContent = messages.required;
  } else if (values.headerContent.trim() == "") {
    errors.headerContent = messages.blankSpace;
  } else if (values?.headerContent?.length > inputDescLimit) {
    errors.headerContent = messages.descriptionFieldRestriction;
  }

  if (!values.blockTitle1) {
    errors.blockTitle1 = messages.required;
  } else if (values.blockTitle1.trim() == "") {
    errors.blockTitle1 = messages.blankSpace;
  } else if (values?.blockTitle1?.length > inputTextLimit) {
    errors.blockTitle1 = messages.inputFieldRestriction;
  }

  if (!values.blockContent1) {
    errors.blockContent1 = messages.required;
  } else if (values.blockContent1.trim() == "") {
    errors.blockContent1 = messages.blankSpace;
  } else if (values?.blockContent1?.length > inputDescLimit) {
    errors.blockContent1 = messages.descriptionFieldRestriction;
  }

  if (!values.blockTitle2) {
    errors.blockTitle2 = messages.required;
  } else if (values.blockTitle2.trim() == "") {
    errors.blockTitle2 = messages.blankSpace;
  } else if (values?.blockTitle2?.length > inputTextLimit) {
    errors.blockTitle2 = messages.inputFieldRestriction;
  }

  if (!values.blockContent2) {
    errors.blockContent2 = messages.required;
  } else if (values.blockContent2.trim() == "") {
    errors.blockContent2 = messages.blankSpace;
  } else if (values?.blockContent2?.length > inputDescLimit) {
    errors.blockContent2 = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validate;