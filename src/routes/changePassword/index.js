import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import ChangePasswordContainer from './ChangePasswordContainer';

const title = 'Change Password';

export default function action({ store, intl }) {

  const title = intl?.formatMessage(messages.changePasswordLabel);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><ChangePasswordContainer title={title} /></UserLayout>,
  };
}
