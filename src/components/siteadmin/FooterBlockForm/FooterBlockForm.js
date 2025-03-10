import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FooterBlockForm.css';
import bt from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

class FooterBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <h1 className={s.headerTitle}><FormattedMessage {...messages.footerBlockLabel} /></h1>
        <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
          <Panel className={cx(s.panelHeader, 'bgBlack')}>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <Field
                name="title1"
                type="text"
                component={InputFieldComponent}
                label={formatMessage(messages.titleAdminLabel)}
                placeholder={formatMessage(messages.titleAdminLabel)}
                inputClass={bt.commonControlInput}
                labelNumber={'1'}
              />
              <Field
                name="content1"
                component={InputFieldComponent}
                label={formatMessage(messages.contentLabel)}
                componentClass={'textarea'}
                labelNumber={'1'}
              />
              <Field
                name="title2"
                type="text"
                component={InputFieldComponent}
                label={formatMessage(messages.titleAdminLabel)}
                placeholder={formatMessage(messages.titleAdminLabel)}
                labelNumber={'2'}
                inputClass={bt.commonControlInput}
              />
              <Field
                name="content2"
                component={InputFieldComponent}
                label={formatMessage(messages.contentLabel)}
                labelNumber={'2'}
                componentClass={'textarea'}
              />
              <Field
                name="title3"
                type="text"
                component={InputFieldComponent}
                label={formatMessage(messages.titleAdminLabel)}
                placeholder={formatMessage(messages.titleAdminLabel)}
                labelNumber={'3'}
                inputClass={bt.commonControlInput}
              />
              <Field
                name="content3"
                component={InputFieldComponent}
                label={formatMessage(messages.contentLabel)}
                labelNumber={'3'}
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
      </div>
    );
  }

}

FooterBlockForm = reduxForm({
  form: 'FooterBlockForm', // a unique name for this form
  validate
})(FooterBlockForm);

export default injectIntl(withStyles(s, bt)(FooterBlockForm));