// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HeaderModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeHeaderModal } from '../../actions/modalActions';

// Translation
import { injectIntl } from 'react-intl';
import { Tab, Tabs } from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';

import CurrencyModal from '../CurrencyModal';
import LanguageModal from '../LanguageModal';

class HeaderModal extends Component {

  static defaultProps = {
    modalType: 'languageModal'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeHeaderModal, modalStatus, modalType, hideCurrency } = this.props;
    const { formatMessage } = this.props.intl;
    
    return (
      <div>
        <Modal
          show={modalStatus[modalType] || false}
          animation={false}
          onHide={() => closeHeaderModal(modalType)}
          dialogClassName={cx(s.logInModalContainer, 'loginModal', 'headerClose', 'languageModal')}
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className='menuModal'>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title={formatMessage(messages.chooseLanguage)}>
                  <LanguageModal />
                </Tab>
                {!hideCurrency && <Tab eventKey={2} title={formatMessage(messages.chooseACurrency)}>
                  <CurrencyModal />
                </Tab>}
              </Tabs>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  modalStatus: state.modalStatus
});

const mapDispatch = {
  closeHeaderModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HeaderModal)));
