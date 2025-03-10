import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { graphql, gql, compose } from 'react-apollo';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

import Loader from '../../Loader';

import { openSmsVerificationModal, closeSmsVerificationModal } from '../../../actions/SmsVerification/modalActions';
import getPhoneDataQuery from '../getUserData.graphql';
import messages from '../../../locale/messages';
import c from '../../../components/PhoneVerificationModal/PhoneVerificationModal.css';
import showToaster from '../../../helpers/showToaster';
import showErrorMessage from '../../../helpers/showErrorMessage';

import bt from '../../../components/commonStyle.css';
import s from './VerifyPhoneNumberForm.css';

class VerifyPhoneNumberForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      submitting: false,
      error: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { formatMessage } = this.props.intl;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitForm() {
    const { mutate } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode } = this.state;
    let error = null, submitting = false;
    if (!verificationCode) {
      error = {
        verificationCode: formatMessage(messages.required)
      };
    } else if (isNaN(verificationCode)) {
      error = {
        verificationCode: formatMessage(messages.required)
      };
    }

    submitting = (error === null) ? true : false;

    this.setState({
      submitting,
      error
    });

    if (error === null && submitting) {
      const { data } = await mutate({
        variables: {
          verificationCode
        },
        refetchQueries: [{
          query: getPhoneDataQuery
        }]
      });

      if (data && data.VerifyPhoneNumber) {
        if (data.VerifyPhoneNumber.status === '200') {
          showToaster({ messageId: 'verifyPhoneNumber', toasterType: 'success' })
        } else {
          error = {
            verificationCode: showErrorMessage({ errorCode: 'validateNumber' })
          };
        }
      }
    }

    if (this.refs.verifyPhoneNumberForm) {
      this.setState({ submitting: false, error });
    }

  }

  render() {
    const { openSmsVerificationModal, countryCode, phoneNumber, closeSmsVerificationModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { verificationCode, submitting, error } = this.state;

    return (
      <div className={s.formContainer} ref="verifyPhoneNumberForm">
        <div className={c.displayFlex}>
          <FormGroup className={cx(s.phoneNumberField, s.noMarginBottom)}>
            <FormControl
              name={'verificationCode'}
              value={verificationCode}
              placeholder={formatMessage(messages.verificationCodeLabel)}
              type={'text'}
              maxLength={4}
              className={bt.commonControlInput}
              onChange={this.handleChange} />
            {error && error.verificationCode && <span className={s.errorMessage}>{error.verificationCode}</span>}
          </FormGroup>
          <FormGroup className={cx(c.btnFlex, s.noMarginBottom)}>
            <div className={c.mobileFullWidth}>
              <Loader
                containerClass={s.btnContainer}
                type={"button"}
                buttonType={"button"}
                className={cx(bt.btnPrimary, bt.phoneInputBtnPadding, s.marginRight, c.mobileFullWidth)}
                disabled={submitting}
                show={submitting}
                label={formatMessage(messages.verifyLabel)}
                handleClick={this.submitForm}
              />
            </div>
            <a
              className={cx(s.modalCaptionLink, c.phoneNumberCloseIcon, 'rtlphoneNumberCloseIcon')}
              href={'javascript:void(0)'}
              onClick={closeSmsVerificationModal}
            >
              <FormattedMessage {...messages.verificationDesc} />
            </a>
          </FormGroup>
        </div>
        <label className={cx(bt.commonLabelText, s.spaceTop2, 'textWhite')} >
          <sup className={s.supStyle}>*</sup><FormattedMessage {...messages.weHaveSentVerificationCode} />
          {' ' + countryCode}{' ' + phoneNumber}.
        </label>
        <label className={cx(bt.commonLabelText, s.noMarginBottom, 'textWhite')} >
          <sup className={s.supStyle}>*</sup><FormattedMessage {...messages.verificationDesc} />
        </label>
      </div>
    )
  }

}

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation VerifyPhoneNumber($verificationCode: Int!) {
      VerifyPhoneNumber(verificationCode: $verificationCode) {
          status
      }
    }
  `)
)(VerifyPhoneNumberForm);
