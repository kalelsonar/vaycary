import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditCancelPolicy.css';

// Component
import EditCancellation from '../../../../components/siteadmin/CancellationPolicy/EditCancellation';
import NotFound from '../../../notFound/NotFound';
import Loader from '../../../../components/Loader';

// Query
import getCancelPolicy from './getCancelPolicy.graphql';


class EditCancelPolicy extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    };

    static defaultProps = {
        data: {
            loading: true
        },
    };


    render() {
        const { data: { loading, getCancelPolicy }, title } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        } else if (!getCancelPolicy || !getCancelPolicy.result) {
            return <div className={cx(s.pagecontentWrapper)}><NotFound /></div>
        } 
        else {
            return <EditCancellation
                title={title} initialValues={getCancelPolicy && getCancelPolicy.result}
            />
        }
    }
}

export default compose(
    withStyles(s),
    graphql(getCancelPolicy, {
        options: (props) => ({
            variables: {
                id: props.id,
            },
            fetchPolicy: 'network-only'
        })
    }),
)(EditCancelPolicy);