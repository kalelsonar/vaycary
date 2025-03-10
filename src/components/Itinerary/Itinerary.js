import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import {
  Row,
  Col,
  Grid
}
  from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Itinerary.css';
import { connect } from 'react-redux';

// Components
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import ListCoverPhoto from '../ListCoverPhoto';
import Link from '../Link';
import StarRating from '../StarRating';
import NotFound from '../../routes/notFound/NotFound';

// Helper
import { generateTime } from '../Receipt/helper';
// import { checkValue } from '../../routes/viewListing/helper';


// Locale
import messages from '../../locale/messages';
import ListNotFound from '../../routes/listNotFound/ListNotFound';

// Images
import RightArrow from '/public/SiteIcons/viewReceiptRight.svg';
import DateArrow from '/public/SiteIcons/viewReceiptArrow.svg';

class Itinerary extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      settingsData: PropTypes.object,
      checkOut: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      roomType: PropTypes.string.isRequired,
      beds: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      reservationState: PropTypes.string.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        zipcode: PropTypes.string.isRequired,
        reviewsCount: PropTypes.number.isRequired,
        reviewsStarRating: PropTypes.number.isRequired,
        listingData: PropTypes.shape({
          checkInStart: PropTypes.string.isRequired,
          checkInEnd: PropTypes.string.isRequired
        }),
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.arrayOf({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }),
      }),
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    data: null
  };

  render() {
    const { data } = this.props;
    const { formatMessage } = this.props.intl;
    const { userId } = this.props;

    if (data === null) {
      return <NotFound />;
    } else if (data.listData === null) {
      return <ListNotFound />;
    } else if (data?.paymentState !== "completed") {
      return <NotFound />;
    } else {
      const { data, data: { id, listId, checkIn, checkOut, total, listTitle, guestServiceFee, currency, confirmationCode, reservationState, hostId, guestId } } = this.props;
      const { data: { hostData: { profileId, displayName, picture, firstName } } } = this.props;
      const { data: { listData: { title, street, city, state, country, zipcode, beds } } } = this.props;
      const { data: { listData: { coverPhoto, listPhotos, reviewsCount, reviewsStarRating, settingsData } } } = this.props;
      const { data: { messageData, messageThreadId } } = this.props;
      let threadsId = messageThreadId?.id || messageData?.id
      let checkInTimeFormat, roomType;
      let { data: { checkInStart, checkInEnd } } = this.props;

      let checkInDate = checkIn ? moment(checkIn).format('MM/DD/YYYY') : '';
      let checkOutDate = checkOut ? moment(checkOut).format('MM/DD/YYYY') : '';
      let momentStartDate, momentEndDate, dayDifference, checkInTime, checkOutTime;
      if (checkIn != null && checkOut != null) {
        momentStartDate = moment(checkIn);
        momentEndDate = moment(checkOut);
        dayDifference = momentEndDate.diff(momentStartDate, 'days');
      }
      if (checkInStart && checkInStart !== 'Flexible') {
        checkInTime = generateTime(checkInStart);
      }

      if (checkInEnd && checkInEnd !== 'Flexible') {
        checkOutTime = generateTime(checkInEnd);
      }
      if (settingsData != undefined && settingsData.length > 0) {
        roomType = settingsData && settingsData[0] && settingsData[0].listsettings && settingsData[0].listsettings.itemName;
      }

      if (checkInStart && checkInEnd) {
        if (checkInStart === 'Flexible' && checkInEnd === 'Flexible') {
          checkInTimeFormat = formatMessage(messages.flexibleCheckIn);
        } else if (checkInStart !== 'Flexible' && checkInEnd === 'Flexible') {
          checkInTimeFormat = 'From ' + checkInTime;
        } else if (checkInStart === 'Flexible' && checkInEnd !== 'Flexible') {
          checkInTimeFormat = 'Upto ' + checkOutTime;
        } else if (checkInStart !== 'Flexible' && checkInEnd !== 'Flexible') {
          checkInTimeFormat = checkInTime + ' - ' + checkOutTime;
        }
      }

      let subTotal = total + guestServiceFee;
      let starRatingValue = 0;
      if (reviewsCount > 0 && reviewsStarRating > 0) {
        starRatingValue = Math.round(reviewsStarRating / reviewsCount)
      }

      let isHost = false;
      if (userId === hostId) {
        isHost = true;
      }

      return (
        <div className={cx(s.spaceTop6, 'ViewProfile', s.space6)}>
          <Grid fluid className={s.landingContainer}>
            <Row>
              <Col lg={7} md={7} sm={7} xs={12} className={cx(s.billingPadding, 'billingPaddingRTL')}>
                <div className={s.space4}>
                  <div className={s.space4}>
                    {
                      reservationState === "approved" && <h2 className={s.titleText}>
                        <FormattedMessage {...messages.itinerayTitle} /> {city}!
                      </h2>
                    }
                    <p><FormattedMessage {...messages.confirmationCode} />:
                      <span>&nbsp;</span>
                      <span>#{confirmationCode}</span>
                    </p>
                  </div>
                  <div className={s.avatarDisplayFlex}>
                    <div className={s.profileAvatarLink}>
                      <Avatar
                        source={picture}
                        className={s.profileAvatar}
                        withLink
                        profileId={profileId}
                      />
                    </div>
                    {
                      <div className={cx(s.hostTitlePadding, 'hostTitlePaddingRTL')}>
                        <p className={cx(s.hostedTitle, 'textWhite')}>
                          <FormattedMessage {...messages.hostedBy} /> {firstName}</p>
                        {!isHost && messageData && <Link to={"/message/" + threadsId + "/guest"} className={s.linkText}>
                          <FormattedMessage {...messages.messageHost} />
                          <img src={RightArrow} className={cx(s.rightArrow, 'rightArrowItineraryRTL')} />
                        </Link>}
                      </div>
                    }
                  </div>
                </div>
                <div className={s.detailsSection}>
                  <div className={s.biilingGrid}>
                    <p className={cx(s.subText, s.textBoldMedium)}><FormattedMessage {...messages.billing} /></p>
                    <div>
                      <p className={cx(s.subText, s.noMargin)}>
                        {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
                      </p>
                      <p className={cx(s.subText, s.space1)}>
                        <CurrencyConverter
                          amount={subTotal}
                          from={currency}
                        />
                      </p>
                      <Link to={"/users/trips/receipt/" + id} className={s.linkText}>
                        <FormattedMessage {...messages.viewReceipt} />
                        <img src={RightArrow} className={cx(s.rightArrow, 'rightArrowItineraryRTL')} />
                      </Link>
                    </div>
                  </div>
                  <hr className={s.hrLine} />
                  <div className={s.dateGrid}>
                    <div>
                      <p className={cx(s.subText, s.textBoldMedium)}>
                        <FormattedMessage {...messages.checkIn} />
                      </p>
                      <p className={cx(s.dateText, s.noMargin, 'textWhite')}>
                        <span>{checkInDate}</span>
                        <span className={s.displayBlock}>{checkInTimeFormat}</span>
                      </p>
                    </div>
                    <div>
                      <img src={DateArrow} className={cx(s.dateArrow, 'commonIconRTL')} />
                    </div>
                    <div>
                      <p className={cx(s.subText, s.textBoldMedium)}>
                        <FormattedMessage {...messages.checkOut} />
                      </p>
                      <p className={cx(s.dateText, s.noMargin, 'textWhite')}>
                        {checkOutDate}
                      </p>
                    </div>
                  </div>
                  <hr className={s.hrLine} />
                  <div className={s.biilingGrid}>
                    <p className={cx(s.subText, s.textBoldMedium)}>
                      <FormattedMessage {...messages.address} />
                    </p>
                    <div>
                      <p className={cx(s.subText, s.noMargin)}>{street}</p>
                      <p className={cx(s.subText, s.noMargin)}>{city}, {state} {zipcode}</p>
                      <p className={cx(s.subText, s.space1)}>{country}</p>
                      <a href={"/rooms/" + listId} target={'_blank'} className={s.linkText}>
                        <FormattedMessage {...messages.viewListing} />
                        <img src={RightArrow} className={cx(s.rightArrow, 'rightArrowItineraryRTL')} />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={5} md={5} sm={5} xs={12}>
                <div className={cx(s.imgContainer)}>
                  <div className={cx(s.parent)}>
                    <div className={cx(s.children)}>
                      <div className={cx(s.content)}>
                        <Link to={"/rooms/" + listId}>
                          <ListCoverPhoto
                            className={cx(s.imageContent)}
                            coverPhoto={coverPhoto}
                            listPhotos={listPhotos}
                            photoType={"x_medium"}
                            bgImage
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {starRatingValue > 0 && <div className={s.StarSectionTop}>
                  <span className={s.starSection}><StarRating value={starRatingValue} name={"Itinerary"} className={cx('startViewAR', 'startViewreceipt')} /></span>
                  <span className={'vtrMiddle'}>{starRatingValue}</span>
                  <span className={cx(s.starSection, s.reviewCircle)}>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
                </div>}
                <Link to={"/rooms/" + listId} className={cx(s.hostedTitle, 'textWhite', { [s.hostTitleTwo]: starRatingValue < 0 })}>
                  {listTitle ? listTitle : title}
                </Link>
                <p className={cx(s.locationText, 'textWhite')}>
                  <span className='roomTypeRtl'>{roomType}</span>{' '}
                  {beds > 0 && <span><span>-</span>{beds} {beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}</span>}
                </p>
                <p className={cx(s.locationText, s.space1, 'textWhite')}>{city}, {state}, {country}</p>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

const mapState = (state) => ({
  userId: state.account.data.userId,
  settingsData: state.viewListing.settingsData
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Itinerary)));