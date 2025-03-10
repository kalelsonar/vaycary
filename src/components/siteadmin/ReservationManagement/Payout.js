import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';

// Redux Action
import { openReservationModal } from '../../../actions/Reservation/payoutModal';
// Translation
import messages from '../../../locale/messages';
//Helper
import { decode } from '../../../helpers/queryEncryption'
import { getDateUsingTimeZone } from '../../../helpers/dateRange';

import s from './ReservationManagement.css';

class Payout extends Component {
  static propTypes = {
    hostId: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    hostPayout: PropTypes.shape({
      id: PropTypes.number.isRequired,
      payEmail: PropTypes.string.isRequired,
      methodId: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      last4Digits: PropTypes.number
    }),
    hostTransaction: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    loading: PropTypes.bool,
    reservationId: PropTypes.number,
    reservationState: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    openReservationModal: PropTypes.any.isRequired,
    cancelData: PropTypes.shape({
      payoutToHost: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
    transactionData: PropTypes.object,
    taxPrice: PropTypes.number,
    hostData: PropTypes.shape({
      userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
      })
    }),
    hostServiceFee: PropTypes.number
  };

  static defaultProps = {
    hostPayout: null,
    loading: false,
    completed: false,
    reservationId: 0,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { hostId, id, hostPayout, amount, currency, openReservationModal, reservationState, cancelData, hostServiceFee } = this.props;
    const { transactionData, hostData, changeState, taxPrice } = this.props;
    let hostServiceFeeAmount = hostServiceFee ? hostServiceFee : 0, amountCurrency = currency;
    let amountPaytoHost = amount - hostServiceFeeAmount, hostEmail;

    if (reservationState === 'cancelled' && cancelData) {
      amountPaytoHost = cancelData?.payoutToHost;
      amountCurrency = cancelData?.currency;
    }
    if (hostData?.userData) {
      hostEmail = decode(hostData?.userData?.email);
    }
    const formName = 'ReservationPaymentForm';
    const initialData = {
      type: 'host',
      hostId,
      reservationId: id,
      receiverEmail: hostPayout?.payEmail,
      payoutId: hostPayout?.id,
      amount: amountPaytoHost,
      currency: amountCurrency,
      paymentMethodId: hostPayout?.methodId,
      payoutCurrency: hostPayout?.currency,
      last4Digits: hostPayout?.last4Digits,
      hostEmail,
      changeState,
      taxPrice
    };
    openReservationModal(formName, initialData);
  }

  render() {
    const { checkIn, loading, reservationId, reservationState, completed, cancelData, country } = this.props;
    const { id, amount, currency, hostPayout, hostTransaction, successPayout, selectedPayout } = this.props;
    const { formatMessage } = this.props.intl;
    let amountPaytoHost = 0;

    if (hostPayout === null || hostPayout?.payEmail === undefined) {
      return <span>{formatMessage(messages.noPayoutMethod)}</span>
    }

    if (cancelData)  amountPaytoHost = cancelData?.payoutToHost;
    
    if (reservationState === 'expired' || reservationState === 'declined' || (reservationState === 'cancelled' && amountPaytoHost <= 0)) {
      return <span>{formatMessage(messages.closedLabel)}</span>
    }

    if ((hostTransaction != null && hostTransaction.id != undefined) || successPayout && successPayout.includes(id)) {
      return <span>{formatMessage(messages.completedLabel)}</span>
    }

    if (selectedPayout?.includes(id)) {
      return <span className={s.processingtext}>{formatMessage(messages.processingLabel)}</span>;
    }

    let nextDay = moment(checkIn).add(1, 'days'), today = getDateUsingTimeZone(country, false),  action = false;
    let dayDifference = nextDay.diff(today, 'days'),  status = formatMessage(messages.messageStatus5);
    
    if (reservationState === 'completed' || reservationState === 'cancelled') {
      status = formatMessage(messages.readyTopay);
      action = true;
    }

    return (
      <div>
        {
          action && <a onClick={this.handleClick}>
            {status}
          </a>
        }
        {
          !action && <span>{status}</span>
        }
      </div>
    );
  }
}


const mapState = (state) => ({
  loading: state.reservation.payoutLoading,
  reservationId: state.reservation.reservationId,
  completed: state.reservation.payoutCompleted
});

const mapDispatch = {
  openReservationModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Payout)));