import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ProfileView from './ProfileView';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import { checkListing } from '../../../actions/Listing/checkListing';
import messages from '../../../locale/messages';

const title = 'Profile Verified View';

export default async function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.profileVerifiedViewTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;
  const profileId = params.profileId;
  let response;
  await store.dispatch(checkListing(profileId, 'profile')).then(function (res) {
    response = res;
  });

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  if (response == false) {
    return { redirect: '/siteadmin/users' };
  }

  const data = store.getState().account.data;
  let profile = 0;
  let isUser = false;
  if (profileId === null || profileId === undefined) {
    if (data) {
      isUser = true;
    }
  } else {
    profile = Number(profileId);
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/profile-view/', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><ProfileView title={title} profileId={profile} /></AdminLayout>,
  };
}
