import messages from '../../../locale/messages';
import { inputTextLimit } from '../../../helpers/textRestriction';

// Helpers
import { isEuropeCountry } from '../../../helpers/europeCountryHelpers';

const validate = values => {

    const errors = {}

    if (!values.country) {
        errors.country = messages.required;
    } else if (values?.country?.length > inputTextLimit) {
        errors.country = messages.inputFieldRestriction;
    }

    if (!values.city) {
        errors.city = messages.required;
    } else if (values?.city?.length > inputTextLimit) {
        errors.city = messages.inputFieldRestriction;
    }

    if (!values.state) {
        errors.state = messages.required;
    } else if (values?.state?.length > inputTextLimit) {
        errors.state = messages.inputFieldRestriction;
    }

    if (!values.zipcode) {
        errors.zipcode = messages.required;
    } else if (values?.zipcode?.length > inputTextLimit) {
        errors.zipcode = messages.inputFieldRestriction;
    }

    if (!values.firstname || (values.firstname && values.firstname.toString().trim() == '')) {
        errors.firstname = messages.required;
    } else if (values?.firstname?.length > inputTextLimit) {
        errors.firstname = messages.inputFieldRestriction;
    }

    if (values.businessType && values.businessType === "individual" && (!values.lastname || (values.lastname && values.lastname.toString().trim() == ''))) {
        errors.lastname = messages.required;
    } else if (values?.businessType === "individual" && values?.lastname?.length > inputTextLimit) {
        errors.lastname = messages.inputFieldRestriction;
    }

    if (values.country && ['US', 'CA', 'GB'].indexOf(values.country) >= 0) {
        if (!values.routingNumber) {
            errors.routingNumber = messages.required;
        } else if (values.country === "CA") {
            if (values.routingNumber.length == 9 && ((isNaN(values.routingNumber.slice(0, 5)) || (parseInt(values.routingNumber.slice(0, 5), 10) < 1))
                || values.routingNumber.charAt(5) !== '-' || (isNaN(values.routingNumber.slice(6, 9))))) {
                errors.routingNumber = messages.payoutRoutingInvalid;
            } else if (values.routingNumber.length == 8 && (isNaN(values.routingNumber) || (parseInt(values.routingNumber, 10) < 1))) {
                errors.routingNumber = messages.payoutRoutingInvalid;
            } else if (values.routingNumber.length < 8 || values.routingNumber.length > 9) {
                errors.routingNumber = messages.payoutRoutingInvalid;
            }
        } else if (isNaN(values.routingNumber) || (parseInt(values.routingNumber, 10) < 1)) {
            errors.routingNumber = values.country === 'GB' ? messages.payoutInvalidSortNumber : messages.payoutRoutingInvalid;
        }
    }

    if (!values.accountNumber) {
        errors.accountNumber = messages.required;
    } else if (values.accountNumber && values.accountNumber.toString().trim() === '') {
        errors.accountNumber = isEuropeCountry(values.country) ? messages.ibanNumberInvalid : messages.accountNumberInvalid;
    } else if (values?.accountNumber?.length > inputTextLimit) {
        errors.accountNumber = messages.inputFieldRestriction;
    }

    if (!values.confirmAccountNumber) {
        errors.confirmAccountNumber = messages.required;
    } else if (values.confirmAccountNumber && values.confirmAccountNumber.toString().trim() === '') {
        errors.confirmAccountNumber = isEuropeCountry(values.country) ? messages.confirmIbanNumberInvalid : messages.confirmAccountNumberInvalid;
    }

    if (values.confirmAccountNumber && values.accountNumber) {
        if (values.confirmAccountNumber !== values.accountNumber) {
            errors.confirmAccountNumber = isEuropeCountry(values.country) ? messages.confirmIbanNumberMismatch : messages.confirmAccountNumberMismatch;
        }
    } else if (values?.confirmAccountNumber?.length > inputTextLimit) {
        errors.confirmAccountNumber = messages.inputFieldRestriction;
    }

    if (values.country && values.country === 'US' && values.businessType && values.businessType === "individual") {
        if (!values.ssn4Digits) {
            errors.ssn4Digits = messages.required;
        } else if (values.ssn4Digits) {
            if (isNaN(values.ssn4Digits) || (parseInt(values.ssn4Digits, 10) < 1)) {
                errors.ssn4Digits = messages.ssn4DigitsInvalid;
            }
        }
    }

    if (!values.businessType) {
        errors.businessType = messages.required;
    }

    return errors
}

export default validate;