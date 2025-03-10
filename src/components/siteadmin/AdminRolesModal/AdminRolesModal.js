import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import AdminRolesForm from '../AdminRolesForm';
import messages from '../../../locale/messages';
import { closeAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import s from './AdminRolesModal.css';

class AdminRolesModal extends Component {
  static defaultProps = {
    adminRolesModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminRolesModal, adminRolesModal, adminRolesModalType, paginationData, currentPage } = this.props;

    return (
      <div>
        <Modal show={adminRolesModal} onHide={closeAdminRolesModal} className={'adminModal'}>
          <Modal.Header closeButton>
            <Modal.Title>{adminRolesModalType == 'add' ? <FormattedMessage {...messages.addLabel} /> : <FormattedMessage {...messages.editLabel} />} <FormattedMessage {...messages.adminRoleLabel} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
              <AdminRolesForm paginationData={paginationData} currentPage={currentPage} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapState = (state) => ({
  adminRolesModal: state?.adminModalStatus?.adminRolesModal,
  adminRolesModalType: state?.adminModalStatus?.adminRolesModalType
});

const mapDispatch = {
  closeAdminRolesModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminRolesModal)));