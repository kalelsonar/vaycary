import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import renderTooltip from '../../components/siteadmin/SiteSettingsForm/toolTipHelper.js';


import CurrencyConverter from '../CurrencyConverter';

import messages from '../../locale/messages';

import Faq from '/public/SiteIcons/question.svg'

import s from './Payment.css';
class PaymentDetails extends Component {
	static propTypes = {
		checkIn: PropTypes.string.isRequired,
		checkOut: PropTypes.string.isRequired,
		total: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number.isRequired,
		discount: PropTypes.number,
		discountType: PropTypes.string,
		serviceFee: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		taxPrice: PropTypes.number
	};

	render() {
		const { formatMessage } = this.props.intl;
		const { checkIn, checkOut, basePrice, cleaningPrice, taxPrice, total } = this.props;
		const { discount, discountType, serviceFee, currency } = this.props;
		let momentStartDate, momentEndDate, dayDifference, priceForDays;

		console.log(serviceFee,'serviceFee');

		if (checkIn && checkOut) {
			momentStartDate = moment(checkIn);
			momentEndDate = moment(checkOut);
			dayDifference = momentEndDate.diff(momentStartDate, 'days');
			priceForDays = Number(basePrice) * Number(dayDifference);
		}
		let subTotal = total + serviceFee;

		return (
			<div>
				<div>
					<h3 className={cx(s.pricingTitle, 'rtlBookText')}><FormattedMessage {...messages.priceDetails} /></h3>
					<div className={cx(s.grid, 'textWhite')}>
						<div className='tooltipFlex'>
							<>{renderTooltip(formatMessage(messages.averagePricePerNight), 'commonTooltipIcon')}</>
							<div className={cx(s.specialPriceText, 'directionLtrTextRight')}>
								<CurrencyConverter
									amount={basePrice}
									from={currency}
								/>
								{' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
							</div>
						</div>
						<div>
							<CurrencyConverter
								amount={priceForDays}
								from={currency}
							/>
						</div>

					</div>
					{
						cleaningPrice > 0 && <div className={cx(s.grid, 'textWhite')}>
							<div><FormattedMessage {...messages.cleaningFee} /></div>
							<div>
								<CurrencyConverter
									amount={cleaningPrice}
									from={currency}
								/>
							</div>
						</div>
					}
					<div className={cx(s.grid, 'textWhite')}>
						<div><FormattedMessage {...messages.serviceFee} /></div>
						<div>
							<CurrencyConverter
								amount={serviceFee}
								from={currency}
							/>
						</div>
					</div>
					{
						taxPrice > 0 && <div className={cx(s.grid, 'textWhite')}>
							<div><FormattedMessage {...messages.tax} /></div>
							<div>
								<CurrencyConverter
									amount={taxPrice}
									from={currency}
								/>
							</div>
						</div>
					}
					{
						discount > 0 && <div className={cx(s.grid, 'textWhite')}>
							<div>{discountType}</div>
							<div>
								- <CurrencyConverter
									amount={discount}
									from={currency}
								/>

							</div>
						</div>
					}
					<div className={cx(s.grid, s.totalValue, 'textWhite')}>
						<div><FormattedMessage {...messages.total} /></div>
						<div> <CurrencyConverter
							amount={subTotal}
							from={currency}
						/></div>
					</div>

				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s)(PaymentDetails));
