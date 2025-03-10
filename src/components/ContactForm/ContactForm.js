import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import fetch from '../../core/fetch';
import cx from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

import Loader from '../Loader';

import { googleCaptcha } from '../../config';
import validate from './validate';
import messages from '../../locale/messages';
import showToaster from '../../helpers/showToaster';

import mailLogo from '/public/SiteIcons/mailblack.svg';
import caller from '/public/SiteIcons/callLogo.svg';
import addressLogo from '/public/SiteIcons/address.svg';

import s from './ContactForm.css';
import bt from '../../components/commonStyle.css';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';

class ContactForm extends Component {
    static propTypes = {
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            contactLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = async (values, dispatch) => {
        let variables = {
            phoneNumber: values.phoneNumber,
            name: values.name,
            email: values.email,
            ContactMessage: values.ContactMessage
        };

        this.setState({
            contactLoading: true
        });

        let query = `
        mutation sendContactEmail(
            $phoneNumber: String,
            $name: String,
            $email: String,
            $ContactMessage: String
          ){
              sendContactEmail(
                phoneNumber: $phoneNumber,
                name: $name,
                email: $email,
                ContactMessage: $ContactMessage
              ) {
                  status
              }
        }
        `;

        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables
            }),
            credentials: 'include',
        });

        const { data } = await resp.json();

        this.setState({
            contactLoading: false
        });

        const result = data?.sendContactEmail?.status

        showToaster({
            messageId: result == 200 ? 'sendEmail' : 'commonError',
            toasterType: result == 200 ? 'success' : 'error'
        })

        dispatch(reset('ContactForm'));
        grecaptcha.reset();
    }


    renderCaptcha = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const { formatMessage } = this.props.intl;
        let siteKey = googleCaptcha.sitekey;
        return (
            <div>
                <ReCAPTCHA
                    sitekey={siteKey}
                    onChange={input.onChange}
                />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, pristine } = this.props;
        const { formatMessage } = this.props.intl;
        const { contactLoading } = this.state;
        const title = <h3>{formatMessage(messages.Required)}</h3>;
        const { email, phoneNumber, address } = this.props;

        return (
            <Grid fluid className={'commonWordBreak'}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={s.marginTop}>
                        <div>
                            <Col lg={12} md={12} sm={12} xs={12} className={s.space3}>
                                <div className={s.space6}>
                                    <h1 className={s.contactTitle}>
                                        <FormattedMessage {...messages.contactFormInformation} />
                                    </h1>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={4} xs={12} className={s.alignCenter}>
                                <div className={s.space6}>
                                    <div>
                                        <div className={s.iconMargin}>
                                            <img src={mailLogo} className={s.mailIcon} />
                                        </div>
                                        <div>
                                            <h1 className={cx(s.contactTitle, s.subTitleText)}>
                                                <FormattedMessage {...messages.contactFormEmail} />
                                            </h1>
                                            <a href={"mailto:" + email} className={s.linkText} target='_blank'>{email}</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={4} xs={12} className={s.alignCenter}>
                                <div className={s.space6}>
                                    <div>
                                        <div className={s.iconMargin}>
                                            <img src={caller} className={s.mailIcon} />
                                        </div>
                                        <div>
                                            <h1 className={cx(s.contactTitle, s.subTitleText)}><FormattedMessage {...messages.contactFormCall} /></h1>
                                            <a href={"tel:" + phoneNumber} className={s.linkText} target='_blank'>
                                                {phoneNumber}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4} md={4} sm={4} xs={12} className={s.alignCenter}>
                                <div className={s.space6}>
                                    <div>
                                        <div className={s.iconMargin}>
                                            <img src={addressLogo} className={s.mailIcon} />
                                        </div>
                                        <h1 className={cx(s.contactTitle, s.subTitleText)}>
                                            <FormattedMessage {...messages.contactFormAddress} />
                                        </h1>
                                        <h4 className={cx(s.addressText, 'textWhite')}>
                                            {address}
                                        </h4>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12} className={cx(s.marginTop)}>
                        <div className={cx(s.formBackground, 'inputFocusColor', 'bgBlackTwo')}>
                            <div className={s.formContainerHeader}>
                                <h2 className={s.captionText}><FormattedMessage {...messages.contactForm} /></h2>
                            </div>
                            <div className={s.formContainer}>
                                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                                <form onSubmit={handleSubmit(this.handleClick)} >
                                    <Row className={s.formGroup}>
                                        <Col xs={12} sm={6} md={6} lg={6} className={s.noPadding}>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <label className={s.labelText} >{formatMessage(messages.Nameincontact)}</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Field name="name"
                                                    type="text"
                                                    component={InputFieldComponent}
                                                    placeholder={formatMessage(messages.Nameincontact)}
                                                    inputClass={cx("commonPasswordControlInput", s.backgroundTwo, 'backgroundTwoDark', 'darkAvater', "contactUsControlInputRtl")}
                                                />
                                            </Col>
                                        </Col>
                                        <Col xs={12} sm={6} md={6} lg={6} className={s.noPadding}>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <label className={s.labelText} >{formatMessage(messages.phoneNumber)}</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Field name="phoneNumber"
                                                    type="text"
                                                    component={InputFieldComponent}
                                                    placeholder={formatMessage(messages.phoneNumber)}
                                                    inputClass={cx("commonPasswordControlInput", s.backgroundThree, 'darkCall', "contactUsControlInputRtl")}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row className={s.formGroup}>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelText} >{formatMessage(messages.email)}</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field name="email"
                                                type="text"
                                                component={InputFieldComponent}
                                                placeholder={formatMessage(messages.email)}
                                                inputClass={cx("commonPasswordControlInput", s.backgroundOne, 'darkEmail', "contactUsControlInputRtl")}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={s.formGroup}>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelText} >{formatMessage(messages.ContactMessage)}</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field name="ContactMessage"
                                                type="text"
                                                component={InputFieldComponent}
                                                componentClass={'textarea'}
                                                inputClass={cx("commonPasswordControlInput", s.backgroundFour, 'darkContact', "contactUsControlInputRtl2")}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className={s.formGroup}>
                                        <Col xs={12} sm={12} md={12} lg={12} className={s.overFlowHidden}>
                                            <Field name="reCaptcha"
                                                component={this.renderCaptcha}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={s.formGroup}>
                                        <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop3}>
                                            <Loader
                                                type={"button"}
                                                buttonType={"submit"}
                                                className={cx(s.button, bt.btnPrimary, bt.btnLarge)}
                                                disabled={submitting}
                                                show={contactLoading}
                                                label={formatMessage(messages.sendmail)}
                                            />
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

ContactForm = reduxForm({
    form: 'ContactForm', // a unique name for this form
    validate
})(ContactForm);


const mapState = (state) => ({
    email: state?.siteSettings?.data?.email,
    phoneNumber: state?.siteSettings?.data?.phoneNumber,
    address: state?.siteSettings?.data?.address
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ContactForm)));
