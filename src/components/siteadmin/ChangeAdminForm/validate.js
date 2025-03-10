import messages from '../../../locale/messages';
import { inputTextLimit } from '../../../helpers/textRestriction';

const validate = values => {

    const errors = {}

    if (values.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
            errors.email = messages.emailInvalid;
        }
    }

    if (!values.password) {
        errors.password = messages.required;
    } else if (values.password.length < 8) {
        errors.password = messages.passWordMinimum;
    } else if (values?.password?.length > inputTextLimit) {
        errors.password = messages.inputFieldRestriction;
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = messages.required;
    } else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = messages.passwordError5;
    } else if (values?.confirmPassword?.length > inputTextLimit) {
        errors.confirmPassword = messages.inputFieldRestriction;
    }

    if (values.password && values.confirmPassword) {
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = messages.passWordMismatch;
        }
    }

    return errors
}

export default validate;