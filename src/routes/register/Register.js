// General
import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Register.css';
import bt from '../../components/commonStyle.css';
import {
  Col
} from 'react-bootstrap';

// Components
import RegisterForm from '../../components/RegisterForm';
import SocialLogin from '../../components/SocialLogin';
import Link from '../../components/Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    refer: PropTypes.string
  };

  render() {
    const { refer } = this.props;
    let initialValues = {};
    let loginURL = '/login';
    if (refer) {
      initialValues = {
        refer
      };
      loginURL = '/login?refer=' + refer;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.loginHeading}><FormattedMessage {...messages.signup} /></h1>
          <RegisterForm initialValues={initialValues} />
          <strong className={s.lineThrough}>
            <span className={s.linetext}> <FormattedMessage {...messages.or} /></span>
          </strong>
          <SocialLogin refer={refer} />
          <p className={s.linkText}>
            <FormattedMessage {...messages.alreadyHaveAccount} />
            <Link className={s.modalCaptionLink} to={loginURL}>
              <FormattedMessage {...messages.login} />
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, bt)(Register));
