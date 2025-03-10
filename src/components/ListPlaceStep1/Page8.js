// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
//Redux Form
import { Field, reduxForm } from 'redux-form';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Button,
  FormGroup,
} from 'react-bootstrap';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

// Locale
import messages from '../../locale/messages';

import { url } from '../../config';
import validate from './validate';
import update from './update';

import DefaultIcon from '/public/SiteIcons/defaultIcon.png';

class Page8 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    formErrors: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      isDisabled: false
    }
  }

  componentDidMount() {
    const { formErrors, listingFields } = this.props;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        spaces: listingFields.spaces,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { formErrors, listingFields } = nextProps;
    if (formErrors != undefined) {
      if (formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if (listingFields != undefined) {
      this.setState({
        spaces: listingFields.spaces,
      });
    }
  }

  checkboxGroup = ({ label, name, options, input }) => (
    <ul className={cx(s.listContainer, s.safetyAmenitiesFlex)}>
      {options.map((option, index) => {
        if (option.isEnable === "1") {
          return (
            <li className={cx('amenitiesCheckBox', s.flex)} key={index}>
              <div className={s.checkBoxOutline}>
                <div className={cx(s.amenitiesCheckBoxWrapper, "darkModeAmenitiesCheckBoxWrapper", { [s.checked]: input.value.indexOf(option.id) !== -1 }, { ["darkModeAmenitiesChecked"]: input.value.indexOf(option.id) !== -1 }, 'svgImg')} onClick={() => {
                  const newValue = [...input.value];
                  if (newValue.indexOf(option.id) !== -1) {
                    newValue.splice(newValue.indexOf(option.id), 1);
                  } else {
                    newValue.push(option.id);
                  }
                  input.onChange(newValue);

                }}>
                  {option.image ? (
                    <img src={url + '/images/amenities/' + option.image} className={cx(s.imgSection, 'imgSectionRtl', 'darkModeFilterNone')} />
                  ) : (
                    <img src={DefaultIcon} className={cx(s.imgSection, 'imgSectionRtl')} />
                  )}
                  <div className={s.checkoutText}>{option.itemName}</div>
                </div>
              </div>

            </li>
          )
        }
      }
      )
      }
    </ul>
  );

  render() {
    const { handleSubmit, previousPage, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { spaces, isDisabled } = this.state;

    return (
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepOneCommonHeading)}
          landingContent={formatMessage(messages.whatSpace)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <div className={s.leftSideContent}><FormattedMessage {...messages.sharedSpaces} /></div>
            <FormGroup className={s.formGroup}>
              <Field name="spaces" component={this.checkboxGroup} options={spaces} />
            </FormGroup>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            previousPage={previousPage}
            previousPagePath={"amenities"}
            type={"submit"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    );
  }
}

Page8 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page8);

const mapState = (state) => ({
  userData: state.account.data,
  formErrors: state.form.ListPlaceStep1,
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Page8)));