import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';

import AdminStarRating from '../AdminStarRating';
import Link from '../../Link';

import validate from './validate';
import WriteUserReviewMutation from './WriteUserReviewMutation.graphql';
import showToaster from '../../../helpers/showToaster';
import messages from '../../../locale/messages';

import s from './UserReviewsForm.css';
import bt from '../../../components/commonStyle.css'
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

class UserReviewsForm extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        initialValues: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    renderStarRating = ({ input, label, meta: { touched, error }, className, children }, value) => {
        return (
            <FormGroup className={s.space3}>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3}>
                        <label className={s.labelTextNew} >{label}</label>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9} className="floatLeft">
                        <span className={s.starSize}>
                            <AdminStarRating
                                name={input.name}
                                change={input.onChange}
                                value={input.value}
                                editing={true}
                            />
                            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                        </span>
                    </Col>
                </Row>
            </FormGroup>
        )
    }

    async submitForm(values, dispatch) {
        const { mutate } = this.props;
        const { data } = await mutate({ variables: values });
        if (data && data.writeUserReview) {
            if (data.writeUserReview.status === '200') {

                let requestContent = values.id ? 'updated' : 'submitted'
                showToaster({ messageId: 'writeUserReview', toasterType: 'success', requestContent })
            } else if (data.writeUserReview.status === '404') {
                showToaster({ messageId: 'invalidId', toasterType: 'error' })
            } else {
                showToaster({ messageId: 'userReviewError', toasterType: 'error' })
            }
        }
    }
    render() {
        const { formatMessage } = this.props.intl;
        const { error, handleSubmit, submitting, initialValues } = this.props;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.managementReviews} /></h1>

                    <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
                        <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                            <Link to={"/siteadmin/user-reviews"} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                                <FormattedMessage {...messages.goBack} />
                            </Link>
                        </div>
                        <Panel className={cx(s.panelHeader, 'bgBlack')}>
                            <form onSubmit={handleSubmit(this.submitForm)}>
                                {error && <strong>{formatMessage(error)}</strong>}
                                <FormGroup>
                                    <Row>
                                        <Col xs={12} sm={3} md={3} lg={3}>
                                            <label className={s.labelTextNew} >{formatMessage(messages.reviewContentLabel)}</label>
                                        </Col>
                                        <Col xs={12} sm={9} md={9} lg={9}>
                                            <Field name="reviewContent"
                                                component={InputFieldComponent}
                                                inputClass={s.textareaInput}
                                                componentClass={'textarea'}

                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>

                                <Field name="rating"
                                    component={this.renderStarRating}
                                    label={formatMessage(messages.reviewRating)} />
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                                            <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                                                <FormattedMessage {...messages.submit} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </form>
                        </Panel>
                    </Col>
                </div>
            </div>
        );
    }

}

UserReviewsForm = reduxForm({
    form: 'UserReviewsForm', // a unique name for this form
    validate
})(UserReviewsForm);

export default compose(injectIntl,
    withStyles(s, bt),
    graphql(WriteUserReviewMutation)
)(UserReviewsForm);