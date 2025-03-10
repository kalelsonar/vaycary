import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NoTransaction from '../NoTransaction';
import CompletedTransactionItem from './CompletedTransactionItem';
import CompletedTransactionPayout from './CompletedTransactionPayout';
import CommonTable from '../../CommonTable/CommonTable';
import CurrencyConverter from '../../CurrencyConverter/CurrencyConverter';
import Link from '../../Link/Link';

import messages from '../../../locale/messages';

import s from '../Transaction.css';
class CompletedTransactions extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		data: PropTypes.arrayOf(PropTypes.shape({
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			listData: PropTypes.shape({
				title: PropTypes.string.isRequired
			}),
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired
			}),
			hostTransaction: PropTypes.shape({
				payoutId: PropTypes.number,
				payEmail: PropTypes.string,
				amount: PropTypes.number,
				currency: PropTypes.string,
				createdAt: PropTypes.string
			})
		}))
	};

	static defaultProps = {
		data: []
	};

	thead = () => {
		const { formatMessage } = this.props.intl;
		return [
			{ data: formatMessage(messages.transferDate) },
			{ data: formatMessage(messages.transferType) },
			{ data: formatMessage(messages.details) },
			{ data: formatMessage(messages.transferAmount) },
			{ data: formatMessage(messages.paidOut) },
		]
	};

	tbody = (props) => {
		const { data } = props;
		let date, checkInDate, checkOutDate, totalAmount, payoutAmount, currency;
		let completeData = [], dateMinWidth = 'dateMinWidth';

		if (data?.length > 0) {
			data?.map((item) => {
				if (item?.hostTransaction) {
					completeData?.push(item?.hostTransaction);
				}
				completeData?.push(item);
			});
		}

		return completeData?.map((item, index) => {
			if (item?.checkIn != undefined) {
				date = item?.createdAt != null ? moment(item?.createdAt).format('MM-DD-YYYY') : 'Pending';
				checkInDate = item?.checkIn != null ? moment(item?.checkIn).format('MMM DD, YYYY') : '';
				checkOutDate = item?.checkOut != null ? moment(item?.checkOut).format('MMM DD, YYYY') : '';
				totalAmount = Number(item?.total) - Number(item?.hostServiceFee);
				payoutAmount = item?.cancellationDetails;
				currency = item?.currency;
				if (payoutAmount) {
					totalAmount = payoutAmount?.payoutToHost || 0;
					currency = payoutAmount?.currency;
				}

				return {
					id: index,
					data: [
						{
							data: <div className={cx('dateMinWidth', 'textAlignRightRtl')}>{date}</div>
						},
						{
							data: <FormattedMessage {...messages.reservation} />
						},
						{
							data:
								<ul className={cx(s.listLayout, 'listLayoutRTL')}>
									<li>
										{item?.guestData ? item?.guestData?.firstName : ''}
									</li>
									<li className={s.linkText}>
										{item?.listData ? <Link to={"/rooms/" + item?.listData?.id} className={s.linkText}>{item?.listTitle ? item?.listTitle : item?.listData?.title}</Link> : ''}
									</li>
									<li>
										{checkInDate} - {checkOutDate}
									</li>
									<li>
										{item?.listData && <Link to={"/users/trips/receipt/" + item?.id} className={s.linkText}>{item?.confirmationCode}</Link>}
									</li>
									<li>
										{!item?.listData && <span>{item?.confirmationCode}</span>}
									</li>
								</ul>
						},
						{
							data: <CurrencyConverter
								amount={totalAmount}
								from={currency}
								className={s.currencyColor}
							/>
						},
						{
							data: <span className={cx('textCenterEmtyData')}>{'-'}</span>
						}
					]
				}
			} else {
				date = item?.createdAt != null ? moment(item?.createdAt).format('MM-DD-YYYY') : '';
				return {
					id: index,
					data: [
						{
							data: <div className={cx('dateMinWidth', 'textAlignRightRtl')}>{date}</div>
						},
						{
							data: <FormattedMessage {...messages.transactionPayout} />
						},
						{
							data: <div><div><FormattedMessage {...messages.transferTo} /></div><div> {item?.payoutEmail}</div> </div>
						},
						{
							data: <div>{'-'}</div>
						},
						{
							data: <CurrencyConverter
								amount={item?.amount}
								from={item?.currency}
							/>
						},
					]
				}
			}
		})
	}

	render() {
		const { data, totalCount } = this.props;
		const { formatMessage } = this.props.intl;

		return (
			<div>
				<div>
					{
						data?.length > 0 &&
						<CommonTable
							thead={this.thead}
							tbody={() => this.tbody(this.props)}
						/>
					}
				</div>
				{
					(data?.length === 0 || totalCount == 0) &&
					<div className={s.spaceMargin}>
						<NoTransaction type={'noTransactions'} noText={formatMessage(messages.noTransactionComplete)} />
					</div>
				}
			</div>
		);
	}
}

export default injectIntl(withStyles(s)(CompletedTransactions));
