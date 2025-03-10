import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';
import FailedPayout from './FailedPayout';

const title = 'Failed Payout';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.failedPayoutTab);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    if (!restrictUrls('/siteadmin/failed-payout/', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = params.id;
    return {
        title,
        component: <AdminLayout><FailedPayout title={title} id={Number(id)} /></AdminLayout>
    }
}