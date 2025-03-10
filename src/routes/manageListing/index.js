import React from 'react';
import ManageListing from './ManageListing';
import UserLayout from '../../components/Layout/UserLayout';
import { getListingSteps, resetListingSteps } from '../../actions/getListingSteps';
import messages from '../../locale/messages';

const title = "Manage Listing";

export default async function action({ store, intl }) {

  const title = intl?.formatMessage(messages.manageListingTab);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;

  store.dispatch(resetListingSteps());
  await store.dispatch(getListingSteps());

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout><ManageListing /></UserLayout>,
  };
}
