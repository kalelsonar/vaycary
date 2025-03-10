import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Cancellation.css';
import bt from '../../../components/commonStyle.css';


import GuestCancellationDetails from '../../../components/siteadmin/GuestCancellationDetails/GuestCancellationDetails';
import HostCancellationDetails from '../../../components/siteadmin/HostCancellationDetails/HostCancellationDetails';
import messages from '../../../locale/messages';
import Link from '../../../components/Link';
import validate from './validate';
import submit from './submit';
class CancellationDetails extends React.Component {

    constructor() {
        super()
        this.state = {
            isCurrentStatus: 1
        };
    }

    renderFormControlTextArea = ({ input, placeholder, meta: { touched, error }, children }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={s.noMargin}>
                <FormControl {...input} componentClass="textarea" rows={5} placeholder={placeholder}>
                    {children}
                </FormControl>
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        )
    }

    render() {
        const { data, userType, selectedTheme, isLoading } = this.props;
        const { formatMessage } = this.props.intl;
        const { handleSubmit } = this.props;
        const { isCurrentStatus } = this.state;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <h1 className={s.headerTitle}><FormattedMessage {...messages.adminCancellation} /></h1>
                <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                    <Link to={'/siteadmin/reservations'} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                        <FormattedMessage {...messages.goBack} />
                    </Link>
                </div>
                <div className={s.panelOutline}>
                    <div className={s.textAlignCenterXS}>
                        <Link to={'/siteadmin/cancel/' + data?.id + '/host'} onClick={() => this.setState({ isCurrentStatus: 1 })} className={cx(s.tabBtn, userType == 'host' && s.tabBtnActive, (selectedTheme == 'dark' && (isCurrentStatus == 1 ? 'tabBtnActiveDark' : 'tabBtnDarkMode')))}>
                            <FormattedMessage {...messages.host} />
                        </Link>
                        <Link to={'/siteadmin/cancel/' + data?.id + '/guest'} onClick={() => this.setState({ isCurrentStatus: 2 })} className={cx(s.tabBtn, userType == 'guest' && s.tabBtnActive, (selectedTheme == 'dark' && (isCurrentStatus == 2 ? 'tabBtnActiveDark' : 'tabBtnDarkMode')))}>
                            <FormattedMessage {...messages.guest} />
                        </Link>
                    </div>
                    <div className={cx(s.cancelBlockColor, 'bgBlackTwo')}>
                        <form onSubmit={handleSubmit(submit)} className={s.displayGridParent}>
                            {
                                userType == 'host' ? <><HostCancellationDetails data={data} /></> : <><GuestCancellationDetails data={data} /></>
                            }
                            <div className={'hostCustomTextarea'}>
                                <Field
                                    name="message"
                                    type='textarea'
                                    component={this.renderFormControlTextArea}
                                    placeholder={formatMessage(messages.cancellationReason)}
                                />
                                <div className={s.smallContent}><FormattedMessage {...messages.reservationCancel} /></div>
                            </div>
                            <Button type="submit" disabled={isLoading} className={cx(bt.btnPrimary, s.spaceTop3)}><FormattedMessage {...messages.adminCancellation} /></Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

const mapState = state => ({
    selectedTheme: state.currency.theme,
    isLoading: state?.loader?.cancelLoading
});

const mapDispatch = {}

CancellationDetails = reduxForm({
    form: 'AdminCancellation',  // a unique name for this form
    validate,
    onSubmit: submit
})(CancellationDetails);

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CancellationDetails)));
