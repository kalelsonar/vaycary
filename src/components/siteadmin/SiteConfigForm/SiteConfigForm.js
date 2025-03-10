import React, { Component } from "react"
import PropTypes from "prop-types"
import { FormattedMessage, injectIntl } from "react-intl"
import { connect } from "react-redux"

import Field from "redux-form/lib/Field"
import reduxForm from "redux-form/lib/reduxForm"
import formValueSelector from "redux-form/lib/formValueSelector"

import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import FormGroup from "react-bootstrap/lib/FormGroup"
import Button from "react-bootstrap/lib/Button"
import FormControl from "react-bootstrap/lib/FormControl"

import cx from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import submit from "./submit"
import validate from "./validate"

import messages from "../../../locale/messages"

import bt from "../../../components/commonStyle.css"
import s from "./SiteConfigForm.css"
import InputFieldComponent from "../../Common/FormField/InputFieldComponent"
class SiteConfigForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { error, handleSubmit, submitting } = this.props
    const { formatMessage } = this.props.intl
    return (
      <div className={cx(s.pagecontentWrapper, "pagecontentAR")}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className={s.headerTitle}>
              <FormattedMessage {...messages.manageSiteConfig} />
            </h1>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{error}</strong>}
              <div className={s.girdOne}>
                <Field
                  name="fcmPushNotificationKey"
                  component={InputFieldComponent}
                  label={formatMessage(messages.fcmPushNotificationKey)}
                  componentClass={"textarea"}
                />
                <Field
                  name="deepLinkBundleId"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.deepLinkBundleId)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="maxUploadSize"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.maxUploadLabel)}
                  inputClass={bt.commonControlInput}
                />
              </div>

              <div className={s.girdTwo}>
                <Field
                  name="smtpHost"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.smtpHost)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="smtpPort"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.smtpPort)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="smptEmail"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.smptEmail)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="smtpSender"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.smtpSender)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="smtpSenderEmail"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.smtpSenderEmail)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="smtpPassWord"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.smtpPassWord)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="twillioAccountSid"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.twillioAccountSid)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="twillioAuthToken"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.twillioAuthToken)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="twillioPhone"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.twillioPhone)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="paypalClientId"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.paypalClientId)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="paypalSecret"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.paypalSecret)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="paypalHost"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.paypalHost)}
                  inputClass={bt.commonControlInput}
                />
              </div>

              <div className={s.girdOne}>
                <Field
                  name="googleClientId"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.googleClientId)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  name="googleSecretId"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.googleSecretId)}
                  inputClass={bt.commonControlInput}
                />
                <Field
                  inputClass={s.textArea}
                  name="deepLinkContent"
                  component={InputFieldComponent}
                  componentClass={"textarea"}
                  label={formatMessage(messages.deepLinkContent)}
                />
              </div>

              <div
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={cx(bt.textAlignRight, "textAlignLeftRtl")}
              >
                <Button
                  className={cx(bt.btnPrimary, bt.btnLarge)}
                  type="submit"
                  disabled={submitting}
                >
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

SiteConfigForm = reduxForm({
  form: "SiteConfigForm", // a unique name for this form
  validate,
})(SiteConfigForm)

const selector = formValueSelector("SiteConfigForm")

const mapState = (state) => ({
  homePageType: selector(state, "homePageType"),
  appAvailableStatus: selector(state, "appAvailableStatus"),
})

const mapDispatch = {}

export default injectIntl(
  withStyles(s, bt)(connect(mapState, mapDispatch)(SiteConfigForm))
)
