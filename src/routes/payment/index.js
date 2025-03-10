import React from 'react';
import Layout from '../../components/Layout';
import Payment from './Payment';
import NotFound from '../notFound/NotFound';
import messages from '../../locale/messages';

export default function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.payment);

  let isAuthenticated, reservationId, isBrowser;

  isAuthenticated = store.getState().runtime.isAuthenticated;
  reservationId = Number(params.reservationId);
  isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    window.onpageshow = function (event) {
      if (event.persisted || window?.performance?.navigation?.type == 2) {
        window.location.reload()
      }
    }
  };
  // Check authentication
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  // Check listId is provided
  if (!reservationId || isNaN(reservationId)) {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404
    };
  }

  return {
    title,
    component: <Layout><Payment title={title} reservationId={reservationId} /></Layout>,
  };
}
