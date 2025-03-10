import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import submit from './submit';
import validate from './validate';
import messages from '../../../locale/messages';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';

import s from './ServiceFeesForm.css';
import bt from '../../../components/commonStyle.css';

class ServiceFeesForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired
    })).isRequired
  };


  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { base, availableCurrencies } = this.props;

    let currenciesValue = [
      { value: '', label: formatMessage(messages.chooseCurrency) }
    ]

    availableCurrencies?.length > 0 && availableCurrencies.map((currency, key) => {
      if (currency.isEnable === true) {
        currenciesValue.push({
          value: currency.symbol,
          label: currency.symbol
        })
      }
    })
    return (
      <div className={cx(s.pagecontentWrapper, 'adminRadioBtn', 'pagecontentAR')}>
        <Grid fluid>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.servicefeesSettings} /></h1>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
              <Panel className={cx(s.panelHeader, 'bgBlack')}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <FormGroup className={bt.space3}>
                    <label className={s.labelTextNew}><FormattedMessage {...messages.guestFeeType} /></label>
                    <div>
                      <label className={cx(s.labelTextNew, s.btnUPdate, bt.curderPointer, 'curderPointerRTL')}>{' '}<Field name="guestType" component="input" type="radio" value="fixed" /> <span className={s.radioBtn}><FormattedMessage {...messages.fixedPrice} /></span> </label>
                      <label className={cx(s.labelTextNew, s.btnModalDelete, bt.curderPointer, 'adminDelete')}><Field name="guestType" component="input" type="radio" value="percentage" /> <span className={s.radioBtn}><FormattedMessage {...messages.percentage} /></span> </label>
                    </div>
                  </FormGroup>
                  <Field name="guestValue"
                    type="text"
                    component={InputFieldComponent} label={formatMessage(messages.guestServiceFee)}
                    placeholder={formatMessage(messages.guestServiceFeePlacehold)}
                    inputClass={bt.commonControlInput}
                  />
                  <FormGroup className={bt.space3}>
                    <label className={s.labelTextNew}><FormattedMessage {...messages.hostFeeType} /></label>
                    <div>
                      <label className={cx(s.labelTextNew, s.btnUPdate, bt.curderPointer, 'curderPointerRTL')}><Field name="hostType" component="input" type="radio" value="fixed" /> <span className={s.radioBtn}><FormattedMessage {...messages.fixedPrice} /> </span></label>
                      <label className={cx(s.labelTextNew, s.btnModalDelete, bt.curderPointer, 'adminDelete')}><Field name="hostType" component="input" type="radio" value="percentage" /> <span className={s.radioBtn}><FormattedMessage {...messages.percentage} /></span> </label>
                    </div>
                  </FormGroup>
                  <Field name="hostValue"
                    type="text"
                    component={InputFieldComponent}
                    label={formatMessage(messages.hostServiceFeeType)}
                    placeholder={formatMessage(messages.guestServiceFeePlacehold)}
                    inputClass={bt.commonControlInput}
                  />
                  <div className={bt.space3}>
                    <Field name="currency"
                      type='text'
                      inputClass={cx(bt.commonControlSelect)}
                      component={SelectFieldComponent}
                      label={formatMessage(messages.currency)}
                      options={currenciesValue}
                    />
                  </div>
                  <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                      <FormattedMessage {...messages.save} />
                    </Button>
                  </div>
                </form>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

ServiceFeesForm = reduxForm({
  form: 'ServiceFeesForm', // a unique name for this form
  validate
})(ServiceFeesForm);

const mapState = (state) => ({
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ServiceFeesForm)));