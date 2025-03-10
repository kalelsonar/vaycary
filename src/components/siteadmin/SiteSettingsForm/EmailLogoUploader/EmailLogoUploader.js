import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { change } from 'redux-form';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../locale/messages';

import { doRemoveEmailLogo } from '../../../../actions/siteadmin/manageLogo';
import { doUploadEmailLogo } from '../../../../actions/siteadmin/manageLogo';
import { photosShow } from '../../../../helpers/photosShow';
import { logouploadDir } from '../../../../config';

import s from './EmailLogoUploader.css';
import bt from '../../../../components/commonStyle.css';

class EmailLogoUploader extends React.Component {

  static propTypes = {
    emailLogoUploaderLoading: PropTypes.bool,
    doRemoveEmailLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getEmailLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    getLogoData: {
      loading: true
    },
    emailLogoUploaderLoading: false
  };

  success = async (file, fromServer) => {
    const { doUploadEmailLogo, getLogoData: { getEmailLogo }, change } = this.props;
    let fileName, oldPicture, filePath;
    fileName = fromServer.file.filename;
    oldPicture = getEmailLogo != null ? getEmailLogo.value : null;
    filePath = fromServer.file.path;
    doUploadEmailLogo(fileName, filePath, oldPicture);
    await change('SiteSettingsForm', 'emailLogo', fileName);
  }

  deleteImage = async () => {
    const { doRemoveEmailLogo, getLogoData: { getEmailLogo } } = this.props;
    await doRemoveEmailLogo(getEmailLogo?.value)
  }

  render() {
    const { getLogoData: { loading, getEmailLogo }, emailLogoUploaderLoading, emailLogoLoader } = this.props;
    const { formatMessage } = this.props.intl;

    let path = photosShow(logouploadDir);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <div className={bt.profilePic}>
                {
                  <CommonImageDisplay
                    loading={loading}
                    loader={emailLogoLoader}
                    image={path + getEmailLogo?.value}
                    isDefaultPic={getEmailLogo?.value ? false : true}
                    isDelete={true}
                    deleteImage={this.deleteImage}
                  />
                }
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
                postUrl: '/uploadEmailLogo'
              }}
              loaderName={'emailLogoLoader'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  emailLogoUploaderLoading: state?.siteSettings?.emailLogoUploaderLoading,
  emailLogoLoader: state?.loader?.emailLogoLoader
});

const mapDispatch = {
  doRemoveEmailLogo,
  doUploadEmailLogo,
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getEmailLogo{
        getEmailLogo {
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
)(EmailLogoUploader);