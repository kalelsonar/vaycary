import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ListingPermission from './ListingPermission';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';


const title = 'Listing Request';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.listingApproval);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/listing-request', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><ListingPermission title={title} /></AdminLayout>,
  };
}
