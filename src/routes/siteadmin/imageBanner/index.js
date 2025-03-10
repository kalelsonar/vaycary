import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ImageBanner from './ImageBanner';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';


const title = 'Home page Banner';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.homePageBannerTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/home/banner', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><ImageBanner title={title} /></AdminLayout>,
  };
}
