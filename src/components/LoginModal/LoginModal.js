// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginModal.css';
import cx from 'classnames';
import bt from '../../components/commonStyle.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeLoginModal, openSignupModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import LoginForm from '../LoginForm';
import Link from '../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class LoginModal extends Component {
  static propTypes = {
    closeLoginModal: PropTypes.func,
    loginModal: PropTypes.bool,
    openSignupModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModalStatus: false,
    };
  }

  componentDidMount() {
    const { loginModal } = this.props;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { loginModal } = nextProps;
    if (loginModal === true) {
      this.setState({ loginModalStatus: true });
    } else {
      this.setState({ loginModalStatus: false });
    }
  }

  render() {
    const { closeLoginModal, openSignupModal } = this.props;
    const { loginModalStatus } = this.state;

    return (
      <>
        <Modal
          show={loginModalStatus}
          animation={false}
          onHide={closeLoginModal}
          dialogClassName={'loginModal'}
        >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.logInSignUp} /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={s.root}>
              <LoginForm />
              <h4 className={s.lineThrough}>
                <span className={cx(s.linetext, 'bgColor', 'linetextDarkmode')}><FormattedMessage {...messages.or} /></span>
              </h4>
              <SocialLogin />
              <p className={s.linkText}>
                <FormattedMessage {...messages.noAccount} />
                <Link className={s.modalCaptionLink} onClick={openSignupModal}>
                  <FormattedMessage {...messages.signUpHere} />
                </Link>
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapState = state => ({
  loginModal: state.modalStatus.isLoginModalOpen,
});

const mapDispatch = {
  closeLoginModal,
  openSignupModal,
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(LoginModal)));