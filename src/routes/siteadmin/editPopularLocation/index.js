import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditPopularLocation from './EditPopularLocation';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Edit Popular Location';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.editPopularLocation);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/edit/popularlocation/', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }


    const locationId = Number(params.locationId);

    return {
        title,
        component: <AdminLayout><EditPopularLocation title={title} locationId={locationId} /></AdminLayout>,
    };
}
