import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

// Component
import updateStep3 from './updateStep3';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../Common/FormField/SelectFieldComponent';

import messages from '../../locale/messages';
import validateStep3 from './validateStep3';

//Image
import toolTipIcon from '/public/SiteIcons/listCommonToolTip.svg';

import bt from '../../components/commonStyle.css';
import s from './ListPlaceStep1.css';
class Pricing extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  UNSAFE_componentWillMount() {
    const { valid } = this.props;
    this.setState({ isDisabled: valid ? false : true })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid } = nextProps;
    this.setState({ isDisabled: valid ? false : true })
  }

  renderFormControlTax = ({ input, label, type, meta: { touched, error }, className, prefixLabel }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <InputGroup>
          <FormControl {...input} placeholder={label} type={type} className={className} maxLength={12} />
          <InputGroup.Addon className={s.prefixIcon}>{prefixLabel}</InputGroup.Addon>
        </InputGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  render() {
    const { handleSubmit, nextPage, previousPage, formPage, step, availableCurrencies } = this.props;
    const { isDisabled } = this.state;
    const { formatMessage } = this.props.intl;

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
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepThreeCommonHeading)}
          landingContent={formatMessage(messages.tabPricing)}
        />
        <form onSubmit={handleSubmit}>
          <div className={cx(s.landingMainContent, 'disCountAddon')}>
            <FormGroup className={s.formGroup}>
              <Field name="currency"
                label={formatMessage(messages.currency)}
                labelClass={cx(s.landingLabel, 'textWhite')}
                component={SelectFieldComponent}
                inputClass={cx(s.formControlSelect, s.jumboSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                options={currencyValue}
              />

            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.space4, s.spaceTop4)}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.basePrice} />
              </ControlLabel>
              <Field
                name="basePrice"
                type="text"
                component={InputFieldComponent}
                placeholder={formatMessage(messages.basePriceLabel)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
              />
            </FormGroup>
            <div className={s.tipCommonCss}>
              <img src={toolTipIcon} />
              <span className={cx(s.commonTipCsss, 'textWhite')}><FormattedMessage {...messages.basePriceTip} /></span>
            </div>
            <FormGroup className={cx(s.formGroup, s.space4)}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.cleaningPrice} />
              </ControlLabel>
              <Field
                name="cleaningPrice"
                type="text"
                component={InputFieldComponent}
                placeholder={formatMessage(messages.cleaningPrice)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
              />
            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.space4)}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.tax} />
              </ControlLabel>
              <Field
                name="tax"
                type="text"
                component={InputFieldComponent}
                placeholder={formatMessage(messages.tax)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                prefixLabel={'%'}
                isAddon={true}
              />
            </FormGroup>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"discount"}
            previousPagePath={"advance-notice"}
            formPage={formPage}
            step={step}
            isDisabled={isDisabled}
          />
        </form>
      </div>
    );
  }
}

Pricing = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
  // onSubmit: updateStep4

})(Pricing);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  base: state.currency.base,
  mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Pricing)));