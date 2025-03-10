import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeItem.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { injectIntl, FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';


// Component
import StarRating from '../../StarRating';
import CurrencyConverter from '../../CurrencyConverter';
import ListCoverPhoto from '../../ListCoverPhoto';
import WishListIcon from '../../WishListIcon';

// Locale
import messages from '../../../locale/messages';

// Helpers
import { formatURL } from '../../../helpers/formatURL';

class HomeSlider extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    photo: PropTypes.string.isRequired,
    beds: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    bookingType: PropTypes.string.isRequired,
    listPhotos: PropTypes.array.isRequired,
    coverPhoto: PropTypes.number,
    reviewsCount: PropTypes.number,
    reviewsStarRating: PropTypes.number,
    wishListStatus: PropTypes.bool,
    isListOwner: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.randomStyleClass = this.randomStyleClass.bind(this);
  }

  randomStyleClass() {
    let styleClasses = {
      0: s.textDarkBlue,
      1: s.textLightBlue,
      3: s.textLightBrown,
      5: s.textBrown,
      6: s.textMaroon,
      7: s.textDarkBrown,
      8: s.textMediumBrown,
      9: s.textSkyBlue
    };

    let currentIndex = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    return styleClasses[currentIndex];
  }

  render() {
    const { id, photo, basePrice, currency, roomType, beds, title, bookingType } = this.props;
    const { listPhotos, coverPhoto, reviewsCount, reviewsStarRating, userId, isViewListing } = this.props;
    const { wishListStatus, isListOwner, account, key } = this.props;
    const { formatMessage } = this.props.intl;

    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }

    let currentUser = account && account.userId;

    let isWhisListIcon = false;
    if (userId == currentUser) {
      isWhisListIcon = true;
    }

    return (
      <div>
        <div className={cx(s.imgContainer, 'bgBlackTwo')}>
          {
            !isWhisListIcon && <WishListIcon listId={id} key={key} isChecked={wishListStatus} isViewListing={isViewListing} />
          }
          <div className={cx(s.parent)}>
            <div className={cx(s.children)}>
              <div className={cx(s.content)}>
                <a href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
                  <ListCoverPhoto
                    className={cx(s.imageContent)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                    lazyLoad
                    placeholderClassName={cx(s.imageContent)}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={s.infoContainer}>
          <a className={s.linkContainer} href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
            <div className='homeSliderRtl'>
              <div className={cx(s.textStrong, s.spaceTop2, s.textEllipsis, 'listingInfoRTL', s.pricingText, s.infoSpace, 'textWhite')}>
                <div>
                  <CurrencyConverter
                    amount={basePrice}
                    from={currency}
                  />
                  {' '} <span className={s.nightText}>/ <FormattedMessage {...messages.perNight} /></span>
                  {
                    bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                  }
                </div>
                {starRatingValue > 0 && <div className={cx(s.textEllipsis, s.infoReview, s.infoText, 'small-star-rating', 'textWhite')}>
                  <StarRating className={cx(s.reviewStar, 'floatRight')} value={starRatingValue} name={'review'} />
                  <span className={cx(s.reviewText, 'reviewTextRTL')}>
                    {starRatingValue}
                  </span>
                </div>}
              </div>
              <div className={cx(s.textEllipsis, s.infoTitle, 'listingInfoRTL', 'textWhite')}>
                <span className={'textReversing'}>{title}</span>
              </div>
              <div className={cx(s.textEllipsis, s.infoDesc, 'textWhite')}>
                <span className='roomTypeRtl'>{roomType}</span>
                {beds > 0 && <span><span>&nbsp;/&nbsp;</span>{beds} {beds > 1 ? <FormattedMessage {...messages.beds} /> : <FormattedMessage {...messages.bed} />}</span>}
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  account: state.account.data
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
)(HomeSlider);