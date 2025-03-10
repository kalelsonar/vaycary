import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../locale/messages';
import validateStep3 from './validateStep3';
import { connect } from 'react-redux';
import IncrementButton from '../IncrementButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';

import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import SyncCalendar from './SyncCalendar';
import updateStep3 from './updateStep3';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';
import SelectFieldComponent from '../Common/FormField/SelectFieldComponent';

class MinMaxNights extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    listingSteps: PropTypes.shape({
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        isPublished: PropTypes.bool.isRequired
      })
    }),
  };

  static defaultProps = {
    minNightData: 0,
    maxNightData: 0,
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      minNight: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      maxNight: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      isDisabled: false,
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;

    if (listingFields != undefined) {
      this.setState({
        minNight: listingFields.minNight[0],
        maxNight: listingFields.maxNight[0],
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;

    if (listingFields != undefined) {
      this.setState({
        minNight: listingFields.minNight[0],
        maxNight: listingFields.maxNight[0],
      });
    }
  }

  renderIncrementButton = (field) => (
    <IncrementButton
      {...field}
    />
  );


  render() {
    const { handleSubmit, previousPage, nextPage, formPage, step } = this.props;
    const { minNight, maxNight } = this.state;
    const { minNightData, maxNightData, listingSteps, listId, existingList } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = false;
    let maxDaysNoticeValue = [
      { value: 'available', label: formatMessage(messages.datesOption5) },
      { value: '3months', label: formatMessage(messages.datesOption1) },
      { value: '6months', label: formatMessage(messages.datesOption2) },
      { value: '9months', label: formatMessage(messages.datesOption3) },
      { value: '12months', label: formatMessage(messages.datesOption4) },
      { value: 'unavailable', label: formatMessage(messages.datesDropDown) },
    ]
    if (maxNightData > 0) {
      if (minNightData > maxNightData) {
        isDisabled = true;
      }
    }
    let path = "index";
    if (existingList) {
      path = "home";
    }

    return (
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepThreeCommonHeading)}
          landingContent={formatMessage(messages.minMaxPanel)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <h3 className={s.landingContentTitle}><FormattedMessage {...messages.maxDaysTitle} /></h3>
            <FormGroup className={s.formGroup}>
              <Field name="maxDaysNotice"
                component={SelectFieldComponent}
                inputClass={cx(s.formControlSelect, s.jumboSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                options={maxDaysNoticeValue}
              />

            </FormGroup>
            <h3 className={cx(s.landingContentTitle, s.spaceTop4)}><FormattedMessage {...messages.tripLength} /></h3>
            <Row>
              <Col lg={6} md={12} sm={12} xs={12}>
                <FormGroup className={cx(s.formGroup, s.space4)}>
                  <label><FormattedMessage {...messages.minimumStay} /></label>
                  <Field
                    name="minNight"
                    type="text"
                    component={this.renderIncrementButton}
                    labelSingluar={minNight.itemName}
                    labelPlural={minNight.otherItemName}
                    maxValue={minNight.endValue}
                    minValue={minNight.startValue}
                    incrementBy={1}
                  />
                  {isDisabled && <div className={s.errorMessage}> <FormattedMessage {...messages.tripLengthError1} /> </div>}
                </FormGroup>
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <FormGroup className={s.formGroup}>
                  <label><FormattedMessage {...messages.maximumNightStay} /></label>
                  <Field
                    name="maxNight"
                    type="text"
                    component={this.renderIncrementButton}
                    labelSingluar={maxNight.itemName}
                    labelPlural={maxNight.otherItemName}
                    maxValue={maxNight.endValue}
                    minValue={maxNight.startValue}
                    incrementBy={1}
                  />
                </FormGroup>
              </Col>
            </Row>
            {
              listingSteps && listingSteps.step3 === "completed"
              && listingSteps.listing && listingSteps.listing.isPublished && <div className={s.spaceTop4}>
                <h3 className={cx(s.landingContentTitle)}><FormattedMessage {...messages.syncCalendars} /></h3>
                <SyncCalendar listId={listId} />
              </div>
            }
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"calendar"}
            previousPagePath={"discount"}
            formPage={formPage}
            step={step}
            isDisabled={isDisabled}
          />
        </form>
      </div>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

MinMaxNights = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(MinMaxNights);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  minNightData: selector(state, 'minNight'),
  maxNightData: selector(state, 'maxNight'),
  listingSteps: state.location.listingSteps,
  existingList: state.location.isExistingList
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(MinMaxNights)));