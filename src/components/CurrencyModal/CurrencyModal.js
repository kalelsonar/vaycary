import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import { choseToCurrency } from '../../actions/getCurrencyRates';
import { showCurrencySymbol } from '../../helpers/currencyConvertion';
import { closeHeaderModal } from '../../actions/modalActions';
import s from './CurrencyModal.css';

class CurrencyModal extends React.Component {

  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool
    })).isRequired,
    baseCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string,
    choseToCurrency: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(value) {
    const { choseToCurrency, closeHeaderModal } = this.props;
    await choseToCurrency(value);
    await closeHeaderModal('languageModal');
  }

  render() {
    const { currencies, baseCurrency, toCurrency, currentLocale, closeHeaderModal } = this.props;
    console.log(currencies, 'currenciescurrenciescurrencies')
    let targetCurrency;
    if (toCurrency) {
      targetCurrency = toCurrency;
    } else {
      targetCurrency = baseCurrency;
    }
    let currencyList = currencies?.filter(o => o?.symbol !== targetCurrency && o?.isEnable == 1) || [];

    return (
      <div>
        <div onClick={() => closeHeaderModal('languageModal')} className={cx(s.mainSection)}>
          <div className={cx(s.activeItem, s.activeSection)}>
            {showCurrencySymbol(targetCurrency, currentLocale) + targetCurrency}
          </div>
        </div>
        {
          currencyList && currencyList?.length > 0 && currencyList?.map((item, index) => {
            return (
              <div key={index} onClick={() => this.handleChange(item?.symbol)} className={cx(s.mainSection)}>
                <div className={cx(s.activeItem)}>
                  {showCurrencySymbol(item?.symbol, currentLocale) + item?.symbol}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  currencies: state?.currency?.availableCurrencies?.results,
  baseCurrency: state?.currency?.base,
  toCurrency: state?.currency?.to,
  currentLocale: state.intl.locale
});

const mapDispatch = {
  choseToCurrency,
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(CurrencyModal));
