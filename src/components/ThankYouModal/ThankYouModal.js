import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    FormGroup,
    Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeThankYouModal } from '../../actions/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ThankYouModal.css';
import cs from '../../components/commonStyle.css';


class ThankYouModal extends Component {
    static propTypes = {
        closeLoginModal: PropTypes.any,
        reportModal: PropTypes.bool,
        closeReportUserModal: PropTypes.any,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            thankYouModalStatus: false,
        };
    }

    componentDidMount() {
        const { thankYouModal } = this.props;
        if (thankYouModal === true) {
            this.setState({ thankYouModalStatus: true });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { thankYouModal } = nextProps;
        if (thankYouModal === true) {
            this.setState({ thankYouModalStatus: true });
        } else {
            this.setState({ thankYouModalStatus: false });
        }
    }


    render() {
        const { closeThankYouModal } = this.props;
        const { thankYouModalStatus } = this.state;

        return (
            <div>
                <Modal show={thankYouModalStatus} animation={false} onHide={closeThankYouModal} dialogClassName={cx(s.logInModalContainer)}  className={cx('loginModal', 'reportUserModal')}>
                    <Modal.Header closeButton className={('bgBlack')}>
                        <Modal.Title><FormattedMessage {...messages.thankyouTitle} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div className={cx(s.titleText, 'textWhite')}> <FormattedMessage {...messages.thankyouInfo1} /></div>
                        <FormGroup className={cx(s.formGroup, s.spaceTop4, cs.flexEnd)}>
                            <Button className={cx(cs.btnSecondaryFull)} type="submit" onClick={closeThankYouModal}>
                                <FormattedMessage {...messages.close} />
                            </Button>
                        </FormGroup>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


const mapState = state => ({
    thankYouModal: state.modalStatus.isThankYouModalOpen,
    reporterId: state.account && state.account.data && state.account.data.userId,
});

const mapDispatch = {
    closeThankYouModal,
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(ThankYouModal)));
