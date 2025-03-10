import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import ImageUploadComponent from '../../Common/ImageUploadComponent/ImageUploadComponent';

import messages from '../../../locale/messages';
import { doUploadHomeBanner } from '../../../actions/siteadmin/manageHomeBanner';
import { getHomeBannerImages } from '../../../actions/getHomeBannerImages';
import { deleteHomeBanner } from '../../../actions/siteadmin/deleteHomeBanner';

import DeleteIcon from '/public/adminIcons/dlt.png';

import s from './HomeBannerForm.css';
import bt from '../../../components/commonStyle.css';

class HomeBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
  };

  success = async (file, fromServer) => {
    const { doUploadHomeBanner, data } = this.props;
    let fileName = fromServer.file.filename;
    let oldImage = data != undefined ? data : null;
    await doUploadHomeBanner(fileName, oldImage);
  }

  render() {

    const { error, homeBannerImages, deleteHomeBanner } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.homePageBanner} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={cx(s.panelHeader, s.bannerPadding, 'bgBlack')}>
              <form>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div>
                        <ImageUploadComponent
                          placeholder={formatMessage(messages.photosPlaceholder)}
                          componentConfig={{
                            iconFiletypes: ['.jpg', '.png'],
                            postUrl: '/uploadHomeBanner',
                            multiple: false,
                          }}
                          imageBanner={true}
                          className={cx('adminPhotoUplod', 'dzInputContainer')}
                          multipleHomeBanner={true}
                          showPreviewContainer={true}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
                <div className={cx('row')}>
                  {
                    homeBannerImages?.data?.length > 0 && homeBannerImages?.data?.map((item, key) => {
                      return (
                        <div key={key} className={cx('col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center', s.space3)}>
                          <div className={s.listPhotoMedia}>
                            <div className={s.bannerImageBg} style={{ backgroundImage: `url(/images/home/${item?.name})` }} />
                            <a href="javascript:void(0);" onClick={() => deleteHomeBanner(item?.id, item?.name)} className={cx(s.bannerDelete, 'bannerDeleteRtl')}>
                              {homeBannerImages?.data?.length > 1 &&
                                <img src={DeleteIcon} alt='Delete' />
                              }
                            </a>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

HomeBannerForm = reduxForm({
  form: 'HomeBannerForm',
})(HomeBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state?.siteSettings?.bannerUploaderLoading,
  homeBannerImages: state?.homeBannerImages
});

const mapDispatch = {
  getHomeBannerImages,
  deleteHomeBanner,
  doUploadHomeBanner
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(HomeBannerForm)));