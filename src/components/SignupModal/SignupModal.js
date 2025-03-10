// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SignupModal.css';
import c from '../../components/LoginModal/LoginModal.css';
import bt from '../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  Modal,
  Image
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeSignupModal, openLoginModal } from '../../actions/modalActions';

// Components
import SocialLogin from '../SocialLogin';
import RegisterForm from '../RegisterForm';
import Link from '../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';
import imageOne from '/public/SiteIcons/mailLight.png';

class SignupModal extends Component {
  static propTypes = {
    closeSignupModal: PropTypes.func,
    signupModal: PropTypes.bool,
    openLoginModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      signupModalStatus: false,
      isFormOpen: false,
    };
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { signupModal } = this.props;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { signupModal } = nextProps;
    if (signupModal === true) {
      this.setState({ signupModalStatus: true });
    } else {
      this.setState({ signupModalStatus: false });
    }
  }

  renderButtons() {
    return (
      <>
        <FormGroup className={s.formGroup}>
          <Button className={cx(bt.btnPrimary, bt.btnBig)} onClick={() => this.openForm()} block>
            <Image src={imageOne} className={cx(s.iconPosition, 'iconPositionRtl')} responsive /><FormattedMessage {...messages.signupWithEmail} />
          </Button>
          <h4 className={c.lineThrough}>
            <span className={c.linetext}><FormattedMessage {...messages.or} /></span>
          </h4>
          <SocialLogin />
        </FormGroup>
      </>
    );
  }

  renderForm() {
    return (
      <>
        <RegisterForm />
        <h4 className={c.lineThrough}>
          <span className={c.linetext}><FormattedMessage {...messages.or} /></span>
        </h4>
        <SocialLogin />
      </>
    );
  }

  render() {
    const { closeSignupModal, openLoginModal } = this.props;
    const { signupModalStatus, isFormOpen } = this.state;

    return (
      <div>
        <Modal show={signupModalStatus} animation={false} onHide={closeSignupModal}
          dialogClassName={'loginModal'} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.signup} /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={c.root}>
              <div className={c.container}>
                <RegisterForm />
                <h4 className={c.lineThrough}>
                  <span className={c.linetext}><FormattedMessage {...messages.or} /></span>
                </h4>
                <SocialLogin />
                <p className={c.linkText}>
                  <FormattedMessage {...messages.alreadyHaveAccount} />
                  <Link className={c.modalCaptionLink} onClick={openLoginModal}>
                    <FormattedMessage {...messages.logInHere} />
                  </Link>
                </p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  signupModal: state.modalStatus.isSignupModalOpen,
});

const mapDispatch = {
  closeSignupModal,
  openLoginModal,
};

export default injectIntl(withStyles(s, bt, c)(connect(mapState, mapDispatch)(SignupModal)));