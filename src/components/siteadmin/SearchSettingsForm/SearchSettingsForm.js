import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';

import submit from './submit';
import validate from './validate';
import messages from '../../../locale/messages';

import s from './SearchSettingsForm.css';
import bt from '../../../components/commonStyle.css';

class SearchSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  UNSAFE_componentWillMount() {
    const { initialize, initialValues } = this.props;
    if (initialValues != undefined) {
      initialize(initialValues);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { base, availableCurrencies } = this.props;

    let currencyValue = [];

    availableCurrencies?.length > 0 && availableCurrencies.map((currency, key) => {
      if (currency.isEnable === true) {
        currencyValue.push({
          value: currency.symbol,
          label: currency.symbol
        })
      }
    })

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <h1 className={s.headerTitle}> <FormattedMessage {...messages.searchSettings} /></h1>
        <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
          <Panel className={cx(s.panelHeader, 'bgBlack')}>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <Field name="minPrice" type="text" component={InputFieldComponent} label={formatMessage(messages.minimumPrice)} inputClass={bt.commonControlInput} />
              <Field name="maxPrice" type="text" component={InputFieldComponent} label={formatMessage(messages.maximumPrice)} inputClass={bt.commonControlInput} />
              <div className={bt.space3}>
                <Field name="priceRangeCurrency"
                  component={SelectFieldComponent}
                  label={formatMessage(messages.priceRangeCurrency)}
                  inputClass={cx(bt.commonControlSelect)}
                  options={currencyValue}
                />
              </div>
              <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                <Button bsSize="small" className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
            </form>
          </Panel>
        </Col>
      </div>
    );
  }

}

SearchSettingsForm = reduxForm({
  form: 'SearchSettingsForm', // a unique name for this form
  validate
})(SearchSettingsForm);

const mapState = (state) => ({
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SearchSettingsForm)));