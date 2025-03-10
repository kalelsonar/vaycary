import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import CancellationPolicies from './CancellationPolicies';

import messages from '../../../locale/messages';

export default async function action({ store, intl }) {

    const title = intl?.formatMessage(messages.cancellationPoliciesManagementTab);

    return {
        title,
        component: <AdminLayout><CancellationPolicies title={title} /></AdminLayout>,
    };
}
