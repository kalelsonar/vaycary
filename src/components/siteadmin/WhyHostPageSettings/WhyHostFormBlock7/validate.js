import messages from '../../../../locale/messages';
import { inputTextLimit, inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}
  if (!values.faqTitle1) {
    errors.faqTitle1 = messages.required;
  } else if (values.faqTitle1 && values.faqTitle1.length > inputTextLimit) {
    errors.faqTitle1 = messages.inputFieldRestriction;
  } else if (values.faqTitle1 && values.faqTitle1.trim() == '') {
    errors.faqTitle1 = messages.required;
  }

  if (!values.faqContent1) {
    errors.faqContent1 = messages.required;
  } else if (values.faqContent1 && values.faqContent1.length > inputDescLimit) {
    errors.faqContent1 = messages.descriptionFieldRestriction;
  } else if (values.faqContent1 && values.faqContent1.trim() == '') {
    errors.faqContent1 = messages.required;
  }

  if (!values.faqTitle2) {
    errors.faqTitle2 = messages.required;
  } else if (values.faqTitle2 && values.faqTitle2.length > inputTextLimit) {
    errors.faqTitle2 = messages.inputFieldRestriction;
  } else if (values.faqTitle2 && values.faqTitle2.trim() == '') {
    errors.faqTitle2 = messages.required;
  }

  if (!values.faqContent2) {
    errors.faqContent2 = messages.required;
  } else if (values.faqContent2 && values.faqContent2.length > inputDescLimit) {
    errors.faqContent2 = messages.descriptionFieldRestriction;
  } else if (values.faqContent2 && values.faqContent2.trim() == '') {
    errors.faqContent2 = messages.required;
  }

  if (!values.faqTitle3) {
    errors.faqTitle3 = messages.required;
  } else if (values.faqTitle3 && values.faqTitle3.length > inputTextLimit) {
    errors.faqTitle3 = messages.inputFieldRestriction;
  } else if (values.faqTitle3 && values.faqTitle3.trim() == '') {
    errors.faqTitle3 = messages.required;
  }

  if (!values.faqContent3) {
    errors.faqContent3 = messages.required;
  } else if (values.faqContent3 && values.faqContent3.length > inputDescLimit) {
    errors.faqContent3 = messages.descriptionFieldRestriction;
  } else if (values.faqContent3 && values.faqContent3.trim() == '') {
    errors.faqContent3 = messages.required;
  }

  if (!values.faqTitle4) {
    errors.faqTitle4 = messages.required;
  } else if (values.faqTitle4 && values.faqTitle4.length > inputTextLimit) {
    errors.faqTitle4 = messages.inputFieldRestriction;
  } else if (values.faqTitle4 && values.faqTitle4.trim() == '') {
    errors.faqTitle4 = messages.required;
  }

  if (!values.faqContent4) {
    errors.faqContent4 = messages.required;
  } else if (values.faqContent4 && values.faqContent4.length > inputDescLimit) {
    errors.faqContent4 = messages.descriptionFieldRestriction;
  } else if (values.faqContent4 && values.faqContent4.trim() == '') {
    errors.faqContent4 = messages.required;
  }

  if (!values.faqTitle5) {
    errors.faqTitle5 = messages.required;
  } else if (values.faqTitle5 && values.faqTitle5.length > inputTextLimit) {
    errors.faqTitle5 = messages.inputFieldRestriction;
  } else if (values.faqTitle5 && values.faqTitle5.trim() == '') {
    errors.faqTitle5 = messages.required;
  }

  if (!values.faqContent5) {
    errors.faqContent5 = messages.required;
  } else if (values.faqContent5 && values.faqContent5.length > inputDescLimit) {
    errors.faqContent5 = messages.descriptionFieldRestriction;
  } else if (values.faqContent5 && values.faqContent5.trim() == '') {
    errors.faqContent5 = messages.required;
  }

  if (!values.faqTitle6) {
    errors.faqTitle6 = messages.required;
  } else if (values.faqTitle6 && values.faqTitle6.length > inputTextLimit) {
    errors.faqTitle6 = messages.inputFieldRestriction;
  } else if (values.faqTitle6 && values.faqTitle6.trim() == '') {
    errors.faqTitle6 = messages.required;
  }

  if (!values.faqContent6) {
    errors.faqContent6 = messages.required;
  } else if (values.faqContent6 && values.faqContent6.length > inputDescLimit) {
    errors.faqContent6 = messages.descriptionFieldRestriction;
  } else if (values.faqContent6 && values.faqContent6.trim() == '') {
    errors.faqContent6 = messages.required;
  }

  if (!values.faqTitle7) {
    errors.faqTitle7 = messages.required;
  } else if (values.faqTitle7 && values.faqTitle7.length > inputTextLimit) {
    errors.faqTitle7 = messages.inputFieldRestriction;
  } else if (values.faqTitle7 && values.faqTitle7.trim() == '') {
    errors.faqTitle7 = messages.required;
  }

  if (!values.faqContent7) {
    errors.faqContent7 = messages.required;
  } else if (values.faqContent7 && values.faqContent7.length > inputDescLimit) {
    errors.faqContent7 = messages.descriptionFieldRestriction;
  } else if (values.faqContent7 && values.faqContent7.trim() == '') {
    errors.faqContent7 = messages.required;
  }

  if (!values.faqTitle8) {
    errors.faqTitle8 = messages.required;
  } else if (values.faqTitle8 && values.faqTitle8.length > inputTextLimit) {
    errors.faqTitle8 = messages.inputFieldRestriction;
  } else if (values.faqTitle8 && values.faqTitle8.trim() == '') {
    errors.faqTitle8 = messages.required;
  }

  if (!values.faqContent8) {
    errors.faqContent8 = messages.required;
  } else if (values.faqContent8 && values.faqContent8.length > inputDescLimit) {
    errors.faqContent8 = messages.descriptionFieldRestriction;
  } else if (values.faqContent8 && values.faqContent8.trim() == '') {
    errors.faqContent8 = messages.required;
  }



  return errors
}

export default validate;