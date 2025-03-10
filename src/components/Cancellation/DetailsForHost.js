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

import { calculateHostCancellation, getPriceWithDiscount } from '../../helpers/cancellationData';
import messages from '../../locale/messages';
// Images
import defaultPic from '/public/SiteImages/large_no_image.jpeg';
import StarImage from '/public/SiteIcons/starFill.svg';

import bt from '../../components/commonStyle.css';
import s from './Cancellation.css';

class DetailsForHost extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostName: PropTypes.string.isRequired,
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
    const { reservationId, listTitle, userType, firstName, guestEmail, checkIn, checkOut, guests, listData, listData: { reviewsCount, reviewsStarRating, settingsData }, listId, hostName, initialize } = this.props;
    const { holdeData, hostServiceFeeType, discount, basePrice, cleaningPrice, guestServiceFee, hostServiceFee, taxPrice, total, currency, threadId, confirmationCode, isSpecialPriceAverage } = this.props;
    const { hostServiceFeeValue, cancelData: { cancellationRuleObj: { policyName, remainingNights, interval, nights, nonRefundableNights, policyContent, isTaxRefunded } } } = this.props;
    const { formatMessage } = this.props.intl;

    let subtotal = 0, totalNights = 0, roomType, starRatingValue = 0, path = '/images/upload/x_medium_', showImage, isCleaingPrice = 0, bookingSpecialPricing = [], priceForDays = 0;
    let coverImage = holdeData?.listData && holdeData?.listData?.listPhotos?.find(o => o.id == holdeData?.listData?.coverPhoto), isSpecialPriceAssigned = false, totalPrice = 0;

    if (settingsData != undefined && settingsData?.length > 0) {
      roomType = settingsData && settingsData[0] && settingsData[0]?.listsettings && settingsData[0]?.listsettings?.itemName;
    }
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }

    if (coverImage) {
      showImage = path + coverImage?.name;
    } else if (!coverImage && holdeData?.listData && holdeData?.listData?.listPhotos?.length > 0) {
      showImage = path + (holdeData?.listData && holdeData?.listData?.listPhotos[0]?.name);
    } else {
      showImage = defaultPic;
    }

    isCleaingPrice = cleaningPrice ? cleaningPrice : 0;

    holdeData?.bookingSpecialPricing && holdeData?.bookingSpecialPricing?.map((item, key) => {
      let pricingRow, currentPrice;
      if (item?.blockedDates) {
        isSpecialPriceAssigned = true;
        currentPrice = Number(item?.isSpecialPrice);
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
      bookingSpecialPricing?.map((item, index) => {
        priceForDays = Number(priceForDays) + Number(item?.isSpecialPrice);
      });
    } else {
      priceForDays = Number(basePrice) * Number(nights - nonRefundableNights)
    }

    totalPrice = getPriceWithDiscount({ basePrice: (isSpecialPriceAverage || basePrice), discount, nights });

    const {
      refundAmount,
      nonPayoutAmount,
      payoutAmount,
      refundDays,
      updatedHostFee,
      updatedGuestFee
    } = calculateHostCancellation({
      total,
      basePrice: totalPrice,
      isCleaingPrice,
      nights,
      remainingNights,
      guestServiceFee,
      hostServiceFee,
      taxPrice,
      hostServiceFeeType,
      hostServiceFeeValue,
      interval
    })

    subtotal = total + guestServiceFee;

    let cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundAmount,
      payoutToHost: payoutAmount,
      guestServiceFee: updatedGuestFee,
      hostServiceFee: updatedHostFee,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'host',
      checkIn,
      checkOut,
      guests,
      hostName,
      guestName: firstName,
      listTitle: listData.title,
      confirmationCode,
      guestEmail,
      userType,
      isTaxRefunded
    };

    initialize('CancellationForm', cancellationData, true);

    totalNights = nights - refundDays;

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
            refundDays > 0 && nonPayoutAmount > 0 && <div className={s.refundableText}>
              <div>
                <p className={cx(s.textHigh, s.textBold, s.noMargin)}>
                  <FormattedMessage {...messages.missedEarnings} />
                </p>
                <span>
                  <CurrencyConverter
                    amount={totalPrice}
                    from={currency}
                  />
                </span>
                <span> {' x'} {refundDays} {refundDays > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span>
              </div>
              <div className={cx(s.textHigh, s.textBold, s.textLine)}>
                <CurrencyConverter
                  amount={nonPayoutAmount}
                  from={currency}
                />
              </div>
            </div>
          }
          {
            payoutAmount > 0 && <div className={cx(s.refundableText, s.refundableNoBorder)}>
              <div>
                <p className={cx(s.textHigh, s.textBold, s.noMargin)}>
                  <FormattedMessage {...messages.earnings} />
                </p>
                <span>
                  <CurrencyConverter
                    amount={totalPrice}
                    from={currency}
                  />
                </span>
                {totalNights > 0 && <span> x {totalNights} {formatMessage(messages[totalNights > 1 ? 'nights' : 'night'])},</span>}
              </div>
              <div className={cx(s.textHigh, s.textBold)}>
                <CurrencyConverter
                  amount={payoutAmount}
                  from={currency}
                />
              </div>
            </div>
          }
          {payoutAmount > 0 &&
            <div className={cx(s.spaceTop2)}>
              <p cclassName={s.landingStep}>
                <span>{firstName}{' '}
                  <FormattedMessage {...messages.willBeRefund} />{' '}{' '}
                  <FormattedMessage {...messages.reservationCost} />
                </span>
              </p>
            </div>
          }
        </div>
        <div className={cx(s.spaceTop3, bt.textAlignCenter, s.cancellation, 'textWhite')}>
          <FormattedMessage {...messages.cancellationPolicy} />:{' '}<a href={'/cancellation-policies/' + policyName} target="_blank">
            <span className={s.greenColor}>{policyName}</span></a>
          <div>{policyContent}</div>
        </div>
      </div>
    );
  }
}


const mapState = (state) => ({});

const mapDispatch = {
  initialize
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(DetailsForHost)));