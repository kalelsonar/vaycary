// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WishListGroupModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeWishListGroupModal } from '../../../actions/WishList/modalActions';


// Translation
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Component
import AddWishListGroupForm from '../WishListGroupForm/AddWishListGroupForm';
import EditWishListGroupForm from '../EditWishListGroupForm';


class WishListGroupModal extends Component {
  static propTypes = {
    closeWishListGroupModal: PropTypes.any,
    wishListGroupModal: PropTypes.bool,
    actionType: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      wishListGroupModalStatus: false
    }
  }

  componentDidMount() {
    const { wishListGroupModal } = this.props;
    if (wishListGroupModal === true) {
      this.setState({ wishListGroupModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { wishListGroupModal } = nextProps;

    if (wishListGroupModal === true) {
      this.setState({ wishListGroupModalStatus: true });
    } else {
      this.setState({ wishListGroupModalStatus: false });
    }
  }

  render() {
    const { closeWishListGroupModal, actionType } = this.props;
    const { wishListGroupModalStatus } = this.state;

    return (
      <div>
        <Modal show={wishListGroupModalStatus} onHide={closeWishListGroupModal} dialogClassName={'loginModal'} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.wishList} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <h4 className={s.titleBold}>
                {
                  actionType != 'edit' && <FormattedMessage {...messages.createWishList} />
                }
                {
                  actionType == 'edit' && <FormattedMessage {...messages.editWishList} />
                }
              </h4>
              <div>
                {
                  actionType != 'edit' && <AddWishListGroupForm />
                }
                {
                  actionType == 'edit' && <EditWishListGroupForm />
                }
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  wishListGroupModal: state.modalStatus.wishListGroupModalOpen,
});

const mapDispatch = {
  closeWishListGroupModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(WishListGroupModal)));
