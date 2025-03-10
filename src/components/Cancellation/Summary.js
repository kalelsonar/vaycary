import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Locale
import messages from '../../locale/messages';
class Summary extends React.Component {

  static defaultProps = {
    data: {
      checkIn: null,
      checkOut: null
    }
  };

  render() {
    const { userType, firstName, guests, nights, interval, checkIn, checkOut } = this.props;
    const { formatMessage } = this.props.intl;
    let checkInDate = checkIn != null ? moment(checkIn).format('Do MMM YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('Do MMM YYYY') : '';

    return (
      <div>
        {
          userType === 'guest' &&
          <h3 className={cx(s.landingContentTitle, s.space5)}>
            <FormattedMessage {...messages.cancelYourTrip} />
          </h3>
        }
        {
          userType === 'host' && <div>
            <h3 className={cx(s.landingContentTitle, s.space5)}>
              <FormattedMessage {...messages.cancelYourReservation} />
            </h3>
            <span className={cx(s.landingSubTitle, s.space5, 'textWhite')}>
              <FormattedMessage {...messages.consider} />{' '}{firstName}'s{' '}
              <FormattedMessage {...messages.tripBeforeCanceling} />
            </span>
            <p className={cx(s.landingStep, s.space3, s.spaceTop2, 'textWhite')}>
              <span>
                <FormattedMessage {...messages.cancellingInfo} />
              </span>
            </p>
          </div>
        }
        <div className={s.displayGridDats}>
          <div>
            <p className={s.datesTitle}><FormattedMessage {...messages.dates} /></p>
            <p className={cx(s.datesValueText, 'textWhite')}>{checkInDate} <FormattedMessage {...messages.toLabel} /> {checkOutDate}</p>
          </div>
          <div>
            <p className={s.datesTitle}><FormattedMessage {...messages.stayingFor} /></p>
            <p className={cx(s.datesValueText, 'textWhite')}>{nights} {nights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</p>
          </div>
          <div>
            <p className={s.datesTitle}><FormattedMessage {...messages.travelingWith} /></p>
            <p className={cx(s.datesValueText, 'textWhite')}>{guests} {guests > 1 ? formatMessage(messages.howManyGuest) : formatMessage(messages.guest)}</p>
          </div>
          <div>
            <p className={s.datesTitle}><FormattedMessage {...messages[interval <= 0 ? 'started' : 'startIn']} /></p>
            <p className={cx(s.datesValueText, 'textWhite')}>{Math.abs(interval)} {formatMessage(messages[(interval < -1 || interval > 1) ? 'howManydays' : 'howManyday']) + (interval <= 0 ? ' ago' : '')} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Summary));