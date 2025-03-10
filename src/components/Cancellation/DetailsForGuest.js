import React from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { initialize } from 'redux-form';
// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// Components
import CurrencyConverter from '../CurrencyConverter';

import { cancellationGuestData, getPriceWithDiscount } from '../../helpers/cancellationData';
// Locale
import messages from '../../locale/messages';

// Images
import defaultPic from '/public/SiteImages/large_no_image.jpeg';
import StarImage from '/public/SiteIcons/starFill.svg';
import refundIcon from '/public/SiteIcons/refundable.svg'
import nonRefundIcon from '/public/SiteIcons/nonRefundable.svg'

import bt from '../../components/commonStyle.css';
import s from './Cancellation.css';

class DetailsForGuest extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    hostEmail: PropTypes.string.isRequired,
    guestName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number.isRequired,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    taxPrice: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    cancelData: PropTypes.shape({
      policyName: PropTypes.string,
      accomodation: PropTypes.number,
      guestFees: PropTypes.number,
      remainingNights: PropTypes.number,
      interval: PropTypes.number,
      nights: PropTypes.number,
      isTaxRefunded: PropTypes.bool
    }).isRequired,
  };

  render() {
    const { reservationId, listTitle, userType, firstName, hostEmail, checkIn, checkOut, guests, listData, listData: { reviewsCount, reviewsStarRating, settingsData }, listId, guestName } = this.props;
    const { basePrice, cleaningPrice, guestServiceFee, hostServiceFee, taxPrice, total, currency, threadId, confirmationCode, taxRate, isSpecialPriceAverage } = this.props;
    const { cancelData: { cancellationRuleObj: { policyName, accomodation, guestFees, remainingNights, interval, nights, priorDays, nonRefundableNights, cleaningFeePercent, policyContent, taxFeePercent, isTaxRefunded } } } = this.props;
    const { discount, holdeData, hostServiceFeeType, hostServiceFeeValue, base, rates, serviceFees, initialize } = this.props;
    const { formatMessage } = this.props.intl;

    let coverImage = holdeData?.listData && holdeData?.listData?.listPhotos?.find(o => o.id == holdeData?.listData?.coverPhoto), bookingSpecialPricing = [], finalPrice = 0;
    let path = '/images/upload/x_medium_', showImage, cancellationData = {}, roomType, starRatingValue = 0, isCleaingPrice = 0, priceForDays = 0, cancellationGuestObj = {};
    let updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0, subtotal = 0, refundableNightPrice = 0, nonRefundableNightPrice = 0, isSpecialPriceAssigned = false;

    if (coverImage) {
      showImage = path + coverImage?.name;
    } else if (!coverImage && holdeData?.listData && holdeData?.listData?.listPhotos?.length > 0) {
      showImage = path + (holdeData?.listData && holdeData?.listData?.listPhotos[0]?.name);
    } else {
      showImage = defaultPic;
    }

    if (settingsData != undefined && settingsData?.length > 0) {
      roomType = settingsData && settingsData[0] && settingsData[0]?.listsettings && settingsData[0]?.listsettings?.itemName;
    }
    if (reviewsCount > 0 && reviewsStarRating > 0) starRatingValue = Math.round(reviewsStarRating / reviewsCount)

    isCleaingPrice = cleaningPrice ? cleaningPrice : 0;

    holdeData.bookingSpecialPricing && holdeData?.bookingSpecialPricing?.map((item, key) => {
      let pricingRow, currentPrice;
      if (item.blockedDates) {
        isSpecialPriceAssigned = true;
        currentPrice = Number(item.isSpecialPrice);
      } else {
        currentPrice = Number(basePrice);
      }
      pricingRow = {
        blockedDates: item,
        isSpecialPrice: currentPrice,
      };
      bookingSpecialPricing.push(pricingRow);
    })

    if (isSpecialPriceAssigned) {
      bookingSpecialPricing.map((item, index) => {
        priceForDays = Number(priceForDays) + Number(item.isSpecialPrice);
      });
    } else {
      if (interval <= 1) {
        priceForDays = Number(basePrice) * Number(nights - nonRefundableNights)
      } else {
        priceForDays = Number(basePrice) * Number(nights)
      }
    }

    finalPrice = getPriceWithDiscount({ basePrice: (isSpecialPriceAverage || basePrice), discount, nights });

    cancellationGuestObj = cancellationGuestData(remainingNights,
      nights,
      priceForDays,
      accomodation,
      isCleaingPrice,
      taxRate,
      guestServiceFee,
      guestFees,
      discount,
      hostServiceFee,
      taxPrice,
      finalPrice,
      total,
      policyName,
      interval,
      priorDays,
      nonRefundableNights,
      hostServiceFeeType,
      hostServiceFeeValue,
      currency,
      base,
      rates,
      serviceFees,
      cleaningFeePercent,
      taxFeePercent
    );

    refundableNightPrice = cancellationGuestObj?.refundableNightPrice;
    nonRefundableNightPrice = cancellationGuestObj?.nonRefundableNightPrice;
    updatedGuestFee = cancellationGuestObj?.updatedGuestFee;
    payoutToHost = cancellationGuestObj?.payoutToHost;
    updatedHostFee = cancellationGuestObj?.updatedHostFee;
    updatedGuestFee = cancellationGuestObj?.updatedGuestFee;

    subtotal = total + guestServiceFee;

    cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundableNightPrice,
      payoutToHost: payoutToHost,
      guestServiceFee: updatedGuestFee,
      hostServiceFee: updatedHostFee,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'guest',
      checkIn,
      checkOut,
      guests,
      guestName,
      hostName: firstName,
      listTitle: listData.title,
      confirmationCode,
      hostEmail,
      userType,
      isTaxRefunded
    };

    initialize('CancellationForm', cancellationData, true);

    return (
      <div>
        <div>
          <a href={"/rooms/" + listId} target="_blank">
            <div className={s.cancelBg} style={{ backgroundImage: `url(${showImage})` }}>
            </div>
            <div className={s.listDetailsSection}>
              {starRatingValue > 0 && <div className={cx(s.starFlex, 'textWhite')}>
                <span><img src={StarImage} className={s.starImage} /></span>
                <span>{starRatingValue}</span>
                <span className={cx(s.reviewText, 'darkModeReviewText')}>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
              </div>}
              <h3 className={cx(s.listTitle, 'textWhite')}>{listTitle ? listTitle : listData.title}</h3>
              <h4 className={cx(s.listTitleDetails, 'textWhite')}>
                <span className='roomTypeRtl'>{roomType}</span>{' '}
                {listData.beds > 0 && <span><span>-</span>{listData.beds} {listData.beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}</span>}
              </h4>
              <p className={cx(s.listTitleDetails, 'textWhite')}>{listData.city}, {listData.state}, {listData.country}</p>
            </div>
          </a>
        </div>
        <div className={cx(s.refundableBg, 'bgBlackTwo', 'textWhite')}>
          {
            nonRefundableNightPrice > 0 && <div className={s.refundableText}>
              <span className={cx(s.textHigh, s.textBold, s.refundIconSec)}>
                <img src={nonRefundIcon} /> <FormattedMessage {...messages.nonRefundable} />
              </span>
              <span className={cx(s.textHigh, s.textBold, s.textLine)}>
                <CurrencyConverter
                  amount={nonRefundableNightPrice}
                  from={currency}
                />
              </span>
            </div>
          }

          {
            refundableNightPrice > 0 && <div className={cx(s.refundableText, s.refundableNoBorder, 'textWhite')}>
              <span className={cx(s.textHigh, s.textBold, s.refundIconSec)}>
                <img src={refundIcon} /> <FormattedMessage {...messages.refundable} />
              </span>
              <span className={cx(s.textHigh, s.textBold)}>
                <CurrencyConverter
                  amount={refundableNightPrice}
                  from={currency}
                />
              </span>
            </div>
          }

          {
            refundableNightPrice > 0 &&
            <div className={cx(s.spaceTop2)}>
              <p className={s.landingStep}><span><FormattedMessage {...messages.refundCost} /></span></p>
            </div>
          }
        </div>
        <div className={cx(s.spaceTop3, bt.textAlignCenter, s.cancellation, 'textWhite')}>
          <FormattedMessage {...messages.cancellationPolicy} />:{' '}
          <a href={'/cancellation-policies/' + policyName} target="_blank">
            <span className={s.greenColor}>{policyName}</span></a>
          <div>{policyContent}</div>
        </div>
      </div >
    );
  }
}

const mapState = (state) => ({
  serviceFees: state.book.serviceFees,
  base: state && state.currency && state.currency.base,
  rates: state && state.currency && state.currency.rates
});

const mapDispatch = {
  initialize
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(DetailsForGuest)));