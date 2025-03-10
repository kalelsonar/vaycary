import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import UserReviews from './UserReviews';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';


const title = 'Users Reviews';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.usersReviewsTab);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/user-reviews', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><UserReviews title={title} /></AdminLayout>,
    };
}
