import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import submit from './submit';
import validate from './validate';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Row,
  Grid
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLoginForm.css';
import bt from '../../../components/commonStyle.css';

//Images
import adminLoginImage from '/public/adminIcons/LoginPageVector.svg';
import AdminLogo from '/public/adminIcons/RentALL-logo.png';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

class AdminLoginForm extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoad: true
    }
  }

  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    isBrowser && this.setState({
      isLoad: false
    });
  }

  renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label className={cx(s.labelTextNew, s.loginLabel)}>{label}</label>
        <FormControl {...input} placeholder={placeholder} type={type} className={cx(bt.commonControlInput, s.loginInput)} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, siteSettingsData } = this.props;
    const { isLoad } = this.state;
    const { formatMessage } = this.props.intl;
    let adminLogo = siteSettingsData && siteSettingsData.Logo ? `/images/logo/${siteSettingsData.Logo}` : AdminLogo;
    return (
      <div className={'loginpage'}>
        <Grid fluid>
          <Row>
            <div className={s.loginMainBg}>
              <div className={s.loginBg} style={{ backgroundImage: `url(${adminLoginImage})` }} />
              <div className={cx(s.formSection, 'bgBlack')}>
                <div className={s.formInner}>
                  <div className={s.loginTitleScetion}>
                    <img src={adminLogo} />
                    <p className={s.loginTitle}><FormattedMessage {...messages.welcomeAdminLabel} /></p>
                  </div>
                  <form onSubmit={handleSubmit(submit)}>
                    {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    <FormGroup className={cx(s.space3)}>
                      <Field
                        name="email"
                        type="text"
                        component={InputFieldComponent}
                        label={formatMessage(messages.email)}
                        placeholder={formatMessage(messages.email)}
                        inputClass={cx(bt.commonControlInput, s.loginInput)}
                      />
                    </FormGroup>
                    <FormGroup className={cx(s.space3)}>
                      <Field
                        name="password"
                        type="password"
                        component={InputFieldComponent}
                        label={formatMessage(messages.password)}
                        placeholder={formatMessage(messages.password)}
                        inputClass={cx(bt.commonControlInput, s.loginInput)}
                      />
                    </FormGroup>
                    <div className={cx(s.space2, s.spaceTop5)}>
                      <Button
                        className={cx(bt.btnPrimary, bt.fullWidth, s.loginbtn)}
                        type="submit"
                        disabled={submitting || isLoad}
                      >
                        <FormattedMessage {...messages.logInLabel} />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    )
  }

}

const mapState = (state) => ({
  siteSettingsData: state.siteSettings.data
});

const mapDispatch = {};

AdminLoginForm = reduxForm({
  form: 'AdminLoginForm', // a unique name for this form
  validate
})(AdminLoginForm);

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminLoginForm)));