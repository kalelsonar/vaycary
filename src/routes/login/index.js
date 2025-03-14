import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import Login from './Login';

const title = 'Log In';

export default function action({ store, query, intl }) {

  const title = intl?.formatMessage(messages.logIn);

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;
  let warning = false;
  let refer = query.refer;

  if (refer && refer != null) {
    refer = refer.indexOf('------') >= 0 ? refer.replace('------', '?') : refer;
    refer = refer.indexOf('--') >= 0 ? refer.replace('--', '&') : refer;
  }

  if (isAuthenticated) {
    return { redirect: '/' };
  }

  if ('verification' in query) {
    warning = true;
  }

  return {
    title,
    component: <Layout><Login title={title} warning={warning} refer={refer} /></Layout>,
  };
}
