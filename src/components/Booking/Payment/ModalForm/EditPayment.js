import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import { connect } from 'react-redux';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import formValueSelector from 'redux-form/lib/formValueSelector';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import AvailabilityCalendar from '../../../../components/ViewListing/AvailabilityCalendar';
import Loader from '../../../../components/Loader';
import IncrementBtnCircle from '../../../../components/IncrementBtnCircle';

import BlockedDatesQuery from '../../../../routes/viewListing/BlockedDates.graphql';
import ListingDataQuery from '../../../../routes/viewListing/getListingData.graphql';

import messages from '../../../../locale/messages';
import { convert } from '../../../../helpers/currencyConvertion';

import gusetIcon from '/public/SiteIcons/paymenyGusetIcon.svg';
import { applyPaymentModal } from '../../../../actions/modalActions';

import bt from '../../../../components/commonStyle.css';
import s from './ModalForm.css';
class EditPayment extends Component {

	renderIncrementButton = (field) => (
		<IncrementBtnCircle
			{...field}
		/>
	);

	handleSubmitButton = async () => {
		const { applyPaymentModal, checkIn, checkOut, guests, specialPricing, serviceFees, base, rates, currency } = this.props;
		const { listData: { listingData: { weeklyDiscount, monthlyDiscount, basePrice, cleaningPrice, tax } } } = this.props;
		const { formatMessage } = this.props.intl;

		let guestServiceFee = 0, hostServiceFee = 0, priceForDays = 0, hostServiceFeeType = '', hostServiceFeeValue = 0, isAverage = 0;
		let discount = 0, discountType, totalWithoutFees = 0, totalWithoutTax = 0, taxPrice = 0, momentStartDate, momentEndDate, currentDay;
		let dayDifference, bookingSpecialPricing = [], isSpecialPriceAssigned = false, isDayTotal = 0, totalWithoutServiceFee = 0, total = 0;

		if (checkIn && checkOut) {
			momentStartDate = moment(checkIn);
			momentEndDate = moment(checkOut);
			dayDifference = momentEndDate.diff(momentStartDate, 'days');

			//New 
			if (dayDifference > 0) {
				let stayedNights = [];
				// Find stayed nights
				for (let i = 0; i < dayDifference; i++) {
					let currentDate = moment(checkIn).add(i, 'day');
					stayedNights.push(currentDate);
				}

				if (stayedNights?.length > 0) {
					stayedNights?.map((item, key) => {
						let isSpecialPricing;
						if (item) {
							let pricingRow, currentPrice;
							currentDay = (moment(item).format('dddd').toLowerCase());
							isSpecialPricing = specialPricing?.length > 0 && specialPricing.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));

							if (isSpecialPricing?.isSpecialPrice && (isSpecialPricing?.dayStatus == 'secondHalf' || isSpecialPricing?.dayStatus == 'full')) {
								isSpecialPriceAssigned = true;
								currentPrice = Number(isSpecialPricing?.isSpecialPrice);
							} else {
								currentPrice = Number(basePrice);
							}
							// Price object
							pricingRow = {
								blockedDates: item,
								isSpecialPrice: currentPrice,
							};
							bookingSpecialPricing.push(pricingRow);
						}
					});
				}
			}
			priceForDays = bookingSpecialPricing.reduce(
				(total, item) => total + Number(item.isSpecialPrice), 0
			);
		}

		isAverage = Number(priceForDays) / Number(dayDifference);
		isDayTotal = isAverage.toFixed(2) * dayDifference;
		priceForDays = isDayTotal;

		if (dayDifference >= 7) {
			if (monthlyDiscount > 0 && dayDifference >= 28) {
				discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
				discountType = monthlyDiscount + formatMessage(messages.monthlyPriceDiscount);
			} else {
				if (weeklyDiscount > 0) {
					discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
					discountType = weeklyDiscount + formatMessage(messages.weeklyPriceDiscount);
				}
			}
		}

		totalWithoutServiceFee = (isDayTotal + cleaningPrice) - discount;
		totalWithoutTax = isDayTotal - discount;
		if (tax) {
			taxPrice = totalWithoutTax * (Number(tax) / 100);
		}

		if (serviceFees) {
			if (serviceFees?.guest?.type === 'percentage') {
				guestServiceFee = totalWithoutServiceFee * (Number(serviceFees.guest.value) / 100);
			} else {
				guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
			}
			if (serviceFees?.host?.type === 'percentage') {
				hostServiceFeeType = serviceFees.host.type;
				hostServiceFeeValue = serviceFees.host.value;
				hostServiceFee = totalWithoutServiceFee * (Number(serviceFees.host.value) / 100);
			} else {
				hostServiceFeeType = serviceFees.host.type;
				hostServiceFeeValue = serviceFees.host.value;
				hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
			}
		}

		totalWithoutFees = (priceForDays + cleaningPrice + taxPrice) - discount;
		total = (priceForDays + guestServiceFee + cleaningPrice + taxPrice) - discount;

		let curentFormValues = {
			discount,
			discountType,
			guestServiceFee,
			hostServiceFee,
			total: totalWithoutFees,
			isSpecialPriceAssigned,
			bookingSpecialPricing: JSON.stringify(bookingSpecialPricing),
			isSpecialPriceAverage: isAverage.toFixed(2),
			dayDifference,
			hostServiceFeeType,
			hostServiceFeeValue,
			priceForDays,
			totalValue: total,
			taxPrice
		};

		await applyPaymentModal({ checkIn, checkOut, guests, curentFormValues });
	}

	render() {
		const { listId, checkIn, checkOut, maximumStay, guests, minimumStay, availability, isLoading } = this.props;
		const { ListingBlockedDates, getListingData: { loading, UserListing } } = this.props;
		const { formatMessage } = this.props.intl;

		let paymentCalendarHeight = 'paymentCalendarHeight', disabled = false;
		let isDateChosen = checkIn != null && checkOut != null || false;

		if (maximumStay || minimumStay || !availability || !isDateChosen) disabled = true;

		if (loading && !UserListing) {
			return <Loader type="text" />
		} else {
			return (
				<>
					<div className={s.flex}>
						<div>
							<div className={s.title}><FormattedMessage {...messages.guests} /></div>
							<div className={cx(s.guestModalFlex, 'svgImg')}><img src={gusetIcon} className={cx(s.iconCss, 'iconCssRTL')} /><span>{guests} {' '} {guests > 1 ? <FormattedMessage {...messages.guests} /> : <FormattedMessage {...messages.guest} />}</span></div>
						</div>
						<div>
							<Field
								name="guests"
								type="text"
								component={this.renderIncrementButton}
								maxValue={UserListing.personCapacity}
								minValue={1}
								incrementBy={1}
							/>
						</div>
					</div>

					<AvailabilityCalendar
						listId={listId}
						loading={loading || ListingBlockedDates?.loading}
						blockedDates={
							ListingBlockedDates?.UserListing != null ?
								ListingBlockedDates?.UserListing.blockedDates : undefined
						}
						listingData={UserListing?.listingData || undefined}
						country={UserListing?.country}
						queryStartDate={checkIn}
						queryEndDate={checkOut}
						formName={'PaymentFormModal'}
						paymentCalendar={true}
						paymentCalendarHeight={paymentCalendarHeight}
					/>
					<div className={cx(s.textAignRight, 'textAlignLeftRtlEdit')}>
						<Loader
							className={cx(s.applyPaymenyBtn)}
							disabled={disabled || isLoading}
							type={'button'}
							handleClick={this.handleSubmitButton}
							label={formatMessage(messages.applyFilters)}
						>
						</Loader>
					</div>

					{
						!isLoading && maximumStay &&
						<div className={s.errorMessage}>
							<FormattedMessage {...messages.maximumStay} /> {UserListing.listingData.maxNight} {UserListing.listingData.maxNight > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
						</div>
					}
					{
						!isLoading && minimumStay &&
						<div className={s.errorMessage}>
							<FormattedMessage {...messages.minimumNightStay} /> {UserListing.listingData.minNight} {UserListing.listingData.minNight > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
						</div>
					}
					{
						!isLoading && !availability && !maximumStay && !minimumStay &&
						<div className={s.errorMessage}>
							<FormattedMessage {...messages.hostErrorMessage2} />
						</div>
					}
				</>
			);
		}

	}
}

EditPayment = reduxForm({
	form: 'PaymentFormModal', // a unique name for this form
	destroyOnUnmount: true
})(EditPayment);

const selector = formValueSelector('PaymentFormModal');
const selectorPayment = formValueSelector('PaymentForm');

const mapState = (state) => ({
	availability: state.viewListing.availability,
	maximumStay: state.viewListing.maximumStay,
	minimumStay: state.viewListing.minimumStay,
	isLoading: state.viewListing.isLoading,
	checkIn: selector(state, 'checkIn'),
	checkOut: selector(state, 'checkOut'),
	guests: selector(state, 'guests'),
	serviceFees: state.book.serviceFees,
	base: state.currency.base,
	rates: state.currency.rates,
	listData: state.book.data,
	currency: selectorPayment(state, 'currency'),
	specialPricing: state.viewListing.specialPricing
});

const mapDispatch = {
	applyPaymentModal
};

export default compose(
	injectIntl,
	withStyles(s, bt),
	connect(mapState, mapDispatch),
	graphql(ListingDataQuery,
		{
			name: 'getListingData',
			options: (props) => ({
				variables: {
					listId: props.listId,
					preview: true,
				},
				fetchPolicy: 'network-only',
				ssr: true
			})
		}
	),
	graphql(BlockedDatesQuery,
		{
			name: 'ListingBlockedDates',
			options: (props) => ({
				variables: {
					listId: props.listId,
					preview: true,
				},
				fetchPolicy: 'network-only',
				ssr: false
			})
		}
	))(EditPayment);