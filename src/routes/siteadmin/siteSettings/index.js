import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import SiteSettings from './SiteSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Site Settings';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.siteSettings);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/settings/site', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><SiteSettings title={title} /></AdminLayout>,
  };
}
