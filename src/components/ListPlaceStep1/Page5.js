// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm } from 'redux-form';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

// Internal Component
import PlacesSuggest from '../PlacesSuggest';
import CountryList from '../CountryList';
import Loader from '../Loader';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

import s from './ListPlaceStep1.css';
import bt from '../commonStyle.css';

import { updateLocationStatus } from '../../actions/getLocation';
import { updateListingMap } from '../../actions/updateListingMap';

// Locale
import messages from '../../locale/messages';
// Helpers
import validate from './validate';
import update from './update';

//Image
import toolTipIcon from '/public/SiteIcons/listCommonToolTip.svg';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';
class Page5 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    isLocationChosen: PropTypes.bool,
    previousPage: PropTypes.any,
    onSubmit: PropTypes.any,
    updateLocationStatus: PropTypes.any,
    nextPage: PropTypes.any,
    isExistingList: PropTypes.bool,
    updateListingMap: PropTypes.any,
    mapUpdateLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      hideSuggestInput: true,
    };
    this.renderCountryList = this.renderCountryList.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { isExistingList, isLocationChosen } = this.props;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isExistingList, isLocationChosen } = nextProps;
    if (!isLocationChosen && !isExistingList) {
      this.setState({ hideSuggestInput: false });
    } else {
      this.setState({ hideSuggestInput: true });
    }
  }

  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlacesSuggest
          {...input}
          label={label}
          className={className}
        />
      </div>
    )
  }

  renderCountryList({ input, label, meta: { touched, error }, children, className }) {
    const { formatMessage } = this.props.intl;
    return <div>
      <CountryList input={input} className={className} isEmptyFirst />
      {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
    </div >
  }


  renderLocationInput = () => {
    const { updateLocationStatus, nextPage, previousPage, loading, formPage, step, listId } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div className={s.grid}>
          <SidePanel
            title={formatMessage(messages.stepOneCommonHeading)}
            landingContent={formatMessage(messages.whereLocatedContent)}
          />
          {
            !listId && <div className={s.landingMainContent}>
              <FormGroup className={cx('fullAddressSection', s.space3)}>
                <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                  <FormattedMessage {...messages.yourLocationLabel} />
                </ControlLabel>
                <Field
                  name="location"
                  component={this.renderPlacesSuggest}
                  label={formatMessage(messages.searchYourLocation)}
                  className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, 'locationBgIconRTL')}
                />
              </FormGroup>
              <div className={s.tipCommonCss}>
                <img src={toolTipIcon} />
                <span className={cx(s.commonTipCsss, 'textWhite')}><FormattedMessage {...messages.yourLocationLabelDesc} /></span>
              </div>
            </div>
          }

        </div>

        <FooterButton
          nextPage={updateLocationStatus}
          previousPage={previousPage}
          previousPagePath={"bedrooms"}
          formPage={formPage}
          step={step}
        />

      </div>
    );
  }

  renderLocationForm = () => {
    const { isExistingList, nextPage, previousPage, onSubmit, invalid, updateListingMap, loading, mapUpdateLoading } = this.props;
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, valid, formPage, step } = this.props;
    let isDisabled = true;
    if (valid) {
      isDisabled = false;
    }
    return (
      <div>
        <div className={s.grid}>
          <SidePanel
            title={formatMessage(messages.stepOneCommonHeading)}
            landingContent={formatMessage(messages.whereLocatedContent)}
          />
          <div className={s.landingMainContent}>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.country} />
              </ControlLabel>
              <Field name="country" component={this.renderCountryList} className={cx(s.formControlSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')} />
            </FormGroup>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.street} />
              </ControlLabel>
              <Field
                name="street"
                component={InputFieldComponent}
                inputClass={cx(s.formControlInput, s.jumboInput)}
                placeholder={formatMessage(messages.street)}
              />
            </FormGroup>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.buildingName} />
              </ControlLabel>
              <Field
                name="buildingName"
                component={InputFieldComponent}
                inputClass={cx(s.formControlInput, s.jumboInput)}
                placeholder={formatMessage(messages.buildingName)}
              />
            </FormGroup>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <FormGroup className={s.space5}>
                  <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                    <FormattedMessage {...messages.city} />
                  </ControlLabel>
                  <Field
                    name="city"
                    component={InputFieldComponent}
                    inputClass={cx(s.formControlInput, s.jumboInput)}
                    placeholder={formatMessage(messages.city)}

                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <FormGroup className={s.space5}>
                  <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                    <FormattedMessage {...messages.state} />
                  </ControlLabel>
                  <Field
                    name="state"
                    component={InputFieldComponent}
                    inputClass={cx(s.formControlInput, s.jumboInput)}
                    placeholder={formatMessage(messages.state)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className={s.space5}>
              <Row>
                <Col xs={12} sm={6} md={6} lg={6}>
                  <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                    <FormattedMessage {...messages.zipcode} />
                  </ControlLabel>
                  <Field
                    name="zipcode"
                    component={InputFieldComponent}
                    inputClass={cx(s.formControlInput, s.jumboInput)}
                    placeholder={formatMessage(messages.zipcode)}
                  />
                </Col>
              </Row>
            </FormGroup>
          </div>
        </div>

        <FooterButton
          isDisabled={isDisabled}
          previousPage={previousPage}
          previousPagePath={"bedrooms"}
          type={"location"}
          updateListingMap={updateListingMap}
          formPage={formPage}
          step={step}
        />

      </div>
    );
  }

  render() {

    const { error, handleSubmit, submitting, pristine, previousPage, onSubmit, nextPage } = this.props;
    const { isLocationChosen, isExistingList } = this.props;
    const { formatMessage } = this.props.intl;
    const { hideSuggestInput } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          {error && <strong>{formatMessage(error)}</strong>}
          {
            hideSuggestInput && this.renderLocationForm()
          }
          {
            !hideSuggestInput && this.renderLocationInput()
          }
        </form>
      </div>
    );
  }
}

Page5 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page5);

const mapState = (state) => ({
  isLocationChosen: state.location.isLocationChosen,
  isExistingList: state.location.isExistingList,
  loading: state.loader.location,
  mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {
  updateLocationStatus,
  updateListingMap
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Page5)));