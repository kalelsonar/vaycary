import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import BannerSettings from './BannerSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Banner Settings';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.bannerSettingsTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/home/caption', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><BannerSettings title={title} /></AdminLayout>,
  };
}
