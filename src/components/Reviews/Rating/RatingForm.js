import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Button,
  Form,
  Row, FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import bt from '../../../components/commonStyle.css';

// Component
import ListingDetails from './ListingDetails';
import StarRating from '../../StarRating';
import Link from '../../Link';

// Helpers
import validate from './validate';

// Graphql
import WriteReviewMutation from './WriteReviewMutation.graphql';

// Locale
import messages from '../../../locale/messages';

class RatingForm extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      reviewsCount: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      coverPhoto: PropTypes.number,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number,
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
      }))
    }),
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(s.space3, s.formGroup)}>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderStarRating = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <span className={s.starSize}>
        <StarRating
          name={input.name}
          change={input.onChange}
          editing={true}
          starCount={5}
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </span>
    );
  }

  submitForm(values, dispatch) {
    const { mutate, gotoPage2 } = this.props;
    mutate({ variables: values });
    gotoPage2();
  }

  render() {
    const { data, listTitle } = this.props;
    const { gotoPage2 } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.landingContainer}>
        <div className={s.reviewFlex}>
          <div>
            <h3 className={s.landingContentTitle}><FormattedMessage {...messages.reviewPageTitle} /></h3>
            <Form onSubmit={handleSubmit(this.submitForm)}>
              <div className={cx(s.space3, 'reviewStartRTL')}>
                <Field
                  className={cx(s.textareaInput)}
                  name="reviewContent"
                  component={this.renderFormControlTextArea}
                  label={formatMessage(messages.reviewPageTitle)}
                />
                <div className={cx(s.viewText, 'textWhite')}><FormattedMessage {...messages.reviewPageTitle1} /></div>
                <div className={s.lineCss}></div>
                <strong className={cx(s.landingStep, 'textWhite')}><span><FormattedMessage {...messages.reviewRating} /></span></strong>
                <Field
                  name="rating"
                  component={this.renderStarRating}
                />
              </div>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <hr className={s.horizontalLineThrough} />
              </Col>
              <div className={s.alignRight}>
                <Link to={"/user/reviews/you"} className={cx(s.cancelBtn, 'reviewCancelRTL')}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
                <Button className={cx(s.btn, s.button, bt.btnPrimary, bt.btnLarge)}
                  type="submit"
                  disabled={submitting}
                >
                  <FormattedMessage {...messages.submit} />
                </Button>
              </div>
            </Form>
          </div>
          <div className={s.space5}>
            <ListingDetails data={data} listTitle={listTitle} />
          </div>
        </div>
      </div>
    );
  }
}

RatingForm = reduxForm({
  form: 'RatingForm', // a unique name for this form
  validate
})(RatingForm);

export default compose(
  injectIntl,
  withStyles(s, bt),
  graphql(WriteReviewMutation),
)(RatingForm);
