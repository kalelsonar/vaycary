import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { Modal } from 'react-bootstrap';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import PriceDetails from './PriceDetails';

import { closeTotalPriceModal } from '../../../actions/modalActions';
import messages from '../../../locale/messages';

import s from './PriceDetailsModal.css';

class PriceDetailsModal extends Component {
  static propTypes = {
    closeTotalPriceModal: PropTypes.any.isRequired,
    totalpriceModal: PropTypes.bool,
    calculatedValues: PropTypes.object
  };
  static defaultProps = {
    totalpriceModal: false
  };

  render() {
    const { closeTotalPriceModal, totalpriceModal, calculatedValues } = this.props;

    return (
      <Modal show={totalpriceModal} animation={false} onHide={closeTotalPriceModal} dialogClassName={cx(s.logInModalContainer, 'moreFilterModal', 'moreFilter')}>
        <Modal.Header closeButton className={s.panelHeader}>
          <Modal.Title><FormattedMessage {...messages.priceBreakdown} /></Modal.Title>
        </Modal.Header>
        <Modal.Body bsClass={s.logInModalBody}>
            <PriceDetails calculatedValues={calculatedValues} />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  totalpriceModal: state.modalStatus.isTotalPriceModal,
  calculatedValues: state.modalStatus.calculatedValues
});

const mapDispatch = {
  closeTotalPriceModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(PriceDetailsModal));

