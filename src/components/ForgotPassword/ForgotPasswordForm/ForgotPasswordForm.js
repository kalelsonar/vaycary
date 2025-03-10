import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';

import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

import validate from './validate';
import submit from './submit';
import messages from '../../../locale/messages';

import s from './ForgotPasswordForm.css';
import c from '../../../components/LoginModal/LoginModal.css';
import bt from '../../../components/commonStyle.css';

class ForgotPasswordForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
  };

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { openLoginModal } = this.props;
    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
        <p><FormattedMessage {...messages.forgotPasswordInfo} /></p>
        <Field
          name="email"
          type="text"
          component={InputFieldComponent}
          label={formatMessage(messages.email)}
          placeholder={formatMessage(messages.email)}
          inputClass={bt.commonControlInput}
        />
        <Button
          className={cx(bt.btnPrimary, bt.btnBig, bt.space3)}
          type="submit"
          block
          disabled={submitting}
        >
          <FormattedMessage {...messages.sendLink} />
        </Button>
        <div className={bt.textAlignCenter}>
          <a onClick={openLoginModal} className={c.modalCaptionLink}>
            <FormattedMessage {...messages.backToLogin} />
          </a>
        </div>
      </form>
    )
  }

}

ForgotPasswordForm = reduxForm({
  form: 'ForgotPasswordForm', // a unique name for this form
  validate,
  destroyOnUnmount: true
})(ForgotPasswordForm);

export default injectIntl(withStyles(s, bt, c)(ForgotPasswordForm));