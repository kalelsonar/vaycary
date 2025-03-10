import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import CancellationPolicyManagement from '../../../components/siteadmin/CancellationPolicy/CancellationPolicyManagement';

import getCancelPolicies from './getCancelPolicies.graphql';

import s from './CancellationPolicies.css';
class CancellationPolicies extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getCancelPolicies: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {

        const { data: { getCancelPolicies } } = this.props;
        return (
            <CancellationPolicyManagement
                data={getCancelPolicies}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(getCancelPolicies,
        {
            options: {
                fetchPolicy: 'network-only',
                ssr: false
            }
        }),
)(CancellationPolicies);