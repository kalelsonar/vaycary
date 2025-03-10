import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingIntro.css';
import cx from 'classnames';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';
import { checkValue } from '../ListingDetails/helper';

// Component
import Avatar from '../../Avatar';
class ListingIntro extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
  };

  render() {
    const { data } = this.props;
    const { reviewsCount, reviewsStarRating } = this.props;
    let starRatingValue = 0, propertyType;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    if (data.settingsData != undefined && data.settingsData.length > 0) {
      propertyType = checkValue(data.settingsData && data.settingsData[1] && data.settingsData[1].listsettings && data.settingsData[1].listsettings.itemName, '');
    }

    return (
      <div>
        <div className={s.flex}>
          <div>
            <Avatar
              source={data.user.profile.picture}
              type={"small"}
              height={115}
              width={115}
              title={data.user.profile.firstName}
              className={s.profileAvatar}
              withLink
              linkClassName={s.profileAvatarLink}
              profileId={data.user.profile.profileId}
            />
          </div>
          <div className={cx(s.hostNameCss, 'hostNameCssRTL')}>
            <FormattedMessage {...messages.hostedBy} /> {' '}  {data.user.profile.firstName}
            <div className={cx(s.propertyCss, 'textWhite')}>
              {propertyType}
              {data && data.residenceType == '1' && <span><span className={cx(s.dotCss, 'dotStyleDarkMode')}></span>
                <span> <FormattedMessage {...messages.personalHome} /></span></span>}
            </div>
          </div>
        </div>
        <div className={s.listingLine}></div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListingIntro));
