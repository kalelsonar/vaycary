import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import TripsContainer from './TripsContainer';

const title = 'Trips';

export default function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.trips);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const type = params.type;
  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><TripsContainer userType="guest" type={type} /></UserLayout>,
  };
}
