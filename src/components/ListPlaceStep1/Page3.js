import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector, FieldArray, change } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import IncrementButton from '../IncrementButton';
import IncrementBtn from './IncrementBtn';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

import update from './update';
import messages from '../../locale/messages';
import SelectFieldComponent from '../Common/FormField/SelectFieldComponent';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

class Page3 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    beds: PropTypes.number,
    nextPage: PropTypes.any,
    bedTypes: PropTypes.array,
    bathrooms: PropTypes.number,
    isExistingList: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      bedType: [],
      beds: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      bedrooms: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      personCapacity: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      bathrooms: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      bathroomType: []

    }
    this.handleClick = this.handleClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { listingFields, beds, change, bedTypes } = this.props;
    const { bedType } = this.state;
    let obj, bedsArray = [];

    if (listingFields != undefined) {
      this.setState({
        bedType: listingFields.bedType,
        beds: listingFields.beds[0],
        bedrooms: listingFields.bedrooms[0],
        personCapacity: listingFields.personCapacity[0],
        bathrooms: listingFields.bathrooms[0],
        bathroomType: listingFields.bathroomType,
      });
    }

    if ((bedTypes && beds != bedTypes.length) || (bedTypes && bedTypes.length == 0)) {
      Array(beds).fill().map((i, index) => {
        obj = {
          bedCount: 1,
          bedType: listingFields.bedType && listingFields.bedType.length > 0 ? listingFields.bedType[0].id : null,
        };
        bedsArray.push(obj);
      })
      change('bedTypes', bedsArray);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        bedType: listingFields.bedType,
        beds: listingFields.beds[0],
        bedrooms: listingFields.bedrooms[0],
        personCapacity: listingFields.personCapacity[0],
        bathrooms: listingFields.bathrooms[0],
        bathroomType: listingFields.bathroomType,
      });
    }
  }


  renderIncrementButton = (field) => (
    <IncrementButton
      {...field}
    />
  );

  renderIncrementBtn = (input, dispatch) => (
    <IncrementBtn
      {...input}
      onChange={this.handleClick}
    />
  );


  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  renderBedTypes = ({ fields, meta: { error, submitFailed } }) => {
    const { bedType } = this.state;
    let bedTypeValue = [];

    bedType && bedType.map((item, key) => {
      if (item.isEnable == 1) {
        bedTypeValue.push({
          value: item?.id,
          label: item?.itemName
        })
      }
    })
    return (
      <div className={s.spaceTop2}>
        {
          fields.map((beds, index) => (

            <div key={index}>
              <FormGroup className={s.space5}>
                <Field
                  name={`${beds}.bedType`}
                  type="text"
                  component={SelectFieldComponent}
                  inputClass={cx(s.formControlSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                  options={bedTypeValue}
                />

              </FormGroup>
            </div>
          ))
        }
      </div>
    )
  }

  async handleClick(e) {
    const { beds, bedTypes, change } = this.props;
    const { bedType } = this.state;

    let bedTypesValue = Object.keys(bedTypes).map(function (key) {
      return bedTypes[key];
    });

    let updatedBedTypesArray = (bedTypesValue && bedTypesValue.length > 0) ? bedTypesValue.slice(0) : [];
    let updatedBedCount = beds + 1;
    let obj = {};

    if (Number(beds) < Number(e)) {
      obj = {
        bedCount: updatedBedCount,
        bedType: bedType.length > 0 ? bedType[0].id : null,
      };
      try {
        updatedBedTypesArray.push(obj);
      } catch (e) {

      }
    } else if ((Number(beds) >= Number(e)) || (Number(e) > 2)) {
      updatedBedTypesArray.splice(bedTypesValue.length - 1, 1);
    }

    await change('bedTypes', []);
    await change('bedTypes', updatedBedTypesArray);
  }

  render() {
    const { handleSubmit, previousPage, nextPage, isExistingList, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { bedrooms, beds, personCapacity, bathrooms, bathroomType } = this.state;

    let bathroomTypeValue = [];
    let path = isExistingList ? "map" : "location";

    bathroomType && bathroomType.map((item, key) => {
      if (item.isEnable == 1) {
        bathroomTypeValue.push({
          value: item?.id,
          label: item?.itemName
        })
      }
    })

    return (
      <div className={cx(s.grid, 'arrowPosition')}>
        <SidePanel
          title={formatMessage(messages.stepOneCommonHeading)}
          landingContent={formatMessage(messages.howManyGuests)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.totalGuests} />
              </ControlLabel>
              <Field
                name="personCapacity"
                type="text"
                component={this.renderIncrementButton}
                labelSingluar={personCapacity.itemName}
                labelPlural={personCapacity.otherItemName}
                maxValue={personCapacity.endValue}
                minValue={personCapacity.startValue}
                incrementBy={1}
              />
            </FormGroup>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.howManyBedrooms} />
              </ControlLabel>
              <Field
                name="bedrooms"
                type="text"
                component={this.renderIncrementButton}
                labelSingluar={bedrooms.itemName}
                labelPlural={bedrooms.otherItemName}
                minValue={bedrooms.startValue}
                incrementBy={1}
                maxValue={bedrooms.endValue}
              />
            </FormGroup>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.howManyBeds} />
              </ControlLabel>
              <Field
                name="beds"
                type="text"
                component={this.renderIncrementBtn}
                labelSingluar={beds.itemName}
                labelPlural={beds.otherItemName}
                minValue={beds.startValue}
                incrementBy={1}
                maxValue={beds.endValue}
              />
            </FormGroup>
            <FieldArray name="bedTypes" component={this.renderBedTypes} className={s.spaceTop2} />
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.howManyBathrooms} />
              </ControlLabel>
              <Field
                name="bathrooms"
                type="text"
                component={this.renderIncrementButton}
                labelSingluar={bathrooms.itemName}
                labelPlural={bathrooms.otherItemName}
                maxValue={bathrooms.endValue}
                minValue={bathrooms.startValue}
                incrementBy={0.5}
              />
            </FormGroup>

            <FormGroup className={s.formGroup}>
              <Field name="bathroomType"
                component={SelectFieldComponent}
                inputClass={cx(s.formControlSelect, s.jumboSelect, s.jumboSelectPadding, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                options={bathroomTypeValue}
              />
            </FormGroup>
          </div>
          <FooterButton
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={path}
            previousPagePath={"room"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    )
  }
}


Page3 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page3);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  isExistingList: state.location.isExistingList,
  listingFields: state.listingFields.data,
  beds: selector(state, 'beds'),
  bedCount: selector(state, 'beds'),
  bedTypes: selector(state, 'bedTypes'),
});

const mapDispatch = {
  change,
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Page3)));