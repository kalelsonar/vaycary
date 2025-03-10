import messages from '../../locale/messages';


const validate = values => {

  const errors = {}

  if (!values.houseType) {
    errors.houseType = messages.required;
  }

  if (!values.country || (values.country && values.country.toString().trim() == '')) {
    errors.country = messages.required;
  }

  if (!values.state || (values.state && values.state.toString().trim() == '')) {
    errors.state = messages.required;
  }

  if (!values.city || (values.city && values.city.toString().trim() == '')) {
    errors.city = messages.required;
  }

  if (!values.street || (values.street && values.street.toString().trim() == '')) {
    errors.street = messages.required;
  }

  if (!values.zipcode || (values.zipcode && values.zipcode.toString().trim() == '')) {
    errors.zipcode = messages.required;
  }

  return errors
}

export default validate
