import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Reservations from './Reservations';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';


const title = 'Reservations';

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.panelReservation);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/reservations', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><Reservations title={title} /></AdminLayout>,
  };
}
