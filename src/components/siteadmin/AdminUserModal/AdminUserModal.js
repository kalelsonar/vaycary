import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import AdminUserForm from '../AdminUserForm';
import messages from '../../../locale/messages';
import { closeAdminUserModal } from '../../../actions/siteadmin/modalActions';
import s from './AdminUserModal.css';

class AdminUserModal extends Component {
  static defaultProps = {
    adminUserModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminUserModal, adminUserModal, adminUserModalType, roles, paginationData, currentPage } = this.props;

    return (
      <>
        <Modal show={adminUserModal} onHide={closeAdminUserModal} className={'adminModal'}>
          <Modal.Header closeButton>
            <Modal.Title>{adminUserModalType == 'add' ? <FormattedMessage {...messages.addLabel} /> : <FormattedMessage {...messages.editLabel} />} <FormattedMessage {...messages.adminUserLabel} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
              <AdminUserForm roles={roles} paginationData={paginationData} currentPage={currentPage} />
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}


const mapState = (state) => ({
  adminUserModal: state?.adminModalStatus?.adminUserModal,
  adminUserModalType: state?.adminModalStatus?.adminUserModalType
});

const mapDispatch = {
  closeAdminUserModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminUserModal)));