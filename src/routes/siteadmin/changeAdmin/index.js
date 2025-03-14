import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import ChangeAdmin from './ChangeAdmin';

const title = 'Change Admin Email/Password';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.changeAdminEmailPassword);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  return {
    title,
    component: <AdminLayout><ChangeAdmin title={title} /></AdminLayout>,
  };

}
