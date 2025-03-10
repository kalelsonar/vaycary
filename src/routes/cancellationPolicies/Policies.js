import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Policies.css';

// Component
import CancellationPolicy from '../../components/CancellationPolicies';
import NotFound from '../notFound/NotFound';
import Loader from '../../components/Loader/Loader';

import getCancelPolicies from '../../routes/siteadmin/cancellationPolicies/getCancelPolicies.graphql';

class Policies extends React.Component {
	static propTypes = {
		policyType: PropTypes.string.isRequired,
	};

	static defaultProps = {
		policyType: 'Flexible'
	};

	render() {
		const { policyType } = this.props;
		const { data: { getCancelPolicies, loading } } = this.props;
		let isPolicyExists = !policyType ? true : getCancelPolicies && getCancelPolicies.results.some(item => item.policyName === policyType);

		return (
			<div className={s.root}>
				{loading && <Loader />}
				{!loading && !isPolicyExists && <NotFound />}
				{!loading && isPolicyExists && <CancellationPolicy policyType={policyType} data={getCancelPolicies && getCancelPolicies.results} />}
			</div>
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
)(Policies);