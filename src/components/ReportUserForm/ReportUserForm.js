import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap';
// Redux form
import { Field, reduxForm } from 'redux-form';

import CustomCheckbox from '../CustomCheckbox';
import submit from './submit';
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ReportUserForm.css';
import cs from '../../components/commonStyle.css';

class ReportUserForm extends Component {

    static propTypes = {
        openForgotPasswordModal: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    renderFormControlWork = ({ input, meta: { touched, error }, label, name }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <div className={cx(s.checkBoxLabelCell, s.checkBoxLabelCellIcon, s.checkBoxLabelCellInput)}>
                    <CustomCheckbox
                        name={name}
                        checked={input.value == true}
                        onChange={event => {
                            return input.onChange(event);
                        }}
                    />
                </div>
            </div>
        )
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                    {...input}
                    placeholder={label}
                    type={type}
                    className={className}
                />
            </div>
        );
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, reporterId, siteName } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <form onSubmit={handleSubmit(submit)}>
                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}

                <div className={cx('customRatioButton', 'reportUserRatioButton')}>
                    <p className={cx(s.titleText, 'textWhite')}>
                        <FormattedMessage {...messages.reportUserInfo} />
                    </p>
                    <label className={cx(s.landingLabel, 'textWhite')}>
                        <Field
                            name="reportType"
                            component="input"
                            type="radio"
                            value="Shouldn't available"
                            className={cx(s.blockRadioButton, 'blockRadioBtnRTL')}
                        />
                        <FormattedMessage {...messages.reportContent1} />
                        {' '} {siteName}
                    </label>

                    <label className={cx(s.landingLabel, 'textWhite')}>
                        <Field
                            name="reportType"
                            component="input"
                            type="radio"
                            value="Direct contact"
                            className={cx(s.blockRadioButton, 'blockRadioBtnRTL')}
                        />
                        <FormattedMessage {...messages.reportContent2} />
                    </label>

                    <label className={cx(s.landingLabel, 'textWhite', s.noMarginBottom)}>
                        <Field
                            name="reportType"
                            component="input"
                            type="radio"
                            value="Spam"
                            className={cx(s.blockRadioButton, 'blockRadioBtnRTL')}
                        />
                        <FormattedMessage {...messages.reportContent3} />
                    </label>

                    <FormGroup className={cx(s.spaceTop4, s.noMarginBottom, cs.flexEnd)}>
                        <Button
                            className={cx(cs.btnSecondaryFull)}
                            type="submit"
                            disabled={submitting}
                        >
                            {formatMessage(messages.submit)}
                        </Button>
                    </FormGroup>
                </div>

            </form>
        );
    }
}

ReportUserForm = reduxForm({
    form: 'ReportUserForm', // a unique name for this form
    destroyOnUnmount: false
})(ReportUserForm);

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(
    withStyles(s, cs)
        (
            connect(mapState, mapDispatch)
                (ReportUserForm)
        )
);
