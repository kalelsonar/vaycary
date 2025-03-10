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

import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';
import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';

import messages from '../../../../locale/messages';
import { logouploadDir } from '../../../../config';
import { doRemoveLogo, doUploadLogo } from '../../../../actions/siteadmin/manageLogo';
import { photosShow } from '../../../../helpers/photosShow';

import s from './Uploader.css';
import bt from '../../../../components/commonStyle.css';

class Uploader extends React.Component {

  static propTypes = {
    logoUploaderLoading: PropTypes.bool,
    doRemoveLogo: PropTypes.any.isRequired,
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
    logoUploaderLoading: false
  };

  success = async (file, fromServer) => {
    const { doUploadLogo, getLogoData: { getLogo }, change } = this.props;
    let fileName, oldPicture, filePath;
    fileName = fromServer.file.filename;
    oldPicture = getLogo != null ? getLogo?.value : null;
    filePath = fromServer.file.path;
    doUploadLogo(fileName, filePath, oldPicture);
    await change('SiteSettingsForm', 'Logo', fileName)
  }

  deleteImage = async () => {
    const { doRemoveLogo, getLogoData: { getLogo } } = this.props;
    await doRemoveLogo(getLogo.value)
  }

  render() {
    const { getLogoData: { loading, getLogo }, logoUploaderLoading, logoLoader } = this.props;
    const { formatMessage } = this.props.intl;

    let path = photosShow(logouploadDir);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <div className={bt.profilePic}>
                <CommonImageDisplay
                  loading={loading}
                  loader={logoLoader}
                  image={path + getLogo?.value}
                  isDefaultPic={getLogo?.value ? false : true}
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
              loaderName={'logoLoader'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  logoUploaderLoading: state?.siteSettings?.logoUploaderLoading,
  logoLoader: state?.loader?.logoLoader
});

const mapDispatch = {
  doRemoveLogo,
  doUploadLogo,
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getLogo{
        getLogo {
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
)(Uploader);