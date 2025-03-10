import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import messages from '../../../locale/messages';
import s from '../Transaction.css';
class GrossEarningItem extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		data: PropTypes.shape({
			id: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
			guestServiceFee: PropTypes.number.isRequired,
			hostServiceFee: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			listData: PropTypes.shape({
				title: PropTypes.string.isRequired
			}).isRequired,
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired
			}).isRequired,
			hostTransaction: PropTypes.shape({
				createdAt: PropTypes.string.isRequired
			}).isRequired,
		})
	};

	render() {
		const { className, data } = this.props;
		const { formatMessage } = this.props.intl;
		let date = data?.hostTransaction != null ? moment(data?.hostTransaction?.createdAt).format('MM-DD-YYYY') : <FormattedMessage {...messages.messageStatus5} />;
		let checkInDate = data?.checkIn != null ? moment(data?.checkIn).format('MMM DD, YYYY') : '';
		let checkOutDate = data?.checkOut != null ? moment(data?.checkOut).format('MMM DD, YYYY') : '';
		let totalAmount = Number(data?.total) - Number(data?.hostServiceFee), currency = data.currency;
		let payoutAmount = data?.cancellationDetails;
		if (payoutAmount) {
			totalAmount = payoutAmount?.payoutToHost || 0;
			currency = payoutAmount?.currency;
		}
		return (
			<tr>
				<td data-label={formatMessage(messages.transferDate)} className={cx(className, 'textAlignRightRtl')}>{totalAmount > 0 ? date : <FormattedMessage {...messages.closedLabel} />}</td>
				<td data-label={formatMessage(messages.transferType)} className={cx(className, 'textAlignRightRtl')}><FormattedMessage {...messages.reservation} /></td>
				<td data-label={formatMessage(messages.details)} className={cx(className, 'textAlignRightRtl')}>
					<ul className={cx(s.listLayout, 'listLayoutRTL')}>
						<li>{checkInDate} - {checkOutDate}</li>
						<li>{data?.listData && <Link to={"/users/trips/receipt/" + data.id} className={s.linkText}>{data.confirmationCode}</Link>}</li>
						<li>{!data?.listData && <span>{data?.confirmationCode}</span>}</li>
					</ul>
				</td>
				<td data-label={formatMessage(messages.grossEarnings)} className={cx(className, 'textAlignRightRtl')}>
					<CurrencyConverter
						amount={totalAmount > 0 ? totalAmount : 0}
						from={currency}
					/>
				</td>
			</tr>
		);
	}
}

export default injectIntl(withStyles(s)(GrossEarningItem));
