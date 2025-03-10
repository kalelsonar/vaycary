import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import renderTooltip from '../../../components/siteadmin/SiteSettingsForm/toolTipHelper.js';


import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CurrencyConverter from '../../CurrencyConverter';

import messages from '../../../locale/messages';

import s from '../ViewMessage.css';
class PaymentDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		userType: PropTypes.string.isRequired,
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		currency: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		serviceFees: PropTypes.shape({
			guest: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired,
			host: PropTypes.shape({
				type: PropTypes.string.isRequired,
				value: PropTypes.number.isRequired,
				currency: PropTypes.string.isRequired
			}).isRequired
		}).isRequired,
		base: PropTypes.string.isRequired,
		rates: PropTypes.object.isRequired
	};

	static defaultProps = {
		startDate: null,
		endDate: null,
		basePrice: 0,
		cleaningPrice: 0,
		monthlyDiscount: 0,
		weeklyDiscount: 0
	};

	render() {
		const { startDate, endDate, monthlyDiscount, weeklyDiscount, userType, reservationData } = this.props;
		const { formatMessage } = this.props.intl;

		function LinkWithTooltip({ id, children, href, tooltip }) {
			return (
				<OverlayTrigger
					overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
					placement="top"
					delayShow={300}
					delayHide={150}
				>
					{children}
				</OverlayTrigger>
			);
		}

		let guestServiceFee = 0, hostServiceFee = 0, taxPrice = 0, isDayTotal = 0, isCleaningPrice = 0, taxRateFee = 0;
		let isSpecialPricingAssinged = (reservationData && reservationData.bookingSpecialPricing.length > 0) ? true : false;
		let isDiscount, isDiscountType, momentStartDate, momentEndDate, dayDifference, priceForDays = 0, totalWithoutServiceFee = 0;
		let discount = 0, discountType, total = 0, hostEarnings = 0, isAverage = 0, currency = reservationData?.currency;

		if (startDate && endDate) {
			momentStartDate = moment(startDate);
			momentEndDate = moment(endDate);
			dayDifference = momentEndDate.diff(momentStartDate, 'days');

			if (dayDifference > 0) {
				if (isSpecialPricingAssinged) {
					reservationData?.bookingSpecialPricing && reservationData?.bookingSpecialPricing?.map((item, index) => {
						priceForDays = priceForDays + Number(item?.isSpecialPrice);
					});
				} else {
					priceForDays = Number(reservationData?.basePrice) * Number(dayDifference);
				}
			}
		}

		isAverage = Number(priceForDays) / Number(dayDifference);
		isDayTotal = isAverage.toFixed(2) * dayDifference;
		priceForDays = isDayTotal;

		isDiscount = reservationData?.discount;
		isDiscountType = reservationData?.discountType;
		isCleaningPrice = reservationData?.cleaningPrice;
		taxRateFee = reservationData?.taxRate && reservationData?.taxRate > 0 ? reservationData?.taxRate : 0;
		guestServiceFee = reservationData?.guestServiceFee;
		hostServiceFee = reservationData?.hostServiceFee;
		taxPrice = reservationData?.taxPrice;

		if (dayDifference >= 7) {
			if (monthlyDiscount > 0 && dayDifference >= 28) {
				discount = isDiscount;
				discountType = isDiscountType;
			} else {
				if (weeklyDiscount > 0) {
					discount = isDiscount;
					discountType = isDiscountType;
				}
			}
		}

		totalWithoutServiceFee = (priceForDays + isCleaningPrice) - discount;

		if (userType === 'host') {
			total = (priceForDays + isCleaningPrice + taxPrice) - discount;
		} else {
			total = (priceForDays + guestServiceFee + isCleaningPrice + taxPrice) - discount;
		}

		hostEarnings = total - hostServiceFee;

		return (
			<>
				<hr className={s.horizondalLine} />
				<h4 className={cx(s.tripDetailHeading, s.spaceBottom15)}>
					<span><FormattedMessage {...messages.payment} /></span>
				</h4>
				{
					<div className={cx(s.paymentDetailText, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<div className='tooltipFlex'>
								{
									isSpecialPricingAssinged &&
									<>{renderTooltip(formatMessage(messages.averagePricePerNight), 'commonTooltipIcon')}</>
								}
								<div className={cx('directionLtr')}>
									<CurrencyConverter
										amount={isAverage}
										from={currency}
									/>
									{' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
								</div>
							</div>
						</div>
						<div className={cx(s.textRight, 'textAlignLeftRtl')}>
							<span className={cx(s.txtBreak, 'darkModeTextWhite')}>
								<CurrencyConverter
									amount={priceForDays}
									from={currency}
								/>
							</span>
						</div>

					</div>
				}
				{
					isCleaningPrice > 0 && <div className={cx(s.paymentDetailText, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<span className='darkModeTextWhite'><FormattedMessage {...messages.cleaningFee} /></span>
						</div>
						<div className={cx(s.textRight, 'textAlignLeftRtl')}>
							<span className={cx(s.txtBreak, 'darkModeTextWhite')}>
								<CurrencyConverter
									amount={isCleaningPrice}
									from={currency}
								/>
							</span>
						</div>
					</div>
				}
				{
					discount > 0 && <div className={cx(s.paymentDetailText, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<span className='darkModeTextWhite'>{discountType}</span>
						</div>
						<div className={cx(s.textRight, s.discountText, 'textAlignLeftRtl')}>
							<span className={cx(s.txtBreak, 'darkModeTextWhite')}>
								- <CurrencyConverter
									amount={discount}
									from={currency}
								/>
							</span>
						</div>
					</div>
				}

				{
					userType === 'guest' && guestServiceFee > 0 && <div className={cx(s.paymentDetailText, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<span className='darkModeTextWhite'><FormattedMessage {...messages.serviceFee} /></span>
						</div>
						<div className={cx(s.textRight, 'textAlignLeftRtl')}>
							<span className={cx(s.txtBreak, 'darkModeTextWhite')}>
								<CurrencyConverter
									amount={guestServiceFee}
									from={currency}
								/>
							</span>
						</div>
					</div>
				}
				{
					taxPrice > 0 && <div className={cx(s.paymentDetailText, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<span className='darkModeTextWhite'><FormattedMessage {...messages.tax} /></span>
						</div>
						<div className={cx(s.textRight, 'textAlignLeftRtl')}>
							<span className={cx(s.txtBreak, 'darkModeTextWhite')}>
								<CurrencyConverter
									amount={taxPrice}
									from={currency}
								/>
							</span>
						</div>
					</div>
				}

				{
					userType === 'guest' && <hr className={s.horizondalLine} />
				}

				<Row className={cx({ [s.textBold]: userType === 'guest' }, { [s.paymentDetailText]: userType === 'host' })}>
					<Col xs={6} sm={6} className={cx(s.textLeft, 'textAlignRightRtl')}>
						<span className={cx({ [s.paymentTotal]: userType === 'guest' })}><FormattedMessage {...messages.subTotal} /></span>
					</Col>
					<Col xs={6} sm={6} className={cx(s.textRight, 'textAlignLeftRtl')}>
						<span className={cx({ [s.paymentTotal]: userType === 'guest' }, s.txtBreak)}>
							<CurrencyConverter
								amount={total}
								from={currency}
							/>
						</span>
					</Col>
				</Row>

				{
					userType === 'host' && hostServiceFee > 0 && <div className={cx(s.paymentDetailText, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<span className='darkModeTextWhite'><FormattedMessage {...messages.serviceFee} /></span>
						</div>
						<div className={cx(s.textRight, 'textAlignLeftRtl')}>
							<span className='darkModeTextWhite'>
								-
								<CurrencyConverter
									amount={hostServiceFee}
									from={currency}
								/>
							</span>
						</div>
					</div>
				}

				{
					userType === 'host' && <hr className={s.horizondalLine} />
				}


				{
					userType === 'host' && <div className={cx(s.textBold, s.paymentFlex)}>
						<div className={cx(s.textLeft, 'textAlignRightRtl')}>
							<span className={s.paymentTotal}><FormattedMessage {...messages.youEarn} /></span>
						</div>
						<div className={cx(s.textRight, 'textAlignLeftRtl')}>
							<span className={cx(s.paymentTotal, s.txtBreak)}>
								<CurrencyConverter
									amount={hostEarnings}
									from={currency}
								/>
							</span>
						</div>
					</div>
				}
			</>
		);
	}
}

const mapState = (state) => ({
	serviceFees: state.book.serviceFees,
	base: state.currency.base,
	rates: state.currency.rates
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentDetails)));

