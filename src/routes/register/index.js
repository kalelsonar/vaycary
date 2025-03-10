import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import Register from './Register';

const title = 'New User Registration';

export default function action({ store, intl, query }) {

  const title = intl?.formatMessage(messages.registerUser);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let refer = query.refer;

  if (isAuthenticated) {
    return { redirect: '/' };
  }

  return {
    title,
    component: <Layout><Register title={title} refer={refer} /></Layout>,
  };
}
