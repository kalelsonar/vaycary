import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';
import * as MdIconPack from 'react-icons/lib/md'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import Loader from '../Loader';
import AddPhoneNumberForm from './AddPhoneNumberForm';
import VerifyPhoneNumberForm from './VerifyPhoneNumberForm';

import { openSmsVerificationModal, closeSmsVerificationModal } from '../../actions/SmsVerification/modalActions';
import { sendVerificationSms } from '../../actions/SmsVerification/sendVerificationSms';
import { decode } from '../../helpers/queryEncryption'
import getUserDataQuery from './getUserData.graphql';
import showToaster from '../../helpers/showToaster';
import messages from '../../locale/messages';

import s from './PhoneVerificationModal.css';
import bt from '../../components/commonStyle.css';
import showErrorMessage from '../../helpers/showErrorMessage';

class PhoneVerificationModal extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  static defaultProps = {
    modalStatus: false,
    data: {
      getPhoneData: null,
      loading: false
    },
    modalFormType: 'addPhoneNumber'
  }

  constructor(props) {
    super(props);

    this.state = {
      form1: true,
      form2: false,
      buttonLoader: false
    };

    this.verifyPhoneNumber = this.verifyPhoneNumber.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderAddPhoneNumber = this.renderAddPhoneNumber.bind(this);
    this.renderVerifyPhoneNumber = this.renderVerifyPhoneNumber.bind(this);
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
    this.renderConfirmedPhoneNumber = this.renderConfirmedPhoneNumber.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { modalStatus, modalFormType } = nextProps;
    if (modalFormType == 'verifyPhoneNumber') {
      this.setState({
        form1: false,
        form2: true
      });
    } else {
      this.setState({
        form1: true,
        form2: false
      });
    }
  }


  async verifyPhoneNumber() {
    const { sendVerificationSms, data, data: { loading, getPhoneData } } = this.props;
    let error;
    if (!loading && getPhoneData) {
      this.setState({ buttonLoader: true });
      const { status, errorMessage } = await sendVerificationSms(getPhoneData.countryCode, decode(getPhoneData.phoneNumber));
      if (status != '200') {
        if (errorMessage) {
          error = errorMessage;
        } else {
          error = await showErrorMessage({ errorCode: 'commonError' })
        }
        showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: error })
      }
      this.setState({ buttonLoader: false });
    }

  }

  async handleClick(formType) {
    const { openSmsVerificationModal, modalStatus } = this.props;
    openSmsVerificationModal(formType);
  }

  async handleRemove() {
    const { mutate, closeSmsVerificationModal } = this.props;

    const { data } = await mutate({
      refetchQueries: [{
        query: getUserDataQuery
      }]
    });

    await closeSmsVerificationModal();
  }

  formatPhoneNumber(phoneNumber) {
    let formattedNumber = '';
    if (phoneNumber && phoneNumber != '') {
      if (phoneNumber.length > 6) {
        formattedNumber = phoneNumber.substr(0, phoneNumber.length - 3);
        formattedNumber = formattedNumber.replace(new RegExp("\\d", "g"), '*');
        formattedNumber = formattedNumber + phoneNumber.substr(phoneNumber.length - 3, phoneNumber.length);
      } else {
        formattedNumber = '***' + formattedNumber + phoneNumber.substr(phoneNumber.length - 1, phoneNumber.length);
      }
    }

    return formattedNumber;
  }

  renderAddPhoneNumber() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <p className={cx(s.labelText, 'textWhite')}>
          <FormattedMessage {...messages.noPhoneNumberEntered} /></p>
        <span className={s.iconSize}>&#43;</span>
        <a href="javascript:void(0)" className={cx(s.modalCaptionLink)}
          onClick={() => this.handleClick('addPhoneNumber')}>
          <FormattedMessage {...messages.addPhoneNumber} />
        </a>
      </div>
    )
  }

  renderVerifyPhoneNumber() {
    const { data, data: { loading, getPhoneData } } = this.props;
    const { formatMessage } = this.props.intl;
    const { buttonLoader } = this.state;

    return (
      <div>
        <table className={s.tableBox}>
          <tbody>
            <tr>
              {
                !loading && <th className={cx(s.tableBoxHeader, 'bgBlack', 'textWhite')}>
                  {getPhoneData.countryCode + ' ' + this.formatPhoneNumber(decode(getPhoneData.phoneNumber))}
                </th>
              }
              <td>
                <Loader
                  type={"button"}
                  buttonType={"button"}
                  className={cx(s.button, bt.btnPrimaryBorder, 'bgBlack')}
                  disabled={buttonLoader}
                  show={buttonLoader}
                  label={formatMessage(messages.verifyViaSms)}
                  handleClick={this.verifyPhoneNumber}
                  spinnerColor={'#FF5483'}
                />
              </td>
              <td className={cx('text-right', 'textAlignLeftRtl')}>
                <a href="javascript:void(0)"
                  className={cx(s.modalCaptionLink)}
                  title="Remove"
                  onClick={this.handleRemove}>
                  <MdIconPack.MdClear className={s.iconSize} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  renderConfirmedPhoneNumber() {
    const { data, data: { loading, getPhoneData } } = this.props;

    return (
      <div>
        <table className={s.tableBox}>
          <tbody>
            <tr>
              {
                !loading && <th className={cx(s.tableBoxHeader, 'bgBalck', 'textWhite')}>
                  {getPhoneData.countryCode + ' ' + this.formatPhoneNumber(decode(getPhoneData.phoneNumber))}
                </th>
              }
              <td>
                <p className={cx(s.noMargin, 'textWhite')}>
                  <MdIconPack.MdCheckCircle className={cx(s.confirmedIcon, 'textWhite')} /> <FormattedMessage {...messages.confirmedLabel} />
                </p>
              </td>
              <td className={cx('text-right', 'textAlignLeftRtl')}>
                <a href="javascript:void(0)"
                  className={cx(s.modalCaptionLink)}
                  title="Remove"
                  onClick={this.handleRemove}>
                  <MdIconPack.MdClear className={s.iconSize} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }


  render() {
    const { formatMessage } = this.props.intl;
    const { openSmsVerificationModal, closeSmsVerificationModal, modalStatus, sendVerificationSms } = this.props;
    const { data, data: { loading, getPhoneData } } = this.props;
    const { form1, form2, buttonLoader } = this.state;

    let verificationStatus = (getPhoneData && getPhoneData.verification && getPhoneData.verification.isPhoneVerified == true) ? true : false;

    return (
      <div>
        {
          loading && <Loader show={true} />
        }
        {
          !loading && getPhoneData && !modalStatus && !getPhoneData.phoneNumber && !verificationStatus && <div>
            {
              this.renderAddPhoneNumber()
            }
          </div>
        }
        {
          !loading && getPhoneData && !modalStatus && getPhoneData.phoneNumber && !verificationStatus && <div>
            {
              this.renderVerifyPhoneNumber()
            }
          </div>
        }
        {
          !loading && getPhoneData && modalStatus && !verificationStatus && form1 && <div className={s.formContainer}>
            <AddPhoneNumberForm />
          </div>
        }
        {
          !loading && getPhoneData && modalStatus && !verificationStatus && form2 && <div className={s.formContainer}>
            <VerifyPhoneNumberForm
              countryCode={getPhoneData.countryCode}
              phoneNumber={decode(getPhoneData.phoneNumber)} />
          </div>
        }
        {
          !loading && verificationStatus && <div>
            {
              this.renderConfirmedPhoneNumber()
            }
          </div>
        }
      </div>
    );
  }

}

const mapState = state => ({
  modalStatus: state.modalStatus.smsVerificationModalOpen,
  modalFormType: state.modalStatus.formType
});

const mapDispatch = {
  openSmsVerificationModal,
  closeSmsVerificationModal,
  sendVerificationSms
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(getUserDataQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(gql`
    mutation {
        RemovePhoneNumber {
            status
        }
    }`
  )
)(PhoneVerificationModal);
