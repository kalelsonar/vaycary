import messages from '../../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.quoteSectionTitle1) {
    errors.quoteSectionTitle1 = messages.required;
  } else if (values.quoteSectionTitle1.trim() == "") {
    errors.quoteSectionTitle1 = messages.required;
  } else if (values.quoteSectionTitle1 && values.quoteSectionTitle1.length > inputTextLimit) {
    errors.quoteSectionTitle1 = messages.inputFieldRestriction;
  }

  if (!values.quoteSectionTitle2) {
    errors.quoteSectionTitle2 = messages.required;
  } else if (values.quoteSectionTitle2.trim() == "") {
    errors.quoteSectionTitle2 = messages.required;
  } else if (values.quoteSectionTitle2 && values.quoteSectionTitle2.length > inputTextLimit) {
    errors.quoteSectionTitle2 = messages.inputFieldRestriction;
  }

  if (!values.quoteSectionContent1) {
    errors.quoteSectionContent1 = messages.required;
  } else if (values.quoteSectionContent1.trim() == "") {
    errors.quoteSectionContent1 = messages.required;
  } else if (values.quoteSectionContent1 && values.quoteSectionContent1.length > inputDescLimit) {
    errors.quoteSectionContent1 = messages.descriptionFieldRestriction;
  }

  if (!values.quoteSectionContent2) {
    errors.quoteSectionContent2 = messages.required;
  } else if (values.quoteSectionContent2.trim() == "") {
    errors.quoteSectionContent2 = messages.required;
  } else if (values.quoteSectionContent2 && values.quoteSectionContent2.length > inputDescLimit) {
    errors.quoteSectionContent2 = messages.descriptionFieldRestriction;
  }

  if (!values.quoteSectionButton1) {
    errors.quoteSectionButton1 = messages.required;
  } else if (values.quoteSectionButton1.trim() == "") {
    errors.quoteSectionButton1 = messages.required;
  } else if (values.quoteSectionButton1 && values.quoteSectionButton1.length > inputTextLimit) {
    errors.quoteSectionButton1 = messages.inputFieldRestriction;
  }

  if (!values.quoteSectionButton2) {
    errors.quoteSectionButton2 = messages.required;
  } else if (values.quoteSectionButton2.trim() == "") {
    errors.quoteSectionButton2 = messages.required;
  } else if (values.quoteSectionButton2 && values.quoteSectionButton2.length > inputTextLimit) {
    errors.quoteSectionButton2 = messages.inputFieldRestriction;
  }


  return errors
}

export default validate;