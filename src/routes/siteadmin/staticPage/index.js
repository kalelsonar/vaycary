import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import StaticPage from './StaticPage';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Static Content Page Management';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.staticPageManagement);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/staticpage/management', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><StaticPage title={title} /></AdminLayout>,
    };
}
