import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Document from './Document';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Document Verification Management';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.documentVerificationManagementTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/document', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><Document title={title} /></AdminLayout>,
  };
}
