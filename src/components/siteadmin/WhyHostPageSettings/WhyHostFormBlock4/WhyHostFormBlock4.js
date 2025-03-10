import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import cx from 'classnames';
import {
    Button,
    FormGroup,
    Col,
    FormControl,
    Panel,
    Grid,
    Row
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock4.css';
import bt from '../../../../components/commonStyle.css';
import Image from './Image'

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
import InputFieldComponent from '../../../Common/FormField/InputFieldComponent';

class WhyHostFormBlock4 extends Component {

    render() {

        const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <Grid fluid>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock4} /></h1>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
                            <Panel className={cx(s.panelHeader, 'bgBlack')}>
                                <form onSubmit={handleSubmit(submit)}>
                                    {error && <strong>{formatMessage(error)}</strong>}
                                    <FormGroup className={bt.space3}>
                                        <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionBannerLabel} /></label>
                                        <Image />
                                    </FormGroup>
                                    <Field
                                        name="coverSectionTitle1"
                                        type="text"
                                        component={InputFieldComponent}
                                        placeholder={formatMessage(messages.coverSectionTitleLabel)}
                                        label={formatMessage(messages.coverSectionTitleLabel)}
                                        labelNumber={'1'}
                                        inputClass={bt.commonControlInput}
                                    />
                                    <Field
                                        name="coverSectionContent1"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionContentLabel)}
                                        labelNumber={'1'}
                                        componentClass={'textarea'}
                                    />
                                    <Field
                                        name="coverSectionFeature1"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionFeatureLabel)}
                                        labelNumber={'1'}
                                        componentClass={'textarea'}
                                    />
                                    <Field
                                        name="coverSectionFeature2"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionFeatureLabel)}
                                        labelNumber={'2'}
                                        componentClass={'textarea'}
                                    />
                                    <Field
                                        name="coverSectionFeature3"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionFeatureLabel)}
                                        labelNumber={'3'}
                                        componentClass={'textarea'}
                                    />
                                    <Field
                                        name="coverSectionFeature4"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionFeatureLabel)}
                                        labelNumber={'4'}
                                        componentClass={'textarea'}
                                    />
                                    <Field
                                        name="coverSectionFeature5"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionFeatureLabel)}
                                        labelNumber={'5'}
                                        componentClass={'textarea'}
                                    />
                                    <Field
                                        name="coverSectionFeature6"
                                        component={InputFieldComponent}
                                        label={formatMessage(messages.coverSectionFeatureLabel)}
                                        labelNumber={'6'}
                                        componentClass={'textarea'}

                                    />
                                    <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                                        <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                                            <FormattedMessage {...messages.save} />
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

WhyHostFormBlock4 = reduxForm({
    form: 'WhyHostForm',
    validate
})(WhyHostFormBlock4);

export default injectIntl(withStyles(s, bt)(WhyHostFormBlock4));