import { createIntl } from 'react-intl';
import {
  SET_LOCALE_START,
  SET_LOCALE_SUCCESS,
  SET_LOCALE_ERROR,
} from '../constants';

const query = `
  query ($locale:String!) {
    intl (locale:$locale) {
      id
      message
    }
  }
`;

function getIntlFromState(state) {
  const intl = (state && state.intl) || {};
  const { initialNow, locale, messages } = intl;
  const localeMessages = (messages && messages[locale]) || {};

  const intlProvider = createIntl({
    initialNow,
    locale,
    messages: localeMessages,
    defaultLocale: 'en-US',
  });

  return intlProvider;

}

export function getIntl() {
  return (dispatch, getState) => getIntlFromState(getState());
}

export function setLocale({ locale }) {
  return async (dispatch, getState, { graphqlRequest }) => {
    dispatch({
      type: SET_LOCALE_START,
      payload: {
        locale,
      },
    });

    try {
      // WARNING !!
      // do not use client.networkInterface except you want skip Apollo store
      // use client.query if you want benefit from Apollo caching mechanisms
      const { data } = await graphqlRequest(
        query,
        { locale },
      );
      const messages = data.intl.reduce((msgs, msg) => {
        msgs[msg.id] = msg.message;
        return msgs;
      }, {});

      dispatch({
        type: SET_LOCALE_SUCCESS,
        payload: {
          locale,
          messages,
        },
      });

      // remember locale for every new request
      if (process.env.BROWSER) {
        const maxAge = 3650 * 24 * 3600; // 10 years in seconds
        document.cookie = `lang=${locale};path=/;max-age=${maxAge}`;
      }
      // return bound intl instance at the end
      return getIntlFromState(getState());
    } catch (error) {
      dispatch({
        type: SET_LOCALE_ERROR,
        payload: {
          locale,
          error,
        },
      });
      return false;
    }

    return true;
  };
}
