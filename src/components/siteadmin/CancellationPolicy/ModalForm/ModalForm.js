import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForm.css';
import cx from 'classnames';
import {
  Modal
} from 'react-bootstrap';

import InfoUpdate from './InfoUpdate';

import { closeCancelModal } from '../../../../actions/siteadmin/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class ModalForm extends Component {
  static propTypes = {
    closeCancelModal: PropTypes.any.isRequired,
    cancelModal: PropTypes.bool
  };

  static defaultProps = {
    cancelModal: false
  };

  render() {
    const { closeCancelModal, cancelModal, cancellationInfo } = this.props;
    let initialValues = {
      cancellationInfo: cancellationInfo
    }
    return (
      <>
        <Modal show={cancelModal} onHide={closeCancelModal} className={'adminModal'}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.updateCancellationInfo} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
              <InfoUpdate initialValues={initialValues} />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapState = (state) => ({
  cancelModal: state.adminModalStatus.cancelModal,
  cancellationInfo: state.siteSettings.data.cancellationInfo,
});

const mapDispatch = {
  closeCancelModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ModalForm)));