import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ListCoverPhoto from '../ListCoverPhoto';
import PaymentDetails from './PaymentDetails';
import PaymentForm from './PaymentForm';
import StarRating from '../StarRating';

import messages from '../../locale/messages';

import s from './Payment.css';
class Payment extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      formatMessage: PropTypes.any,
      total: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      taxPrice: PropTypes.number,
      guestServiceFee: PropTypes.number.isRequired,
      discount: PropTypes.number,
      discountType: PropTypes.string,
      currency: PropTypes.string.isRequired,
      hostData: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      }),
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        personCapacity: PropTypes.number.isRequired,
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array.isRequired,
        settingsData: PropTypes.arrayOf(PropTypes.shape({
          listsettings: PropTypes.shape({
            itemName: PropTypes.string.isRequired
          })
        })),
        houseRules: PropTypes.array,
        listingData: PropTypes.shape({
          cancellation: PropTypes.shape({
            policyName: PropTypes.string.isRequired
          })
        })
      }),

    }),
  };

  render() {
    const { data: { hostData: { firstName, picture, profileId } } } = this.props;
    const { data: { listData: { title, city, state, country, personCapacity, listingData, beds } } } = this.props;
    const { data: { id, checkIn, checkOut, guests, message, discount, currency, isSpecialPriceAverage } } = this.props;
    const { data: { listData: { coverPhoto, listPhotos, settingsData, houseRules, reviewsCount, reviewsStarRating } } } = this.props;
    const { data: { total, basePrice, cleaningPrice, taxPrice, guestServiceFee, discountType } } = this.props;
    const { formatMessage } = this.props.intl;

    let starRatingValue = 0, amount, initialValues;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }

    amount = total + guestServiceFee;
    initialValues = {
      reservationId: id,
      amount,
      currency,
      message,
      guests,
      title
    };

    return (
      <Row>
        <Col md={5} mdPush={7} className={s.positionSticky}>
          <div className={cx(s.summaryCard, s.colCenter)}>
            <div className={s.postionRelative}>
              <div className={s.secondSection}>
                <div className={cx(s.displayInline, s.avatarWidth, s.vtrMiddle, 'avatarWidthPaymentRTL', s.vtrTopSm)}>
                  <ListCoverPhoto
                    className={cx(s.bannerImage, s.backgroundCover)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </div>
                <div className={cx(s.displayInline, s.contentWidth, s.vtrMiddle)}>
                  {starRatingValue > 0 && <div className={s.reviewFlex}>
                    <div className={s.reviewFlex}>
                      <span className={cx(s.starCss, 'starCssRTL')}><StarRating name={'review'} value='' /></span>
                      <span>{starRatingValue}</span>
                    </div>
                    <span className={s.dotsCss}>&#8226;</span>
                    <span>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
                  </div>}
                  <div className={cx(s.textLarge, s.colorWhite, s.propertyText)}>
                    <span>{title}</span>
                  </div>
                  <div className={cx(s.textMuted, s.colorWhite, s.listItem, 'textWhite')}>
                    <ul className={cx(s.listStyle, 'listStyleRTL')}>
                      <li>
                        {settingsData && settingsData[0] && settingsData[0]?.listsettings && settingsData[0]?.listsettings?.itemName}
                        {beds > 0 && <span><span>-</span>{beds} {beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}</span>}
                      </li>
                    </ul>
                    <div className={s.colorWhite}> {city}, {state}, {country} </div>
                  </div>
                </div>
              </div>
            </div>
            <PaymentDetails
              checkIn={checkIn}
              checkOut={checkOut}
              total={total}
              basePrice={isSpecialPriceAverage || basePrice}
              cleaningPrice={cleaningPrice}
              discount={discount}
              discountType={discountType}
              serviceFee={guestServiceFee}
              currency={currency}
              taxPrice={taxPrice}
            />
          </div>
          {
            listingData?.cancellation &&
            <div className={s.policyCss}>
              <span className={s.checkInText}><FormattedMessage {...messages.cancellationPolicy} />: </span>
              <span className={s.policyColor}>{listingData?.cancellation?.policyName}</span>
              <div className={cx(s.checkInText)}>{listingData?.cancellation?.policyContent}</div>
            </div>
          }
        </Col>

        <Col md={7} mdPull={5}>
          <PaymentForm
            hostName={firstName}
            houseRules={houseRules}
            allowedGuests={personCapacity}
            initialValues={initialValues}
            checkIn={checkIn}
            checkOut={checkOut}
            picture={picture}
            profileId={profileId}
          />
        </Col>
      </Row>
    );
  }
}

export default injectIntl(withStyles(s)(Payment));
