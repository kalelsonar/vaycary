import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import SelectFieldComponent from '../Common/FormField/SelectFieldComponent';

import validate from './validate';
import update from './update';
import messages from '../../locale/messages';

import toolTipIcon from '/public/SiteIcons/listCommonToolTip.svg';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

class Page2 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      houseType: [],
      roomType: [],
      buildingSize: [],
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;

    if (listingFields != undefined) {
      this.setState({
        houseType: listingFields.houseType,
        roomType: listingFields.roomType,
        buildingSize: listingFields.buildingSize
      });
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
      this.setState({
        houseType: listingFields.houseType,
        roomType: listingFields.roomType,
        buildingSize: listingFields.buildingSize
      });
    }
  }

  render() {
    const { handleSubmit, previousPage, nextPage, existingList, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, houseType, roomType, buildingSize } = this.state;
    let path = "index", houseTypeValue = [], roomTypeValue = [], buildingSizeValue = [];
    if (existingList) {
      path = "home";
    }

    houseType && houseType.map((item, key) => {
      if (item.isEnable == 1) {
        houseTypeValue.push({
          value: item.id,
          label: item.itemName
        })
      }
    })

    roomType && roomType.map((item, key) => {
      if (item.isEnable == 1) {
        roomTypeValue.push({
          value: item.id,
          label: item.itemName
        })
      }
    })

    buildingSize && buildingSize.map((item, key) => {
      if (item.isEnable == 1) {
        buildingSizeValue.push({
          value: item.id,
          label: item.itemName
        })
      }
    })


    return (
      <div>
        <div className={s.grid}>
          <SidePanel
            title={formatMessage(messages.stepOneCommonHeading)}
            landingContent={formatMessage(messages.whatKindOfPlaceListing)}
          />
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.space5}>
                    <Field
                      name="houseType"
                      component={SelectFieldComponent}
                      inputClass={cx(s.formControlSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                      options={houseTypeValue}
                      label={formatMessage(messages.whatTypeOfProperty)}
                      labelClass={cx(s.landingLabel, 'textWhite')}
                    />
                  </FormGroup>
                  <FormGroup className={s.space5}>
                    <Field name="roomType"
                      component={SelectFieldComponent}
                      inputClass={cx(s.formControlSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                      options={roomTypeValue}
                      label={formatMessage(messages.whatGuestHave)}
                      labelClass={cx(s.landingLabel, 'textWhite')}
                    />
                  </FormGroup>
                  <FormGroup className={s.space5}>
                    <Field name="buildingSize"
                      component={SelectFieldComponent}
                      inputClass={cx(s.formControlSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                      options={buildingSizeValue}
                      labelClass={cx(s.landingLabel, 'textWhite')}
                      label={formatMessage(messages.howManyRooms)}
                    />
                  </FormGroup>
                  <FormGroup className={s.space5}>
                    <Field name="residenceType"
                      component={SelectFieldComponent}
                      label={formatMessage(messages.isPersonalHome)}
                      labelClass={cx(s.landingLabel, 'textWhite')}
                      inputClass={cx(s.formControlSelect, s.listCommonJumboSelect, 'listCommonJumboSelectRTL')}
                      options={[
                        { value: '1', label: formatMessage(messages.yesText) },
                        { value: '0', label: formatMessage(messages.noText) }
                      ]}
                    />
                  </FormGroup>
                  <div className={s.tipCommonCss}>
                    <img src={toolTipIcon} />
                    <span className={cx(s.commonTipCsss, 'textWhite')}><FormattedMessage {...messages.isPersonalHomeInfo} /></span>
                  </div>
                </div>
                <FooterButton
                  isDisabled={isDisabled}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  nextPagePath={"bedrooms"}
                  previousPagePath={path}
                  formPage={formPage}
                  step={step}
                />
              </div>
            </form>
          </div>
        </div>
      </div >
    )
  }
}

Page2 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(Page2);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Page2)));