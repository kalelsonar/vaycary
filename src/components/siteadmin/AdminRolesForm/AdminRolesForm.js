import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import CustomCheckbox from '../../CustomCheckbox';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

import messages from '../../../locale/messages';
import validate from './validate';
import { getAllAdminPrivileges } from '../../../helpers/adminPrivileges';
import { createAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

import s from './AdminRolesForm.css';
import bt from '../../../components/commonStyle.css';

class AdminRolesForm extends Component {

  constructor(props) {
    super(props);
  }

  renderCheckbox = ({ input, label, meta: { touched, error }, options, className }) => {
    const { formatMessage } = this.props.intl;
    let currentValue = input.value || [];

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <Row>
          {
            options && options.length > 0 && options.map((option, index) => {
              return (
                <Col lg={6} md={6} key={index} className={className}>
                  <div className={s.table}>
                    <div className={s.tableRow}>
                      <div className={cx(s.tableCell, s.checkBoxWidth)}>
                        <CustomCheckbox
                          {...input}
                          className={'icheckbox_square-green'}
                          value={option.id}
                          name={`${input.name}[${index}]`}
                          checked={currentValue.indexOf(option.id) !== -1}
                          onChange={(event) => {
                            const newValue = [...currentValue] || [];
                            if (event === true) {
                              newValue.push(option.id);
                            } else {
                              newValue.splice(newValue.indexOf(option.id), 1);
                            }
                            return input.onChange(newValue);
                          }}
                        />
                      </div>
                      <div className={cx(s.tableCell, s.textWidth)}>
                        {' ' + option.privilege}
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }

  handleFormSubmit = async (values) => {
    const { createAdminRole, paginationData, currentPage } = this.props;
    await createAdminRole(
      values?.id,
      values?.name,
      values?.description,
      values?.privileges,
      currentPage
    );
    !values?.id && paginationData(1);
  }

  render() {
    const { error, handleSubmit, submitting, id } = this.props;
    const { formatMessage } = this.props.intl;

    let privileges = getAllAdminPrivileges();

    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space3}>
            <Field
              name="name"
              type="text"
              component={InputFieldComponent}
              inputClass={cx(bt.commonControlInput)}
              label={formatMessage(messages.roleNameLabel)}
            />
          </FormGroup>
          <FormGroup className={s.space3}>
            <Field
              name="description"
              component={InputFieldComponent}
              componentClass={'textarea'}
              label={formatMessage(messages.descriptionAdminLabel)}
            />
          </FormGroup>
          <FormGroup className={s.space3}>
            <label className={s.labelTextNew}><FormattedMessage {...messages.privilagesLabel} /></label>
            <Field
              name="privileges"
              component={this.renderCheckbox}
              options={privileges}
              className={cx(s.space3)}
            />
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
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

AdminRolesForm = reduxForm({
  form: "AdminRolesForm", // a unique name for this form
  validate,
})(AdminRolesForm);

const selector = formValueSelector('AdminRolesForm');

const mapState = (state) => ({
  id: selector(state, 'id')
});

const mapDispatch = {
  createAdminRole
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminRolesForm)));