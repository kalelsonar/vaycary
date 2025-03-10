import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.metaTitle) {
    errors.metaTitle = messages.required;
  } else if (values.metaTitle.trim() == '') {
    errors.metaTitle = messages.required;
  } else if (values?.metaTitle?.length > inputTextLimit) {
    errors.metaTitle = messages.inputFieldRestriction;
  }

  if (!values.metaDescription) {
    errors.metaDescription = messages.required;
  } else if (values.metaDescription.trim() == '') {
    errors.metaDescription = messages.required;
  } else if (values?.metaDescription?.length > inputDescLimit) {
    errors.metaDescription = messages.descriptionFieldRestriction;
  }


  if (!values.footerCategory) {
    errors.footerCategory = messages.required;
  }

  if (!values.pageUrl) {
    errors.pageUrl = messages.required;
  } else if (values.pageUrl.trim() == '') {
    errors.pageUrl = messages.required;
  } else {
    var slashCount = (values.pageUrl.match(/\//g) || []).length;
    var questionCount = (values.pageUrl.match(/\?/g) || []).length;
    var andCount = (values.pageUrl.match(/\&/g) || []).length;
    if (slashCount >= 1 || questionCount >= 1 || andCount >= 1) {
      errors.pageUrl = messages.invalidPageUrl;
    }
    try {
      decodeURIComponent(values.pageUrl)
    } catch (error) {
      errors.pageUrl = messages.invalidPageUrl
    }
  }

  if (!values.pageTitle) {
    errors.pageTitle = messages.required;
  } else if (values.pageTitle.trim() == '') {
    errors.pageTitle = messages.required;
  } else if (values?.pageTitle?.length > inputTextLimit) {
    errors.pageTitle = messages.inputFieldRestriction;
  }

  if (!values.content) {
    errors.content = messages.required;
  } else if (values.content.trim() == '') {
    errors.content = messages.required;
  }

  return errors
}

export default validate