import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import DocumentList from '../DocumentList';

import { getSpecificConfig } from '../../helpers/getConfigValue';
import showToaster from '../../helpers/showToaster';

import documentIcon from '/public/SiteIcons/documentUpload.svg';

const query = gql`query ShowDocumentList {
    ShowDocumentList {
        id
        userId,
        fileName,
        fileType
    }
  }`;

class DocumentUpload extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.complete = this.complete.bind(this);
    this.addedfile = this.addedfile.bind(this);
    this.dropzone = null;
  }

  componentDidMount() {
    const isBrowser = typeof window !== 'undefined';
    const isDocument = typeof document !== undefined;
    if (isBrowser && isDocument) {
      document.querySelector(".dz-hidden-input").style.visibility = 'visible';
      document.querySelector(".dz-hidden-input").style.opacity = '0';
      document.querySelector(".dz-hidden-input").style.height = '100%';
      document.querySelector(".dz-hidden-input").style.width = '100%';
      document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
    }
  }

  async complete(file) {
    const { mutate } = this.props;
    let variables = {};
    if (file && file.xhr) {
      const { files } = JSON.parse(file.xhr.response);
      let fileName = files[0].filename;
      let fileType = files[0].mimetype;
      variables = {
        fileName,
        fileType
      };
      const { data } = await mutate({
        variables,
        refetchQueries: [{ query }]
      });

      if (data && data.uploadDocument) {
        showToaster({
          messageId: data?.uploadDocument?.status === 'success' ? 'uploadDocument' : 'commonError',
          toasterType: data?.uploadDocument?.status === 'success' ? 'success' : 'error',
        })
      }
    }
    this.dropzone.removeFile(file);
  }

  async addedfile(file) {
    let isOnline = typeof window !== 'undefined' && window.navigator.onLine;

        if(!isOnline) {
			showToaster({ messageId: 'offlineError', toasterType: 'error' })
			this.dropzone.removeFile(file);
			return;
		}
    const siteData = await getSpecificConfig({ name: ['maxUploadSize'] });
    let fileFormates = [
      'image/svg+xml',
      'application/sql',
      'text/calendar',
      'application/json'
    ];
    if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
      showToaster({ messageId: 'fileTypeError', toasterType: 'error' })
      this.dropzone.removeFile(file);
      return;
    }
    if (file.size > (1024 * 1024 * parseInt(siteData.maxUploadSize))) {
      showToaster({ messageId: 'limitError', toasterType: 'error' })
      this.dropzone.removeFile(file);
      return;
    }
  }

  render() {
    const { placeholder, listId } = this.props;
    const djsConfig = {
      dictDefaultMessage: '',
      addRemoveLinks: false,
      maxFilesize: 10,
      maxFiles: 10,
      acceptedFiles: 'image/*,application/pdf',
      hiddenInputContainer: '.dzInputContainer'
    };
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.pdf'],
      postUrl: '/documents'
    };
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      complete: this.complete,
      addedfile: this.addedfile,
    };

    return (
      <div className={cx('listPhotoContainer', 'documentUpload')}>
        <div className={cx('dzInputContainer')}>
          <DropzoneComponent
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          >
            <img src={documentIcon} className={cx('photoUploadImg', 'documentUploadIcon')} alt='PictureImage' />
            <span className={'documentPlaceholder'}>{placeholder}</span>
          </DropzoneComponent>
        </div>
        <DocumentList />
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {};

export default compose(withStyles(s),

  graphql(gql`mutation uploadDocument($fileName: String,$fileType: String,){
     uploadDocument(
       fileName: $fileName,
       fileType: $fileType
     ) {    
         fileName
         fileType
         status        
        }
 }`
  ),
  (connect(mapState, mapDispatch)))
  (DocumentUpload);

