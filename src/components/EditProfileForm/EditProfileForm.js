import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import PhoneVerificationModal from '../PhoneVerificationModal';
import CountryList from '../CountryList';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../Common/FormField/SelectFieldComponent';

import submit from './submit';
import validate from './validate';
import messages from '../../locale/messages';
import PopulateData from '../../helpers/populateData';

import s from './EditProfileForm.css';
import bt from '../../components/commonStyle.css';
import 'react-phone-input-2/lib/style.css';

class EditProfileForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {},
      countryCode: 'US',
      country: '+1'
    }
  }

  componentDidMount() {
    const { change, initialValues } = this.props;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }
    change('loggedinEmail', loggedinEmail);
    if (initialValues && initialValues.countryCode) {
      this.setState({
        countryCode: initialValues.countryName,
        country: initialValues.countryCode
      });
    }
  }

  UNSAFE_componentWillReceiveProps() {
    const { change, initialValues } = this.props;
    const { country, countryCode } = this.state;
    let loggedinEmail;
    if (initialValues && initialValues.email) {
      loggedinEmail = initialValues.email;
    }

    change('loggedinEmail', loggedinEmail);

    if (countryCode && country) {
      change('countryCode', countryCode);
      change('dialCode', country);
    }
  }

  UNSAFE_componentWillMount() {
    let now, currentYear, years, days, months;
    now = new Date();
    currentYear = now.getFullYear();
    years = PopulateData.generateData(1920, currentYear, "desc");
    days = PopulateData.generateData(1, 31);
    months = PopulateData.generateData(0, 11);
    this.setState({
      dateOfBirthData: {
        years: years,
        months: months,
        days: days
      }
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCountryChange = (e, selectedData) => {
    this.setState({
      country: selectedData.dialCode,
      countryCode: selectedData.countryCode
    });
  }

  handleChangeEmail = () => { }

  render() {

    const { error, handleSubmit, submitting, } = this.props;
    const { formatMessage } = this.props.intl;
    const { siteSettingStatus } = this.props;
    const { country, countryCode, dateOfBirthData } = this.state;

    let isPhoneStatus, genderValue, monthValue, daysValue, yearsValue;

    isPhoneStatus = siteSettingStatus && siteSettingStatus.phoneNumberStatus == 1 ? true : false;
    const title = <span>{formatMessage(messages.editProfileInfo)}</span>;

    genderValue = [
      { value: '', label: formatMessage(messages.gender) },
      { value: "Male", label: formatMessage(messages.genderMale) },
      { value: "Female", label: formatMessage(messages.genderFemale) },
      { value: 'Other', label: formatMessage(messages.genderOther) }
    ]

    monthValue = [
      { value: '', label: formatMessage(messages.month) },
    ];

    daysValue = [
      { value: '', label: formatMessage(messages.transferDate) },
    ];

    yearsValue = [
      { value: '', label: formatMessage(messages.year) },
    ];

    dateOfBirthData?.months?.length > 0 && dateOfBirthData?.months?.map((item, key) => {
      monthValue.push({
        value: item,
        label: item + 1
      })
    })

    dateOfBirthData?.days?.length > 0 && dateOfBirthData?.days?.map((item, key) => {
      daysValue.push({
        value: item,
        label: item
      })
    })

    dateOfBirthData?.years?.length > 0 && dateOfBirthData?.years?.map((item, key) => {
      yearsValue.push({
        value: item,
        label: item
      })
    })

    return (
      <div className={cx('inputFocusColor', 'commonListingBg', 'inputDateHide', 'noMarginBottom')} >
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <h3 className={cx(bt.listingTitleText, bt.space5)}>{title}</h3>
        <Form onSubmit={handleSubmit(submit)}>
          <div className={s.displayGrid}>
            <Field name="firstName"
              type="text"
              component={InputFieldComponent}
              label={formatMessage(messages.firstName)}
              placeholder={formatMessage(messages.firstName)}
              inputClass={bt.commonControlInput}
              infoText={formatMessage(messages.lastNameInfo)}
              showToolTip={true}
            />
            <Field name="lastName"
              type="text"
              component={InputFieldComponent}
              label={formatMessage(messages.lastName)}
              placeholder={formatMessage(messages.lastName)}
              inputClass={bt.commonControlInput}
            />
            <Field
              name="gender"
              label={formatMessage(messages.gender)}
              inputClass={cx(bt.commonControlSelect, 'commonControlSelectRtl')}
              component={SelectFieldComponent}
              options={genderValue}
            />

            <div className={cx(s.formGroup)} >
              <label className={cx(bt.commonLabelText, 'textWhite')} >{formatMessage(messages.dateOfBirth)}</label>
              <div className={s.birthDayFlex}>
                <Field
                  name="month"
                  inputClass={cx(bt.commonControlSelect, 'commonControlSelectRtl')}
                  component={SelectFieldComponent}
                  options={monthValue}
                >
                </Field>
                <Field
                  name="day"
                  inputClass={cx(bt.commonControlSelect, 'commonControlSelectRtl')}
                  component={SelectFieldComponent}
                  options={daysValue}
                />
                <Field
                  name="year"
                  inputClass={cx(bt.commonControlSelect, 'commonControlSelectRtl')}
                  component={SelectFieldComponent}
                  options={yearsValue}
                />
              </div>
            </div>
            <Field name="email"
              type="text"
              component={InputFieldComponent}
              placeholder={formatMessage(messages.email)}
              label={formatMessage(messages.email)}
              inputClass={cx(bt.commonControlInput)}
              disabled={true}
              normalize={this.handleChangeEmail}
            />
            <Field name="location"
              type="text"
              component={InputFieldComponent}
              label={formatMessage(messages.liveLocation)}
              inputClass={bt.commonControlInput}
              placeholder="e.g. Paris, France /Brooklyn, NY, IL"
            />
          </div>

          <div className={bt.space5}>
            <label className={cx(bt.commonLabelText, 'textWhite')}>{formatMessage(messages.phoneNumber)}</label>
            <div>
              {!isPhoneStatus && <div className={s.widthredcd}>
                <CountryList
                  input={
                    {
                      name: 'countryCode',
                      onChange: this.handleChange,
                      value: countryCode,
                    }
                  }
                  className={cx(bt.commonControlSelect, bt.space3)}
                  dialCode={false}
                  getSelected={this.handleCountryChange}
                  formName={'EditProfileForm'}

                />
                <Field
                  name="phoneNumber"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.phoneNumber)}
                  inputClass={bt.commonControlInput}
                  onChange={this.handleChange}
                  suffixLabel={country}
                  isAddon={true}
                />
              </div>}
              {
                isPhoneStatus && <PhoneVerificationModal />
              }
              <p className={cx(s.noMarginBottom, bt.spaceTop1)}>{formatMessage(messages.phoneNumberInfo)}</p>
            </div>
          </div>
          <Field
            name="info"
            component={InputFieldComponent}
            componentClass={'textarea'}
            label={formatMessage(messages.info)}
            inputClass={"commonTextField"}
          />
          <div className={bt.textAlignRight}>
            <Button bsSize="small" className={cx(bt.btnPrimary, bt.btnLarge, s.spaceTop3)} type="submit" disabled={submitting}>
              {formatMessage(messages.save)}
            </Button>
          </div>
        </Form >
      </div >
    )
  }
}

EditProfileForm = reduxForm({
  form: 'EditProfileForm', // a unique name for this form
  validate,
})(EditProfileForm);
const selector = formValueSelector('EditProfileForm');

const mapState = (state) => ({
  initialValues: state?.account?.data,
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  base: state?.currency?.base,
  siteSettingStatus: state?.siteSettings?.data,
  phoneNumber: selector(state, 'phoneNumber'),
  countryName: selector(state, 'countryName'),
  countryCode: selector(state, 'countryCode'),
});
const mapDispatch = {
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getCountries {
          getCountries{
              id
              countryCode
              countryName
              isEnable
              dialCode
          }
      }
  `, {
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    }
  })
)(EditProfileForm);