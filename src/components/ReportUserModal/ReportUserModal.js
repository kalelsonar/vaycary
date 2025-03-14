// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ReportUserModal.css';
import {
    Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeReportUserModal } from '../../actions/modalActions';

// Components
import ReportUserForm from '../ReportUserForm';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';


class ReportUserModal extends Component {
    static propTypes = {
        closeLoginModal: PropTypes.any,
        reportModal: PropTypes.bool,
        closeReportUserModal: PropTypes.any,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            reportModalStatus: false,
        };
    }

    componentDidMount() {
        const { reportModal } = this.props;
        if (reportModal === true && reportModal) {
            this.setState({ reportModalStatus: true });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { reportModal } = nextProps;
        if (reportModal === true) {
            this.setState({ reportModalStatus: true });
        } else {
            this.setState({ reportModalStatus: false });
        }
    }


    render() {
        const { closeReportUserModal, reporterId, profileId, reporterName, userData } = this.props;
        const { reportModalStatus } = this.state;

        let initialValues = {};

        initialValues = {
            reporterId,
            profileId,
            reportType: 'Spam',
            reporterName
        }

        return (
            <div>
                <Modal
                    show={reportModalStatus}
                    animation={false}
                    onHide={closeReportUserModal}
                    dialogClassName={cx(s.logInModalContainer)}
                    className={cx('loginModal', 'reportUserModal')}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FormattedMessage {...messages.reportUserMessage} />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div>
                            <ReportUserForm
                                initialValues={initialValues}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


const mapState = state => ({
    reportModal: state.modalStatus.isReportUserModalOpen,
    reporterId: state.account && state.account.data && state.account.data.userId,
    reporterName: state.account && state.account.data && state.account.data.firstName,
    userData: state.account && state.account.data,

});

const mapDispatch = {
    closeReportUserModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReportUserModal)));
