import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Components
import HouseRules from '../Booking/Payment/HouseRules';
// Helpers
import validate from './validate';
import submit from './submit';
import Loader from '../Loader';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

// images
import defaultPic from '/public/SiteImages/defaultPic.png';

import bt from '../../components/commonStyle.css';
import s from './Payment.css';
class PaymentForm extends Component {
  static propTypes = {
    hostName: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string.isRequired,
      }),
    })),
    allowedGuests: PropTypes.number.isRequired,
    paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
    })),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    houseRules: [],
    paymentCurrencyList: [],
    paymentLoading: false,
  };

  constructor(props) {
    super(props);
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, isDisabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} disabled={isDisabled} >
          {children}
        </FormControl>
        {touched && error && (<span className={s.errorMessage}>{formatMessage(error)}</span>)}
      </div>
    );
  };

  renderFormControlTextArea({ input, label, meta: { touched, error }, children, className, isDisabled }) {
    return (
      <FormGroup>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
          disabled={isDisabled}
        >
          {children}
        </FormControl>
      </FormGroup>
    );
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;
    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  renderpaymentCurrencies = () => {
    const { paymentCurrencyList, paymentLoading } = this.props;
    const rows = [];

    if (paymentCurrencyList != null && paymentCurrencyList?.length > 0) {
      paymentCurrencyList?.map((item, index) => {
        if (item?.isEnable && item?.isPayment) {
          rows.push(<option key={index} value={item?.symbol} disabled={paymentLoading}>{item?.symbol}</option>);
        }
      });
    }
    return rows;
  }

  handleMessageChange = () => { }

  render() {
    const { houseRules, hostName, guests, paymentLoading, checkIn, checkOut, profileId, picture } = this.props;
    const { handleSubmit, submitting, error } = this.props;
    const { formatMessage } = this.props.intl;
    let checkInDate = checkIn != null ? moment(moment(checkIn).format('YYYY-MM-DD')).format('MM/DD/YYYY') : '';
    let checkOutDate = checkOut != null ? moment(moment(checkOut).format('YYYY-MM-DD')).format('MM/DD/YYYY') : '';
    return (
      <div className={cx(s.bookItPanel, s.spaceTop2)}>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col md={10} className={cx(s.textLeft, 'textAlignRightRtl')}>
              <h1 className={s.titleText}><FormattedMessage {...messages.reviewAndPay} /></h1>
              <div className={s.flex}>
                <div>
                  <div className={s.dateTitle}><FormattedMessage {...messages.dates} /></div>
                  <div className={cx(s.showDate, 'textWhite')}>{checkInDate}{' - '}{checkOutDate}</div>
                </div>

              </div>
              <div className={cx(s.flex, s.marginTop)}>
                <div>
                  <div className={s.dateTitle}><FormattedMessage {...messages.guests} /></div>
                  <div className={cx(s.showDate, 'textWhite')}>{guests}{' '}{guests > 1 ? <FormattedMessage {...messages.guests} /> : <FormattedMessage {...messages.guest} />}</div>
                </div>
              </div>
              <div className={s.commonBorder}></div>
              {
                houseRules != null && houseRules.length > 0 && <div className={s.space4}>
                  <HouseRules
                    hostDisplayName={hostName}
                    houseRules={houseRules}
                  />
                  <div className={s.commonBorder}></div>
                </div>
              }
              <div className={cx(s.textLeft, 'textAlignRightRtl')}>
                <div className={cx(s.h3, s.bold)}>
                  <FormattedMessage {...messages.aboutYourTrip} />
                </div>
                <div className={s.aboutPaymentDesc}>
                  <FormattedMessage {...messages.aboutDescPayment} />
                </div>
                <div className={s.hostFlex}>
                  <Link to={"/users/show/" + profileId}>
                    {<img src={picture ? ('/images/avatar/medium_' + picture) : defaultPic} className={s.avatarImage} />}
                  </Link>
                  <div className={cx(s.messageSection)}>
                    <span><FormattedMessage {...messages.hostedBy} /></span> <span>{hostName}</span>
                  </div>
                </div>
                <div className={cx(s.bookItDetails, s.spaceTop2, s.space4)}>
                  <span><FormattedMessage {...messages.sayHello} />:</span>
                </div>
                <div>
                  <FormGroup >
                    <Field
                      className={s.textArea}
                      name="message"
                      component={this.renderFormControlTextArea}
                      label={formatMessage(messages.descriptionInfo)}
                      isDisabled
                      normalize={this.handleMessageChange}
                    />
                  </FormGroup>
                </div>
                <div className={s.commonBorder}></div>
              </div>
            </Col>
            <Col md={10} className={cx(s.textLeft)}>
              <section>
                <header className={s.paymentHeader}>
                  <Row>
                    <Col md={10} className={cx(s.textLeft, 'textAlignRightRtl')}>
                      <h3 className={cx(s.paymentText)}><FormattedMessage {...messages.payment} /></h3>
                    </Col>
                  </Row>
                </header>
              </section>
              <Row className={cx(s.space4, 'textAlignRightRtl')}>
                <Col xs={12}>
                  <span className={s.textLight}>
                    <FormattedMessage {...messages.paymentInfo} />
                  </span>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <div className={cx(s.countryName, 'textAlignRightRtl', 'textWhite')}>
                    <span className={cx(s.textRegular, 'textWhite')}><FormattedMessage {...messages.paymentCurrency} /></span>
                  </div>
                  <div className={s.selectContainer}>
                    <Field name="paymentCurrency" component={this.renderFormControlSelect} className={cx(s.formControlSelect, bt.commonControlSelect, 'paymentSelectAR')} >
                      <option disabled={paymentLoading} value="">{formatMessage(messages.chooseCurrency)}</option>
                      {
                        this.renderpaymentCurrencies()
                      }
                    </Field>
                  </div>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <div className={cx(s.countryName, 'textAlignRightRtl')}>
                    <span className={cx(s.textRegular, 'textWhite')}><FormattedMessage {...messages.paymentType} /></span>
                  </div>
                  <div className={s.selectContainer}>
                    <FormControl componentClass="select" className={cx(s.formControlSelect, bt.commonControlSelect, 'paymentSelectAR')} >
                      <option>{formatMessage(messages.paypal)}</option>
                    </FormControl>
                  </div>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12} className={'textAlignRightRtl'}>
                  <span className={s.textLight}><FormattedMessage {...messages.loginInfo} /></span>
                </Col>
              </Row>
              <Row className={cx(s.space4, 'textAlignRightRtl')}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Loader
                    type={'button'}
                    buttonType={'submit'}
                    className={cx(bt.btnPrimary, bt.btnlarge, 'arButtonLoader', s.loaderFlex)}
                    disabled={submitting || error}
                    show={paymentLoading}
                    label={formatMessage(messages.login)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

PaymentForm = reduxForm({
  form: 'PaymentForm', // a unique name for this form
  validate,
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = state => ({
  paymentCurrencyList: state?.currency?.availableCurrencies?.results,
  paymentLoading: state?.book?.paymentLoading,
  guests: selector(state, 'guests')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PaymentForm)));