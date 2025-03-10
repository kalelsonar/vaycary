import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import Profile from './Profile';
import messages from '../../locale/messages';

export default async function action({ params, intl, store }) {
  const title = intl?.formatMessage(messages.userProfile);
  const data = store.getState().account.data;
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const profileId = params.profileId;
  let profile = 0, isUser = false, hideMenu = false;

  if (profileId) {
    profile = Number(profileId);
    if (isAuthenticated && data && Number(data.profileId) == Number(profileId)) {
      profile = Number(profileId);
      isUser = true;
      hideMenu = false;
    } else hideMenu = true;
  }

  return {
    title,
    component:
      <UserLayout hideMenu={hideMenu}>
        <Profile
          title={title}
          isUser={isUser}
          profileId={profile}
        />
      </UserLayout>,
  };

};
