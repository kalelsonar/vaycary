import React from 'react';
import Layout from '../../components/Layout';
import WriteReview from './WriteReview';
import NotFound from '../notFound/NotFound';
import messages from '../../locale/messages';

const title = 'Write Review';

export default async function action({ store, intl, params }) {

  const title = intl?.formatMessage(messages.writeReviewTab);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const reservationId = params.reservationId;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (reservationId === undefined || isNaN(reservationId)) {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404
    };
  }

  return {
    title,
    component: <Layout><WriteReview reservationId={Number(reservationId)} /></Layout>,
  };
}
