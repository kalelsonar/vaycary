import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ForgotPassword.css';
import c from '../../components/LoginModal/LoginModal.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeForgotPasswordModal, openLoginModal } from '../../actions/modalActions';

// Components
import ForgotPasswordForm from './ForgotPasswordForm';

// Locale
import messages from '../../locale/messages';

class ForgotPassword extends Component {
  static propTypes = {
    closeForgotPasswordModal: PropTypes.any,
    forgotModal: PropTypes.bool,
    openLoginModal: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { closeForgotPasswordModal, openLoginModal, forgotModal } = this.props;

    return (
      <>
        <Modal show={forgotModal} animation={false} onHide={closeForgotPasswordModal}
          dialogClassName={'loginModal'} >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage {...messages.forgotPassword} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={c.root}>
              <ForgotPasswordForm openLoginModal={openLoginModal} />
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}


const mapState = (state) => ({
  forgotModal: state.modalStatus.isForgotPasswordOpen,
});

const mapDispatch = {
  closeForgotPasswordModal,
  openLoginModal
};

export default injectIntl(withStyles(s, c)(connect(mapState, mapDispatch)(ForgotPassword)));