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

import { closeFilterModal } from '../../../actions/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class ModalFilter extends Component {
  static propTypes = {
    closeFilterModal: PropTypes.any.isRequired,
    filterModal: PropTypes.bool
  };

  static defaultProps = {
    filterModal: false
  };

  render() {
    const { closeFilterModal, filterModal, refetch, handleResults, type } = this.props;

    return (
      <div>
        <Modal show={filterModal} onHide={closeFilterModal} dialogClassName={cx(s.logInModalContainer, 'reservationModalFilter')} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.filter} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.root, s.modalBorderBottom)}>
              <div className={s.container}>
                <Listings className={cx(s.formWidth, s.formControlSelect)}
                  handleResults={handleResults}
                  refetch={refetch}
                  type={type}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  filterModal: state.modalStatus.filterModal,
});

const mapDispatch = {
  closeFilterModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ModalFilter)));