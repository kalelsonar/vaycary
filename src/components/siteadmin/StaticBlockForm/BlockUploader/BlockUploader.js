import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../locale/messages';
import { doRemoveStaticImage, doUploadStaticImage } from '../../../../actions/siteadmin/manageStaticBlock';
import { doRemoveLogo } from '../../../../actions/siteadmin/manageLogo';
import { homebanneruploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './BlockUploader.css';
import bt from '../../../../components/commonStyle.css';

class BlockUploader extends React.Component {

  static propTypes = {
    staticImageLoading: PropTypes.bool,
    doUploadStaticImage: PropTypes.any.isRequired,
    doRemoveStaticImage: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    staticImageLoading: false
  };

  success = async (file, fromServer) => {
    const { doUploadStaticImage, change, getLogoData: { getStaticInfo } } = this.props;
    let fileName, oldPicture, filePath;
    fileName = fromServer.file.filename;
    oldPicture = getStaticInfo != null ? getStaticInfo[0].image : null;
    filePath = fromServer.file.path;
    await doUploadStaticImage(fileName, filePath, oldPicture, 'block1');
    await change('StaticBlockForm', 'blockImage1', fileName);
  }

  deleteImage = async () => {
    const { doRemoveStaticImage, getLogoData: { getStaticInfo } } = this.props;
    doRemoveStaticImage(getStaticInfo[0]?.image, 'block1')
  }

  render() {
    const { getLogoData: { loading, getStaticInfo }, staticImageLoading, blockImageLoader1 } = this.props;
    const { formatMessage } = this.props.intl;
    const getStaticImageValue = getStaticInfo?.[0]?.image;

    let path = photosShow(homebanneruploadDir);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={bt.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              {
                <CommonImageDisplay
                  loading={loading}
                  loader={blockImageLoader1}
                  image={path + getStaticImageValue}
                  isDelete={true}
                  isDefaultPic={getStaticImageValue ? false : true}
                  deleteImage={this.deleteImage}
                />
              }
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(s.fullWidth, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadImage)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadHomeBanner'
              }}
              loaderName={'blockImageLoader1'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  staticImageLoading: state?.homeBannerImages?.staticImageLoading,
  blockImageLoader1: state?.loader?.blockImageLoader1
});

const mapDispatch = {
  doRemoveStaticImage,
  doUploadStaticImage,
  doRemoveLogo,
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
  query ($name: String) {
    getStaticInfo(name: $name) {
      name
      image
      content
      title
    }
  }
    `, {
    name: 'getLogoData',
    options: {
      ssr: false,
      variables: {
        name: 'block1'
      },
    }
  }),
)(BlockUploader);