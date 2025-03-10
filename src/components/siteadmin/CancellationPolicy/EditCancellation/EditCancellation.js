import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, change } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../../Link';
import Loader from '../../../Loader/Loader';
import InputFieldComponent from '../../../Common/FormField/InputFieldComponent';

import submit from './submit';
import validate from './validate';
import messages from '../../../../locale/messages';

import s from './EditCancellation.css';
import bt from '../../../../components/commonStyle.css';

class EditCancellation extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    data: []
  };

  handlePolicyChange = () => { }

  render() {
    const { error, handleSubmit, submitting, isUpdateCancellationPolicy } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <h1 className={s.headerTitle}><FormattedMessage {...messages.editCancelPageDetails} /></h1>
        <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
          <Link to={"/siteadmin/cancellation-policies/management"} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
            <FormattedMessage {...messages.goBack} />
          </Link>
        </div>
        <Panel className={cx(s.panelHeader, 'bgBlack')}>
          <form onSubmit={handleSubmit(submit)}>
            {error && <strong>{formatMessage(error)}</strong>}
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Field
                  name="policyName"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.policyName)}
                  placeholder={formatMessage(messages.policyName)}
                  inputClass={bt.commonControlInput}
                  disabled={true}
                  normalize={this.handlePolicyChange}
                />
                <Field
                  name="policyContent"
                  inputClass={s.textareaInput}
                  component={InputFieldComponent}
                  componentClass={'textarea'}
                  label={formatMessage(messages.policyContent)}
                  placeholder={formatMessage(messages.policyContent)}
                />
                <Field
                  name="subTitle"
                  inputClass={s.textareaInput}
                  component={InputFieldComponent}
                  label={formatMessage(messages.subTitle)}
                  componentClass={'textarea'}
                  placeholder={formatMessage(messages.subTitle)}
                />
                <Field
                  name="subContent"
                  inputClass={s.textareaInput}
                  componentClass={'textarea'}
                  component={InputFieldComponent}
                  label={formatMessage(messages.subContent)}
                  placeholder={formatMessage(messages.subContent)}
                />
                <Field
                  name="content1"
                  inputClass={s.textareaInput}
                  componentClass={'textarea'}
                  component={InputFieldComponent}
                  label={formatMessage(messages.content1)}
                  placeholder={formatMessage(messages.content1)}
                />
                <Field
                  name="content2"
                  inputClass={s.textareaInput}
                  componentClass={'textarea'}
                  component={InputFieldComponent}
                  label={formatMessage(messages.content2)}
                  placeholder={formatMessage(messages.content2)}
                />
                <Field
                  name="content3"
                  inputClass={s.textareaInput}
                  componentClass={'textarea'}
                  component={InputFieldComponent}
                  label={formatMessage(messages.content3)}
                  placeholder={formatMessage(messages.content3)}
                />
              </Col>
            </Row>
            <h4 className={s.subHeadingTitle}><FormattedMessage {...messages.cancellationTitleOne} /></h4>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <Field
                  name="priorDays"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.priorDays)}
                  placeholder={formatMessage(messages.priorDays)}
                  prefixLabel={formatMessage(messages.howManydays)}
                  toolTipText={formatMessage(messages.toolTipContent1)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field
                  name="nonRefundableNightsPriorCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleFour)}
                  placeholder={formatMessage(messages.cancellationPriorTitleFour)}
                  prefixLabel={formatMessage(messages.nights)}
                  toolTipText={formatMessage(messages.toolTipContent13)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field name="accommodationPriorCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleOne)}
                  placeholder={formatMessage(messages.cancellationPriorTitleOne)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent4)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />

                <Field
                  name="guestFeePriorCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleTwo)}
                  placeholder={formatMessage(messages.cancellationPriorTitleTwo)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent7)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field
                  name="hostFeePriorCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleThree)}
                  placeholder={formatMessage(messages.cancellationPriorTitleThree)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent10)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
              </Col>
            </Row>
            <h4 className={s.subHeadingTitle}><FormattedMessage {...messages.cancellationTitleTwo} /></h4>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <Field
                  name="nonRefundableNightsBeforeCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleFour)}
                  placeholder={formatMessage(messages.cancellationPriorTitleFour)}
                  prefixLabel={formatMessage(messages.nights)}
                  toolTipText={formatMessage(messages.toolTipContent12)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field
                  name="accommodationBeforeCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleOne)}
                  placeholder={formatMessage(messages.cancellationPriorTitleOne)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent3)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field name="guestFeeBeforeCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleTwo)}
                  placeholder={formatMessage(messages.cancellationPriorTitleTwo)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent6)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field
                  name="hostFeeBeforeCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleThree)}
                  placeholder={formatMessage(messages.cancellationPriorTitleThree)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent9)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
              </Col>
            </Row>
            <h4 className={s.subHeadingTitle}><FormattedMessage {...messages.cancellationTitleThree} /></h4>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <Field
                  name="nonRefundableNightsDuringCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleFour)}
                  placeholder={formatMessage(messages.cancellationPriorTitleFour)}
                  prefixLabel={formatMessage(messages.nights)}
                  toolTipText={formatMessage(messages.toolTipContent11)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field
                  name="accommodationDuringCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleOne)}
                  placeholder={formatMessage(messages.cancellationPriorTitleOne)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent2)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field
                  name="guestFeeDuringCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleTwo)}
                  placeholder={formatMessage(messages.cancellationPriorTitleTwo)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent5)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
                <Field name="hostFeeDuringCheckIn"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.cancellationPriorTitleThree)}
                  placeholder={formatMessage(messages.cancellationPriorTitleThree)}
                  prefixLabel={'%'}
                  toolTipText={formatMessage(messages.toolTipContent8)}
                  inputClass={cx(bt.commonControlInput)}
                  isAddon={true}
                />
              </Col>
            </Row>
            <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
              <Loader
                type={"button"}
                buttonType={"submit"}
                label={formatMessage(messages.save)}
                className={cx(bt.btnPrimary, bt.btnLarge)}
                disabled={isUpdateCancellationPolicy || submitting}
                show={isUpdateCancellationPolicy || submitting}
              />
            </div>
          </form>
        </Panel >
      </div >
    );
  }
}

EditCancellation = reduxForm({
  form: 'EditCancellation', // a unique name for this form
  validate
})(EditCancellation);

const mapState = (state) => ({
  isUpdateCancellationPolicy: state?.loader?.isUpdateCancellationPolicy
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditCancellation)));