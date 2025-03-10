import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import EditReview from './EditReview';

const title = 'Admin Reviews';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.adminReviews);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    const reviewId = Number(params.reviewId);

    return {
        title,
        component: <AdminLayout><EditReview title={title} reviewId={reviewId} /></AdminLayout>,
    };
}
