import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditUser from './EditUser';
import fetch from '../../../core/fetch';
import NotFound from '../../notFound/NotFound';
import messages from '../../../locale/messages';

const title = 'Edit User';

export default async function action({ store, params, intl }) {

  const title = intl?.formatMessage(messages.editUserTab);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  const profileId = Number(params.profileId);

  return {
    title,
    component: <AdminLayout><EditUser title={title} profileId={profileId} /></AdminLayout>,
  };
}
