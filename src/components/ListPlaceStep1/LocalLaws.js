// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

// Component
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

// Helpers
import validateStep3 from './validateStep3';

class LocalLaws extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    minNightData: PropTypes.number,
    maxNightData: PropTypes.number,
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    minNightData: 0,
    maxNightData: 0
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, formErrors, minNightData, maxNightData, step, formPage } = this.props;
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = false;
    if (formErrors != undefined && formErrors.hasOwnProperty('syncErrors')) {
      isDisabled = true;
    }

    if (maxNightData > 0) {
      if (minNightData > maxNightData) {
        isDisabled = true;
      }
    }

    return (
      <div className={(s.grid)}>
        <SidePanel
          title={formatMessage(messages.stepThreeCommonHeading)}
          landingContent={formatMessage(messages.tabLocalLaws)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <h3 className={cx(s.landingContentTitle)}><FormattedMessage {...messages.localLaws} /></h3>
            <p className={cx(s.textHigh, s.space3)}>
              <span>
                <FormattedMessage {...messages.localLawsOne} />
              </span>
            </p>
            <div className={cx(s.textLow, s.space5)}>
              <p>
                <span>
                  <FormattedMessage {...messages.localLawsTwo} />
                </span>
              </p>
              <p>
                <span>
                  <FormattedMessage {...messages.localLawsThree} />
                </span>
              </p>
              <p>
                <span>
                  <FormattedMessage {...messages.localLawsFive} />{' '}{siteName}.{' '}<FormattedMessage {...messages.localLawsSix} />
                </span>
              </p>
              <p>
                <span>
                  <FormattedMessage {...messages.localLawsSeven} />
                </span>
              </p>
            </div>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            previousPage={previousPage}
            previousPagePath={"booking-scenarios"}
            type={"submit"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

LocalLaws = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3
})(LocalLaws);

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  listingFields: state.listingFields.data,
  formErrors: state.form.ListPlaceStep3,
  minNightData: selector(state, 'minNight'),
  maxNightData: selector(state, 'maxNight')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(LocalLaws)));
