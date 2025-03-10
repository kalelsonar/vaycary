import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import AddReviewsWhyHost from './AddReviewsWhyHost';
import { restrictUrls } from '../../../../helpers/adminPrivileges'
import messages from '../../../../locale/messages';

const title = 'Add a new review';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.addNewReviewTab);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    if (!restrictUrls('/siteadmin/whyHost/review', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><AddReviewsWhyHost title={title} /></AdminLayout>,
    };
}
