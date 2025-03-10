import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import Currency from './Currency';

const title = 'Currency Management';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.currencyManagementTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let isSuperAdmin = store.getState().runtime.isSuperAdmin

  if (!isAdminAuthenticated || !isSuperAdmin) {
    return { redirect: '/siteadmin/login' };
  }

  return {
    title,
    component: <AdminLayout><Currency title={title} /></AdminLayout>,
  };
}
