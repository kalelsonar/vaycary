import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import Avatar from '../../Avatar';

class FromMessage extends Component {
  static propTypes = {
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

  static defaultProps = {
    createdAt: null
  };

  render() {
    const { profileId, picture, displayName, content, createdAt } = this.props;
    let date = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '';

    return (
      <div>
        <div className={cx(s.spaceBottom20)}>
          <div className={s.messageBoxFlex}>
            <div className={cx(s.messageProfilePicSec)}>
              <div className={cx(s.profileAvatarSectionLeft, 'profileAvatarSectionLeftAr')}>
                <Avatar
                  source={picture}
                  height={48}
                  width={48}
                  title={displayName}
                  className={s.profileAvatar}
                  withLink
                  linkClassName={cx(s.profileAvatarLink, 'profileAvatarLinkRTL')}
                  profileId={profileId}
                />
              </div>
            </div>
            <div className={cx(s.width100, s.radiusColor, s.fromRadius, 'fromRadiusRTL', 'darkModeRadiusColor')}>
              <Panel className={cx(s.panelBubble, s.panelDark, s.panelBubbleLeft, 'viewMessageBubble', s.panelLeftMessage, 'viewBubbleLeftRTL', 'bgBlack', 'dashRightBgTwo')}>
                <span className={cx(s.txtBreak)}>
                  {
                    content && (content.trim()).split("\n").map(function (item, index) {
                      return (
                        <span key={index}>{item}<br /></span>

                      )
                    })
                  }
                </span>
                <div className={cx(s.timeText, s.spaceTop11)}>
                  <span className={cx(s.messageDateText, 'textWhite')}>{date}</span>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default withStyles(s)(FromMessage);