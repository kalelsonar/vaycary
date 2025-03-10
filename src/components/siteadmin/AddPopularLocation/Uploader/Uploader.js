import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../locale/messages';
import { doRemoveLocation } from '../../../../actions/siteadmin/manageLocationImage';
import { locationuploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './Uploader.css';
import bt from '../../../../components/commonStyle.css';

class Uploader extends React.Component {

  static propTypes = {
    image: PropTypes.any,
    doRemoveLocation: PropTypes.any.isRequired,
  };

  success = async (file, fromServer) => {
    const { change } = this.props;
    let fileName = fromServer.file.filename;
    await change('AddPopularLocation', 'image', fileName);
  }

  render() {
    const { loading, image, popularLocationLoader } = this.props;
    const { formatMessage } = this.props.intl;
    let path = photosShow(locationuploadDir);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <CommonImageDisplay
                loading={loading}
                loader={popularLocationLoader}
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
              loaderName={'popularLocationLoader'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const selector = formValueSelector('AddPopularLocation');

const mapState = (state) => ({
  popularLocationLoader: state?.loader?.popularLocationLoader,
  image: selector(state, 'image')
});

const mapDispatch = {
  doRemoveLocation,
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
)(Uploader);