import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ReportManagement from '../../../components/siteadmin/ReportManagement';
import Loader from '../../../components/Loader';

import reportUserQuery from './reportUserQuery.graphql';

import s from './ReportUser.css';
class ReportUser extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllReport: PropTypes.array,
        })
    };

    render() {
        const { reportUserManagement: { loading, reportUserManagement } } = this.props;

        return loading ? <Loader type={"text"} /> : <ReportManagement reportUserManagement={reportUserManagement} />;
    }
}

export default compose(
    withStyles(s),
    graphql(reportUserQuery, {
        name: 'reportUserManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    }),
)(ReportUser);
