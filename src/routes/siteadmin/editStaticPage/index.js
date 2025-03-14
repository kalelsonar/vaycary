import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditStaticPage from './EditStaticPage';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import messages from '../../../locale/messages';

const title = 'Edit Page Details';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.editPageDetails);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/edit/staticpage/', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const pageId = Number(params.pageId);

    return {
        title,
        component: <AdminLayout><EditStaticPage title={title} pageId={pageId} /></AdminLayout>,
    };
}
