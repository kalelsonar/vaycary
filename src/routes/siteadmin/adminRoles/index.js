import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import AdminRoles from './AdminRoles';

const title = 'Manage Admin Roles';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.manageAdminRoles);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let isSuperAdmin = store.getState().runtime.isSuperAdmin;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  if (!isSuperAdmin) {
    return { redirect: '/siteadmin/login' };
  }

  return {
    title,
    component: <AdminLayout><AdminRoles title={title} /></AdminLayout>,
  };
}