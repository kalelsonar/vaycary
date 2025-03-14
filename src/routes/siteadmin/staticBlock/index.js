import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import StaticBlock from './StaticBlock';
import { getStaticBlockInfo } from '../../../actions/siteadmin/getStaticBlockInfo';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Static Info Block';

export default async function action({ store, dispatch, intl }) {

  const title = intl?.formatMessage(messages.staticInfoBlock);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  await store.dispatch(getStaticBlockInfo())

  if (!isAdminAuthenticated) {
    return { redirect: '/siteadmin/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/home/static-info-block', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: <AdminLayout><StaticBlock title={title} /></AdminLayout>,
  };
}
