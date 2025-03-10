import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Modal,
  Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import bt from '../../../components/commonStyle.css';
import s from './WishListGroupModal.css';
import { closeDeleteWishlistModal } from '../../../actions/WishList/modalActions';
import { deleteWishListGroup } from '../../../actions/WishList/deleteWishListGroup';
import messages from '../../../locale/messages';

class DeleteWishlistModal extends Component {
  static propTypes = {
    closeDeleteWishlistModal: PropTypes.any,
    deleteModalOpen: PropTypes.bool,
  };

  render() {
    const { closeDeleteWishlistModal, deleteModalOpen, deleteWishListGroup, wishlistGroupId } = this.props;

    return (
      <div>
        <Modal show={deleteModalOpen} onHide={closeDeleteWishlistModal} dialogClassName={'loginModal'} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.wishList} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.bodyText}><FormattedMessage {...messages.areYouSureDeleteWishList} />
             </div>              
             <div className={s.btnEnd}>
                  <Button
                    onClick={() => closeDeleteWishlistModal()} className={s.deleteCancel}>
                    <FormattedMessage {...messages.cancel} />
                  </Button>
                  <Button
                    onClick={() => deleteWishListGroup(wishlistGroupId)} className={bt.btnSecondaryFull}>
                    <FormattedMessage {...messages.delete} />
                  </Button>
                </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  deleteModalOpen: state.modalStatus.deleteModalOpen,
});

const mapDispatch = {
  closeDeleteWishlistModal,
  deleteWishListGroup
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(DeleteWishlistModal)));
