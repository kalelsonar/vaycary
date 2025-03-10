import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import bt from '../../../components/commonStyle.css';

import CountryList from '../../CountryList';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

import validate from './validate';
import messages from '../../../locale/messages';

class PayoutBillingDetails extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };


  renderCountryList = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={bt.space3}>
        <label className={cx(bt.commonLabelText, 'textWhite', 'responsiveTextAlignRtl')}>{label}</label>
        <CountryList input={input} className={cx(className)} isEmptyFirst />
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', 'commonListingBg', 'noMarginBottom')}>
        <form onSubmit={handleSubmit}>
          <h3 className={s.titleText}>{formatMessage(messages.addPayout)}</h3>
          <Field name="country" component={this.renderCountryList} className={cx(bt.commonControlSelect, 'commonControlSelectRtl')} label={formatMessage(messages.country)} />
          <Field name="address1"
            component={InputFieldComponent}
            label={formatMessage(messages.address1)}
            inputClass={cx(bt.commonControlInput)}
          />
          <Field name="address2"
            component={InputFieldComponent}
            label={formatMessage(messages.address2)}
            inputClass={cx(bt.commonControlInput)}
          />
          <div className={s.displayGrid}>
            <Field name="city"
              component={InputFieldComponent}
              label={formatMessage(messages.city)}
              className={s.childOne}
              inputClass={cx(bt.commonControlInput)}

            />
            <Field name="state"
              component={InputFieldComponent}
              label={formatMessage(messages.state)}
              className={s.childOne}
              inputClass={cx(bt.commonControlInput)}
            />
          </div>
          <Field name="zipcode"
            component={InputFieldComponent}
            label={formatMessage(messages.zipCode)}
            inputClass={cx(bt.commonControlInput)}
          />
          <div className={bt.textAlignRight}>
            <Button
              className={cx(bt.btnLarge, bt.btnPrimary)}
              type="submit"
            ><FormattedMessage {...messages.next} />
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

PayoutBillingDetails = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(PayoutBillingDetails);

export default injectIntl(withStyles(s, bt)(PayoutBillingDetails));