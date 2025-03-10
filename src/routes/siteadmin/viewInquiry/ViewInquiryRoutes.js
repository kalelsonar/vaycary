import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import viewInquiryAdminQuery from './viewInquiryAdmin.graphql';
import s from './ViewInquiryAdmin.css'
import ViewInquiry from '../../../components/siteadmin/ViewInquiry/ViewInquiry';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ViewInquiryRoutes extends Component {

    render() {
        const { viewInquiryAdmin: { viewInquiryAdmin, refetch }, id } = this.props;
        if (viewInquiryAdmin === null) {
            return <div className={cx(s.pagecontentWrapper)}><NotFound /></div>
        }

        return (
            <div>
                <ViewInquiry
                    data={viewInquiryAdmin?.inquiries}
                    refetch={refetch}
                />
            </div>
        )
    }
};

export default compose(
    withStyles(s),
    graphql(viewInquiryAdminQuery,
        {
            name: 'viewInquiryAdmin',
            options: (props) => ({
                variables: {
                    id: props?.id,
                },
                fetchPolicy: 'network-only',
                ssr: false
            })
        }),
)(ViewInquiryRoutes);