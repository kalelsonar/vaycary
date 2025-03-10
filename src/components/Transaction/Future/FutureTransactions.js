import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import NoTransaction from '../NoTransaction';
import FutureTransactionItem from './FutureTransactionItem';
import CommonTable from '../../CommonTable/CommonTable';
import Payouts from '../Payouts';
import CurrencyConverter from '../../CurrencyConverter/CurrencyConverter';
import Link from '../../Link/Link';

import messages from '../../../locale/messages';

import bt from '../../../components/commonStyle.css';
import s from '../Transaction.css';

class FutureTransactions extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.arrayOf(PropTypes.shape({
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      payoutId: PropTypes.number,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired
      }),
      guestData: PropTypes.shape({
        firstName: PropTypes.string.isRequired
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
      { data: formatMessage(messages.payTo) },
      { data: formatMessage(messages.transferAmount) },
    ]
  };

  tbody = (props) => {
    const { data } = props;

    let date, checkInDate, checkOutDate, totalAmount, payoutAmount, currency;

    return data?.map((item, index) => {
      const { formatMessage } = this.props.intl;
      date = item?.checkOut != null ? moment(item?.checkOut).add(1, 'days').format('MM-DD-YYYY') : 'Pending';
      checkInDate = item?.checkIn != null ? moment(item?.checkIn).format('MMM DD, YYYY') : '';
      checkOutDate = item?.checkOut != null ? moment(item?.checkOut).format('MMM DD, YYYY') : '';
      totalAmount = Number(item?.total) - Number(item?.hostServiceFee);
      payoutAmount = item?.cancellationDetails;
      currency = item?.currency;
      if (payoutAmount) {
        totalAmount = payoutAmount?.payoutToHost || 0;
        currency = payoutAmount?.currency;
      }

      return {
        id: index,
        data: [
          {
            data: <div className={cx('dateMinWidth', 'textAlignRightRtl')}>{date}</div>
          },
          {
            data: <FormattedMessage {...messages.reservation} />
          },
          {
            data: <ul className={cx(s.listLayout, 'listLayoutRTL')}>
              <li>
                {item?.guestData ? item?.guestData?.firstName : ''}
              </li>
              <li className={s.linkText}>
                {item?.listData ? <Link to={"/rooms/" + item?.listData?.id} className={s.linkText}>{item?.listTitle ? item?.listTitle : (item?.listData ? item?.listData?.title : "")}</Link> : ''}
              </li>
              <li>
                {checkInDate} - {checkOutDate}
              </li>
              <li>
                {!item?.listData && <span>{item?.confirmationCode}</span>}
              </li>
              <li>
                {item?.listData && <Link to={"/users/trips/receipt/" + item?.id} className={s.linkText}>{item?.confirmationCode}</Link>}
              </li>
            </ul>
          },
          {
            data: <Payouts
              reservationId={item?.id}
              type={"change"}
              defaultLabel={formatMessage(messages.default)}
              enableAddPayout
              defaultValue={item?.payoutId}
              className={cx(s.formWidth, s.futureSelect, bt.commonControlSelect, 'commonControlSelectPayoutRTL')}
            />
          },
          {
            data: <CurrencyConverter
              amount={totalAmount}
              from={currency}
              className={s.currencyColor}
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
          (data && data?.length === 0 || totalCount === 0) ? <div className={s.spaceMargin}>
            <NoTransaction type={'noTransactions'} totalCount={totalCount} noText={formatMessage(messages.noTransactionFuture)} />
          </div> :
            <div className={cx('table', s.noBorder, s.noMarginBottom)}>
              <CommonTable
                thead={this.thead}
                tbody={() => this.tbody(this.props)}
              />
            </div>
        }
      </div>
    );
  }
}

export default injectIntl(withStyles(s, bt)(FutureTransactions));
