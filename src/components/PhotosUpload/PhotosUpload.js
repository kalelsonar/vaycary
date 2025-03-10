import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import PhotosList from '../PhotosList';

import dropzoneErrors from '../../helpers/dropzoneErrors';
import messages from '../../locale/messages';
import showToaster from '../../helpers/showToaster';
import { getSpecificConfig } from '../../helpers/getConfigValue';
import { createListPhotos, removeListPhotos } from '../../actions/manageListPhotos';

import PictureImage from '/public/SiteIcons/photoUpload.svg';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

class PhotosUpload extends Component {

  static propTypes = {
    createListPhotos: PropTypes.any.isRequired,
    removeListPhotos: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.dropzone = null;
    this.state = {
      djsConfig: {},
      maxSize: 10
    }
  }

  async componentDidMount() {
    const { placeholder } = this.props;
    const isBrowser = typeof window !== 'undefined';
    const isDocument = typeof document !== undefined;
    const siteData = await getSpecificConfig({ name: ['maxUploadSize'] });
    this.setState({
      maxSize: siteData && siteData?.maxUploadSize
    });
    if (isBrowser && isDocument) {
      document.querySelector(".dz-hidden-input").style.visibility = 'visible';
      document.querySelector(".dz-hidden-input").style.opacity = '0';
      document.querySelector(".dz-hidden-input").style.height = '100%';
      document.querySelector(".dz-hidden-input").style.width = '100%';
      document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
    }

    if (placeholder) {
      this.setState({
        djsConfig: {
          dictDefaultMessage: placeholder,
          addRemoveLinks: false,
          maxFilesize: this.state.maxSize,
          maxFiles: 20,
          acceptedFiles: 'image/jpeg,image/png',
          hiddenInputContainer: '.dzInputContainer',
        }
      });
    }
  }

  UNSAFE_componentWillMount() {
    const { placeholder } = this.props;

    if (placeholder) {
      this.setState({
        djsConfig: {
          dictDefaultMessage: placeholder,
          addRemoveLinks: false,
          maxFilesize: this.state.maxSize,
          maxFiles: 20,
          acceptedFiles: 'image/jpeg,image/png',
          hiddenInputContainer: '.dzInputContainer',
        }
      });
    }
  }

  error = async (file) => {
    const { maxSize } = this.state;
    dropzoneErrors(file, maxSize);
    this.dropzone.removeFile(file);
  };

  complete = (file) => {
    const { listId, createListPhotos } = this.props;

    let isOnline = typeof window !== 'undefined' && window.navigator.onLine;

    if (!isOnline) {
      showToaster({ messageId: 'offlineError', toasterType: 'error' })
      this.dropzone.removeFile(file);
      return;
    }
    if (file && file.xhr) {
      const { files } = JSON.parse(file.xhr.response);
      let fileName = files[0].filename;
      let fileType = files[0].mimetype;
      if (listId != undefined) {
        createListPhotos(listId, fileName, fileType);
      }
      this.dropzone.removeFile(file);
    }
  }

  render() {
    const { listId, maxUploadSize } = this.props;
    const { djsConfig } = this.state;

    const componentConfig = {
      iconFiletypes: ['.jpg', '.png'],
      postUrl: '/photos'
    };
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      complete: this.complete,
      error: this.error,
    };

    return (
      <div className={cx('listPhotoContainer')}>
        <div className={cx('dzInputContainer', 'svgImg')}>
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          >
            <img src={PictureImage} className={'photoUploadImg'} alt='PictureImage' />
          </DropzoneComponent>
        </div>
        <div className={'uploadSizeCss'}>
          <FormattedMessage {...messages.uploadSizedLabel} /> {maxUploadSize}MB
        </div>
        <PhotosList listId={listId} />
      </div>
    );
  }
}

const mapState = (state) => ({
  maxUploadSize: state?.siteSettings?.data?.maxUploadSize
});

const mapDispatch = {
  createListPhotos,
  removeListPhotos,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PhotosUpload)));
