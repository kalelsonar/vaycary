import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from "redux-form";
import { connect } from "react-redux";

import PriceRange from "../../../PriceRange";
import CurrencyConverter from "../../../../CurrencyConverter";

import messages from "../../../../../locale/messages";
import submit from "../../../SearchForm/submit";

import s from "./Price.css";

class Price extends Component {
  static propTypes = {
    className: PropTypes.any,
    searchSettings: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      priceRangeCurrency: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    isExpand: false,
    searchSettings: {
      priceRangeCurrency: "USD",
    },
  };

  constructor(props) {
    super(props);
  }

  renderPriceRange = ({
    input,
    label,
    meta: { touched, error },
    className,
    min,
    max,
    rangeCurrency,
    minPrice,
    maxPrice,
  }) => {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, change } = this.props;
    return (
      <div className={cx(s.space5, s.priceRangePadding)}>
        <PriceRange
          {...input}
          min={min}
          max={max}
          minPrice={minPrice}
          maxPrice={maxPrice}
          from={rangeCurrency}
        />
      </div>
    );
  };

  render() {
    const {
      className,
      handleTabToggle,
      isExpand,
      searchSettings,
      smallDevice,
      tabletDevice,
    } = this.props;
    const { priceRangeLabel, priceRange } = this.props;
    const { formatMessage } = this.props.intl;

    let minPrice, maxPrice, rangeCurrency, minPriceRange, maxPriceRange;
    minPrice = searchSettings?.minPrice;
    maxPrice = searchSettings?.maxPrice;
    rangeCurrency = searchSettings?.priceRangeCurrency;
    minPriceRange =
      priceRangeLabel != undefined ? priceRangeLabel[0] : minPrice;
    maxPriceRange =
      priceRangeLabel != undefined ? priceRangeLabel[1] : maxPrice;

    return (
      <div className={className}>
        <div>
          <p className={cx(s.moreFilterTitle, s.textBold)}>
            <FormattedMessage {...messages.priceRange} />
          </p>
          <p className={cx(s.captionTitle, s.marginBottomNone)}>
            <FormattedMessage {...messages.priceTextForTotalPrice} />
          </p>
        </div>

        {smallDevice || tabletDevice ? (
          <div className={cx(s.captionTitle, "priceBoxRTL", s.captionCurrenySection)}>
            <CurrencyConverter amount={minPriceRange} from={rangeCurrency} />
            <span>{" - "}</span>
            <CurrencyConverter amount={maxPriceRange} from={rangeCurrency} />
          </div>
        ) : (
          <div className={cx(s.captionTitle, s.space4, "priceBoxRTL", s.captionCurrenySection)}>
            <span className={s.boxCss}>
              <div className={cx(s.minMaxCss, "textWhite", "rtlminMaxCss")}>
                <FormattedMessage {...messages.minPrice} />
              </div>
              <CurrencyConverter
                amount={minPriceRange}
                from={rangeCurrency}
                className={cx(s.showPrice, "showPriceRTL")}
              />
            </span>
            <span className={cx(s.lineCss, 'priceRangeLineDarkMode')}></span>
            <span className={s.boxCss}>
              <div className={cx(s.minMaxCss, "textWhite", "rtlminMaxCss")}>
                <FormattedMessage {...messages.maxPrice} />
              </div>
              <CurrencyConverter
                amount={maxPriceRange}
                from={rangeCurrency}
                className={cx(s.showPrice, "showPriceRTL")}
              />
            </span>
          </div>
        )}
        <Field
          name="priceRange"
          component={this.renderPriceRange}
          min={minPrice}
          max={maxPrice}
          minPrice={minPriceRange}
          maxPrice={maxPriceRange}
          rangeCurrency={rangeCurrency}
        />
      </div>
    );
  }
}

Price = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Price);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state?.listingFields?.data,
  priceRangeLabel: selector(state, "priceRangeLabel"),
  priceRange: selector(state, "priceRange"),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Price)));
