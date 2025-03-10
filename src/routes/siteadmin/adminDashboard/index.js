import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import Dashboard from './Dashboard';

const title = 'Admin Dashboard';

export default function action({ store, intl }) {

  const title = intl?.formatMessage(messages.adminDashboardTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;


  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  return {
    title,
    component: <AdminLayout><Dashboard title={title} /></AdminLayout>,
  };
}