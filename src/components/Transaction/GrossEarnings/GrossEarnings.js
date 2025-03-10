import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NoTransaction from '../NoTransaction';
import GrossEarningItem from './GrossEarningItem';
import Link from '../../Link';
import CommonTable from '../../CommonTable/CommonTable';
import CurrencyConverter from '../../CurrencyConverter/CurrencyConverter';

import messages from '../../../locale/messages';

import s from '../Transaction.css';

class GrossEarnings extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      guestData: PropTypes.shape({
        firstName: PropTypes.string.isRequired
      }),
      hostTransaction: PropTypes.shape({
        payoutId: PropTypes.number,
        payEmail: PropTypes.string,
        amount: PropTypes.number,
        currency: PropTypes.string,
        createdAt: PropTypes.string
      })
    }))
  };

  static defaultProps = {
    data: []
  };

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.transferDate) },
      { data: formatMessage(messages.transferType) },
      { data: formatMessage(messages.details) },
      { data: formatMessage(messages.grossEarnings) }
    ]
  };

  tbody = (props) => {
    const { data } = props;
    let date, checkInDate, checkOutDate, totalAmount, payoutAmount, currency;

    return data?.map((item, index) => {
      date = item?.hostTransaction != null ? moment(item?.hostTransaction?.createdAt).format('MM-DD-YYYY') : <FormattedMessage {...messages.messageStatus5} />;
      checkInDate = item?.checkIn != null ? moment(item?.checkIn).format('MMM DD, YYYY') : '';
      checkOutDate = item?.checkOut != null ? moment(item?.checkOut).format('MMM DD, YYYY') : '';
      totalAmount = Number(item?.total) - Number(item?.hostServiceFee);
      currency = item?.currency;
      payoutAmount = item?.cancellationDetails;
      if (payoutAmount) {
        totalAmount = payoutAmount?.payoutToHost || 0;
        currency = payoutAmount?.currency;
      }

      return {
        id: index,
        data: [
          {
            data: <div className={cx('textAlignRightRtl')}>{totalAmount > 0 ? date : <FormattedMessage {...messages.closedLabel} />}</div>
          },
          {
            data: <FormattedMessage {...messages.reservation} />
          },
          {
            data: <ul className={cx(s.listLayout, 'listLayoutRTL')}>
              <li>{checkInDate} - {checkOutDate}</li>
              <li>{item?.listData && <Link to={"/users/trips/receipt/" + item?.id} className={s.linkText}>{item?.confirmationCode}</Link>}</li>
              <li>{!item?.listData && <span>{item?.confirmationCode}</span>}</li>
            </ul>
          },
          {
            data: <CurrencyConverter
              amount={totalAmount > 0 ? totalAmount : 0}
              from={currency}
            />
          }
        ]
      }
    })
  }

  render() {
    const { data, totalCount } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        {
          data && data?.length === 0 ? <div className={s.spaceMargin}>
            <NoTransaction type={'earningsNoTransaction'} totalCount={totalCount} noText={formatMessage(messages.noTransactionGross)} />
          </div> :
            <div>
              {
                data?.length > 0 &&
                <CommonTable
                  thead={this.thead}
                  tbody={() => this.tbody(this.props)}
                  isLink
                />
              }
            </div>
        }
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(GrossEarnings));
