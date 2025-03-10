import messages from '../../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.coverSectionTitle1) {
    errors.coverSectionTitle1 = messages.required;
  } else if (values.coverSectionTitle1.trim() == "") {
    errors.coverSectionTitle1 = messages.required;
  } else if (values.coverSectionTitle1 && values.coverSectionTitle1.length > inputTextLimit) {
    errors.coverSectionTitle1 = messages.inputFieldRestriction;
  }

  if (!values.coverSectionContent1) {
    errors.coverSectionContent1 = messages.required;
  } else if (values.coverSectionContent1.trim() == "") {
    errors.coverSectionContent1 = messages.required;
  } else if (values.coverSectionContent1 && values.coverSectionContent1.length > inputDescLimit) {
    errors.coverSectionContent1 = messages.descriptionFieldRestriction;
  }

  if (!values.coverSectionFeature1) {
    errors.coverSectionFeature1 = messages.required;
  } else if (values.coverSectionFeature1.trim() == "") {
    errors.coverSectionFeature1 = messages.required;
  } else if (values.coverSectionFeature1 && values.coverSectionFeature1.length > inputDescLimit) {
    errors.coverSectionFeature1 = messages.descriptionFieldRestriction;
  }

  if (!values.coverSectionFeature2) {
    errors.coverSectionFeature2 = messages.required;
  } else if (values.coverSectionFeature2.trim() == "") {
    errors.coverSectionFeature2 = messages.required;
  } else if (values.coverSectionFeature2 && values.coverSectionFeature2.length > inputDescLimit) {
    errors.coverSectionFeature2 = messages.descriptionFieldRestriction;
  }

  if (!values.coverSectionFeature3) {
    errors.coverSectionFeature3 = messages.required;
  } else if (values.coverSectionFeature3.trim() == "") {
    errors.coverSectionFeature3 = messages.required;
  } else if (values.coverSectionFeature3 && values.coverSectionFeature3.length > inputDescLimit) {
    errors.coverSectionFeature3 = messages.descriptionFieldRestriction;
  }

  if (!values.coverSectionFeature4) {
    errors.coverSectionFeature4 = messages.required;
  } else if (values.coverSectionFeature4.trim() == "") {
    errors.coverSectionFeature4 = messages.required;
  } else if (values.coverSectionFeature4 && values.coverSectionFeature4.length > inputDescLimit) {
    errors.coverSectionFeature4 = messages.descriptionFieldRestriction;
  }

  if (!values.coverSectionFeature5) {
    errors.coverSectionFeature5 = messages.required;
  } else if (values.coverSectionFeature5.trim() == "") {
    errors.coverSectionFeature5 = messages.required;
  } else if (values.coverSectionFeature5 && values.coverSectionFeature5.length > inputDescLimit) {
    errors.coverSectionFeature5 = messages.descriptionFieldRestriction;
  }

  if (!values.coverSectionFeature6) {
    errors.coverSectionFeature6 = messages.required;
  } else if (values.coverSectionFeature6.trim() == "") {
    errors.coverSectionFeature6 = messages.required;
  } else if (values.coverSectionFeature6 && values.coverSectionFeature6.length > inputDescLimit) {
    errors.coverSectionFeature6 = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validate;