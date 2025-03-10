import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import Loader from '../../Loader';
import ImageUploadComponent from '../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../CommonImageDisplay/CommonImageDisplay';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

import submit from './submit';
import validate from './validate';
import messages from '../../../locale/messages';
import { doUploadImageBanner } from '../../../actions/siteadmin/manageImageBanner';
import { photosShow } from '../../../helpers/photosShow';
import { banneruploadDir } from '../../../config';

import s from './ImageBannerForm.css';
import bt from '../../../components/commonStyle.css';

class ImageBannerForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
  };

  success = async (file, fromServer) => {
    const { doUploadImageBanner, image } = this.props;
    let fileName, oldImage;
    fileName = fromServer.file.filename;
    oldImage = image != undefined ? image : null;
    await doUploadImageBanner(fileName, oldImage);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, image, bannerUploaderLoading } = this.props;
    let path = photosShow(banneruploadDir);

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <h1 className={s.headerTitle}><FormattedMessage {...messages.homepageBannererSettings} /></h1>
        <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
          <Panel className={cx(s.panelHeader, 'bgBlack')}>
            <form onSubmit={handleSubmit(submit)}>
              {error && <strong>{formatMessage(error)}</strong>}
              <FormGroup className={bt.space3}>
                <label className={s.labelTextNew} ><FormattedMessage {...messages.bannerImage} /></label>
                <div className={bt.space3}>
                  <div className='imageBannerDropzoneContainer'>
                    <ImageUploadComponent
                      placeholder={formatMessage(messages.photosPlaceholder)}
                      componentConfig={{
                        iconFiletypes: ['.jpg', '.png', '.jpeg'],
                        multiple: false,
                        showFiletypeIcon: false,
                        postUrl: '/uploadBanner'
                      }}
                      className={cx('adminPhotoUplod', 'dzInputContainer')}
                      imageBanner={true}
                      showPreviewContainer={true}
                    />
                  </div>
                  <Loader
                    show={bannerUploaderLoading}
                    type={"page"}
                  >
                    {
                      image != null &&
                      <Row>
                        <Col xs={12} sm={6} md={6} lg={4}>
                          <CommonImageDisplay
                            loader={bannerUploaderLoading}
                            image={image && path + image}
                          />
                        </Col>
                      </Row>
                    }
                  </Loader>
                </div>
              </FormGroup>
              <Field name="title" type="text" component={InputFieldComponent} label={formatMessage(messages.titleAdminLabel)} inputClass={cx(bt.commonControlInput)} />
              <Field name="description" type="text" component={InputFieldComponent} label={formatMessage(messages.descriptionAdminLabel)} inputClass={cx(bt.commonControlInput)} />
              <Field name="buttonLabel" type="text" component={InputFieldComponent} label={formatMessage(messages.buttonLabel)} inputClass={cx(bt.commonControlInput)} />
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

ImageBannerForm = reduxForm({
  form: 'ImageBannerForm',
  validate
})(ImageBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state?.siteSettings?.bannerUploaderLoading,
});

const mapDispatch = {
  doUploadImageBanner
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ImageBannerForm)));