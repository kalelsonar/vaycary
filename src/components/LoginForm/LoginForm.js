import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import InputFieldComponent from '../Common/FormField/InputFieldComponent';

import validate from './validate';
import submit from './submit';
import messages from '../../locale/messages';
import { openForgotPasswordModal } from '../../actions/modalActions';

import s from './Login.css';
import bt from '../../components/commonStyle.css';

class LoginForm extends Component {

  static propTypes = {
    openForgotPasswordModal: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
    siteName: PropTypes.string.isRequired,
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

  render() {
    const { error, handleSubmit, submitting, dispatch, siteName } = this.props;
    const { formatMessage } = this.props.intl;
    const { openForgotPasswordModal } = this.props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <h4 className={s.titleText}>{formatMessage(messages.dashBoardHeader)} {siteName}</h4>
        <FormGroup className={bt.space3}>
          <Field
            name="email"
            type="text"
            component={InputFieldComponent}
            label={formatMessage(messages.email)}
            placeholder={formatMessage(messages.email)}
            inputClass={cx(bt.commonControlInput)}
          />
        </FormGroup>
        <FormGroup className={cx(bt.space3, bt.pwdSection)}>
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
          <a onClick={openForgotPasswordModal} className={s.modalCaptionLink}>
            <FormattedMessage {...messages.cantLogin} />
          </a>
        </FormGroup>
        <Button className={cx(bt.btnPrimary, bt.btnBig, bt.space4)} block type="submit" disabled={submitting}>
          {formatMessage(messages.login)}
        </Button>
      </form>
    );
  }

}

LoginForm = reduxForm({
  form: 'LoginForm', // a unique name for this form
  validate,
  destroyOnUnmount: false
})(LoginForm);

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  openForgotPasswordModal,
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(LoginForm)));