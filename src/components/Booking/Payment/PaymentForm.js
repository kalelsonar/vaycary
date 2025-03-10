import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage, injectIntl } from "react-intl"
import moment from "moment"
import { connect } from "react-redux"
import { Field, reduxForm, formValueSelector, reset, change } from "redux-form"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import FormControl from "react-bootstrap/lib/FormControl"

import cx from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

// Component
import HouseRules from "./HouseRules"
import Loader from "../../Loader"
import Link from "../../Link"
import ModalForm from "./ModalForm/ModalForm"

// Helpers
import showToaster from "../../../helpers/showToaster"
import validate from "./validate"
import fetch from "../../../core/fetch"
import messages from "../../../locale/messages"
import { isRTL } from "../../../helpers/formatLocale"
// Locale
import { makePayment } from "../../../actions/booking/makePayment"
import { openPaymentModal } from "../../../actions/modalActions"

//Images

import arrow from "/public/SiteIcons/chevron-right.svg"
import defaultPic from "/public/SiteImages/defaultPic.png"

import bt from "../../../components/commonStyle.css"
import s from "./Payment.css"

const createOptions = (theme, isRTLLocale) => {
  return {
    style: {
      base: {
        color: theme == "dark" ? "#fff" : "#282828",
        fontWeight: 400,
        fontFamily: "inherit",
        fontSize: "14px",
        textAlign: isRTLLocale ? "right" : "left",
        fontSmoothing: "antialiased",
        ":focus": {
          color: theme == "dark" ? "#fff" : "#282828",
        },

        "::placeholder": {
          color: "#aaa",
        },

        ":focus::placeholder": {
          color: "#aaa",
        },
      },
      invalid: {
        color: theme == "dark" ? "#fff" : "#282828",
        ":focus": {
          color: theme == "dark" ? "#fff" : "#282828",
        },
        "::placeholder": {
          color: "#aaa",
        },
      },
    },
  }
}
class PaymentForm extends Component {
  static propTypes = {
    houseRules: PropTypes.arrayOf(
      PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string.isRequired,
        }),
      })
    ),
    hostDisplayName: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    initialValues: PropTypes.shape({
      listId: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      checkIn: PropTypes.object.isRequired,
      checkOut: PropTypes.object.isRequired,
      guests: PropTypes.number.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      taxPrice: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      weeklyDiscount: PropTypes.number,
      monthlyDiscount: PropTypes.number,
      paymentType: PropTypes.number,
    }).isRequired,
    paymentCurrencyList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        symbol: PropTypes.string.isRequired,
        isEnable: PropTypes.bool.isRequired,
        isPayment: PropTypes.bool.isRequired,
      })
    ),
    paymentLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
  }

  static defaultProps = {
    paymentCurrencyList: [],
    paymentLoading: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      paymentStatus: 3,
      load: true,
      personCapacityData: [],
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields, razorpayPayment } = this.props
    if (listingFields != undefined) {
      this.setState({ personCapacityData: listingFields.personCapacity })
    }
    this.setState({
      paymentStatus: razorpayPayment ? 3 : 1,
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps
    if (listingFields != undefined) {
      this.setState({ personCapacityData: listingFields.personCapacity })
    }
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl
    const { locale: prevLocale } = prevProps.intl

    if (locale !== prevLocale) {
      this.setState({ load: false })
      clearTimeout(this.loadSync)
      this.loadSync = null
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1)
    }
  }

  renderFormControlSelect = ({
    input,
    label,
    meta: { touched, error },
    children,
    className,
    disabled,
  }) => {
    const { formatMessage } = this.props.intl
    return (
      <div>
        <FormControl
          disabled={disabled}
          componentClass="select"
          {...input}
          className={className}
        >
          {children}
        </FormControl>
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
      </div>
    )
  }

  renderFormControlTextArea = ({
    input,
    label,
    meta: { touched, error },
    children,
    className,
  }) => {
    const { formatMessage } = this.props.intl
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
      </div>
    )
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl
    const { personCapacityData } = this.state

    let rows = [],
      i
    for (i = 1; i <= personCapacity; i++) {
      rows.push(
        <option key={i} value={i}>
          {i}{" "}
          {i > 1
            ? personCapacityData[0]?.otherItemName
            : personCapacityData[0]?.itemName}
        </option>
      )
    }
    return rows
  }

  renderpaymentCurrencies = () => {
    const { paymentCurrencyList } = this.props
    let rows = []

    if (paymentCurrencyList != null && paymentCurrencyList?.length > 0) {
      paymentCurrencyList?.map((item, index) => {
        if (item?.isEnable && item?.isPayment) {
          rows.push(
            <option key={index} value={item?.symbol}>
              {item?.symbol}
            </option>
          )
        }
      })
    }
    return rows
  }

  renderFormControl = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error },
    className,
  }) => {
    const { formatMessage } = this.props.intl
    return (
      <div>
        <FormControl
          {...input}
          placeholder={placeholder}
          type={type}
          className={className}
          maxLength={11}
        />
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
      </div>
    )
  }

  handleClick = () => {
    const { dispatch } = this.props
    dispatch(reset("BookingForm"))
  }

  handleSubmit = async (values, dispatch) => {
    let paymentType, paymentCurrency, query
    paymentType = values?.paymentType
    paymentCurrency = values?.paymentType == 1 ? values?.paymentCurrency : null

    query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
      checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
        id
        listId
        hostId
        guestId
        checkIn
        checkOut
        status
      }
    }`

    values.checkIn = moment(values?.checkIn).format("YYYY-MM-DD")
    values.checkOut = moment(values?.checkOut).format("YYYY-MM-DD")

    const params = {
      listId: values?.listId,
      checkIn: values?.checkIn,
      checkOut: values?.checkOut,
    }

    const resp = await fetch("/graphql", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: params,
      }),
      credentials: "include",
    })

    const { data } = await resp.json()

    if (data?.checkReservation?.status == "200") {
      let msg = "",
        paymentMethodId,
        createPaymentMethod

      const { status, reservationId } = await dispatch(
        makePayment(
          values?.listId,
          values?.listTitle,
          values?.hostId,
          values?.guestId,
          values?.checkIn,
          values?.checkOut,
          values?.guests,
          values?.message,
          values?.basePrice,
          values?.cleaningPrice,
          values?.taxPrice,
          values?.currency,
          values?.discount,
          values?.discountType,
          values?.guestServiceFee,
          values?.hostServiceFee,
          values?.total,
          values?.bookingType,
          paymentCurrency,
          paymentType,
          values?.guestEmail,
          values?.bookingSpecialPricing,
          values?.isSpecialPriceAssigned,
          values?.isSpecialPriceAverage,
          values?.dayDifference,
          paymentMethodId,
          null,
          values?.checkInStart,
          values?.checkInEnd,
          values?.hostServiceFeeType,
          values?.hostServiceFeeValue,
          values?.threadId
        )
      )
    } else {
      showToaster({ messageId: "checkAvailableDates", toasterType: "error" })
    }
  }

  handlePayment = (e) => {
    const { change } = this.props
    let paymentType = e.target.value

    if (paymentType == 3) {
      this.setState({ paymentStatus: 3 })
    } else {
      change("zipcode", null)
      this.setState({ paymentStatus: 1 })
    }
  }

  render() {
    const {
      hostDisplayName,
      houseRules,
      hostPicture,
      hostProfileId,
      isPreApprove,
      paymentLoading,
      intl: { locale },
      maximumStay,
      payPalPayment,
      razorpayPayment,
      theme,
    } = this.props
    const {
      handleSubmit,
      submitting,
      error,
      pristine,
      paymentType,
      restrictEdit,
      listId,
      checkIn,
      checkOut,
      guests,
      openPaymentModal,
    } = this.props
    const { paymentStatus, load } = this.state
    const { formatMessage } = this.props.intl

    let checkInDate, checkOutDate, paymentModalInitialValues
    checkInDate =
      checkIn != null
        ? moment(moment(checkIn).format("YYYY-MM-DD")).format("MM/DD/YYYY")
        : ""
    checkOutDate =
      checkOut != null
        ? moment(moment(checkOut).format("YYYY-MM-DD")).format("MM/DD/YYYY")
        : ""
    paymentModalInitialValues = {
      checkIn,
      checkOut,
      guests,
    }

    return (
      <div
        className={cx(
          s.bookItPanel,
          s.spaceTop2,
          s.aboutNoMargin,
          "customRatioButton"
        )}
      >
        <ModalForm listId={listId} initialValues={paymentModalInitialValues} />
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <h1 className={s.titleText}>
            <FormattedMessage {...messages.reviewAndPay} />
          </h1>
          <div>
            <div className={s.flex}>
              <div>
                <div className={s.dateTitle}>
                  <FormattedMessage {...messages.dates} />
                </div>
                <div className={cx(s.showDate, "textWhite")}>
                  {checkInDate}
                  {" - "}
                  {checkOutDate}
                </div>
              </div>
              {!restrictEdit && (
                <div>
                  <div>
                    <a onClick={() => openPaymentModal()} className={s.editCss}>
                      <span>
                        <FormattedMessage {...messages.editLabel} />
                      </span>{" "}
                      <span className={cx(s.editIcon, "editIconPayRTL")}>
                        <img src={arrow} />
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className={cx(s.flex, s.marginTop)}>
              <div>
                <div className={s.dateTitle}>
                  <FormattedMessage {...messages.guests} />
                </div>
                <div className={cx(s.showDate, "textWhite")}>
                  {guests}{" "}
                  {guests > 1 ? (
                    <FormattedMessage {...messages.guests} />
                  ) : (
                    <FormattedMessage {...messages.guest} />
                  )}
                </div>
              </div>
              {!restrictEdit && (
                <div>
                  <div>
                    <a onClick={() => openPaymentModal()} className={s.editCss}>
                      <span>
                        <FormattedMessage {...messages.editLabel} />
                      </span>{" "}
                      <span className={cx(s.editIcon, "editIconPayRTL")}>
                        <img src={arrow} />
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className={s.commonBorder}></div>
          </div>

          {houseRules?.length > 0 && (
            <div className={s.space4}>
              <HouseRules
                hostDisplayName={hostDisplayName}
                houseRules={houseRules}
              />
              <div className={s.commonBorder}></div>
            </div>
          )}

          <div className={cx(s.textLeft, "textAlignRightRtl")}>
            <div className={cx(s.h3, s.bold)}>
              <FormattedMessage {...messages.aboutYourTrip} />
            </div>
            <div className={s.aboutPaymentDesc}>
              <FormattedMessage {...messages.aboutDescPayment} />
            </div>
            <div className={s.hostFlex}>
              <Link to={"/users/show/" + hostProfileId}>
                {
                  <img
                    src={
                      hostPicture
                        ? "/images/avatar/medium_" + hostPicture
                        : defaultPic
                    }
                    className={s.avatarImage}
                  />
                }
              </Link>
              <div className={cx(s.messageSection)}>
                <span>
                  <FormattedMessage {...messages.hostedBy} />
                </span>{" "}
                <span>{hostDisplayName}</span>
              </div>
            </div>
            <div>
              <Field
                className={s.textArea}
                name="message"
                component={this.renderFormControlTextArea}
                label={formatMessage(messages.descriptionInfo)}
              />
            </div>
            <div className={s.commonBorder}></div>
          </div>
          <Col
            md={10}
            className={cx(s.textLeft, "textAlignRightRtl", s.noPadding)}
          >
            <section>
              <header className={s.paymentHeader}>
                <Row>
                  <Col
                    md={10}
                    className={cx(
                      s.textLeft,
                      s.paymentPadding,
                      "textAlignRightRtl"
                    )}
                  >
                    <h3
                      className={cx(
                        s.pullLeft,
                        s.h3,
                        s.space2,
                        "pullRightBooking"
                      )}
                    >
                      <FormattedMessage {...messages.payment} />
                    </h3>
                  </Col>
                </Row>
              </header>
            </section>

            {razorpayPayment && (
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <label
                    onClick={(e) => {
                      this.handlePayment(e)
                    }}
                  >
                    <Field
                      name="paymentType"
                      component="input"
                      type="radio"
                      value="3"
                      className={cx(s.cursorPointer)}
                    />
                    <span
                      className={cx(s.radioTextSection, "radioTextSectionRTL")}
                    >
                      {" "}
                      <FormattedMessage {...messages.razorPay} />
                    </span>
                  </label>
                </Col>
              </Row>
            )}
            {paymentStatus == 3 ? (
              !load ? (
                <Loader />
              ) : (
                <Row className={cx(s.responsivecardSection)}>
                  {/* <Col
                    lg={10}
                    md={11}
                    sm={8}
                    xs={12}
                    className={cx(s.noPadding, s.cardSection, s.noPaddingLeft)}
                  ></Col> */}
                </Row>
              )
            ) : (
              <span></span>
            )}

            {payPalPayment && (
              <Row className={s.payPalTop}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <span>
                    <label
                      onClick={(e) => {
                        this.handlePayment(e)
                      }}
                    >
                      <Field
                        name="paymentType"
                        component="input"
                        type="radio"
                        value="1"
                        className={cx(s.cursorPointer)}
                      />
                      <span
                        className={cx(
                          s.radioTextSection,
                          "radioTextSectionRTL"
                        )}
                      >
                        {" "}
                        <FormattedMessage {...messages.paypal} />
                      </span>
                    </label>
                  </span>
                </Col>
              </Row>
            )}

            {paymentStatus == 1 && (
              <Row className={cx(s.space4, s.spaceTop3)}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className={cx(s.countryName, "textWhite")}>
                    <span>
                      <FormattedMessage {...messages.paymentCurrency} />
                    </span>
                  </div>
                  <div className={s.selectContainer}>
                    <Field
                      name="paymentCurrency"
                      disabled={paymentType == 3}
                      component={this.renderFormControlSelect}
                      className={cx(
                        s.formControlSelect,
                        bt.commonControlSelect,
                        "selectPaymentDropdown"
                      )}
                    >
                      <option value="">
                        {formatMessage(messages.chooseCurrency)}
                      </option>
                      {this.renderpaymentCurrencies()}
                    </Field>
                  </div>
                  <span className={cx(s.textLight)}>
                    <FormattedMessage {...messages.loginInfo} />
                  </span>
                </Col>
              </Row>
            )}

            <div className={s.footerBtns}>
              {!paymentLoading && (
                <div className={s.cancelBtn}>
                  <Link
                    to={"/rooms/" + listId}
                    className={cx(s.cancelLinkText)}
                    onClick={this.handleClick}
                  >
                    <FormattedMessage {...messages.cancel} />
                  </Link>
                </div>
              )}
              {paymentLoading && (
                <div className={s.cancelBtn}>
                  <a
                    href="javascript:void(0)"
                    className={cx(s.cancelLinkText, {
                      [s.disabledLink]: submitting == true,
                    })}
                  >
                    <FormattedMessage {...messages.cancel} />
                  </a>
                </div>
              )}
              <div className={s.cancelBtn}>
                <Loader
                  type={"button"}
                  buttonType={"submit"}
                  className={cx(bt.btnPrimary, "arButtonLoader", s.loaderFlex)}
                  disabled={pristine || submitting || error || maximumStay}
                  show={paymentLoading}
                  label={formatMessage(messages.payNow)}
                />
              </div>
            </div>
          </Col>
        </form>
      </div>
    )
  }
}

PaymentForm = reduxForm({
  form: "PaymentForm", // a unique name for this form
  validate,
})(PaymentForm)

// Decorate with connect to read form values
const selector = formValueSelector("PaymentForm") // <-- same as form name

const mapState = (state) => ({
  paymentCurrencyList: state?.currency?.availableCurrencies?.results,
  paymentLoading: state?.book?.paymentLoading,
  paymentType: selector(state, "paymentType"),
  listingFields: state?.listingFields?.data,
  checkIn: selector(state, "checkIn"),
  checkOut: selector(state, "checkOut"),
  guests: Number(selector(state, "guests")),
  maximumStay: state?.viewListing?.maximumStay,
  payPalPayment: state?.book?.payPalPayment,
  razorpayPayment: state?.book?.razorpayPayment,
  restrictEdit: state?.book?.restrictEdit,
  theme: state?.currency?.theme,
})

const mapDispatch = {
  makePayment,
  openPaymentModal,
  change,
}

export default injectIntl(
  withStyles(s, bt)(connect(mapState, mapDispatch)(PaymentForm))
)
