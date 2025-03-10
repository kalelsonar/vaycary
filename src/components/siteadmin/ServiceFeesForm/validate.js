import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (values.guestType === 'fixed' || values.hostType === 'fixed') {
    if (!values.currency) {
      errors.currency = messages.currencyRequiredLabel;
    }
  }

  if (!/^[0-9\.]+$/.test(values.guestValue)) {
    errors.guestValue = messages.onlyNumericKey;
  }

  if (!/^[0-9\.]+$/.test(values.hostValue)) {
    errors.hostValue = messages.onlyNumericKey;
  }

  if (values.guestType === 'fixed') {
    if (values.guestValue && parseInt(values.guestValue, 10) < 0) {
      errors.guestValue = messages.invalid;
    }
    if (values?.guestValue?.length > 15) {
      errors.guestValue = messages.exceedLimit;
    }
  }

  if (values.hostType === 'fixed') {
    if (values.hostValue && parseInt(values.hostValue, 10) < 0) {
      errors.hostValue = messages.invalid;
    }
    if (values?.hostValue?.length > 15) {
      errors.hostValue = messages.exceedLimit;
    }
  }

  if (values.guestType === 'percentage') {
    if (values.guestValue && (parseInt(values.guestValue, 10) < 0 || parseInt(values.guestValue, 10) > 99)) {
      errors.guestValue = messages.choosePresentageValue;
    }
  }

  if (values.hostType === 'percentage') {
    if (values.hostValue && (parseInt(values.hostValue, 10) < 0 || parseInt(values.hostValue, 10) > 99)) {
      errors.hostValue = messages.choosePresentageValue;
    }
  }

  return errors
}

export default validate;