import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import UserEditReviews from './UserEditReviews';

const title = 'Management Reviews';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.managementReviews);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    const reviewId = Number(params.reviewId);

    return {
        title,
        component: <AdminLayout><UserEditReviews title={title} reviewId={reviewId} /></AdminLayout>,
    };
}
