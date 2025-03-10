import messages from '../../../locale/messages';
import { inputTextLimit } from '../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.location) {
    errors.location = messages.required;
  } else if (values.location.trim() == "") {
    errors.location = messages.blankSpace;
  } else if (values?.location?.length > inputTextLimit) {
    errors.location = messages.inputFieldRestriction;
  }

  if (!values.locationAddress) {
    errors.locationAddress = messages.required;
  } else if (values.locationAddress.trim() == "") {
    errors.locationAddress = messages.blankSpace;
  } else if (values?.locationAddress?.length > inputTextLimit) {
    errors.locationAddress = messages.inputFieldRestriction;
  }

  return errors
}

export default validate