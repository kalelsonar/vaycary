import {
  CONTACT_HOST_OPEN,
  CONTACT_HOST_CLOSE,
} from '../../constants';

import { openLoginModal } from '../modalActions';
import history from '../../core/history';
import { reset } from 'redux-form';
import { getRedirectURL } from '../../helpers/formatURL';

export function contactHostOpen(listId, urlParameters) {

  return async (dispatch, getState, { client }) => {

    var root = document.getElementsByTagName('html')[0];
    root.classList.add('scrollHidden');

    const isAuthenticated = getState().runtime.isAuthenticated

    if (!isAuthenticated) {
      if (listId) {
        history.push(getRedirectURL(listId, urlParameters));
      } else {
        dispatch(openLoginModal());
      }
      return false;
    }

    dispatch({
      type: CONTACT_HOST_OPEN,
      payload: {
        showContactHostModal: true
      }
    });

    return true;
  };
}

export function contactHostClose() {

  var root = document.getElementsByTagName('html')[0];
  root.classList.remove('scrollHidden');

  return async (dispatch, getState, { client }) => {
    dispatch(reset('ContactHostForm'));
    dispatch({
      type: CONTACT_HOST_CLOSE,
      payload: {
        showContactHostModal: false
      }
    });

    return true;
  };
}