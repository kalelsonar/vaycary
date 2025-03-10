import messages from '../../../locale/messages';
import { inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

    const errors = {}

    if (!values.reviewContent) {
        errors.reviewContent = messages.reviewError1;
    } else if (values?.reviewContent?.length > inputDescLimit) { 
        errors.reviewContent = messages.descriptionFieldRestriction;
    }

    if (!values.rating) {
        errors.rating = messages.reviewError2;
    }

    return errors
}

export default validate;