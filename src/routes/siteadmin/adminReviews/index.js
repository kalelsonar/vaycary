import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AdminReviews from './AdminReviews';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';


const title = 'Admin Reviews';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.adminReviews);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/reviews', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><AdminReviews title={title} /></AdminLayout>,
    };
}
