import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';
import PayoutManagement from './PayoutManagement';

const title = 'Payout Management';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.payoutManagementTab);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/payout', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><PayoutManagement title={title} /></AdminLayout>
    }
}