import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

import validate from './validate';
import messages from '../../../locale/messages';
import showToaster from '../../../helpers/showToaster';

import s from './ChangeAdminForm.css';
import bt from '../../../components/commonStyle.css';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
class ChangeAdminForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });

    if (data && data.changeAdminUser) {
      showToaster({
        messageId: data?.changeAdminUser?.status === '200' ? 'changeAdminUser' : 'changeUserError',
        toasterType: data?.changeAdminUser?.status === '200' ? 'success' : 'error'
      })
    }
    dispatch(reset('ChangeAdminForm'));
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, title, isSuperAdmin } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <h1 className={s.headerTitle}><FormattedMessage {...messages.changeAdminPassword} /></h1>
        <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
          <Panel className={cx(s.panelHeader, 'bgBlack')}>
            <form onSubmit={handleSubmit(this.submitForm)}>
              {error && <strong>{formatMessage(error)}</strong>}
              {
                isSuperAdmin && <Field
                  name="email"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.email)}
                  note={formatMessage(messages.changeAdminPasswordDesc)}
                  inputClass={bt.commonControlInput}
                />
              }
              <Field name="password" type="password" component={InputFieldComponent} label={formatMessage(messages.password)} inputClass={bt.commonControlInput} />
              <Field name="confirmPassword" type="password" component={InputFieldComponent} label={formatMessage(messages.confirmPassword)} inputClass={bt.commonControlInput} />
              <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
            </form>
          </Panel>
        </Col>
      </div>
    );
  }

}

ChangeAdminForm = reduxForm({
  form: 'ChangeAdminForm', // a unique name for this form
  validate
})(ChangeAdminForm);

const mapState = (state) => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
});

const mapDispatch = {};

export default compose(injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation changeAdminUser($email: String, $password: String!) {
      changeAdminUser (email: $email, password: $password) {
        status
      }
    }
  `),
)(ChangeAdminForm);