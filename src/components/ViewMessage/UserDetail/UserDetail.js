import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import { injectIntl } from 'react-intl';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

// Images
import verifyIcon from '/public/viewMessage/shield.svg';
import reviewIcon from '/public/viewMessage/star.svg'
import { connect } from 'react-redux';

class UserDetail extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    location: PropTypes.string,
    reviewsCount: PropTypes.number,
    verifications: PropTypes.shape({
      isEmailConfirmed: PropTypes.bool,
      isFacebookConnected: PropTypes.bool,
      isGoogleConnected: PropTypes.bool,
    }),
  };

  static defaultProps = {
    picture: null,
    displayName: '',
    location: '',
  };

  render() {
    const { profileId, picture, displayName, isAdminAuthenticated, location, verifications, reviewsCount, hostName, hostProfileId } = this.props;
    const { formatMessage } = this.props.intl;
    let totalVerification = 0;
    if (verifications) {
      if (verifications.isEmailConfirmed) { totalVerification += 1; }
      // if (verifications.isFacebookConnected) { totalVerification += 1; }
      if (verifications.isGoogleConnected) { totalVerification += 1; }
      if (verifications.isIdVerification == 1) { totalVerification += 1; }
    }
    return (
      <div className={cx(s.textCenter,  s.userDetailSec, isAdminAuthenticated && s.spaceTop20)}>
        <div>
          <Avatar
            source={picture}
            height={48}
            width={48}
            title={displayName}
            className={s.profileAvatar}
            withLink
            linkClassName={s.profileAvatarLink}
            profileId={profileId}
          />
        </div>
        <div>
          <div className={s.nameSection}>
            <span className={s.font16}>{formatMessage(messages.hostedBy)}</span> <span><Link to={"/users/show/" + hostProfileId}><span className={cx(s.profileName, s.marginNone)}>{hostName}</span></Link></span>
          </div>
          <div className={cx(s.profileDetail)}>
            <span className={cx(s.verifyReviewCountSec, 'darkModeTextWhite', 'svgImg')}><img src={verifyIcon} alt='' /> {totalVerification} {totalVerification > 1 ? formatMessage(messages.verifications) : formatMessage(messages.verification)}</span>
            <span className={s.userDetailDotText}></span>
            <span className={cx(s.verifyReviewCountSec, 'darkModeTextWhite', 'svgImg')}><img src={reviewIcon} alt='' /> {reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  isAdminAuthenticated: state.runtime.isAdminAuthenticated,
});

const mapDispatch = {}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(UserDetail)));

