import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

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
import s from './BannerSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

class BannerSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };


  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <h1 className={s.headerTitle}><FormattedMessage {...messages.bannerSettings} /></h1>
        <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
          <Panel className={cx(s.panelHeader, 'bgBlack')}>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <Field name="title" type="text" component={InputFieldComponent} label={formatMessage(messages.bannerTitle)} inputClass={bt.commonControlInput} />
              <Field name="content" component={InputFieldComponent} label={formatMessage(messages.bannerDescription)} componentClass={'textarea'} />
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

BannerSettingsForm = reduxForm({
  form: 'BannerSettingsForm', // a unique name for this form
  validate
})(BannerSettingsForm);

export default injectIntl(withStyles(s, bt)(BannerSettingsForm));