import messages from '../../../../locale/messages';
import { inputTextLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.hostBannerTitle1) {
    errors.hostBannerTitle1 = messages.required;
  } else if (values.hostBannerTitle1.trim() == "") {
    errors.hostBannerTitle1 = messages.required;
  } else if (values.hostBannerTitle1 && values.hostBannerTitle1.length > inputTextLimit) {
    errors.hostBannerTitle1 = messages.inputFieldRestriction;
  }


  return errors
}

export default validate;