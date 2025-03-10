import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Field, reduxForm, reset } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

import Link from '../../Link';
import AdminStarRating from '../AdminStarRating';

import WriteAdminReviewMutation from './WriteAdminReviewMutation.graphql';
import history from '../../../core/history';
import messages from '../../../locale/messages';
import showToaster from '../../../helpers/showToaster';
import validate from './validate';

import s from './AdminReviewsForm.css';
import bt from '../../../components/commonStyle.css';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

class AdminReviewsForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }


  renderStarRating = ({ input, label, meta: { touched, error }, className, children }, value) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={bt.space3}>
        <label className={s.labelTextNew} >{label}</label>
        <span className={s.starSize}>
          <AdminStarRating
            name={input.name}
            change={input.onChange}
            value={input.value}
            editing={true}
          />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </span>
      </FormGroup>

    )
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });
    if (data && data.writeAdminReview) {
      if (data.writeAdminReview.status === '200') {
        showToaster({
          messageId: 'writeAdminReview',
          toasterType: 'success',
          requestContent: values.id
        })

        !values.id && dispatch(reset('AdminReviewsForm'));

      } else if (data.writeAdminReview.status === '404') {
        return showToaster({ messageId: 'invalidId', toasterType: 'error' })
      } else if (data.writeAdminReview.status === '500') {
        return showToaster({ messageId: 'adminReviewError', toasterType: 'error' })
      } else {
        return showToaster({ messageId: 'userReviewError', toasterType: 'error' })
      }
      history.push('/siteadmin/reviews')
    }
  }

  render() {
    const { error, handleSubmit, submitting, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <Grid fluid>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1 className={s.headerTitle}> <FormattedMessage {...messages.writeAReview} /></h1>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
              {initialValues &&
                <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                  <Link to={'/siteadmin/reviews'} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                    <FormattedMessage {...messages.goBack} />
                  </Link>
                </div>
              }
              <Panel className={cx(s.panelHeader, 'bgBlack')}>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  {error && <strong>{error}</strong>}
                  <Field name="listId"
                    type="text"
                    component={InputFieldComponent}
                    label={formatMessage(messages.listId)}
                    inputClass={bt.commonControlInput}
                  />
                  <Field name="reviewContent"
                    component={InputFieldComponent}
                    inputClass={s.textareaInput}
                    label={formatMessage(messages.reviewContentLabel)}
                    componentClass={'textarea'}
                  />
                  <Field name="rating"
                    component={this.renderStarRating}
                    label={formatMessage(messages.reviewRating)} />
                  <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                      <FormattedMessage {...messages.submitLabel} />
                    </Button>
                  </div>
                </form>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

AdminReviewsForm = reduxForm({
  form: 'AdminReviewsForm', // a unique name for this form
  validate
})(AdminReviewsForm);

export default compose(injectIntl,
  withStyles(s, bt),
  graphql(WriteAdminReviewMutation)
)(AdminReviewsForm);