import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ReceiptContainer from './ReceiptContainer';
import Layout from '../../../components/Layout';
import messages from '../../../locale/messages';

const title = 'View Receipt';

export default async function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.viewReceipt);

  // From Redux Store
  const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  const data = store.getState().reservation.data;
  //const reservationId = params.reservationId;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  if (!data) {
    return { redirect: '/siteadmin/reservations' };
  }

  return {
    title,
    component: <Layout><ReceiptContainer title={title} data={data} /></Layout>,
  };
}
