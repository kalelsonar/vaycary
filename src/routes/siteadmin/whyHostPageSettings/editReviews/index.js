import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import EditReviewsWhyHost from './EditReviewsWhyHost';
import { restrictUrls } from '../../../../helpers/adminPrivileges'
import messages from '../../../../locale/messages';

const title = 'Edit Why Become Host Block 2';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.editWhyBecomeHostBlock2Tab);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    if (!restrictUrls('/siteadmin/whyHost/review', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const reviewId = Number(params.id);

    return {
        title,
        component: <AdminLayout><EditReviewsWhyHost title={title} reviewId={reviewId} /></AdminLayout>,
    };
}
