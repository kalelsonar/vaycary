import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Image from 'react-bootstrap/lib/Image';
import cx from 'classnames';

import messages from '../../locale/messages';
import showToaster from '../../helpers/showToaster';

import googleIcon from '/public/SiteIcons/googleSign.svg';

import s from './SocialLogin.css';
class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { isAdmin } = this.props;
    if (isAdmin) {
      showToaster({ messageId: 'isAdmin', toasterType: 'error' })
      event.preventDefault();
    }
  }

  render() {
    const { refer } = this.props;
    let FbURL = '/login/facebook';
    let GoogleURL = '/login/google';
    if (refer) {
      FbURL = '/login/facebook?refer=' + refer;
      GoogleURL = '/login/google?refer=' + refer;
    }

    return (
      <div className={cx(s.bgColor, 'googleIconRTL')}>
        <a className={cx(s.displayFlexIcon, s.button)} onClick={(event) => this.handleClick(event)} href={GoogleURL}>
          <Image src={googleIcon} responsive />
          <span><FormattedMessage {...messages.google} /></span>
        </a>
      </div>
    );
  }
}

const mapState = state => ({
  isAdmin: state.runtime && state.runtime.isAdminAuthenticated,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SocialLogin)));