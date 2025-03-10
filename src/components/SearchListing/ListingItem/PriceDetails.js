import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import CurrencyConverter from '../../CurrencyConverter/CurrencyConverter';

import messages from '../../../locale/messages';

import c from '../../SearchListing/ListingItem/ListingItem.css';
import s from '../../ViewListing/Calendar/Calendar.css';
class PriceDetails extends Component {
  render() {
    const { calculatedValues } = this.props;
    return (
      <div className={'priceDetailsTable'}>
        <table className={cx('table')}>
          <tbody>
            <tr className={s.positionR}>
              <td className={cx(s.noBorder, c.paddingTop, 'textWhite')}>
                <div className={cx(s.specialPriceText, 'directionLtr')}>
                  <CurrencyConverter amount={calculatedValues?.isAverage} from={calculatedValues?.currency} />
                  {' x'} {calculatedValues?.dayDifference} {calculatedValues?.dayDifference > 1 ? <FormattedMessage {...messages.nights} /> : <FormattedMessage {...messages.night} />}
                </div>
              </td>
              <td className={cx(s.noBorder, 'text-right', 'textAlignLeftRtl', c.paddingTop, 'textWhite')}>
                <CurrencyConverter amount={calculatedValues?.isDayTotal} from={calculatedValues?.currency} />
              </td>
            </tr>
            {calculatedValues?.discount > 0 && (
              <tr>
                <td className={cx(s.noBorder, 'textWhite')}><FormattedMessage {...messages.discount} /></td>
                <td className={cx('text-right', s.discountText, s.noBorder, 'textAlignLeftRtl', 'textWhite')}>
                  <span>- </span>
                  <CurrencyConverter amount={calculatedValues?.discount} from={calculatedValues?.currency} />
                </td>
              </tr>
            )}
            {calculatedValues?.cleaningPrice > 0 && (
              <tr>
                <td className={cx(s.noBorder, 'textWhite')}><FormattedMessage {...messages.cleaningFee} /></td>
                <td className={cx('text-right', s.noBorder, 'textAlignLeftRtl', 'textWhite')}>
                  <CurrencyConverter amount={calculatedValues?.cleaningPrice} from={calculatedValues?.currency} />
                </td>
              </tr>
            )}
            {calculatedValues?.serviceFee > 0 && (
              <tr>
                <td className={cx(s.noBorder, 'textWhite')}><FormattedMessage {...messages.serviceFee} /></td>
                <td className={cx('text-right', s.noBorder, 'textAlignLeftRtl', 'textWhite')}>
                  <CurrencyConverter amount={calculatedValues?.serviceFee} from={calculatedValues?.currency} />
                </td>
              </tr>
            )}
            <tr>
              <td className={cx(c.totalText, 'textWhite')}><FormattedMessage {...messages.totalPriceModal} /></td>
              <td className={cx('text-right', c.totalText, 'textAlignLeftRtl', 'textWhite')}>
                <CurrencyConverter amount={calculatedValues?.oneTotalPrice} from={calculatedValues?.currency} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = (state) => ({
  totalpriceModal: state.modalStatus.isTotalPriceModal
});

export default withStyles(s, c)(connect(mapState)(PriceDetails));