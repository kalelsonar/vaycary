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

import EditPayment from './EditPayment';

import { closePaymentModal } from '../../../../actions/modalActions';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

class ModalForm extends Component {
  static propTypes = {
    closePaymentModal: PropTypes.any.isRequired,
    paymentModal: PropTypes.bool
  };

  static defaultProps = {
    paymentModal: false
  };

  render() {
    const { closePaymentModal, paymentModal, listId, initialValues } = this.props;

    return (
      <div>
        <Modal show={paymentModal} onHide={closePaymentModal} dialogClassName={cx(s.logInModalContainer, 'adminModal', 'paymentFormModal', 'paymentGuestFilter')} >
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.root, s.modalBorderBottom)}>
              <div className={s.container}>
                <EditPayment listId={listId} initialValues={initialValues} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  paymentModal: state.modalStatus.paymentModal,
});

const mapDispatch = {
  closePaymentModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ModalForm));