import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import { formValueSelector, change } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';

import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../locale/messages';
import { doUploadLocation } from '../../../../actions/siteadmin/manageLocationImage';
import { locationuploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './Uploader.css';
import bt from '../../../../components/commonStyle.css';


class Uploader extends React.Component {

  static propTypes = {
    values: PropTypes.any,
    loading: PropTypes.bool,
  };

  success = async (file, fromServer) => {
    const { doUploadLocation, values, change } = this.props;
    let fileName, oldPicture, filePath, image;
    fileName = fromServer.file.filename;
    oldPicture = values?.image != null ? values?.image : null;
    filePath = fromServer.file.path;
    image = fileName;
    doUploadLocation(image, filePath, oldPicture, values.id);
    await change('EditPopularLocation', 'image', fileName);
  }

  render() {
    const { values, image, editPopularLocationLoader } = this.props;
    const { formatMessage } = this.props.intl;
    let loading = true;
    if (values) {
      loading = false;
    }
    let path = photosShow(locationuploadDir);
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <CommonImageDisplay
                loading={loading}
                loader={editPopularLocationLoader}
                image={path + image}
                isDefaultPic={image ? false : true}
                isDelete={false}
              />
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadImage)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadLocation'
              }}
              loaderName={'editPopularLocationLoader'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const selector = formValueSelector('EditPopularLocation');

const mapState = (state) => ({
  editPopularLocationLoader: state?.loader?.editPopularLocationLoader,
  image: selector(state, 'image'),
});

const mapDispatch = {
  change,
  doUploadLocation
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
)(Uploader);