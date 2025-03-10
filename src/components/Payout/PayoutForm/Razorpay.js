import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage, injectIntl } from "react-intl"
import { connect } from "react-redux"
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  getFormSyncErrors,
  submit as submitForm,
  getFormValues,
} from "redux-form"
import cx from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Button from "react-bootstrap/lib/Button"

import Loader from "../../Loader"
import InputFieldComponent from "../../Common/FormField/InputFieldComponent"

import submit from "./submit"
import showToaster from "../../../helpers/showToaster"
import messages from "../../../locale/messages"
import {
  startPayoutLoading,
  stopPayoutLoading,
} from "../../../actions/Payout/addPayoutAction"

import s from "../Payout.css"
import bt from "../../../components/commonStyle.css"

class Razorpay extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    previousPage: PropTypes.any.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.handleSubmitAction = this.handleSubmitAction.bind(this)
  }

  async handleSubmitAction(event) {
    event.preventDefault()
    const { change, submitForm, handleSubmit, razorpay } = this.props
    const { formValues, errors, startPayoutLoading, stopPayoutLoading } =
      this.props

    if (errors && JSON.stringify(errors) !== "{}") {
      // If any error trigger the submit action to show the error messages
      await handleSubmit()
    }

    // if (
    //   (!errors || (errors && JSON.stringify(errors) === "{}")) &&
    //   formValues &&
    //   stripe
    // ) {
    //   await startPayoutLoading()
    //   const generateTokens = await generateStripePayoutToken(stripe, formValues)
    //   if (generateTokens && generateTokens.status === 200) {
    //     accountToken =
    //       generateTokens.result && generateTokens.result.accountToken
    //     personToken =
    //       (generateTokens.result && generateTokens.result.personToken) || null
    //     await change("isTokenGenerated", true)
    //     await change("accountToken", accountToken)
    //     await change("personToken", personToken)

    //     await handleSubmit()
    //   } else {
    //     showToaster({
    //       messageId: "commonError",
    //       toasterType: "error",
    //       requestContent: generateTokens.errorMessage,
    //     })
    //     await stopPayoutLoading()
    //   }
    //   return
    // }
  }

  render() {
    const { handleSubmit, pristine, previousPage, submitting, error } =
      this.props
    const { base, availableCurrencies, siteName, payoutLoading, businessType } =
      this.props
    const { formatMessage } = this.props.intl

    return (
      <div
        className={cx(
          "inputFocusColor",
          "commonListingBg",
          "payoutMethodList",
          "noMarginBottom"
        )}
      >
        <form onSubmit={handleSubmit}>
          <h3 className={bt.listingTitleText}>
            {formatMessage(messages.addPayout)}
          </h3>
          <div className={[s.displayGrid]}>
            <Field
              name="firstname"
              component={InputFieldComponent}
              inputClass={cx(bt.commonControlInput)}
              label={formatMessage(messages.payoutFirstName)}
              placeholder={formatMessage(messages.payoutFirstName)}
            />

            <Field
              name="lastname"
              component={InputFieldComponent}
              inputClass={cx(bt.commonControlInput)}
              label={formatMessage(messages.payoutLastName)}
              placeholder={formatMessage(messages.payoutLastName)}
            />
          </div>

          <Field
            name="accountNumber"
            component={InputFieldComponent}
            inputClass={cx(bt.commonControlInput)}
            label={formatMessage(messages.accountNumber)}
            placeholder={"eg: 000123456789"}
          />

          <Field
            name="confirmAccountNumber"
            component={InputFieldComponent}
            inputClass={cx(bt.commonControlInput)}
            label={formatMessage(messages.confirmAccountNumber)}
            placeholder={"eg: 000123456789"}
          />

          <Field
            name="ifsc"
            component={InputFieldComponent}
            inputClass={cx(bt.commonControlInput)}
            label={formatMessage(messages.ifsc)}
            placeholder={"eg: HDFC0000053"}
          />

          <div className={bt.textAlignRight}>
            <Button
              className={cx(
                bt.btnLarge,
                bt.btnPrimaryBorder,
                s.btnRight,
                s.backBtn,
                "spaceRight2AR"
              )}
              onClick={previousPage}
            >
              <FormattedMessage {...messages.back} />
            </Button>
            <div className={s.displayInline}>
              <Loader
                type={"button"}
                buttonType={"button"}
                className={cx(
                  bt.btnPrimary,
                  bt.btnLarge,
                  s.displayInline,
                  "arButtonLoader"
                )}
                disabled={pristine || submitting || error || payoutLoading}
                show={payoutLoading}
                label={formatMessage(messages.finish)}
                handleClick={this.handleSubmitAction}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Razorpay = reduxForm({
  form: "PayoutForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: submit,
})(Razorpay)

const selector = formValueSelector("PayoutForm")

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  base: state.currency.base,
  payoutLoading: state.reservation.payoutLoading,
  formValues: getFormValues("PayoutForm")(state),
  errors: getFormSyncErrors("PayoutForm")(state),
  userId: state.account.data.userId,
})

const mapDispatch = {
  submitForm,
  change,
  startPayoutLoading,
  stopPayoutLoading,
}

export default injectIntl(
  withStyles(s, bt)(connect(mapState, mapDispatch)(Razorpay))
)
