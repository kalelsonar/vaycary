import messages from '../../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.hostingBlockTitleHeading) {
    errors.hostingBlockTitleHeading = messages.required;
  } else if (values.hostingBlockTitleHeading.trim() == "") {
    errors.hostingBlockTitleHeading = messages.required;
  } else if (values.hostingBlockTitleHeading && values.hostingBlockTitleHeading.length > inputTextLimit) {
    errors.hostingBlockTitleHeading = messages.inputFieldRestriction;
  }

  if (!values.hostingBlockTitle1) {
    errors.hostingBlockTitle1 = messages.required;
  } else if (values.hostingBlockTitle1.trim() == "") {
    errors.hostingBlockTitle1 = messages.required;
  } else if (values.hostingBlockTitle1 && values.hostingBlockTitle1.length > inputTextLimit) {
    errors.hostingBlockTitle1 = messages.inputFieldRestriction;
  }

  if (!values.hostingBlockTitle2) {
    errors.hostingBlockTitle2 = messages.required;
  } else if (values.hostingBlockTitle2.trim() == "") {
    errors.hostingBlockTitle2 = messages.required;
  } else if (values.hostingBlockTitle2 && values.hostingBlockTitle2.length > inputTextLimit) {
    errors.hostingBlockTitle2 = messages.inputFieldRestriction;
  }

  if (!values.hostingBlockTitle3) {
    errors.hostingBlockTitle3 = messages.required;
  } else if (values.hostingBlockTitle3.trim() == "") {
    errors.hostingBlockTitle3 = messages.required;
  } else if (values.hostingBlockTitle3 && values.hostingBlockTitle3.length > inputTextLimit) {
    errors.hostingBlockTitle3 = messages.inputFieldRestriction;
  }

  if (!values.hostingBlockContent1) {
    errors.hostingBlockContent1 = messages.required;
  } else if (values.hostingBlockContent1.trim() == "") {
    errors.hostingBlockContent1 = messages.required;
  } else if (values.hostingBlockContent1 && values.hostingBlockContent1.length > inputDescLimit) {
    errors.hostingBlockContent1 = messages.descriptionFieldRestriction;
  }

  if (!values.hostingBlockContent2) {
    errors.hostingBlockContent2 = messages.required;
  } else if (values.hostingBlockContent2.trim() == "") {
    errors.hostingBlockContent2 = messages.required;
  } else if (values.hostingBlockContent2 && values.hostingBlockContent2.length > inputDescLimit) {
    errors.hostingBlockContent2 = messages.descriptionFieldRestriction;
  }

  if (!values.hostingBlockContent3) {
    errors.hostingBlockContent3 = messages.required;
  } else if (values.hostingBlockContent3.trim() == "") {
    errors.hostingBlockContent3 = messages.required;
  } else if (values.hostingBlockContent3 && values.hostingBlockContent3.length > inputDescLimit) {
    errors.hostingBlockContent3 = messages.descriptionFieldRestriction;
  }


  return errors
}

export default validate;