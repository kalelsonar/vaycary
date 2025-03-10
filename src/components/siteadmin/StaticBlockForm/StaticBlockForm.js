import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticBlockForm.css';
import bt from '../../../components/commonStyle.css';

import BlockUploader from './BlockUploader';
import Uploader from './Uploader';
import submit from './submit';
import validate from './validate';

import messages from '../../../locale/messages';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';

class StaticBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };


  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.staticInfoBlock} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                <Row>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Col lg={6} sm={12} md={6} xs={12}>
                    <Field
                      name="headerTitle"
                      type="text"
                      component={InputFieldComponent}
                      label={formatMessage(messages.headerTitle)}
                      inputClass={bt.commonControlInput}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Field
                      name="isEnable"
                      inputClass={cx(bt.commonControlSelect)}
                      component={SelectFieldComponent}
                      label={formatMessage(messages.action)}
                      options={[
                        { value: true, label: formatMessage(messages.active) },
                        { value: false, label: formatMessage(messages.inActiveLabel) }
                      ]}
                    >
                    </Field>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="headerContent"
                      component={InputFieldComponent}
                      label={formatMessage(messages.headerTitleContent)}
                      componentClass={'textarea'}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <h3><FormattedMessage {...messages.blockLabel} /> #1</h3>
                    <div>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockImageLabel} /> 1</label>
                      <BlockUploader />
                    </div>
                    <Field
                      name="blockTitle1"
                      type="text"
                      component={InputFieldComponent}
                      label={formatMessage(messages.blockTitleLabel)}
                      labelNumber={'1'}
                      inputClass={bt.commonControlInput}
                    />
                    <Field
                      name="blockContent1"
                      component={InputFieldComponent}
                      label={formatMessage(messages.blockContentLabel)}
                      labelNumber={'1'}
                      componentClass={'textarea'}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <h3><FormattedMessage {...messages.blockLabel} /> #2</h3>
                    <div>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockImageLabel} /> 2</label>
                      <Uploader />
                    </div>
                    <Field
                      name="blockTitle2"
                      type="text"
                      component={InputFieldComponent}
                      label={formatMessage(messages.blockTitleLabel)}
                      labelNumber={'2'}
                      inputClass={bt.commonControlInput}
                    />
                    <Field
                      name="blockContent2"
                      component={InputFieldComponent}
                      label={formatMessage(messages.blockContentLabel)}
                      labelNumber={'2'}
                      componentClass={'textarea'}
                    />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, s.spaceTop3)}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                      <FormattedMessage {...messages.save} />
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

StaticBlockForm = reduxForm({
  form: 'StaticBlockForm', // a unique name for this form
  validate
})(StaticBlockForm);

export default injectIntl((withStyles(s, bt)(StaticBlockForm)));