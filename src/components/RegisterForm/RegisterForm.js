import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';

import InputFieldComponent from '../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../Common/FormField/SelectFieldComponent';

import messages from '../../locale/messages';
import PopulateData from '../../helpers/populateData';

import s from './RegisterForm.css';
import bt from '../../components/commonStyle.css';

class RegisterForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: '',
      dateOfBirthData: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    let now = new Date();
    let currentYear = now.getFullYear();
    let years = PopulateData.generateData(1920, currentYear, "desc");
    let days = PopulateData.generateData(1, 31);
    let months = PopulateData.generateData(0, 11);
    this.setState({
      dateOfBirthData: {
        years: years,
        months: months,
        days: days
      }
    });
  }

  handleChange(fieldName) {
    this.setState({ showPassword: fieldName === this.state.showPassword ? "" : fieldName });
  }


  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { dateOfBirthData } = this.state;

    let monthValue = [
      { value: '', label: formatMessage(messages.month) },
    ];

    let daysValue = [
      { value: '', label: formatMessage(messages.transferDate) },
    ]
    let yearsValue = [
      { value: '', label: formatMessage(messages.year) },
    ]

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
      <form onSubmit={handleSubmit(submit)} className={cx('SelectFocus', 'inputDateHide')}>
        {error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
        <Field
          name="firstName"
          type="text"
          component={InputFieldComponent}
          label={formatMessage(messages.firstName)}
          placeholder={formatMessage(messages.firstName)}
          inputClass={bt.commonControlInput}
        />
        <Field name="lastName"
          type="text"
          component={InputFieldComponent}
          label={formatMessage(messages.lastName)}
          placeholder={formatMessage(messages.lastName)}
          inputClass={bt.commonControlInput}
        />
        <Field name="email"
          type="text"
          component={InputFieldComponent}
          label={formatMessage(messages.email)}
          placeholder={formatMessage(messages.email)}
          inputClass={bt.commonControlInput}
        />
        <Field
          name="password"
          type="password"
          component={InputFieldComponent}
          label={formatMessage(messages.password)}
          placeholder={formatMessage(messages.password)}
          inputClass={cx("commonPasswordControlInput")}
          showPassword={this.state.showPassword}
          isPassword={true}
          onClick={() => this.handleChange('password')}
        />
        <div className={cx(s.Birthpadding, bt.space3)}>
          <label className={s.loginLabel}>{formatMessage(messages.birthDay)}</label>
          <div className={s.birthFlex}>
            <Field
              name="month"
              component={SelectFieldComponent}
              inputClass={cx(bt.commonControlSelect, "commonControlSelectRtl")}
              options={monthValue}
            />
            <Field
              name="day"
              component={SelectFieldComponent}
              inputClass={cx(bt.commonControlSelect, "commonControlSelectRtl")}
              options={daysValue}
            />
            <Field name="year"
              component={SelectFieldComponent}
              inputClass={cx(bt.commonControlSelect, "commonControlSelectRtl")}
              options={yearsValue}
            />
          </div>
        </div>

        <Button
          className={cx(bt.btnPrimary, bt.btnBig, bt.space4)}
          block type="submit"
          disabled={submitting}
        >
          {formatMessage(messages.signUp)}
        </Button>
      </form >
    )
  }
}

RegisterForm = reduxForm({
  form: 'RegisterForm', // a unique name for this form
  validate
})(RegisterForm);

export default injectIntl(withStyles(s, bt)(RegisterForm));