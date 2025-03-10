// General
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import bt from '../../components/commonStyle.css';
import cx from 'classnames';
import {
  Col
} from 'react-bootstrap';

// Components
import LoginForm from '../../components/LoginForm';
import SocialLogin from '../../components/SocialLogin';
import Link from '../../components/Link';

// Locale
import messages from '../../locale/messages';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    warning: PropTypes.bool,
    formatMessage: PropTypes.func,
    refer: PropTypes.string
  };

  static defaultProps = {
    warning: false
  }

  render() {
    const { warning, refer } = this.props;
    let initialValues = {};
    let socialLoginRefer;
    let registerURL = '/register';
    if (refer) {
      initialValues = {
        refer
      };
      socialLoginRefer = refer;
      if (socialLoginRefer && socialLoginRefer != null) {
        socialLoginRefer = socialLoginRefer.indexOf('?') >= 0 ? socialLoginRefer.replace('?', '------') : socialLoginRefer;
        socialLoginRefer = socialLoginRefer.indexOf('&') >= 0 ? socialLoginRefer.replace('&', '--') : socialLoginRefer;
      }
      registerURL = '/register?refer=' + refer;
    }

    return (
      <div className={cx(s.root, s.mobTopSpace)}>
        <div className={s.container}>
          {
            warning && <div className={s.loginHeading}>
              <FormattedMessage {...messages.loginConfirmation} />
            </div>
          }
          <h1 className={s.loginHeading}><FormattedMessage {...messages.logInLabel} /></h1>

          <LoginForm initialValues={initialValues} />
          <h4 className={s.lineThrough}>
            <span className={s.linetext}><FormattedMessage {...messages.or} /></span>
          </h4>
          <SocialLogin refer={socialLoginRefer} />
          <p className={s.linkText}>
            <FormattedMessage {...messages.noAccount} />
            <Link className={s.modalCaptionLink} to={registerURL}>
              <FormattedMessage {...messages.signUpHere} />
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, bt)(Login));