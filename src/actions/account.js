import history from '../core/history';
import { decode } from '../helpers/queryEncryption';
import {
  SET_USER_DATA_START,
  SET_USER_DATA_SUCCESS,
  SET_USER_DATA_ERROR
} from '../constants';

const query = `
  query userAccount{
    userAccount {
      userId
      profileId
      firstName
      lastName
      displayName
      gender
      dateOfBirth
      email
      userBanStatus
      phoneNumber
      preferredLanguage
      preferredCurrency
      location
      info
      createdAt
      picture
      country
      countryCode
      countryName
      verification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
        isPhoneVerified
      }
      userData {
        type
      }
    }
  }
`;
export function loadAccount(loginScreen, refer) {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({
      type: SET_USER_DATA_START,
    });
    try {
      const { data } = await graphqlRequest(query);

      if (data?.userAccount) {
        let dateOfBirth = data?.userAccount?.dateOfBirth, updatedProfileData, dateOfBirthObj, decodedObj = {}, dateOfBirthArray;

        decodedObj = {
          'email': decode(data?.userAccount?.email),
          'phoneNumber': decode(data?.userAccount?.phoneNumber)
        }

        if (dateOfBirth != null) {
          dateOfBirthArray = dateOfBirth?.split("-");
          dateOfBirthObj = {
            "month": Number(dateOfBirthArray[0] - 1),
            "year": dateOfBirthArray[1],
            "day": dateOfBirthArray[2],
          };

          updatedProfileData = Object.assign({}, data?.userAccount, dateOfBirthObj, decodedObj);
        } else {
          updatedProfileData = { ...data?.userAccount, ...decodedObj };
        }
        dispatch({
          type: SET_USER_DATA_SUCCESS,
          updatedProfileData
        });

        if (loginScreen) {
          history.push(refer ? refer : '/dashboard')
        }
      }
    } catch (error) {
      dispatch({
        type: SET_USER_DATA_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }
    return true;
  };
}
