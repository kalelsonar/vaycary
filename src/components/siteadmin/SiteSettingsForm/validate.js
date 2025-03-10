import messages from '../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.siteName) {
    errors.siteName = messages.required;
  } else if (values.siteName && values.siteName.toString().trim() == '') {
    errors.siteName = messages.required;
  } else if (values?.siteName?.length > inputTextLimit) {
    errors.siteName = messages.inputFieldRestriction;
  }

  if (!values.siteTitle) {
    errors.siteTitle = messages.required;
  } else if (values.siteTitle && values.siteTitle.toString().trim() == '') {
    errors.siteTitle = messages.required;
  } else if (values?.siteTitle?.length > inputTextLimit) {
    errors.siteTitle = messages.inputFieldRestriction;
  }

  if (values?.metaDescription?.length > inputDescLimit) {
    errors.metaDescription = messages.descriptionFieldRestriction;
  } else if (values.metaDescription && values.metaDescription.toString().trim() == '') {
    errors.metaDescription = messages.required;
  }

  if (values?.metaKeyword?.length > inputDescLimit) {
    errors.metaKeyword = messages.descriptionFieldRestriction;
  } else if (values.metaKeyword && values.metaKeyword.toString().trim() == '') {
    errors.metaKeyword = messages.required;
  }

  if ((!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.playStoreUrl))) {
    errors.playStoreUrl = messages.urlInvalid;
  }

  if ((!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.appStoreUrl))) {
    errors.appStoreUrl = messages.urlInvalid;
  }

  if (!values.email) {
    errors.email = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required;
  } else if (values.phoneNumber && values.phoneNumber.toString().trim() == "") {
    errors.phoneNumber = messages.required;
  } else if (values.phoneNumber.length > 30) {
    errors.phoneNumber = messages.phoneNumberLengthInvalid;
  }

  if (!values.address) {
    errors.address = messages.required;
  } else if (values.address && values.address.toString().trim() == '') {
    errors.address = messages.required;
  } else if (values?.address?.length > inputDescLimit) {
    errors.address = messages.descriptionFieldRestriction;
  }

  if (!values.androidVersion) {
    errors.androidVersion = messages.required;
  } else if (values.androidVersion && values.androidVersion.toString().trim() === '') {
    errors.androidVersion = messages.required;
  } else if (values.androidVersion && !/^\d+(\.\d+){0,2}$/i.test(values.androidVersion)) {
    errors.androidVersion = messages.invalidVersionNumber;
  } else if (values?.androidVersion?.length > inputTextLimit) {
    errors.androidVersion = messages.inputFieldRestriction;
  }

  if (!values.iosVersion) {
    errors.iosVersion = messages.required
  } else if (values.iosVersion.trim() == '') {
    errors.iosVersion = messages.required
  } else if (values.iosVersion && !/^\d+(\.\d+){0,2}$/i.test(values.iosVersion)) {
    errors.iosVersion = messages.invalidVersionNumber;
  } else if (values.iosVersion.length > inputTextLimit) {
    errors.iosVersion = messages.inputFieldRestriction
  }

  return errors
}

export default validate;
