import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
import {
	Row,
	Col,
	Panel,
	Tooltip,
	OverlayTrigger,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import renderTooltip from '../../components/siteadmin/SiteSettingsForm/toolTipHelper.js';

// Component
import CurrencyConverter from '../CurrencyConverter';
import Link from '../Link';
import NotFound from '../../routes/notFound/NotFound';

// Helper
import { generateTime } from './helper';
// Locale
import messages from '../../locale/messages';
import ListNotFound from '../../routes/listNotFound/ListNotFound';

//Images
import Faq from '/public/SiteIcons/question.svg';
import priceIcon from '/public/SiteIcons/printIcon.svg';
import dateIcon from '/public/SiteIcons/viewReceiptArrow.svg';

import bt from '../../components/commonStyle.css';
import s from './Receipt.css';

class PaymentReceipt extends React.Component {

	static propTypes = {
		formatMessage: PropTypes.any,
		siteName: PropTypes.string.isRequired,
		data: PropTypes.shape({
			id: PropTypes.number.isRequired,
			listId: PropTypes.number.isRequired,
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			basePrice: PropTypes.number.isRequired,
			cleaningPrice: PropTypes.number.isRequired,
			taxPrice: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
			discount: PropTypes.number.isRequired,
			discountType: PropTypes.string,
			guestServiceFee: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			createdAt: PropTypes.string.isRequired,
			updatedAt: PropTypes.string.isRequired,
			listData: PropTypes.shape({
				id: PropTypes.number.isRequired,
				title: PropTypes.string.isRequired,
				street: PropTypes.string.isRequired,
				city: PropTypes.string.isRequired,
				state: PropTypes.string.isRequired,
				country: PropTypes.string.isRequired,
				zipcode: PropTypes.string.isRequired,
				listingData: PropTypes.shape({
					checkInStart: PropTypes.string.isRequired,
					checkInEnd: PropTypes.string.isRequired
				}),
				settingsData: PropTypes.arrayOf(PropTypes.shape({
					id: PropTypes.number,
					listsettings: PropTypes.shape({
						itemName: PropTypes.string.isRequired
					})
				}))
			}),
			hostData: PropTypes.shape({
				firstName: PropTypes.string.isRequired,

			}),
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired,
			}),
			bookingSpecialPricing: PropTypes.array,
		})
	};

	static defaultProps = {
		data: null
	};

	print() {
		window.print();
	}

	render() {
		const { data, siteName, userId } = this.props;
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

		if (data === null) {
			return <NotFound />
		} else if (data.listData === null) {
			return <ListNotFound />
		} else if (data.paymentState !== "completed") {
			return <NotFound />
		} else {
			const { data, data: { id, listId, checkIn, checkOut, confirmationCode, listTitle, createdAt, updatedAt, hostId, guestId } } = this.props;
			const { data: { basePrice, cleaningPrice, total, discount, discountType, guestServiceFee, taxPrice, currency, hostServiceFee, taxRate } } = this.props;
			const { data: { hostData, guestData, bookingSpecialPricing } } = this.props;
			const { data: { listData: { title, street, city, state, country, zipcode, beds, settingsData, listingData } } } = this.props;
			let { data: { checkInStart, checkInEnd } } = this.props;

			let roomType = settingsData && settingsData[0] && settingsData[0]?.listsettings && settingsData[0]?.listsettings?.itemName;
			let createdDate = createdAt ? moment(createdAt).format('ddd, MMM Do, YYYY ') : '', updatedDate = updatedAt ? moment(updatedAt).format('MM/DD/YYYY') : '';
			let checkInDate = checkIn ? moment(checkIn).format('MM/DD/YYYY') : '', checkOutDate = checkOut ? moment(checkOut).format('MM/DD/YYYY') : '';
			let momentStartDate, momentEndDate, dayDifference, dayPrice = 0, checkInTime, checkOutTime, isAverage = 0, subTotal, userType;
			let isSpecialPricingAssinged = (bookingSpecialPricing && bookingSpecialPricing.length > 0) ? true : false, isDayTotal = 0, checkInTimeFormat;

			checkInStart = checkInStart ? checkInStart : listingData?.checkInStart;
			checkInEnd = checkInEnd ? checkInEnd : listingData?.checkInEnd;
			if (checkIn && checkOut) {
				momentStartDate = moment(checkIn);
				momentEndDate = moment(checkOut);
				dayDifference = momentEndDate.diff(momentStartDate, 'days');
				if (isSpecialPricingAssinged) {
					bookingSpecialPricing && bookingSpecialPricing.map((item, index) => {
						dayPrice = dayPrice + Number(item.isSpecialPrice);
					});
				} else {
					dayPrice = basePrice * dayDifference;
				}
			}
			console.log(listTitle, "listTitlelistTitle");
			if (checkInStart !== 'Flexible') checkInTime = generateTime(checkInStart);

			if (checkInEnd !== 'Flexible') checkOutTime = generateTime(checkInEnd);

			if (checkInStart === 'Flexible' && checkInEnd === 'Flexible') {
				checkInTimeFormat = formatMessage(messages.flexibleCheckIn);
			} else if (checkInStart !== 'Flexible' && checkInEnd === 'Flexible') {
				checkInTimeFormat = 'From ' + checkInTime;
			} else if (checkInStart === 'Flexible' && checkInEnd !== 'Flexible') {
				checkInTimeFormat = 'Upto ' + checkOutTime;
			} else if (checkInStart !== 'Flexible' && checkInEnd !== 'Flexible') {
				checkInTimeFormat = checkInTime + ' - ' + checkOutTime;
			}

			if (userId === hostId) {
				userType = 'host';
				subTotal = total - hostServiceFee;
			} else {
				userType = 'guest';
				subTotal = total + guestServiceFee;
			}

			isAverage = Number(dayPrice) / Number(dayDifference);
			isDayTotal = isAverage.toFixed(2) * dayDifference;
			dayPrice = isDayTotal;

			return (
				<div className={cx(s.containerResponsive, s.spaceTop4, 'commonWordBreak')}>
					<div className={cx(s.space4, s.rowTable)}>
						<div>
							<h2 className={s.titleText}><FormattedMessage {...messages.customerReceipt} /></h2>
							<div><FormattedMessage {...messages.receipt} />: # {id}</div>
						</div>
						<a className={cx(s.button, "hidden-print", s.printBtn, 'printBtnRTL')} onClick={this.print}>
							<img src={priceIcon} />
							<FormattedMessage {...messages.printText} />
						</a>
					</div>
					<div className={s.grid}>
						<div className={s.leftPanel}>
							<h3 className={s.innnerTitleText}><FormattedMessage {...messages.bookedBy} />: {guestData.firstName}</h3>
							<div className={s.createDateCss}>{createdDate}</div>
							<div className={s.createDateCss}>
								<span><FormattedMessage {...messages.confirmationCode} /></span>:{' '}
								<span>#{confirmationCode}</span>
							</div>
							<div className={s.borderLine}></div>
							<div className={s.dateGrid}>
								<div>
									<div className={s.text}><FormattedMessage {...messages.checkIn} /></div>
									<div className={s.subText}>{checkInDate}</div>
									<div className={cx(s.dateText, s.subText)}>{checkInTimeFormat}</div>
								</div>
								<img src={dateIcon} className={'commonIconRTL'} />
								<div>
									<div className={s.text}><FormattedMessage {...messages.checkOut} /></div>
									<div className={s.subText}> {checkOutDate}</div>
								</div>
							</div>
							<div className={s.borderLine}></div>
							<div className={s.accommoGrid}>
								<div className={s.gridBottom}>
									<div className={s.text}><FormattedMessage {...messages.accommodationType} /></div>
									<div className={s.subText}>{roomType}
										{beds > 0 && <span><span>-</span>{beds} {beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}</span>}
									</div>
								</div>
								<div className={s.gridBottom}>
									<div className={s.text}><FormattedMessage {...messages.hostedBy} /></div>
									<div className={s.subText}>{hostData.firstName}</div>
								</div>
								<div>
									<div className={s.text}><FormattedMessage {...messages.howManyGuest} /></div>
									<div className={s.subText}>{data.guests}{' '}{data.guests > 1 ? <FormattedMessage {...messages.guests} /> : <FormattedMessage {...messages.guest} />}</div>
								</div>
								<div>
									<div className={s.text}><FormattedMessage {...messages.duration} /></div>
									<div className={s.subText}>{dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</div>
								</div>
							</div>
							<div className={s.borderLine}></div>
							<div>
								<div className={s.text}><FormattedMessage {...messages.accommodationAddress} /></div>
								<div className={cx(s.titleColor, "hidden-print")}><Link to={"/rooms/" + listId} className={s.titleColor}>{listTitle ? listTitle : title}</Link></div>
								<div className={cx(s.titleColor, "printOnly")}> {listTitle ? listTitle : title}</div>
								<div className={s.subText}>{street} {city}, {state} {zipcode} {country}</div>
							</div>
						</div>
						<div>
							<div className={s.leftPanel}>
								<h3 className={s.innnerTitleText}><FormattedMessage {...messages.reservationCharges} /></h3>
								<div className={s.tableFlex}>
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
									<div className={'textAlignLeftRtl'}>
										<CurrencyConverter
											amount={dayPrice}
											from={currency}
										/>
									</div>
								</div>
								{
									cleaningPrice > 0 && <div className={s.tableFlex}>
										<div> <FormattedMessage {...messages.cleaningPrice} /></div>
										<div><CurrencyConverter
											amount={cleaningPrice}
											from={currency}
										/></div>
									</div>
								}
								{
									discount > 0 && <div className={s.tableFlex}>
										<div>
											{discountType}
										</div>
										<div className={s.minusFlex}>
											<span>-{' '}</span><CurrencyConverter
												amount={discount}
												from={currency}
											/>
										</div>
									</div>
								}
								{
									userType === 'guest' && guestServiceFee > 0 && <div className={s.tableFlex}>
										<div><FormattedMessage {...messages.serviceFee} /></div>
										<div> <CurrencyConverter
											amount={guestServiceFee}
											from={currency}
										/></div>
									</div>
								}
								{
									userType === 'host' && <div className={s.tableFlex}>
										<div><FormattedMessage {...messages.serviceFee} /></div>
										<div>
											- &nbsp;
											<CurrencyConverter
												amount={hostServiceFee}
												from={currency}
											/>
										</div>
									</div>
								}
								{
									taxPrice > 0 && <div className={s.tableFlex}>
										<div> <FormattedMessage {...messages.tax} /></div>
										<div><CurrencyConverter
											amount={taxPrice}
											from={currency}
										/></div>
									</div>
								}
								<div className={s.totalBorderLine}></div>
								<div className={cx(s.tableFlex, s.textBold)}>
									<div><FormattedMessage {...messages.total} /></div>
									<div> <CurrencyConverter
										amount={subTotal}
										from={currency}
									/></div>
								</div>
							</div>
							{
								userType === 'guest' && <div className={cx(s.leftPanel, s.paymentTop)}>
									<h3 className={s.innnerTitleText}><FormattedMessage {...messages.payment} /></h3>
									<div className={cx(s.tableFlex)}>
										<div className={s.paymentWidth}><FormattedMessage {...messages.paymentReceived} /> {updatedDate}</div>
										<div> <CurrencyConverter
											amount={subTotal}
											from={currency}
										/></div>
									</div>
								</div>
							}
						</div>
					</div>
					<div className={s.receiptFooter}>
						{siteName} <FormattedMessage {...messages.receiptInfo1} />{' '}
						<FormattedMessage {...messages.receiptInfo2} /> {siteName}.{' '}
						<FormattedMessage {...messages.receiptInfo3} /> {siteName}.
					</div>
				</div>
			);
		}
	}
}

const mapState = (state) => ({
	siteName: state.siteSettings.data.siteName,
	userId: state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PaymentReceipt)));
