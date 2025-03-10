import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import renderTooltip from '../../../components/siteadmin/SiteSettingsForm/toolTipHelper.js';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';
import Faq from '/public/SiteIcons/question.svg'

import s from './Payment.css';

class PaymentDetails extends Component {
  static propTypes = {
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    tax: PropTypes.number,
    currency: PropTypes.string.isRequired,
    dayDifference: PropTypes.number.isRequired,
    discount: PropTypes.number,
    discountType: PropTypes.string,
    priceForDays: PropTypes.number.isRequired,
    serviceFees: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    formatMessage: PropTypes.any,
    bookingSpecialPricing: PropTypes.array,
    isSpecialPriceAssigned: PropTypes.bool,
  };

  static defaultProps = {
    bookingSpecialPricing: [],
    isSpecialPriceAssigned: false,
  };


  render() {
    const { cleaningPrice, tax, currency, dayDifference, isAverage } = this.props;
    console.log({ cleaningPrice, tax, currency, dayDifference, isAverage });
    const { priceForDays, serviceFees, discount, discountType, total, isSpecialPriceAssigned } = this.props;
    console.log({ priceForDays, serviceFees, discount, discountType, total, isSpecialPriceAssigned })
    const { formatMessage } = this.props.intl;

    function LinkWithTooltip({ id, children, href, tooltip }) {
      return (
        <OverlayTrigger
          overlay={<Tooltip className={s.tooltip} id={id}>{tooltip}</Tooltip>}
          placement="top"
          delayShow={300}
          delayHide={150}
        >
          {children}
        </OverlayTrigger>
      );
    }

    return (
      <div>
        <h3 className={cx(s.pricingTitle, 'rtlBookText')}><FormattedMessage {...messages.priceDetails} /></h3>
        <div className={cx(s.grid, 'textWhite')}>
          <div className='tooltipFlex'>
            {isSpecialPriceAssigned &&
              <>{renderTooltip(formatMessage(messages.averagePricePerNight), 'commonTooltipIcon')}</>
            }
            <div className={cx(s.specialPriceText, 'directionLtrTextRight')}>
              <CurrencyConverter
                amount={isAverage}
                from={currency}
              />
              {' x'} {dayDifference} {dayDifference > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
            </div>
          </div>

          <div>
            <CurrencyConverter
              amount={priceForDays}
              from={currency}
            />
          </div>
        </div>
        {cleaningPrice > 0 && <div className={cx(s.grid, 'textWhite')}>
          <div><FormattedMessage {...messages.cleaningFee} /></div>
          <div>
            <CurrencyConverter
              amount={cleaningPrice}
              from={currency}
            />
          </div>
        </div>
        }
        {serviceFees > 0 && <div className={cx(s.grid, 'textWhite')}>
          <div><FormattedMessage {...messages.serviceFee} /></div>
          <div>
            <CurrencyConverter
              amount={serviceFees}
              from={currency}
            />
          </div>
        </div>
        }
        {tax > 0 && <div className={cx(s.grid, 'textWhite')}>
          <div><FormattedMessage {...messages.tax} /></div>
          <div>
            <CurrencyConverter
              amount={tax}
              from={currency}
            />
          </div>
        </div>
        }
        {discount > 0 && <div className={cx(s.grid, 'textWhite', s.discountText)}>
          <div>{discountType}</div>
          <div>
            -  <CurrencyConverter
              amount={discount}
              from={currency}
            />
          </div>
        </div>
        }

        <div className={cx(s.grid, s.totalValue, 'textWhite')}>
          <div><FormattedMessage {...messages.total} /></div>
          <div> <CurrencyConverter
            amount={total}
            from={currency}
          /></div>
        </div>
      </div>
    );
  }
}



const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = (state) => ({
  dayDifference: selector(state, 'dayDifference'),
  priceForDays: selector(state, 'priceForDays'),
  discount: selector(state, 'discount'),
  discountType: selector(state, 'discountType'),
  tax: selector(state, 'taxPrice'),
  serviceFees: selector(state, 'guestServiceFee'),
  total: selector(state, 'totalValue'),
  isSpecialPriceAssigned: selector(state, 'isSpecialPriceAssigned'),
  isAverage: selector(state, 'isSpecialPriceAverage')
});

const mapDispatch = {
};


export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentDetails)));

//Surajsinh