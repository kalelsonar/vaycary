import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import renderTooltip from '../../../components/siteadmin/SiteSettingsForm/toolTipHelper.js';

// Component
import CurrencyConverter from '../../CurrencyConverter';
// Helper
import { convert } from '../../../helpers/currencyConvertion';
// Locale
import messages from '../../../locale/messages';
//Images
import Faq from '/public/SiteIcons/question.svg'

import s from './Calendar.css';
class BillDetails extends Component {
    static propTypes = {
        basePrice: PropTypes.number.isRequired,
        cleaningPrice: PropTypes.number,
        tax: PropTypes.number,
        currency: PropTypes.string.isRequired,
        monthlyDiscount: PropTypes.number,
        weeklyDiscount: PropTypes.number,
        startDate: PropTypes.object.isRequired,
        endDate: PropTypes.object.isRequired,
        serviceFees: PropTypes.shape({
            guest: PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        base: PropTypes.string.isRequired,
        rates: PropTypes.object.isRequired,
        formatMessage: PropTypes.any,
        specialPricing: PropTypes.array,
    };

    static defaultProps = {
        basePrice: 0, cleaningPrice: 0, tax: 0, monthlyDiscount: 0, weeklyDiscount: 0,
        startDate: null, endDate: null, specialPricing: [],
    }

    render() {
        const { basePrice, cleaningPrice, tax, currency, monthlyDiscount, weeklyDiscount, endDate } = this.props;
        console.log({ basePrice, cleaningPrice, tax, currency, monthlyDiscount, weeklyDiscount, endDate });
        const { serviceFees, base, rates, specialPricing, taxRate, change } = this.props;
        const { formatMessage } = this.props.intl;
        let { startDate } = this.props;

        let serviceFee = 0, taxes = 0, totalWithoutTax = 0, currentDay, bookingSpecialPricing = [], isSpecialPriceAssigned = false, totalWithoutServiceFee = 0;
        let priceForDays = 0, isAverage = 0, isDayTotal = 0, momentStartDate, momentEndDate, dayDifference, discount, discountType, total, discountLessBasePrice = 0;

        if (startDate && endDate) {
            startDate = moment(startDate).format('YYYY-MM-DD');
            momentStartDate = moment(startDate);
            momentEndDate = moment(endDate);
            dayDifference = momentEndDate.diff(momentStartDate, 'days');

            if (dayDifference > 0) {
                let stayedNights = [];
                // Find stayed nights
                for (let i = 0; i < dayDifference; i++) {
                    let currentDate = moment(startDate).add(i, 'day');
                    stayedNights.push(currentDate);
                }

                if (stayedNights?.length > 0) {
                    stayedNights.map((item, key) => {
                        let isSpecialPricing;
                        if (item) {
                            let pricingRow, currentPrice;
                            currentDay = (moment(item).format('dddd').toLowerCase());
                            isSpecialPricing = specialPricing?.length > 0 && specialPricing?.find(o => moment(item).format('MM/DD/YYYY') == moment(o.blockedDates).format('MM/DD/YYYY'));
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
            discount = 0;
            discountType = null;
            total = 0;
        }

        isAverage = Number(priceForDays) / Number(dayDifference);
        isDayTotal = isAverage.toFixed(2) * dayDifference;
        priceForDays = isDayTotal;

        if (dayDifference >= 7) {
            if (monthlyDiscount > 0 && dayDifference >= 28) {
                discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
                discountType = monthlyDiscount + "% " + formatMessage(messages.monthlyDiscount);
            } else {
                discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
                discountType = weeklyDiscount + "% " + formatMessage(messages.weeklyDiscount);
            }
        }
        discountLessBasePrice = isDayTotal - discount;
        totalWithoutServiceFee = (isDayTotal + cleaningPrice) - discount;
        totalWithoutTax = isDayTotal - discount;
        let serviceTex = 0;

        if (serviceFees) {
            serviceFee = serviceFees.guest.type === 'percentage'
                ? totalWithoutServiceFee * (Number(serviceFees.guest.value) / 100)
                : convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
            serviceTex = serviceFee * 0.18;
        }

        // if (tax) taxes = totalWithoutTax * (Number(tax) / 100)

        let texPercentage = tax;
        if (tax) {
            if ((totalWithoutServiceFee / dayDifference) > 7500) {
                taxes = totalWithoutServiceFee * (Number(18) / 100);
                texPercentage = 18;
            } else {
                taxes = totalWithoutServiceFee * (Number(12) / 100);
                texPercentage = 12;
            }
        }

        total = (priceForDays + serviceFee + cleaningPrice + taxes + serviceTex) - discount;

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

        if (isAverage) {
            change("BookingForm", 'averageBasePrice', isAverage);
        }

        return (
            <FormGroup className={s.noMargin}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={'viewListingCalender'}>
                        <table className={cx('table')}>
                            <tbody>
                                <tr className={cx(s.positionR)}>
                                    <td className={cx(s.noBorder)}>
                                        {
                                            isSpecialPriceAssigned &&
                                            <div className='tooltipFlex'>
                                                <>{renderTooltip(formatMessage(messages.averagePricePerNight), 'commonTooltipIcon')}</>
                                                <div className={cx(s.specialPriceText, 'directionLtr')}>
                                                    <CurrencyConverter
                                                        amount={isAverage}
                                                        from={currency}
                                                    />
                                                    {' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                                                </div>
                                            </div>
                                        }
                                        {
                                            !isSpecialPriceAssigned && <div className={cx(s.specialPriceText, 'directionLtr')}>
                                                <CurrencyConverter
                                                    amount={isAverage}
                                                    from={currency}
                                                />
                                                {' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                                            </div>
                                        }
                                    </td>
                                    <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRtl')}>
                                        <CurrencyConverter
                                            amount={isDayTotal}
                                            from={currency}
                                        />
                                    </td>
                                </tr>
                                {
                                    discount > 0 && <tr>
                                        <td className={s.noBorder}>{discountType}</td>
                                        <td className={cx('text-right', s.discountText, s.noBorder, 'textAlignLeftRtl')}>
                                            <span>- </span>
                                            <span className={cx(s.displayCell, s.priceCss)}>
                                                <CurrencyConverter
                                                    amount={discount}
                                                    from={currency}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                }
                                {
                                    cleaningPrice > 0 && <tr>
                                        <td className={s.noBorder}><FormattedMessage {...messages.cleaningFee} /></td>
                                        <td className={cx('text-right', s.noBorder, 'textAlignLeftRtl')}>
                                            <CurrencyConverter
                                                amount={cleaningPrice}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                }
                                {
                                    serviceFee > 0 && <tr>
                                        <td className={s.noBorder}><FormattedMessage {...messages.serviceFee} /></td>
                                        <td className={cx('text-right', s.noBorder, 'textAlignLeftRtl')}>
                                            <CurrencyConverter
                                                amount={serviceFee}
                                                from={currency}
                                            />
                                        </td>
                                    </tr>
                                }
                                {taxes > 0 && (
                                    <>
                                        {/* Main Tax Row with Tooltip */}
                                        <tr>
                                            <td className={s.noBorder}>
                                                <FormattedMessage {...messages.tax} />
                                            </td>
                                            <td
                                                className={cx('text-right', s.noBorder, 'textAlignLeftRtl')}
                                            >
                                                {renderTooltip(<>
                                                    <strong>Taxes and Charges</strong><br />
                                                    Gst on Booking({texPercentage}%) = {taxes} <br />
                                                    Gst on Service(18%) = {serviceTex}
                                                </>,
                                                    'commonTooltipIcon'
                                                )}
                                                <CurrencyConverter amount={taxes + serviceTex} from={currency} />
                                            </td>
                                        </tr>
                                    </>
                                )}

                                <tr>
                                    <td className={s.totalText}><FormattedMessage {...messages.total} /></td>
                                    <td className={cx('text-right', s.totalText, 'textAlignLeftRtl')}>
                                        <CurrencyConverter
                                            amount={total}
                                            from={currency}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </FormGroup>
        );
    }
}

const mapState = (state) => ({
    specialPricing: state.viewListing.specialPricing
});

const mapDispatch = {
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(BillDetails)));
//Surajsinh