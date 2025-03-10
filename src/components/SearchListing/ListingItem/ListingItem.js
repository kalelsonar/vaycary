
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import ListingSwiperPhotos from '../../Common/ListingSwiperPhotos/ListingSwiperPhotos';
import StarRating from '../../StarRating';
import WishListIcon from '../../WishListIcon';
import ShowPriceValue from './ShowPriceValue';

// Locale
import messages from '../../../locale/messages';

import { formatURL } from '../../../helpers/formatURL';
import { isRTL } from '../../../helpers/formatLocale';

import {
  Row,
  Col
} from 'react-bootstrap';
import cs from '../../../components/commonStyle.css';
import s from './ListingItem.css';

class ListingItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    basePrice: PropTypes.number,
    currency: PropTypes.string,
    title: PropTypes.string,
    beds: PropTypes.number,
    personCapacity: PropTypes.number,
    roomType: PropTypes.string,
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    bookingType: PropTypes.string.isRequired,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool,
    personCount: PropTypes.number,
    oneTotalPrice: PropTypes.number,
    listBlockedDates: PropTypes.array,
    serviceFees: PropTypes.array,
    openTotalPriceModal: PropTypes.any,
    results: PropTypes.array
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener('touchstart', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClickOutside = (event) => {
    const { onCloseClick, showMap } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && showMap) {
      onCloseClick();
    }
  }

  handleMouseOver = (value) => {
    const { change } = this.props;
    change('SearchForm', 'markerHighlight', { 'id': value, 'hover': 'true' });
  }

  handleMouseOut = (value) => {
    const { change } = this.props;
    change('SearchForm', 'markerHighlight', {});
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { id, basePrice, currency, title, beds, personCapacity, roomType, coverPhoto, listPhotos, bookingType, reviewsCount, results, listBlockedDates } = this.props;
    const { reviewsStarRating, wishListStatus, isListOwner, isMapShow, personalized, personCount, oneTotalPrice, serviceFees, calculatedValues, showMap, locale, totalPrice, updatedLocale } = this.props;
    let bedsLabel = 'bed', guestsLabel = 'guest', heartIcon = 'heartIcon', personalizedURL = '', startDate, endDate, guestCount, starRatingValue = 0;
    let activeItem = 0, photoTemp, photosList = listPhotos.slice(), listingURL;

    const values = results.find(result => result.id === id), listingData = values?.listingData;

    if (beds > 1) bedsLabel = 'beds';

    if (personCapacity > 1) guestsLabel = 'guests';

    if (reviewsCount > 0 && reviewsStarRating > 0) starRatingValue = Math.round(reviewsStarRating / reviewsCount)

    if (listPhotos?.length > 1) {
      listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
      if (activeItem > 0) {
        photoTemp = photosList[0];
        photosList[0] = photosList[activeItem];
        photosList[activeItem] = photoTemp;
      }
    }
    startDate = personalized?.startDate ? "?&startdate=" + personalized?.startDate : '';
    endDate = personalized?.endDate ? "&enddate=" + personalized?.endDate : '';
    guestCount = personCapacity && personalized?.startDate && personalized?.endDate ? "&guests=" + personCount : '';
    personalizedURL = startDate + endDate + guestCount;
    listingURL = "/rooms/" + formatURL(title) + '-' + id + personalizedURL;

    return (
      <div className={cx(s.listItemContainer, 'mapInfoWindow-')} ref={this.setWrapperRef} onMouseOver={() => !showMap && this.handleMouseOver(id)} onMouseOut={() => !showMap && this.handleMouseOut(id)}>
        <div className={cx(showMap ? s.listPhotoContainer : '', showMap ? 'bgBlack' : '')}>
          {
            !isListOwner && <WishListIcon listId={id} key={id} isChecked={wishListStatus} heartIcon={heartIcon} />
          }
          <Row>
            <Col xs={12} sm={12} md={12}>
              <ListingSwiperPhotos
                id={id}
                coverPhoto={coverPhoto}
                listPhotos={photosList}
                title={title}
                isMapShow={showMap}
                personalizedURL={personalizedURL}
                rtl={isRTL(locale)}
                updatedLocale={updatedLocale}
              />
            </Col>
          </Row>
          <a href={listingURL} target={"_blank"} className={cx(s.listInfoLink, 'textWhite')}>
            <div className={cx(cs.spaceTop2, showMap ? s.mapListItemPadding : '')}>
              <div className={s.listFlex}>
                <p className={cx(s.listingInfo, 'textWhite', cs.noMargin)}>
                  <span class="roomTypeRtl">{roomType}</span>
                  {beds > 0 && <span><span>&nbsp;/&nbsp;</span>{beds} {beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}</span>}
                </p>
                <div className={cx(s.infoReview, 'textWhite', 'searchPageStartSection')}>
                  {starRatingValue > 0 &&
                    <div className={cx(s.reviewStarGap, 'small-star-rating', cs.displayFlex, cs.alignCenter, cs.justifyContentFlexEnd, 'positionRelative')}>
                      <StarRating
                        value={starRatingValue}
                        name={'review'}
                        starColor={'#282828'}
                        emptyStarColor={'#cccccc'}
                      />
                      <span>{starRatingValue + ' '}</span>
                    </div>}
                </div>
              </div>
              <p className={cx(s.textEllipsis, s.listingTitle, 'textWhite', s.listInfoLink, cs.fontWeightMedium, cs.space1, cs.spaceTop1)} href={listingURL} target={"_blank"}>
                {title}
              </p>
              <div className={cx(s.showPriceValueFlex, cs.positionRelative, cs.alignCenter, { [s.alignFlexStart]: totalPrice })}>
                <ShowPriceValue oneTotalPrice={oneTotalPrice} basePrice={basePrice} currency={currency} listBlockedDates={listBlockedDates}
                  serviceFees={serviceFees} listingData={listingData} bookingType={bookingType} calculatedValues={calculatedValues} showMap={showMap} listingURL={listingURL} />
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  isMapShow: state.personalized.showMap,
  personalized: state.personalized,
  locale: state.intl && state.intl.locale,
  formValues: getFormValues('SearchForm')(state),
  results: state.search.data,
  base: state.currency.base,
  rates: state.currency.rates,
  totalPrice: state.personalized.totalPrice,
  updatedLocale: state?.intl?.newLocale,
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingItem)));