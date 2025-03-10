import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import cx from 'classnames';
import {
    Button,
    Row,
    FormGroup,
    Col,
    FormControl,
    Grid
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock6.css';
import bt from '../../../../components/commonStyle.css';
import Image from './Image'
import Image2 from './Image2'

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
import InputFieldComponent from '../../../Common/FormField/InputFieldComponent';

class WhyHostFormBlock6 extends Component {

    render() {

        const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <Grid fluid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock6} /></h1>
                            <form onSubmit={handleSubmit(submit)}>
                                {error && <strong>{formatMessage(error)}</strong>}
                                <Row>
                                    <Col xs={12} sm={12} md={6} lg={6} className={bt.space3}>
                                        <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionBanner} /> 1</label>
                                        <Image />
                                        <Field
                                            name="quoteSectionTitle1"
                                            type="text"
                                            component={InputFieldComponent}
                                            placeholder={formatMessage(messages.quoteSectionTitle)}
                                            label={formatMessage(messages.quoteSectionTitle)}
                                            labelNumber={'1'}
                                            inputClass={bt.commonControlInput}
                                        />
                                        <Field
                                            name="quoteSectionContent1"
                                            component={InputFieldComponent}
                                            componentClass={'textarea'}
                                            label={formatMessage(messages.quoteSectionContent)}
                                            labelNumber={'1'}
                                        />
                                        <Field
                                            name="quoteSectionButton1"
                                            type="text"
                                            component={InputFieldComponent}
                                            label={formatMessage(messages.quoteSectionButton)}
                                            placeholder={formatMessage(messages.quoteSectionButton)}
                                            labelNumber={'1'}
                                            inputClass={bt.commonControlInput}
                                        />
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={6} className={bt.space3}>
                                        <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionBanner} /> 2</label>
                                        <Image2 />
                                        <Field
                                            name="quoteSectionTitle2"
                                            type="text"
                                            component={InputFieldComponent}
                                            label={formatMessage(messages.quoteSectionTitle)}
                                            placeholder={formatMessage(messages.quoteSectionTitle)}
                                            labelNumber={'2'}
                                            inputClass={bt.commonControlInput}
                                        />
                                        <Field
                                            name="quoteSectionContent2"
                                            component={InputFieldComponent}
                                            label={formatMessage(messages.quoteSectionContent)}
                                            componentClass={'textarea'}
                                            labelNumber={'2'}
                                        />
                                        <Field
                                            name="quoteSectionButton2"
                                            type="text"
                                            component={InputFieldComponent}
                                            label={formatMessage(messages.quoteSectionButton)}
                                            labelNumber={'2'}
                                            inputClass={bt.commonControlInput}
                                        />
                                    </Col>
                                </Row>
                                <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                                        <FormattedMessage {...messages.save} />
                                    </Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

WhyHostFormBlock6 = reduxForm({
    form: 'WhyHostForm',
    validate
})(WhyHostFormBlock6);

export default injectIntl(withStyles(s, bt)(WhyHostFormBlock6));