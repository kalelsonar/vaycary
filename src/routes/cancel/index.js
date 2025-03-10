import React from 'react';
import Layout from '../../components/Layout';
import Cancel from './Cancel';
import NotFound from '../notFound/NotFound';
import messages from '../../locale/messages';

export default function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.cancel);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;

  // From URL
  const reservationId = params.reservationId;
  const userType = params.type;

  let isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload()
      }
    }
  };

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (reservationId === undefined || isNaN(reservationId) || (userType != 'host' && userType != 'guest')) {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404,
    };
  }

  return {
    title,
    component: <Layout><Cancel reservationId={Number(reservationId)} userType={userType} /></Layout>,
  };
}