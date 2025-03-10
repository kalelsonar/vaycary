import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';
import validateStep3 from './validateStep3';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import updateStep3 from './updateStep3';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';

import toolTipIcon from '/public/SiteIcons/listCommonToolTip.svg';

class Discount extends Component {

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
    const { valid, listingFields } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { handleSubmit, nextPage, previousPage, formPage, step } = this.props;
    const { isDisabled } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepThreeCommonHeading)}
          landingContent={formatMessage(messages.discount)}
        />
        <form onSubmit={handleSubmit}>
          <div className={cx(s.landingMainContent, 'disCountAddon')}>
            <FormGroup className={s.formGroup}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.discountWeekly} />
              </ControlLabel>
              <Field
                name="weeklyDiscount"
                type="text"
                component={InputFieldComponent}
                placeholder={formatMessage(messages.discountLabel)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                prefixLabel={'%'}
                isAddon={true}
              />
            </FormGroup>
            <FormGroup className={cx(s.formGroup, s.spaceTop4)}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.discountMonthly} />
              </ControlLabel>
              <Field
                name="monthlyDiscount"
                type="text"
                component={InputFieldComponent}
                placeholder={formatMessage(messages.discountLabel)}
                inputClass={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidth, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                prefixLabel={'%'}
                isAddon={true}
              />
            </FormGroup>
            <div className={s.tipCommonCss}>
              <img src={toolTipIcon} />
              <span className={cx(s.commonTipCsss, 'textWhite')}><FormattedMessage {...messages.discountTip} /></span>
            </div>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"min-max-nights"}
            previousPagePath={"pricing"}
            formPage={formPage}
            step={step}
            isDisabled={isDisabled}
          />
        </form>
      </div>
    );
  }
}

Discount = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Discount);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Discount)));
