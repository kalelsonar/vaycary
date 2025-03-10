import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import UserBanned from './UserBanned';

const title = 'User Banned';

export default function action({ intl }) {
  const title = intl?.formatMessage(messages.userBanTab);
  return {
    title,
    component: <Layout><UserBanned title={title} /></Layout>,
    status: 404,
  };
}
