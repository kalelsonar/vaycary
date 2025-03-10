import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';
import ViewInquiryRoutes from './ViewInquiryRoutes';

// const title = 'Inquiry Details';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.inquiryDetails);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/viewInquiry/', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }
    const id = params?.id;
    return {
        title,
        component: <AdminLayout><ViewInquiryRoutes id={Number(id)} /></AdminLayout>,
    };
}
