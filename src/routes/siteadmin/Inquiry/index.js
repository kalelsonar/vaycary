import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';
import Inquiry from './Inquiry';

const title = 'Inquiry';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.panelInquiry);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }
    // Admin restriction
    if (!restrictUrls('/siteadmin/inquiry', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><Inquiry title={title} /></AdminLayout>,
    };
}
