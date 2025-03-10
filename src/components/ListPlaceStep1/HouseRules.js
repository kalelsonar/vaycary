// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

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
  FormGroup,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';

import updateStep3 from './updateStep3';

class HouseRules extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      houseRules: [],
      isDisabled: true,
    };
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      //if(listingFields.houseRules.length > 0) {
      this.setState({ houseRules: listingFields.houseRules });
      //}
    }
  }

  componentDidMount() {
    const { valid } = this.props;
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
    if (listingFields != undefined) {
      //if(listingFields.houseRules.length > 0) {
      this.setState({ houseRules: listingFields.houseRules });
      //}
    }
  }

  checkboxGroup = ({ label, name, options, input }) => (
    <ul className={cx(s.listContainer, s.rulesTop)}>
      {
        options.map((option, index) => {
          if (option.isEnable === "1") {
            return (
              <li className={cx(s.listContent, s.fullWidth)} key={index}>
                <span className={s.checkBoxSection}>
                  <CustomCheckbox
                    name={`${input.name}[${index}]`}
                    value={option.id}
                    checked={input.value.indexOf(option.id) !== -1}
                    className={'icheckbox_square-green'}
                    onChange={event => {
                      const newValue = [...input.value];
                      if (event === true) {
                        newValue.push(option.id);
                      } else {
                        newValue.splice(newValue.indexOf(option.id), 1);
                      }
                      return input.onChange(newValue);
                    }}
                  />
                </span>
                <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                  <label className={cx(s.checkboxLabel, s.noPadding, 'textWhite')}>{option.itemName}</label>
                </span>
              </li>
            )
          }
        }
        )
      }
    </ul>
  );


  render() {
    const { handleSubmit, previousPage, nextPage, existingList, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, houseRules } = this.state;
    let path = "index";
    if (existingList) {
      path = "home";
    }

    return (
        <div className={s.grid}>
          <SidePanel
            title={formatMessage(messages.stepThreeCommonHeading)}
            landingContent={formatMessage(messages.setHouseRulesPanel)}
          />
            <form onSubmit={handleSubmit}>
              <div className={s.landingMainContent}>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.setHouseRules} /></h3>
                <FormGroup className={s.formGroup}>
                  <Field name="houseRules" component={this.checkboxGroup} options={houseRules} />
                </FormGroup>
              </div>
              <FooterButton
                isDisabled={isDisabled}
                nextPage={nextPage}
                previousPage={previousPage}
                nextPagePath={"advance-notice"}
                previousPagePath={path}
                formPage={formPage}
                step={step}
              />
            </form>
          </div>
    );
  }
}

HouseRules = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(HouseRules);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  existingList: state.location.isExistingList,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(HouseRules)));