import messages from '../../locale/messages';
import { inputTextLimit } from '../../helpers/textRestriction';

const validate = values => {

    const errors = {}

    if (!values.name) {
        errors.name = messages.required;
    } else if (values.name.trim() == "") {
        errors.name = messages.required;
    } else if (values?.name?.length > inputTextLimit) {
        errors.name = messages.inputFieldRestriction;
    }

    if (!values.email) {
        errors.email = messages.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
        errors.email = messages.emailInvalid;
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = messages.required;
    } else if (values.phoneNumber.trim() == "") {
        errors.phoneNumber = messages.required;
    } else if (values?.phoneNumber?.length > inputTextLimit) {
        errors.phoneNumber = messages.inputFieldRestriction;
    }

    if (!values.ContactMessage) {
        errors.ContactMessage = messages.required;
    } else if (values.ContactMessage.trim() == "") {
        errors.ContactMessage = messages.required;
    } else if (values?.ContactMessage?.length > 1000) {
        errors.ContactMessage = messages.exceedLimit;
    }

    if (!values.reCaptcha) {
        errors.reCaptcha = messages.required;
    }
    return errors
}
export default validate
