import messages from '../../../../locale/messages';
import { inputTextLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.whyhostBannerHeading) {
    errors.whyhostBannerHeading = messages.required;
  } else if (values.whyhostBannerHeading.trim() == "") {
    errors.whyhostBannerHeading = messages.required;
  } else if (values?.whyhostBannerHeading?.length > inputTextLimit) {
    errors.whyhostBannerHeading = messages.inputFieldRestriction;
  }

  if (!values.paymentTitleHeading) {
    errors.paymentTitleHeading = messages.required;
  } else if (values.paymentTitleHeading.toString().trim() == "") {
    errors.paymentTitleHeading = messages.required;
  } else if (values.paymentTitleHeading && values.paymentTitleHeading.length > inputTextLimit) {
    errors.paymentTitleHeading = messages.inputFieldRestriction;
  }


  return errors
}

export default validate;