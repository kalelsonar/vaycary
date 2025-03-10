import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import messages from '../../../../locale/messages';
import EditCancelPolicy from './EditCancelPolicy';

const title = 'Edit Cancel Policy';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.editCancelPolicyTab);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    const id = !params.id || isNaN(params.id.toString()) ? 0 : Number(params.id);

    return {
        title,
        component: <AdminLayout><EditCancelPolicy title={title} id={id} /></AdminLayout>,
    };
}
