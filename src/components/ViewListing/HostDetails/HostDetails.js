import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostDetails.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';

//Redux Action
import { openSocialShareModal } from '../../../actions/modalActions';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';
import WishListIcon from '../../WishListIcon';

// Component
import StarRating from '../../StarRating/StarRating';

//Image
import shareIcon from '/public/SiteIcons/viewListingShareIcon.svg';
class HostDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
  };

  render() {

    const { data, loading } = this.props;
    const { formatMessage } = this.props.intl;
    const { reviewsCount, reviewsStarRating, openSocialShareModal } = this.props;
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    let isListOwner = data.isListOwner;
    let wishListStatus = data.wishListStatus;

    return (
      <div className={cx(s.paddingCss, s.hostFlex)}>
        <div>
          <h1 className={cx(s.titleText, 'textWhite')}>
            {data.title != null ? data.title : data.settingsData && data.settingsData.length > 0 && data.settingsData[0].listsettings && data.settingsData[0].listsettings.itemName + ' ' + formatMessage(messages.in) + ' ' + data.city}
          </h1>
          <div className={s.flex}>
            {starRatingValue > 0 && <><span><StarRating name={'review'} value={starRatingValue} /></span>
              <span className={cx(s.countGap, 'countGapRTL')}>{starRatingValue}</span></>}
            <span className={cx('textWhite', 'locationCssRTL', 'locationCssDarkMode', { [s.locationCss]: starRatingValue > 0 })}>{data.city && data.city.toString().trimEnd()}, {data.state && data.state.toString().trimEnd()}, {data.country}</span>
          </div>
        </div>
        <div>
          <div className={cx(s.saveButtonPosition, 'saveButtonPositionRtl')}>
          {
              !isListOwner && !loading && <div className={cx(s.displayInline, 'shareBtnRtl')}> <WishListIcon type="button" listId={data.id} key={data.id} isChecked={wishListStatus} isViewListing={true} />
              </div>
            }
            {
              <div
                className={cx(s.buttonContainer, 'bgBlack', 'textWhite', 'buttonContainerRTL', {[s.mobilePaddingRemove] : isListOwner})}
                onClick={openSocialShareModal}
              >
                <span className={cx(s.vtrMiddle, s.imgCss, 'svgImg')}><img src={shareIcon} /></span>
                <span className={cx(s.paddingleft10, s.vtrBottom, 'shareTextRTL')}><FormattedMessage {...messages.shareLabel} /></span>
              </div>
            }
           
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  openSocialShareModal
};


export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HostDetails)));
