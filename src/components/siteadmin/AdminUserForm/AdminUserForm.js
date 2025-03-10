import React, { Component } from 'react';
import Field from 'redux-form/lib/Field';
import reduxForm from 'redux-form/lib/reduxForm';
import formValueSelector from 'redux-form/lib/formValueSelector';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';

import validate from './validate';
import messages from '../../../locale/messages';
import { createAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

import bt from '../../../components/commonStyle.css';
import s from './AdminUserForm.css';

class AdminUserForm extends Component {

  static defaultProps = {
    roles: []
  };

  constructor(props) {
    super(props);
  }

  handleFormSubmit = async (values) => {
    const { createAdminUser, paginationData, currentPage } = this.props;
    await createAdminUser(
      values?.id,
      values?.email,
      values?.password,
      values?.roleId,
      currentPage
    );
    !values?.id && paginationData(1);
  }

  render() {
    const { error, handleSubmit, submitting, id, roles } = this.props;
    const { formatMessage } = this.props.intl;

    const roleIdValue = [
      { value: '', label: formatMessage(messages.selectRoleLabel) }
    ]

    roles?.results?.length > 0 && roles?.results?.map((item, key) => {
      roleIdValue?.push({
        value: item?.id,
        label: item?.name
      })
    })

    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space2}>
            <Field
              name="email"
              type="text"
              component={InputFieldComponent}
              label={formatMessage(messages.emailLabel)}
              inputClass={cx(bt.commonControlInput)}
            />
          </FormGroup>
          <FormGroup className={s.space2}>
            <Field
              name="password"
              type="password"
              component={InputFieldComponent}
              label={formatMessage(messages.password)}
              inputClass={cx(bt.commonControlInput)}
            />
            <p className={cx(s.userText, s.spaceTop1)}><FormattedMessage {...messages.adminUserDesc} /></p>
          </FormGroup>
          <FormGroup className={s.space3}>
            <Field
              name="roleId"
              component={SelectFieldComponent}
              label={formatMessage(messages.roleLabel)}
              inputClass={cx(bt.commonControlSelect, 'adminRoleSelectAR')}
              options={roleIdValue}
            />
          </FormGroup>
          <FormGroup className={s.space1}>
            <div className={cx(bt.textAlignRight, 'modaltextAignRightRtl')}>
              <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                {id ? <FormattedMessage {...messages.update} /> : <FormattedMessage {...messages.addLabel} />}
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AdminUserForm = reduxForm({
  form: "AdminUserForm", // a unique name for this form
  validate,
})(AdminUserForm);

const selector = formValueSelector('AdminUserForm');

const mapState = (state) => ({
  id: selector(state, 'id')
});

const mapDispatch = {
  createAdminUser
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminUserForm)));