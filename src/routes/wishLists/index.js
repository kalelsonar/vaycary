/* Plugin. */
import React from 'react';

//Components.
import WishLists from './WishLists';
import Layout from '../../components/Layout';

//Action and helpers.
import messages from '../../locale/messages';

export default function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.wishLists);

  // From Redux Store
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  let profileId, wishListId;

  if (!isAuthenticated) return { redirect: '/login' };

  if (isAuthenticated) profileId = store.getState().account.data.profileId;

  if (params && params.id) wishListId = params.id;

  return {
    title,
    component:
      <Layout>
        <WishLists
          profileId={profileId}
          wishListId={wishListId}
        />
      </Layout>,
  };
}
