import messages from '../../../locale/messages';
import { inputDescLimit } from '../../../helpers/textRestriction';

const validate = values => {

    const errors = {};

    if (!values.reviewContent) {
        errors.reviewContent = messages.required;
    } else if (values.reviewContent.trim() == "") {
        errors.reviewContent = messages.required;
    } else if (values?.reviewContent?.length > inputDescLimit) {
        errors.reviewContent = messages.descriptionFieldRestriction;
    }

    if (!values.rating) {
        errors.rating = messages.required;
    }

    return errors;
};

export default validate;
