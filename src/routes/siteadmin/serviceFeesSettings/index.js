import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ServiceFeesSettings from './ServiceFeesSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';


const title = 'Service Fees Settings';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.serviceFeesSettingsTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/settings/servicefees', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><ServiceFeesSettings title={title} /></AdminLayout>,
  };
}