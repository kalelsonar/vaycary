import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import CurrencyConverter from '../../CurrencyConverter';
import messages from '../../../locale/messages';
class CompletedTransactionPayout extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		data: PropTypes.shape({
			amount: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			createdAt: PropTypes.string.isRequired,
			payoutEmail: PropTypes.string.isRequired,
			formatMessage: PropTypes.any,
		})
	};

	render() {
		const { className, data, dateMinWidth } = this.props;
		const { formatMessage } = this.props.intl;
		let date = data?.createdAt != null ? moment(data?.createdAt).format('MM-DD-YYYY') : '';

		return (
			<tr>
				<td data-label={formatMessage(messages.transferDate)} className={cx(className, dateMinWidth, 'textAlignRightRtl')}>{date}</td>
				<td data-label={formatMessage(messages.transferType)} className={cx(className, 'textAlignRightRtl')}><FormattedMessage {...messages.transactionPayout} /></td>
				<td data-label={formatMessage(messages.details)} className={cx(className, 'textAlignRightRtl')}><FormattedMessage {...messages.transferTo} /> {data.payoutEmail}</td>
				<td data-label={formatMessage(messages.transferAmount)} className={'textCenterEmtyData'}>
					{'-'}
				</td>
				<td data-label={formatMessage(messages.paidOut)} className={cx(className, 'textAlignRightRtl')}>
					<CurrencyConverter
						amount={data?.amount}
						from={data?.currency}
					/>
				</td>
			</tr>
		);
	}
}

export default injectIntl(CompletedTransactionPayout);
