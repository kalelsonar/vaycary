import messages from '../../locale/messages';
import { inputTextLimit } from '../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.oldPassword && values.registeredType === 'email') {
    errors.oldPassword = messages.required;
  } else if (values && values.oldPassword && values.oldPassword.toString().trim() == '') {
    errors.oldPassword = messages.required;
  } else if (values?.oldPassword?.length > inputTextLimit) {
    errors.oldPassword = messages.inputFieldRestriction;
  }

  if (!values.newPassword) {
    errors.newPassword = messages.required;
  } else if (values && values.newPassword && values.newPassword.toString().trim() == '') {
    errors.newPassword = messages.required;
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.passwordError3;
  } else if (values?.newPassword?.length > inputTextLimit) {
    errors.newPassword = messages.inputFieldRestriction;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.required;
  } else if (values && values.confirmPassword && values.confirmPassword.toString().trim() == '') {
    errors.confirmPassword = messages.required;
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = messages.passwordError5;
  } else if (values?.confirmPassword?.length > inputTextLimit) {
    errors.confirmPassword = messages.inputFieldRestriction;
  }

  return errors
}

export default validate