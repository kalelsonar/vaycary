import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import ReservationContainer from './ReservationContainer';

const title = 'Reservation';

export default function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.reservation);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const type = params.type;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><ReservationContainer userType={"host"} type={type} /></UserLayout>,
  };
}
