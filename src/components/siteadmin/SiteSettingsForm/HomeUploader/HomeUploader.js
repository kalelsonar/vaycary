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
import { doRemoveHomeLogo, doUploadHomeLogo } from '../../../../actions/siteadmin/manageLogo';
import { logouploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './HomeUploader.css';
import bt from '../../../../components/commonStyle.css';

class HomeUploader extends React.Component {

  static propTypes = {
    homeLogoUploaderLoading: PropTypes.bool,
    doRemoveHomeLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getHomeLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    homeLogoUploaderLoading: false
  };

  success = async (file, fromServer) => {
    const { doUploadHomeLogo, getHomeLogo, change } = this.props;
    let fileName, oldPicture, filePath;
    fileName = fromServer.file.filename;
    oldPicture = getHomeLogo != null ? getHomeLogo.value : null;
    filePath = fromServer.file.path;
    await doUploadHomeLogo(fileName, filePath, oldPicture);
    await change('SiteSettingsForm', 'homeLogo', fileName);
  }

  deleteImage = async () => {
    const { doRemoveHomeLogo, getHomeLogo } = this.props;
    await doRemoveHomeLogo(getHomeLogo?.value)
  }

  render() {
    const { getLogoData: { loading, getHomeLogo }, homeLogoUploaderLoading, homeLoaderLogo } = this.props;
    const { formatMessage } = this.props.intl;
    let path = photosShow(logouploadDir);
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <div className={cx(bt.profilePic, bt.whiteImg)}>
                <CommonImageDisplay
                  loading={loading}
                  loader={homeLoaderLogo}
                  image={path + getHomeLogo?.value}
                  isDefaultPic={getHomeLogo?.value ? false : true}
                  isDelete={true}
                  deleteImage={this.deleteImage}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadLogo)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadLogo'
              }}
              loaderName={'homeLoaderLogo'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  homeLogoUploaderLoading: state?.siteSettings?.homeLogoUploaderLoading,
  homeLoaderLogo: state?.loader?.homeLoaderLogo
});

const mapDispatch = {
  doRemoveHomeLogo,
  doUploadHomeLogo,
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getHomeLogo{
        getHomeLogo {
          id
          title
          name
          value
          type
        }
      }
    `, {
    name: 'getLogoData',
    options: {
      ssr: false
    }
  }),
)(HomeUploader);
