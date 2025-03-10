import messages from '../../../../locale/messages';
import { inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.cancellationInfo) {
    errors.cancellationInfo = messages.required;
  } else if (values.cancellationInfo && values.cancellationInfo.trim() == "") {
    errors.cancellationInfo = messages.required;
  } else if (values?.cancellationInfo?.length > inputDescLimit) {
    errors.cancellationInfo = messages.descriptionFieldRestriction;
  }

  return errors
}

export default validate