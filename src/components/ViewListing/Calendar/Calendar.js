import React from 'react';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import  FormGroup from 'react-bootstrap/lib/FormGroup';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';

import CurrencyConverter from '../../CurrencyConverter';
import ViewCount from '../ViewCount';
import BookingForm from './BookingForm';
import Loader from '../../Loader';

import messages from '../../../locale/messages';

import s from './Calendar.css';
class Calendar extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        personCapacity: PropTypes.number.isRequired,
        country: PropTypes.string,
        listingData: PropTypes.shape({
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number,
            tax: PropTypes.number,
            currency: PropTypes.string,
            monthlyDiscount: PropTypes.number,
            weeklyDiscount: PropTypes.number,
            minNight: PropTypes.number,
            maxNight: PropTypes.number,
            maxDaysNotice: PropTypes.string,
        }),
        isLoading: PropTypes.bool,
        loading: PropTypes.bool,
        blockedDates: PropTypes.array,
        isHost: PropTypes.bool.isRequired,
        bookingType: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
        userBanStatus: PropTypes.number,
        reviewsCount: PropTypes.number.isRequired,
        reviewsStarRating: PropTypes.number.isRequired,
    };
    static defaultProps = {
        isLoading: false,
        loading: false,
        blockedDates: [],
        isHost: false,
        listingData: {
            basePrice: 0, cleaningPrice: 0, tax: 0, monthlyDiscount: 0,
            weeklyDiscount: 0, minNight: 0, maxNight: 0
        },
        country: ''
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { id, personCapacity, isLoading, isHost, userBanStatus, bookingType } = this.props;
        const { listingData: { basePrice, cleaningPrice, tax, currency, monthlyDiscount, weeklyDiscount, minNight, maxNight, maxDaysNotice, bookingNoticeTime, taxRate } } = this.props;
        const { loading, blockedDates, startDate, endDate, guests, country, averageBasePrice } = this.props;
        const { reviewsCount, reviewsStarRating } = this.props;
        console.log('cleaningPrice',{ basePrice, cleaningPrice, tax, currency, monthlyDiscount, weeklyDiscount, minNight, maxNight, maxDaysNotice});

        let loadingStatus = loading || isLoading || false, starRatingValue = 0;
        let initialValues = {
            startDate,
            endDate,
            guests
        }

        if (reviewsCount > 0 && reviewsStarRating > 0) {
            starRatingValue = Math.round(reviewsStarRating / reviewsCount)
        }

        let leastBasePrice = averageBasePrice ? averageBasePrice : (basePrice ? basePrice : 0);

        return (
            <div className={cx(s.bookItContainer, 'bookItContentCommon', 'modalMarginTop')}>
                <div className={cx(s.bookItContentBox, 'bgBlack')} data-sticky-section>
                    <div className={cx(s.bootItPriceSection, 'borderRadiusNone', 'textWhite')}>
                        <div className={cx(s.noPadding, s.mobileBg, s.calendarTableCell)}>
                            <div className={cx(s.bookItPriceAmount, s.currenyMarginR, 'currenyMarginRtl')}>
                                <CurrencyConverter
                                    amount={leastBasePrice}
                                    className={s.bookItPrice}
                                    from={currency}
                                />
                                <span className={cx("visible-xs", s.mobileRight)}> / <FormattedMessage {...messages.perNight} /></span>
                                <span className="hidden-xs"> / <FormattedMessage {...messages.perNight} /></span>
                                {
                                    bookingType === "instant" && <span>
                                        <FontAwesome.FaBolt className={s.instantIcon} />
                                    </span>
                                }
                            </div>

                        </div>

                        {/* <div className={cx(s.space2)}>
                            <div className={cx(s.reviewSection, 'reviewSectionRTL')}><StarRating name={'review'} value={starRatingValue} /></div>
                            <div>{reviewsCount > 0 && <span>{reviewsCount}{' '}{reviewsCount > 1 ? <FormattedMessage {...messages.reviews} /> : <FormattedMessage {...messages.review} />}</span>}</div>
                        </div> */}
                    </div>
                    <div className={cx('bookItFormSection')}>
                        <Loader
                            show={loadingStatus}
                            type={"page"}

                        >
                            <div className={cx(s.bookItPanel, 'borderRadiusNone', 'bookItPanelRtl')}>
                                <BookingForm
                                    initialValues={initialValues}
                                    id={id}
                                    personCapacity={personCapacity}
                                    basePrice={basePrice}
                                    cleaningPrice={cleaningPrice}
                                    tax={tax}
                                    currency={currency}
                                    monthlyDiscount={monthlyDiscount}
                                    weeklyDiscount={weeklyDiscount}
                                    minNight={minNight}
                                    maxNight={maxNight}
                                    blockedDates={blockedDates}
                                    isHost={isHost}
                                    userBanStatus={userBanStatus}
                                    bookingType={bookingType}
                                    maxDaysNotice={maxDaysNotice}
                                    startDate={startDate}
                                    endDate={endDate}
                                    taxRate={taxRate}
                                    guests={guests}
                                    country={country}
                                />
                                <div>
                                    <FormGroup className={cx(s.noMargin, s.textMuted, 'text-center', s.smallText, 'textWhite')}>
                                        <FormattedMessage {...messages.bookingInfo} />
                                    </FormGroup>
                                </div>
                            </div>

                        </Loader>
                    </div>
                </div>
                <ViewCount
                    listId={id}
                    isHost={isHost}
                />
            </div>
        );
    }
}

const selector = formValueSelector('BookingForm');

const mapState = (state) => ({
    isLoading: state.viewListing.isLoading,
    averageBasePrice: selector(state, 'averageBasePrice'),

});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Calendar)))