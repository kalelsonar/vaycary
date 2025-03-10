import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';

// Components
import StarRating from '../../StarRating';
import ListCoverPhoto from '../../ListCoverPhoto';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class ListingDetails extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number,
      coverPhoto: PropTypes.number,
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      }))
    }),
  };

  render() {
    const { data: { id, title, street, city, state, country, beds, settingsData }, listTitle } = this.props;
    const { data: { coverPhoto, listPhotos, reviewsCount, reviewsStarRating } } = this.props;
    const { formatMessage } = this.props.intl;
    let starRatingValue = 0, roomType;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    if (settingsData != undefined && settingsData.length > 0) {
      roomType = settingsData && settingsData[0] && settingsData[0].listsettings && settingsData[0].listsettings.itemName;
    }
    return (
      <div>
        <div className={cx(s.imgContainer, s.ratingImageContainer)}>
          <div className={cx(s.parent)}>
            <div className={cx(s.children)}>
              <div className={cx(s.content)}>
                <Link to={"/rooms/" + id}>
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
        {starRatingValue > 0 && <div className={s.starFont}>
          <span><StarRating name={"listRating"} value={starRatingValue} className={s.starReview} /></span>
          {' '}
          <span>{reviewsCount}</span>
          <span className={s.dotsCss}>•</span>
          <span className={s.textMuted}>&nbsp;{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
        </div>}
        <div className={cx(s.titleText, { [s.reviewTop]: starRatingValue <= 0 }, 'textWhite')}>{listTitle || title}</div>
        <div className={cx(s.smallText, 'textWhite')}>
          <span className='roomTypeRtl'>{roomType}</span>{' '}
          {beds > 0 && <span><span>-</span>{beds} {beds > 1 ? formatMessage(messages.beds) : formatMessage(messages.bed)}</span>}
        </div>
        <div className={cx(s.smallText, 'textWhite')}>
          {city}, {state}, {country}
        </div>

      </div>
    );
  }
}


export default injectIntl(withStyles(s)(ListingDetails));
