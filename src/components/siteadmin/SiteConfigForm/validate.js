import messages from "../../../locale/messages"
import { inputTextLimit } from "../../../helpers/textRestriction"

const validate = (values) => {
  const errors = {}

  if (
    !values?.deepLinkBundleId ||
    values?.deepLinkBundleId.toString().trim() == ""
  ) {
    errors.deepLinkBundleId = messages.required
  } else if (values?.deepLinkBundleId?.length > inputTextLimit) {
    errors.deepLinkBundleId = messages.inputFieldRestriction
  }

  if (!values?.smtpHost || values?.smtpHost.toString().trim() == "") {
    errors.smtpHost = messages.required
  } else if (values?.smtpHost?.length > inputTextLimit) {
    errors.smtpHost = messages.inputFieldRestriction
  }

  if (!values?.smtpPort || values?.smtpPort.toString().trim() == "") {
    errors.smtpPort = messages.required
  } else if (values?.smtpPort?.length > inputTextLimit) {
    errors.smtpPort = messages.inputFieldRestriction
  }

  if (!values?.smptEmail || values?.smptEmail.toString().trim() == "") {
    errors.smptEmail = messages.required
  } else if (values?.smptEmail?.length > inputTextLimit) {
    errors.smptEmail = messages.inputFieldRestriction
  }

  if (!values?.smtpSender || values?.smtpSender.toString().trim() == "") {
    errors.smtpSender = messages.required
  } else if (values?.smtpSender?.length > inputTextLimit) {
    errors.smtpSender = messages.inputFieldRestriction
  }

  if (!values?.smtpSenderEmail) {
    errors.smtpSenderEmail = messages.required && messages.required
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values?.smtpSenderEmail)
  ) {
    errors.smtpSenderEmail = messages.emailInvalid && messages.emailInvalid
  }

  if (
    !values?.twillioAccountSid ||
    values?.twillioAccountSid.toString().trim() == ""
  ) {
    errors.twillioAccountSid = messages.required
  } else if (values?.twillioAccountSid?.length > inputTextLimit) {
    errors.twillioAccountSid = messages.inputFieldRestriction
  }

  if (
    !values?.twillioAuthToken ||
    values?.twillioAuthToken.toString().trim() == ""
  ) {
    errors.twillioAuthToken = messages.required
  } else if (values?.twillioAuthToken?.length > inputTextLimit) {
    errors.twillioAuthToken = messages.inputFieldRestriction
  }

  if (!values?.twillioPhone || values?.twillioPhone.toString().trim() == "") {
    errors.twillioPhone = messages.required
  } else if (values?.twillioPhone.length > 30) {
    errors.twillioPhone = messages.phoneNumberLengthInvalid
  }

  if (
    !values?.paypalClientId ||
    values?.paypalClientId.toString().trim() == ""
  ) {
    errors.paypalClientId = messages.required
  } else if (values?.paypalClientId?.length > inputTextLimit) {
    errors.paypalClientId = messages.inputFieldRestriction
  }

  if (!values?.paypalSecret || values?.paypalSecret.toString().trim() == "") {
    errors.paypalSecret = messages.required
  } else if (values?.paypalSecret?.length > inputTextLimit) {
    errors.paypalSecret = messages.inputFieldRestriction
  }

  if (!values?.paypalHost || values?.paypalHost.toString().trim() == "") {
    errors.paypalHost = messages.required
  } else if (values?.paypalHost?.length > inputTextLimit) {
    errors.paypalHost = messages.inputFieldRestriction
  }

  if (!values?.maxUploadSize || values?.maxUploadSize.toString().trim() == "") {
    errors.maxUploadSize = messages.required
  } else if (values?.maxUploadSize?.length > inputTextLimit) {
    errors.maxUploadSize = messages.inputFieldRestriction
  }

  if (
    !values?.googleClientId ||
    values?.googleClientId.toString().trim() == ""
  ) {
    errors.googleClientId = messages.required
  } else if (values?.googleClientId?.length > inputTextLimit) {
    errors.googleClientId = messages.inputFieldRestriction
  }

  if (
    !values?.googleSecretId ||
    values?.googleSecretId.toString().trim() == ""
  ) {
    errors.googleSecretId = messages.required
  } else if (values?.googleSecretId?.length > inputTextLimit) {
    errors.googleSecretId = messages.inputFieldRestriction
  }

  if (
    !values?.deepLinkContent ||
    values?.deepLinkContent.toString().trim() == ""
  ) {
    errors.deepLinkContent = messages.required
  }

  if (
    !values?.fcmPushNotificationKey ||
    values?.fcmPushNotificationKey.toString().trim() == ""
  ) {
    errors.fcmPushNotificationKey = messages.required
  }

  return errors
}

export default validate
