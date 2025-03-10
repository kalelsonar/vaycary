import React from 'react';

import AdminLayout from '../../../components/Layout/AdminLayout';
import ReportUser from './ReportUser';

import { restrictUrls } from '../../../helpers/adminPrivileges';

import messages from '../../../locale/messages';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.reportUserMessage);

    // From Redux Store
    let isAdminAuthenticated, adminPrivileges;
    isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/reportUser', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><ReportUser title={title} /></AdminLayout>,
    };
}
