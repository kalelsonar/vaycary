import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';

const title = 'Admin Page';
const isAdmin = false;

export default async function action({ intl }) {

  const title = intl?.formatMessage(messages.adminPage);

  if (!isAdmin) {
    return { redirect: '/login' };
  }

  const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

  return {
    title,
    component: <Layout><Admin title={title} /></Layout>,
  };
}
