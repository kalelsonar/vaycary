import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import PopularLocation from './PopularLocation';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Popular Locations';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.popularLocation);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/popularlocation', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: <AdminLayout><PopularLocation title={title} /></AdminLayout>,
    };
}
