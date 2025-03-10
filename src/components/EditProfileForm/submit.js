import fetch from '../../core/fetch';
import PopulateData from '../../helpers/populateData';
import showToaster from '../../helpers/showToaster';
import { setRuntimeVariable } from '../../actions/runtime';
import { loadAccount } from '../../actions/account';

async function submit(values, dispatch) {

  let today, birthDate, age, monthDifference, dateOfMonth;
  let dateOfBirth, firstNameValue, lastNameValue, location;
  let infoValue, loggedinEmailValue, countryName, phoneNumber, countryCode;
  let dobDate, monthValidation;

  dateOfMonth = Number(values?.month) + 1;
  dobDate = values?.year + '/' + dateOfMonth + '/' + values?.day;

  if (!values?.day) {
    showToaster({ messageId: 'birthDayField', toasterType: 'error' })
    return false;
  }

  if (!values?.year) {
    showToaster({ messageId: 'birthYearField', toasterType: 'error' })
    return false;
  }

  monthValidation = parseInt(values?.month);

  if (isNaN(monthValidation)) {
    showToaster({ messageId: 'birthMonthField', toasterType: 'error' })
    return false;
  }

  today = new Date();
  birthDate = new Date(dobDate);
  age = today?.getFullYear() - birthDate?.getFullYear();
  monthDifference = today?.getMonth() - birthDate?.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today?.getDate() < birthDate?.getDate())) age--;
  if (age < 18) {
    showToaster({ messageId: 'ageLimit', toasterType: 'error' })
    return false;
  }

  if (values?.year && values?.month && values?.day) {
    if (!PopulateData?.isValidDate(values?.year, values?.month, values?.day)) {
      showToaster({ messageId: 'invalidDob', toasterType: 'error' })
      return false;
    }
  }

  const query = `
  query (
    $firstName:String,
    $lastName:String,
  	$gender: String,
    $dateOfBirth: String,
    $email: String!,
  	$phoneNumber: String,
  	$preferredLanguage: String,
  	$preferredCurrency: String,
  	$location: String,
    $info: String,
    $loggedinEmail: String,
    $countryCode: String,
    $countryName: String,
  ) {
      userEditProfile (
        firstName:$firstName,
        lastName:$lastName,
        gender: $gender,
        dateOfBirth: $dateOfBirth,
        email: $email,
        phoneNumber: $phoneNumber,
        preferredLanguage: $preferredLanguage,
        preferredCurrency: $preferredCurrency,
        location: $location,
        info: $info,
        loggedinEmail: $loggedinEmail,
        countryCode: $countryCode,
        countryName: $countryName,
      ) {
        status
      }
    }
    `;

  const { year, month, day } = values;

  dateOfBirth = (Number(month) + 1) + "-" + year + "-" + day;

  firstNameValue = values?.firstName ? values?.firstName.trim() : values?.firstName;
  lastNameValue = values?.lastName ? values?.lastName.trim() : values?.lastName;
  location = values?.location ? values?.location.trim() : values?.location;
  infoValue = values?.info ? values?.info.trim() : values?.info;
  loggedinEmailValue = values?.loggedinEmail ? values?.loggedinEmail.trim() : values?.loggedinEmail;
  countryName = values?.phoneCountryCode ? values?.phoneCountryCode : countryName;
  phoneNumber = values?.phoneNumber ? values?.phoneNumber.trim() : values?.phoneNumber;
  countryCode = values?.phoneDialCode ? values?.phoneDialCode : values?.dialCode;

  const params = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    gender: values?.gender,
    dateOfBirth: dateOfBirth,
    email: values?.email,
    preferredLanguage: values?.preferredLanguage,
    preferredCurrency: values?.preferredCurrency,
    location: location,
    info: infoValue,
    phoneNumber: values?.phoneNumber,
    loggedinEmail: loggedinEmailValue,
    countryCode: countryCode,
    countryName: countryName
  };

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data?.userEditProfile?.status == "success") {
    await dispatch(loadAccount());
    showToaster({ messageId: 'updateProfile', toasterType: 'success' })
  } else if (data?.userEditProfile?.status == "email") {
    showToaster({ messageId: 'invalidEmail', toasterType: 'error' })
  } else if (data?.userEditProfile?.status == "notLoggedIn") {
    dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: false,
    }));
    showToaster({ messageId: 'loginError', toasterType: 'error' })
  } else {
    showToaster({ messageId: 'commonError', toasterType: 'error' })
  }
}

export default submit;
