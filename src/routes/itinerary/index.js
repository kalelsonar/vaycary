import React from 'react';
import ItineraryContainer from './ItineraryContainer';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';
import messages from '../../locale/messages';

const title = 'Itinerary';

export default async function action({ store, intl, params }) {

  const title = intl?.formatMessage(messages.itineraryTab);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const reservationId = params.reservationId;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  if (!reservationId) {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      status: 404
    };
  }

  return {
    title,
    component: <Layout><ItineraryContainer title={title} reservationId={Number(reservationId)} /></Layout>,
  };
}
