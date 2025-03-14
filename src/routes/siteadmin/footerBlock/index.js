import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FooterBlock from './FooterBlock';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Footer Block';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.footerBlockLabel);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/home/footer-block', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><FooterBlock title={title} /></AdminLayout>,
  };
}
