import React, { Component } from "react"
import PropTypes from "prop-types"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"
import { FormattedMessage, injectIntl } from "react-intl"

import FormGroup from "react-bootstrap/lib/FormGroup"
import FormControl from "react-bootstrap/lib/FormControl"
import Button from "react-bootstrap/lib/Button"

import withStyles from "isomorphic-style-loader/lib/withStyles"
import cx from "classnames"

import CurrencyConverter from "../../../CurrencyConverter"

import validate from "./validate"
import submit from "./submit"
import messages from "../../../../locale/messages"

import bt from "../../../../components/commonStyle.css"
import s from "./ModalForm.css"

class PaymentForm extends Component {
  static propTypes = {
    availableCurrencies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        symbol: PropTypes.string.isRequired,
        isEnable: PropTypes.bool.isRequired,
        isPayment: PropTypes.bool.isRequired,
      })
    ),
    type: PropTypes.string,
    reservationId: PropTypes.number,
    email: PropTypes.string,
    payoutId: PropTypes.number,
    amount: PropTypes.number,
    taxPrice: PropTypes.number,
    amountCurrency: PropTypes.string,
    paymentMethodId: PropTypes.number,
  }

  renderFormControlSelect = ({
    input,
    label,
    meta: { touched, error },
    children,
    className,
  }) => {
    const { formatMessage } = this.props.intl
    return (
      <FormGroup className={s.formGroup}>
        <label className={s.labelTextNew}>{label}</label>
        <FormControl componentClass="select" {...input} className={className}>
          {children}
        </FormControl>
        {touched && error && (
          <span className={s.errorMessage}>{formatMessage(error)}</span>
        )}
      </FormGroup>
    )
  }

  render() {
    const {
      error,
      handleSubmit,
      submitting,
      availableCurrencies,
      paymentMethodId,
      last4Digits,
    } = this.props
    const {
      type,
      reservationId,
      email,
      payoutId,
      amount,
      taxPrice,
      amountCurrency,
    } = this.props
    const { formatMessage } = this.props.intl

    let typeLabel
    if (type === "host") {
      typeLabel = "Host Payout"
    } else {
      typeLabel = "Refund to Guest"
    }

    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <strong>{formatMessage(error)}</strong>}
        <div className={s.modelFlex}>
          <label className={s.labelTextNew}>
            <FormattedMessage {...messages.transferType} />
          </label>
          <span>{typeLabel}</span>
        </div>
        <div className={s.modelFlex}>
          <label className={s.labelTextNew}>
            <FormattedMessage {...messages.transferAmount} />
          </label>
          <CurrencyConverter amount={amount} from={amountCurrency} />
        </div>
        {taxPrice > 0 && (
          <div className={s.modelFlex}>
            <label className={s.labelTextNew}>
              <FormattedMessage {...messages.tax} />
            </label>
            <CurrencyConverter amount={taxPrice} from={amountCurrency} />
          </div>
        )}
        <div className={s.modelFlex}>
          <label className={s.labelTextNew}>
            <FormattedMessage {...messages.receiverLabel} />
          </label>
          <>
            {(type != "host" || paymentMethodId == 1) && <span>{email}</span>}
            {type == "host" && paymentMethodId == 3 && (
              <span>****{last4Digits}</span>
            )}
          </>
        </div>
        {paymentMethodId == 1 && (
          <Field
            name="paymentCurrency"
            component={this.renderFormControlSelect}
            label={formatMessage(messages.currency)}
            className={cx(bt.commonControlSelect)}
          >
            <option value="">{formatMessage(messages.chooseCurrency)}</option>
            {availableCurrencies != null &&
              availableCurrencies.length > 0 &&
              availableCurrencies.map((currency, index) => {
                if (currency.isEnable === true && currency.isPayment) {
                  return (
                    <option key={index} value={currency.symbol}>
                      {currency.symbol}
                    </option>
                  )
                }
              })}
          </Field>
        )}
        <Button
          className={cx(bt.btnPrimary, s.spaceTop3)}
          block
          type="submit"
          disabled={submitting || error}
        >
          <FormattedMessage {...messages.confirmLabel} />
        </Button>
      </form>
    )
  }
}

PaymentForm = reduxForm({
  form: "ReservationPaymentForm", // a unique name for this form
  validate,
})(PaymentForm)

const selector = formValueSelector("ReservationPaymentForm")

const mapState = (state) => ({
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  type: selector(state, "type"),
  reservationId: selector(state, "reservationId"),
  email: selector(state, "receiverEmail"),
  payoutId: selector(state, "payoutId"),
  amount: selector(state, "amount"),
  taxPrice: selector(state, "taxPrice"),
  amountCurrency: selector(state, "currency"),
  paymentMethodId: selector(state, "paymentMethodId"),
  last4Digits: selector(state, "last4Digits"),
})

const mapDispatch = {}

export default injectIntl(
  withStyles(s, bt)(connect(mapState, mapDispatch)(PaymentForm))
)
