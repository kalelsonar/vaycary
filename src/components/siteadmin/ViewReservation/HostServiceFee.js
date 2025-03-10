import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import CurrencyConverter from '../../CurrencyConverter';
import messages from '../../../locale/messages';
import s from './ViewReservation.css';
class HostServiceFee extends Component {
    static propTypes = {
        checkIn: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        hostPayout: PropTypes.shape({
            id: PropTypes.number.isRequired,
            payEmail: PropTypes.string.isRequired
        }),
        loading: PropTypes.bool,
        reservationId: PropTypes.number,
        reservationState: PropTypes.string.isRequired,
    };

    static defaultProps = {
        hostPayout: null,
        loading: false,
        reservationId: 0,
    };

    render() {
        const { checkIn, reservationState, hostServiceFee } = this.props;
        const { currency, hostPayout } = this.props;
        let additionalStatus, nextDay = moment(checkIn).add(1, 'days'), today = moment();
        let dayDifference = nextDay.diff(today, 'days'), status = { hostServiceFee };
        if (hostPayout === null || hostPayout.payEmail === undefined) {
            additionalStatus = <FormattedMessage {...messages.noPayoutMethod} />
        }
        if ((dayDifference < 0 && hostPayout != null) || (reservationState === 'cancelled' && hostServiceFee > 0)) {
            status = { hostServiceFee };
        } else if (dayDifference < 0) {
            status = 0;
        }
        return (
            <span>
                <CurrencyConverter amount={hostServiceFee} from={currency} />
                {additionalStatus && <span>{' '}({additionalStatus})</span>}
            </span>
        );
    }
}

export default injectIntl(withStyles(s)(HostServiceFee));
