import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage, injectIntl } from "react-intl"

import { graphql, compose } from "react-apollo"

// Redux Form
import { Field, reduxForm, change, formValueSelector } from "redux-form"
// Redux
import { connect } from "react-redux"

import { Button } from "react-bootstrap"
import cx from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "../Payout.css"
import bt from "../../../components/commonStyle.css"

// Graphql
import getPaymentMethodsQuery from "./getPaymentMethods.graphql"

// Locale
import messages from "../../../locale/messages"

class PayoutMethods extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    previousPage: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    PaymentMethodsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getPaymentMethods: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          processedIn: PropTypes.string.isRequired,
          fees: PropTypes.string.isRequired,
          currency: PropTypes.string.isRequired,
          details: PropTypes.string.isRequired,
          paymentType: PropTypes.string.isRequired,
        })
      ),
    }),
  }

  static defaultProps = {
    PaymentMethodsData: {
      loading: true,
      getPaymentMethods: [],
    },
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      PaymentMethodsData: { loading, getPaymentMethods },
    } = nextProps
    const { change, paymentMethodId } = this.props
    if (
      getPaymentMethods != null &&
      getPaymentMethods.results &&
      getPaymentMethods.results.length > 0 &&
      (paymentMethodId === undefined || paymentMethodId === null)
    ) {
      const activePayentMethods =
        getPaymentMethods &&
        getPaymentMethods.results &&
        getPaymentMethods.results.find((o) => o && o.isEnable)
      if (activePayentMethods) {
        change("methodId", activePayentMethods.id)
        change("paymentType", activePayentMethods.paymentType)
        change("currency", activePayentMethods.currency)
      }
    }
  }

  handleChange(methodId, paymentType, currency) {
    const { change } = this.props
    change("methodId", methodId)
    change("paymentType", paymentType)
    change("currency", currency)
  }

  render() {
    const { error, handleSubmit, previousPage } = this.props
    const {
      PaymentMethodsData: { loading, getPaymentMethods },
    } = this.props
    const { paymentMethodId } = this.props
    const { formatMessage } = this.props.intl

    return (
      <div
        className={cx(
          "inputFocusColor",
          "commonListingBg",
          "noMarginBottom",
          "payoutRadioBtn"
        )}
      >
        <form onSubmit={handleSubmit}>
          <h3 className={s.titleText}>{formatMessage(messages.addPayout)}</h3>
          <p className={s.payoutIntro}>
            <FormattedMessage {...messages.payoutIntro1} />
          </p>
          <p className={s.payoutIntro}>
            <FormattedMessage {...messages.payoutIntro2} />
          </p>
          {loading && (
            <div>
              <FormattedMessage {...messages.loadingLabel} />
            </div>
          )}
          {!loading &&
            getPaymentMethods != undefined &&
            getPaymentMethods.results &&
            getPaymentMethods.results.length > 0 && (
              <div
                className={cx(
                  "payoutTable",
                  "NewResponsiveTable",
                  "mobileTable"
                )}
              >
                <table className={cx("table", s.noBorder)}>
                  <thead>
                    <tr
                      className={cx(
                        s.rowBorder,
                        s.sectionTitleLight,
                        s.textTruncate
                      )}
                    >
                      <th scope="col" className={s.noBorder} />
                      <th scope="col" className={s.noBorder}>
                        <FormattedMessage {...messages.payoutTitle} />
                      </th>
                      <th scope="col" className={s.noBorder}>
                        <FormattedMessage {...messages.payoutTitle1} />
                      </th>
                      <th scope="col" className={s.noBorder}>
                        <FormattedMessage {...messages.payoutTitle2} />
                      </th>
                      <th scope="col" className={s.noBorder}>
                        <FormattedMessage {...messages.payoutTitle3} />
                      </th>
                      <th scope="col" className={s.noBorder}>
                        <FormattedMessage {...messages.payoutTitle4} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaymentMethods.results.map((item, index) => {
                      let checked = false
                      if (item.id == paymentMethodId) {
                        checked = true
                      }
                      if (item.isEnable) {
                        return (
                          <tr className={cx(s.sectionTitleLight)} key={index}>
                            <td
                              data-label={formatMessage(messages.payoutTitle)}
                            >
                              <span className={bt.flexCenter}>
                                <Field
                                  name="methodId"
                                  component="input"
                                  value={item.id}
                                  type="radio"
                                  className={bt.curderPointer}
                                  checked={checked}
                                  onChange={() =>
                                    this.handleChange(
                                      item.id,
                                      item.paymentType,
                                      item.currency
                                    )
                                  }
                                />
                                <label className={cx(s.radioText, s.VisibleXS)}>
                                  {item.name}
                                </label>
                              </span>
                            </td>
                            <td
                              data-label={formatMessage(messages.payoutTitle)}
                              className={s.hiddenXS}
                            >
                              <label className={s.radioText}>{item.name}</label>
                            </td>
                            <td
                              data-label={formatMessage(messages.payoutTitle1)}
                            >
                              {item.processedIn}
                            </td>
                            <td
                              data-label={formatMessage(messages.payoutTitle2)}
                            >
                              {item.fees}
                            </td>
                            <td
                              data-label={formatMessage(messages.payoutTitle3)}
                            >
                              {item.currency}
                            </td>
                            <td
                              data-label={formatMessage(messages.payoutTitle4)}
                            >
                              {item.details}
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}
          <div className={bt.textAlignRight}>
            <Button
              className={cx(
                bt.btnLarge,
                bt.btnPrimaryBorder,
                s.btnRight,
                "spaceRight2AR",
                s.backBtn
              )}
              onClick={previousPage}
            >
              <FormattedMessage {...messages.back} />
            </Button>
            <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit">
              <FormattedMessage {...messages.next} />
            </Button>
          </div>
          {!loading &&
            getPaymentMethods != undefined &&
            getPaymentMethods.results &&
            getPaymentMethods.results.length === 0 && (
              <div>
                {" "}
                <FormattedMessage {...messages.noPaymentFound} />{" "}
              </div>
            )}
        </form>
      </div>
    )
  }
}

PayoutMethods = reduxForm({
  form: "PayoutForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PayoutMethods)

const selector = formValueSelector("PayoutForm")

const mapState = (state) => ({
  paymentMethodId: selector(state, "methodId"),
})

const mapDispatch = {
  change,
}

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(getPaymentMethodsQuery, {
    name: "PaymentMethodsData",
    options: {
      ssr: false,
    },
  })
)(PayoutMethods)
