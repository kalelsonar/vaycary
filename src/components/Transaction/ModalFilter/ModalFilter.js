import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalFilter.css';
import cx from 'classnames';
import {
  Modal
} from 'react-bootstrap';

import Listings from './Listings';

import { closeTransactionModal } from '../../../actions/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class ModalFilter extends Component {
  static propTypes = {
    closeTransactionModal: PropTypes.any.isRequired,
    transactionModal: PropTypes.bool
  };

  static defaultProps = {
    transactionModal: false
  };

  render() {
    const { closeTransactionModal, transactionModal, showPayouts, handleResults, mode } = this.props;

    return (
      <Modal show={transactionModal} onHide={closeTransactionModal} dialogClassName={'loginModal'} >
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage {...messages.filter} /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={s.root}>
            <Listings
              handleResults={handleResults}
              showPayouts={showPayouts}
              mode={mode}
            />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  transactionModal: state.modalStatus.transactionModal,
});

const mapDispatch = {
  closeTransactionModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ModalFilter)));