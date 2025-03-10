import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import { formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';

import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../locale/messages';
import { doRemoveStaticImageBlock, doUploadStaticImageBlock } from '../../../../actions/siteadmin/manageStaticBlock';
import { homebanneruploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './Uploader.css';
import bt from '../../../../components/commonStyle.css';

class Uploader extends React.Component {

  static propTypes = {
    doRemoveStaticImageBlock: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getStaticInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    }
  };

  success = async (file, fromServer) => {
    const { doUploadStaticImageBlock, getLogoData: { getStaticInfo }, change } = this.props;
    let fileName, oldPicture, filePath;
    fileName = fromServer.file.filename;
    oldPicture = getStaticInfo != null ? getStaticInfo[0].image : null;
    filePath = fromServer.file.path;
    await doUploadStaticImageBlock(fileName, filePath, oldPicture, 'block2');
    await change('StaticBlockForm', 'blockImage2', fileName);
  }

  deleteImage = async () => {
    const { getLogoData: { getStaticInfo }, doRemoveStaticImageBlock } = this.props;
    await doRemoveStaticImageBlock(getStaticInfo[0]?.image, 'block2')
  }

  render() {
    const { getLogoData: { loading, getStaticInfo }, blockImageLoader2 } = this.props;
    const { formatMessage } = this.props.intl;
    const getStaticImageValue = getStaticInfo?.[0]?.image;
    let path = photosShow(homebanneruploadDir);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={bt.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <CommonImageDisplay
                loading={loading}
                loader={blockImageLoader2}
                image={path + getStaticImageValue}
                isDelete={true}
                isDefaultPic={getStaticImageValue ? false : true}
                deleteImage={this.deleteImage}
              />
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
              loaderName={'blockImageLoader2'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const selector = formValueSelector('StaticBlockForm');

const mapState = (state) => ({
  image: selector(state, 'blockImage1'),
  blockImageLoader2: state?.loader?.blockImageLoader2
});

const mapDispatch = {
  doRemoveStaticImageBlock,
  doUploadStaticImageBlock,
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
        name: 'block2'
      },
    }
  }),
)(Uploader);