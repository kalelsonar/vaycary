import React from 'react';
import getCancellationData from '../../../actions/siteadmin/getCancellationData';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';
import Cancellation from './Cancellation';

const title = 'Cancel';

export default async function action({ store, intl, params }) {

    const title = intl?.formatMessage(messages.deSelect);
    // From Redux Store
    let reservationId = params?.reservationId;
    let userType = params?.userType;
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;
    await store.dispatch(getCancellationData(reservationId, userType))

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }
    // Admin restriction
    if (!restrictUrls('/siteadmin/cancel', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><Cancellation id={reservationId} userType={userType} /></AdminLayout>,
    };
}
