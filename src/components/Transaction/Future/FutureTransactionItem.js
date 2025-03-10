import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CurrencyConverter from '../../CurrencyConverter';
import Payouts from '../Payouts';
import Link from '../../Link';
import messages from '../../../locale/messages';
import s from '../Transaction.css';
import bt from '../../../components/commonStyle.css';
class FutureTransactionItem extends Component {
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
			payoutId: PropTypes.number,
			listData: PropTypes.shape({
				title: PropTypes.string.isRequired
			}).isRequired,
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired
			}).isRequired,
		})
	};

	render() {
		const { className, data } = this.props;
		const { formatMessage } = this.props.intl;
		let date = data?.checkOut != null ? moment(data?.checkOut).add(1, 'days').format('MM-DD-YYYY') : 'Pending';
		let checkInDate = data?.checkIn != null ? moment(data?.checkIn).format('MMM DD, YYYY') : '';
		let checkOutDate = data?.checkOut != null ? moment(data?.checkOut).format('MMM DD, YYYY') : '';
		let totalAmount = Number(data?.total) - Number(data?.hostServiceFee);
		let payoutAmount = data?.cancellationDetails, currency = data?.currency;
		if (payoutAmount) {
			totalAmount = payoutAmount?.payoutToHost || 0;
			currency = payoutAmount?.currency;
		}

		return (
			<tr>
				<td data-label={formatMessage(messages.transferDate)} className={cx(className, 'dateMinWidth', 'textAlignRightRtl')}>{date}</td>
				<td data-label={formatMessage(messages.transferType)} className={cx(className, 'textAlignRightRtl')}><FormattedMessage {...messages.reservation} /></td>
				<td data-label={formatMessage(messages.details)} className={cx(className, 'textAlignRightRtl')}>
					<ul className={cx(s.listLayout, 'listLayoutRTL')}>
						<li>
							{data?.guestData ? data?.guestData?.firstName : ''}
						</li>
						<li className={s.linkText}>
							{data?.listData ? <Link to={"/rooms/" + data?.listData?.id} className={s.linkText}>{data?.listTitle ? data?.listTitle : (data?.listData ? data?.listData?.title : "")}</Link> : ''}
						</li>
						<li>
							{checkInDate} - {checkOutDate}
						</li>
						<li>
							{!data.listData && <span>{data?.confirmationCode}</span>}
						</li>
						<li>
							{data?.listData && <Link to={"/users/trips/receipt/" + data?.id} className={s.linkText}>{data?.confirmationCode}</Link>}
						</li>
					</ul>
				</td>
				<td data-label={formatMessage(messages.payTo)} className={cx(className, 'textAlignRightRtl')}>
					<Payouts
						reservationId={data?.id}
						type={"change"}
						defaultLabel={formatMessage(messages.default)}
						enableAddPayout
						defaultValue={data?.payoutId}
						className={cx(s.formWidth, s.futureSelect, bt.commonControlSelect, 'commonControlSelectPayoutRTL')}
					/>
				</td>
				<td data-label={formatMessage(messages.transferAmount)} className={cx(className, 'textAlignRightRtl')} >
					<CurrencyConverter
						amount={totalAmount > 0 ? totalAmount : 0}
						from={currency}
						className={s.currencyColor}
					/>
				</td>
			</tr>
		);
	}
}

export default injectIntl(withStyles(s, bt)(FutureTransactionItem));