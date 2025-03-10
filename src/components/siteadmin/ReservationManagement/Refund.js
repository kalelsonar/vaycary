import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { injectIntl } from "react-intl"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import { openReservationModal } from "../../../actions/Reservation/payoutModal"
import messages from "../../../locale/messages"
import { convert } from "../../../helpers/currencyConvertion"
import s from "./ReservationManagement.css"
class Refund extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    reservationId: PropTypes.number,
    reservationState: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    openReservationModal: PropTypes.any.isRequired,
    taxPrice: PropTypes.number,
    transactionData: PropTypes.shape({
      payerEmail: PropTypes.string.isRequired,
      paymentType: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      paymentMethodId: PropTypes.number,
      transactionId: PropTypes.string.isRequired,
    }),
    refundData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      receiverEmail: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
    cancelData: PropTypes.shape({
      refundToGuest: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    transactionData: null,
    refundData: null,
    cancelData: null,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const {
      id,
      transactionData,
      openReservationModal,
      reservationState,
      cancelData,
      base,
      rates,
      changeState,
      taxPrice,
      reservationCurrency,
    } = this.props
    const formName = "ReservationPaymentForm"
    let amount = transactionData?.total,
      currency = transactionData?.currency
    let taxAmount = taxPrice
    if (reservationState === "cancelled" && cancelData) {
      amount = convert(
        base,
        rates,
        cancelData?.refundToGuest,
        cancelData?.currency,
        transactionData?.currency
      )
      taxAmount = convert(
        base,
        rates,
        taxPrice,
        reservationCurrency,
        transactionData?.currency
      )
      currency = transactionData?.currency
    }
    const initialData = {
      type: "guest",
      reservationId: id,
      receiverEmail: transactionData?.payerEmail,
      receiverId: transactionData?.payerId,
      payerEmail: transactionData?.receiverEmail,
      payerId: transactionData?.receiverId,
      amount,
      currency,
      paymentMethodId: transactionData?.paymentMethodId,
      transactionId: transactionData?.transactionId,
      changeState,
      taxPrice: taxAmount,
    }
    openReservationModal(formName, initialData)
  }

  render() {
    const { formatMessage } = this.props.intl
    const {
      id,
      transactionData,
      refundData,
      reservationState,
      cancelData,
      successRefund,
      selectedRefund,
    } = this.props
    let amountPayToGuest = 0
    if (cancelData) amountPayToGuest = cancelData?.refundToGuest
    console.log({ reservationState, amountPayToGuest })
    if (transactionData === null || transactionData === undefined) {
      return <span>{formatMessage(messages.transactionNotfound)}</span>
    }
    if (["expired", "cancelled", "declined"].includes(reservationState)) {
      if (reservationState === "cancelled" && amountPayToGuest === 0) {
        return <span>{formatMessage(messages.notEligible)}</span>
      }
      if (
        (refundData != null && refundData.id != undefined) ||
        (successRefund && successRefund.includes(id))
      ) {
        return <span>{formatMessage(messages.completedLabel)}</span>
      }
      if (selectedRefund?.includes(id)) {
        return (
          <span className={s.processingtext}>
            {formatMessage(messages.processingLabel)}
          </span>
        )
      }
      return (
        <div>
          <a onClick={this.handleClick}>
            {" "}
            {formatMessage(messages.proceedRefund)}{" "}
          </a>
        </div>
      )
    } else {
      return <span>{formatMessage(messages.notEligible)}</span>
    }
  }
}

const mapState = (state) => ({
  loading: state.reservation.refundLoading,
  reservationId: state.reservation.reservationId,
  completed: state.reservation.refundCompleted,
  base: state.currency.base,
  rates: state.currency.rates,
})

const mapDispatch = {
  openReservationModal,
}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Refund)))
