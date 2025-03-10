import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmptyInbox.css';

// Locale
import messages from '../../../locale/messages';

//Image
import noInboxImage from '/public/SiteImages/noInboxImage.svg';

class EmptyInbox extends React.Component {
  render() {
    const { type } = this.props;
    return (
      <div className={s.textCenter}>
        <img src={noInboxImage} className={s.widthImg} />
        <p className={s.textMuted}>
          <FormattedMessage {...messages[type === 'guest' ? 'noMessagesTitle1' : 'noMessagesTitle2']} />
        </p>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(EmptyInbox));
