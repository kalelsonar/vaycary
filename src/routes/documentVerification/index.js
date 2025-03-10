import React from 'react';
import Layout from '../../components/Layout';

import UserLayout from '../../components/Layout/UserLayout';
import messages from '../../locale/messages';

import DocumentVerification from './DocumentVerification';

const title = 'DocumentVerification';

export default function action({ store, intl }) {

  // From Redux Store
  let isAuthenticated = store.getState().runtime.isAuthenticated;

  const title = intl?.formatMessage(messages.documentVerificationTab);


  if (!isAuthenticated) {
    return { redirect: '/login' };
  }


  let account = store.getState().account;

  if (account) {
    let document = account.data.verification.isIdVerification;
    if (document == 1) {
      return { redirect: '/user/verification' };
    }
  }

  return {
    title,
    component: <UserLayout><DocumentVerification title={title} /></UserLayout>,
  };
}


