import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import formValueSelector from 'redux-form/lib/formValueSelector';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Uploader from './Uploader';
import HomeUploader from './HomeUploader';
import EmailLogoUploader from './EmailLogoUploader';
import FavIconUploader from './FavIconUploader';
import OgImageUploader from './OgImageUploader/OgImageUploader';

import submit from './submit';
import validate from './validate';

import messages from '../../../locale/messages';
import renderTooltip from './toolTipHelper';

import bt from '../../../components/commonStyle.css';
import s from './SiteSettingsForm.css';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';
class SiteSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      homePageType: null,
    }
  }

  UNSAFE_componentWillMount() {
    const { homePageType } = this.props;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  componentDidMount() {
    const { homePageType } = this.props;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { homePageType } = nextProps;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  render() {
    const { error, handleSubmit, submitting, appAvailableStatus, appForceUpdate, ogImage } = this.props;
    const { formatMessage } = this.props.intl;

    const homeTypeValue = [
      { value: 1, label: formatMessage(messages.homePageLayoutDesc) },
      { value: 2, label: formatMessage(messages.homePageLayoutDesc1) },
      { value: 3, label: formatMessage(messages.homePageLayoutDesc2) },
      { value: 4, label: formatMessage(messages.homePageLayoutDesc3) },
      { value: 5, label: formatMessage(messages.homePageLayoutDesc5) },
    ]

    const phoneNumberStatusValue = [
      { value: 1, label: formatMessage(messages.twilioSMS) },
      { value: 2, label: formatMessage(messages.normalPhoneNumber) }
    ]

    const listingApprovalValue = [
      { value: "0", label: formatMessage(messages.optional) },
      { value: "1", label: formatMessage(messages.require) }
    ]

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.siteSettings} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space4}>
                    <FormGroup className={s.formGroup}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.logoLabel} /></label>
                      <Uploader />
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space4}>
                    <FormGroup className={s.formGroup}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.homeLogoLabel} /></label>
                      <HomeUploader />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className='siteSettingFormRow'>
                  <Col xs={12} sm={12} md={6} lg={4} className={s.space4}>
                    <label className={s.labelTextNew} ><FormattedMessage {...messages.emailLogoLabel} /></label>
                    <EmailLogoUploader />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={4} className={s.space4}>
                    <label className={s.labelTextNew} ><FormattedMessage {...messages.favIconLogoLabel} /></label>
                    <FavIconUploader />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={4} className={s.space4}>
                    <label className={cx(s.labelTextNew, 'tooltipLabelContainer', 'svgImg')} ><FormattedMessage {...messages.ogImageLabel} /> <>{renderTooltip(formatMessage(messages.ogToolTip), "siteAdminToolTipIcon")}</></label>
                    <OgImageUploader image={ogImage} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                    <Field name="siteName" type="text" component={InputFieldComponent} label={formatMessage(messages.siteName)} inputClass={bt.commonControlInput} />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                    <Field name="siteTitle" type="text" component={InputFieldComponent} label={formatMessage(messages.siteTitle)} inputClass={bt.commonControlInput} />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                      <Field name="metaKeyword" type="text" component={InputFieldComponent} componentClass={'textarea'} label={formatMessage(messages.metaKeywordLabel)} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                      <Field name="metaDescription" type="text" component={InputFieldComponent} componentClass={'textarea'} label={formatMessage(messages.metaKeywordLabelDesc)} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field name="facebookLink" type="text" component={InputFieldComponent} label={formatMessage(messages.facebookURL)} inputClass={bt.commonControlInput} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field name="twitterLink" type="text" component={InputFieldComponent} label={formatMessage(messages.twitterURL)} inputClass={bt.commonControlInput} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field name="instagramLink" type="text" component={InputFieldComponent} label={formatMessage(messages.instagramURL)} inputClass={bt.commonControlInput} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field
                        name="homePageType"
                        type="text"
                        inputClass={cx(bt.commonControlSelect)}
                        component={SelectFieldComponent}
                        label={formatMessage(messages.homePageLayout)}
                        options={homeTypeValue}
                      />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field
                        name="phoneNumberStatus"
                        type="text"
                        inputClass={cx(bt.commonControlSelect)}
                        component={SelectFieldComponent}
                        label={formatMessage(messages.phoneNumberFormat)}
                        options={phoneNumberStatusValue}
                      />
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field
                        name="listingApproval"
                        type='text'
                        inputClass={cx(bt.commonControlSelect)}
                        component={SelectFieldComponent}
                        label={formatMessage(messages.listingApproval)}
                        options={listingApprovalValue}
                      />
                    </Col>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="email" type="text" component={InputFieldComponent} label={formatMessage(messages.emailIdLabel)} inputClass={bt.commonControlInput} />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="phoneNumber" type="text" component={InputFieldComponent} label={formatMessage(messages.mobileNumberLabel)} inputClass={bt.commonControlInput} />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="address" type="text" component={InputFieldComponent} componentClass={'textarea'} label={formatMessage(messages.address)} inputClass={bt.commonControlInput} />
                  </Col><Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field
                      name="appAvailableStatus"
                      type='text'
                      inputClass={cx(bt.commonControlSelect)}
                      component={SelectFieldComponent}
                      label={formatMessage(messages.displayApp)}
                      options={[
                        { value: 1, label: formatMessage(messages.enableLabel) },
                        { value: 0, label: formatMessage(messages.disableLabel) }
                      ]}
                    />
                  </Col>
                </Row>

                {appAvailableStatus == 1 && <Row>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="playStoreUrl" type="text" component={InputFieldComponent} label={formatMessage(messages.playStoreUrl)} inputClass={bt.commonControlInput} />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="appStoreUrl" type="text" component={InputFieldComponent} label={formatMessage(messages.appStoreUrl)} inputClass={bt.commonControlInput} />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field
                      name="appForceUpdate"
                      type='text'
                      inputClass={cx(bt.commonControlSelect)}
                      component={SelectFieldComponent}
                      label={formatMessage(messages.manageForceUpdate)}
                      options={[
                        { value: "true", label: formatMessage(messages.enableLabel) },
                        { value: "false", label: formatMessage(messages.disableLabel) }
                      ]}
                    />
                  </Col>
                  {
                    String(appForceUpdate) === 'true' && <Col xs={12} sm={12} md={6} lg={6}>
                      <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                        <Field
                          name="androidVersion"
                          type="text"
                          isAddon={true}
                          component={InputFieldComponent}
                          label={formatMessage(messages.androidLabel)}
                          inputClass={bt.commonControlInput}
                          suffixLabel={'V'}
                        />
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                        <Field
                          name="iosVersion"
                          type="text"
                          isAddon={true}
                          component={InputFieldComponent}
                          label={formatMessage(messages.iOSLabel)}
                          inputClass={bt.commonControlInput}
                          suffixLabel={'V'}
                        />
                      </Col>
                    </Col>
                  }
                </Row>}

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                      <FormattedMessage {...messages.save} />
                    </Button>
                  </Col>
                </FormGroup>

              </form>
            </Col>
          </Row>
        </>
      </div >
    );
  }

}


SiteSettingsForm = reduxForm({
  form: 'SiteSettingsForm', // a unique name for this form
  validate
})(SiteSettingsForm);

const selector = formValueSelector('SiteSettingsForm');

const mapState = (state) => ({
  homePageType: selector(state, 'homePageType'),
  appAvailableStatus: selector(state, 'appAvailableStatus'),
  appForceUpdate: selector(state, 'appForceUpdate'),
  ogImage: selector(state, 'ogImage')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SiteSettingsForm)));