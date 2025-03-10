import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';

import validate from './validate';
import submit from './submit';
import messages from '../../../locale/messages';
import Loader from '../../Loader/Loader';

import s from '../Payout.css';
import bt from '../../../components/commonStyle.css';

import logourl from '/public/PaymentGateway/paypal.svg';

class Paypal extends Component {
    static propTypes = {
        handleSubmit: PropTypes.any.isRequired,
        previousPage: PropTypes.any.isRequired,
        siteName: PropTypes.string.isRequired,
        formatMessage: PropTypes.any,
    };


    render() {
        const { handleSubmit, pristine, previousPage, submitting, payoutLoading } = this.props;
        const { base, availableCurrencies, siteName } = this.props;
        const { formatMessage } = this.props.intl;

        let currenciesValue = [
            { value: '', label: formatMessage(messages.chooseCurrency) }
        ]

        availableCurrencies.length > 0 && availableCurrencies.map((currency, key) => {
            if (currency.isEnable === true) {
                currenciesValue.push({
                    value: currency.symbol,
                    label: currency.symbol
                })
            }
        })

        return (
            <div className={cx('inputFocusColor', 'commonListingBg', 'noMarginBottom')}>
                <form onSubmit={handleSubmit(submit)}>
                    <h3 className={bt.listingTitleText}>{formatMessage(messages.addPayout)}</h3>
                    <img src={logourl} />
                    <p className={cx(s.infoBox, bt.spaceTop2, bt.space2)}>
                        <FormattedMessage {...messages.paypalIntro1} /> {siteName}.
                        <FormattedMessage {...messages.paypalIntro2} /> {siteName}, <FormattedMessage {...messages.paypalIntro3} />
                        {' '}<a href={"https://www.paypal.com/"} target="_blank" className={s.stripeLink}><FormattedMessage {...messages.paypalIntro4} /></a>
                    </p>
                    <Field name="payEmail"
                        component={InputFieldComponent}
                        inputClass={cx(bt.commonControlInput)}
                        label={formatMessage(messages.paypalEmail)}
                    />
                    <Field name="currency"
                        label={formatMessage(messages.paypalCurrency)}
                        component={SelectFieldComponent}
                        inputClass={cx(bt.commonControlSelect, 'commonControlSelectRtl')}
                        options={currenciesValue}
                    />
                    <div className={cx(bt.textAlignRight, bt.displayFlex, bt.justifyContentFlexEnd)}>
                        <Button className={cx(bt.btnLarge, bt.btnPrimaryBorder, s.btnRight, s.backBtn, 'spaceRight2AR')} onClick={previousPage}>
                            <FormattedMessage {...messages.back} />
                        </Button>
                        <Loader
                            type={"button"}
                            buttonType={"submit"}
                            className={cx(s.button, bt.btnPrimary, bt.btnLarge, 'arButtonLoader')}
                            disabled={pristine || submitting || payoutLoading}
                            show={pristine || submitting || payoutLoading}
                            label={formatMessage(messages.finish)}
                        ></Loader>
                    </div>
                </form >
            </div >
        );
    }
}

Paypal = reduxForm({
    form: 'PayoutForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(Paypal);

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    availableCurrencies: state?.currency?.availableCurrencies?.results,
    payoutLoading: state.reservation.payoutLoading,
    base: state.currency.base,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Paypal)));