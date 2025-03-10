import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import cx from 'classnames';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import ImageUploadComponent from '../../../Common/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';
import InputFieldComponent from '../../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../../Common/FormField/SelectFieldComponent';

import messages from '../../../../locale/messages';
import submit from './submit';
import validate from './validate';
import { homebanneruploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './WhyHostFormBlock2.css';
import bt from '../../../../components/commonStyle.css';

class WhyHostFormBlock2 extends Component {

  constructor(props) {
    super(props);
  }

  success = async (file, fromServer) => {
    const { change } = this.props;
    await change('image', fromServer && fromServer.file.filename);
  }


  render() {

    const { error, handleSubmit, submitting, reviewId, image, whyHostLoader2 } = this.props;
    const { formatMessage } = this.props.intl;
    let path = photosShow(homebanneruploadDir);

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <Grid fluid>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock2} /></h1>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
              <Panel className={cx(s.panelHeader, 'bgBlack')}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Field
                    name="userName"
                    type="text"
                    component={InputFieldComponent}
                    inputClass={bt.commonControlInput}
                    label={formatMessage(messages.userNameLabel)}
                  />
                  <div className={cx(bt.picContainerMain, bt.space3)}>
                    <label className={s.labelTextNew} >{formatMessage(messages.imageLabel)}</label>
                    <div className={cx(bt.picContainer, 'bgBlack')}>
                      <CommonImageDisplay
                        loader={whyHostLoader2}
                        image={path + image}
                        isDefaultPic={image ? false : true}
                        isDelete={false}
                      />
                    </div>
                    <div className={cx('uploadPicInputHide', bt.spaceTop3)}>
                      <div className={cx(s.profileNoPadding, bt.btnPrimary, bt.noPadding, 'photoUploadBtn')}>
                        <ImageUploadComponent
                          subTextClass={s.subText}
                          subText={formatMessage(messages.Maximumupload)}
                          defaultMessage={formatMessage(messages.dropzoneUpload)}
                          componentConfig={{
                            iconFiletypes: ['.jpg', '.png', '.svg'],
                            multiple: false,
                            showFiletypeIcon: false,
                            postUrl: '/uploadHomeBanner'
                          }}
                          success={this.success}
                          loaderName={'whyHostLoader2'}
                        />
                      </div>
                    </div>
                  </div>
                  <Field
                    name="reviewContent"
                    component={InputFieldComponent}
                    componentClass={'textarea'}
                    label={formatMessage(messages.reviewContentLabel)}
                    inputClass={bt.commonControlInput}
                  />
                  {reviewId && <div className={bt.space3}> <Field
                    name="isEnable"
                    inputClass={cx(bt.commonControlSelect)}
                    component={SelectFieldComponent}
                    label={formatMessage(messages.status)}
                    options={[
                      { value: true, label: formatMessage(messages.enableLabel) },
                      { value: false, label: formatMessage(messages.disableLabel) }
                    ]}
                  >
                  </Field>
                  </div>}
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

WhyHostFormBlock2 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock2);

const selector = formValueSelector('WhyHostForm');
const mapState = state => ({
  image: selector(state, 'image'),
  whyHostLoader2: state?.loader?.whyHostLoader2
});
const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(WhyHostFormBlock2)));