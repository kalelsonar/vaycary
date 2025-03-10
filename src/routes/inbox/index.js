import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';
import InboxContainer from './InboxContainer';

const title = 'Inbox';

export default function action({ store, intl }) {

  const title = intl?.formatMessage(messages.inbox);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;

  if (!isAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: <UserLayout>
      <InboxContainer
        title={title}
      />
    </UserLayout>,
  };
}