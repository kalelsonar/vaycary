import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux form
import { Field, reduxForm } from 'redux-form';

import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row, FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordForm.css';
import bt from '../../../components/commonStyle.css';

// Locale
import messages from '../../../locale/messages';

import ShowPassword from '/public/SiteIcons/pswVisible.svg';
import HidePassword from '/public/SiteIcons/pwdHidden.svg';
class ChangePasswordForm extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    initialValues: PropTypes.shape({
      registeredType: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    initialValues: {
      registeredType: 'email'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName) {
    this.setState({ showPassword: fieldName === this.state.showPassword ? "" : fieldName });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, showPassword }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(bt.space3, bt.pwdSection)}>
        <label className={bt.loginLabel}>{label}</label>
        <FormControl {...input} type={showPassword === input.name ? input : type} className={bt.commonControlInput}
          placeholder={label} maxlength={25}
        />
        {type == 'password' && <span className={cx(bt.pwdImage, bt.loginPwdSection, 'svgImg', 'pwdImageRTL')} onClick={() => this.handleChange(input.name)}>
          {showPassword === input.name ? <img src={ShowPassword} /> : <img src={HidePassword} />}
        </span>}
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div className={s.root}>
            <h4 className={s.titleText}>{formatMessage(messages.cantLogin)}</h4>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{error}</strong>}
              <Field name="newPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.newPassword)} showPassword={this.state.showPassword} />
              <Field name="confirmPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.confirmPassword)} showPassword={this.state.showPassword} />
              <div className={cx(s.textRight, bt.spaceTop2)}>
                <Button className={cx(bt.btnPrimary, s.btnBig)} type="submit" disabled={submitting}>
                  <FormattedMessage {...messages.saveAndContinue} />
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    );
  }
}

ChangePasswordForm = reduxForm({
  form: 'ChangeForgotPasswordForm', // a unique name for this form
  validate
})(ChangePasswordForm);

export default injectIntl(withStyles(s, bt)(ChangePasswordForm));