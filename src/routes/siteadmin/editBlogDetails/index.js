import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import messages from '../../../locale/messages';
import EditBlogDetails from './EditBlogDetails';

const title = 'Edit Page Details';

export default async function action({ store, params, intl }) {

    const title = intl?.formatMessage(messages.editPageDetails);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

    if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
    }

    const blogId = !params.blogId || isNaN(params.blogId.toString()) ? 0 : Number(params.blogId);

    return {
        title,
        component: <AdminLayout><EditBlogDetails title={title} blogId={blogId} /></AdminLayout>,
    };
}
