import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

import showToaster from '../../../helpers/showToaster';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { getSpecificConfig } from '../../../helpers/getConfigValue';
import { doUploadImageBanner } from '../../../actions/siteadmin/manageImageBanner';
import { doUploadHomeBanner } from '../../../actions/siteadmin/manageHomeBanner';

import defaultPic from '/public/adminIcons/defaultAdmin.svg';

export class ImageUploadComponent extends Component {

	static defaultProps = {
		djsConfig: {
			dictDefaultMessage: '',
			addRemoveLinks: false,
			uploadMultiple: false,
			acceptedFiles: 'image/jpeg,image/png, image/svg+xml, image/jpg',
			dictMaxFilesExceeded: 'Remove the existing image and try upload again',
			previewsContainer: false,
			hiddenInputContainer: '.dzInputContainerLogo',
			timeout: 300000,
			maxFiles: 1
		}
	};

	constructor(props) {
		super(props);
		this.dropzone = null;
	}

	componentDidUpdate() {
		const isBrowser = typeof window !== 'undefined';
		const isDocument = typeof document !== undefined;
		if (isBrowser && isDocument) {
			document.querySelector(".dz-hidden-input").style.visibility = 'visible';
			document.querySelector(".dz-hidden-input").style.opacity = '0';
			document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
		}
	}

	error = async (file) => {
		const { setLoaderComplete, loaderName } = this.props;

		if (loaderName) setLoaderComplete(loaderName);

		this.dropzone.removeFile(file);
	};

	complete = (file) => {
		const { setLoaderComplete, loaderName } = this.props;
		this.dropzone.files = [];
		if (loaderName) setLoaderComplete(loaderName);
	}

	success = async (file, fromServer) => {
		const { doUploadImageBanner, image, multipleHomeBanner, doUploadHomeBanner } = this.props;
		let fileName, oldImage;
		fileName = fromServer.file.filename;
		oldImage = image != undefined ? image : null;
		multipleHomeBanner ? await doUploadHomeBanner(fileName, oldImage) : await doUploadImageBanner(fileName, oldImage);
		this.dropzone.removeFile(file);
	}


	addedfile = async (file) => {
		const { setLoaderStart, loaderName, fieldName, setLoaderComplete } = this.props;
		let isOnline = typeof window !== 'undefined' && window.navigator.onLine;

		if (loaderName) setLoaderStart(loaderName);

		if(!isOnline) {
			showToaster({ messageId: 'offlineError', toasterType: 'error' })
			this.dropzone.removeFile(file);
			setLoaderComplete(loaderName);
			return;
		}
		
		const siteData = await getSpecificConfig({ name: ['maxUploadSize'] });

		let fileTypes = fieldName ? ['image/png'] : ['image/jpeg', 'image/png', 'image/jpg']

		if (file && (file?.accepted === false || !fileTypes?.includes(file?.type))) {
			showToaster({ messageId: 'fileTypeError', toasterType: 'error' })
			this.dropzone.removeFile(file);
			return;
		}

		if (file?.size > (1024 * 1024 * parseInt(siteData?.maxUploadSize))) {
			showToaster({ messageId: 'limitError', toasterType: 'error' })
			this.dropzone.removeFile(file);
			return;
		}

		if (loaderName) setLoaderComplete(loaderName);
	}

	render() {
		const { defaultMessage, className, djsConfig, componentConfig, success, imageBanner, placeholder, showPreviewContainer } = this.props;

		let djsConfigData = {};

		if (showPreviewContainer) {
			djsConfigData = {
				dictDefaultMessage: '',
				addRemoveLinks: false,
				uploadMultiple: false,
				acceptedFiles: 'image/jpeg,image/png, image/svg+xml, image/jpg',
				dictMaxFilesExceeded: 'Remove the existing image and try upload again',
				hiddenInputContainer: '.dzInputContainerLogo',
				timeout: 300000,
				maxFiles: 1
			}
		}

		const eventHandlers = {
			init: dz => this.dropzone = dz,
			success: imageBanner ? this.success : success,
			error: this.error,
			complete: this.complete,
			addedfile: this.addedfile
		};
		return (
			<div className={cx('listPhotoContainer')}>
				<div className={cx('dzInputContainerLogo', 'dzInputContainerLogoOpacity', className)}>
					<DropzoneComponent
						config={componentConfig}
						eventHandlers={eventHandlers}
						djsConfig={showPreviewContainer ? djsConfigData : { ...djsConfig }}
					>
						{imageBanner && <img src={defaultPic} className='photoUploadImg' alt="PictureImage" />}
						{!imageBanner && defaultMessage}
					</DropzoneComponent>
					{imageBanner && <div className={cx('uploadSizeCss', 'adminDefaultText')}>
						{placeholder}
					</div>
					}
				</div>
			</div>
		)
	}
}

const mapState = state => ({
});

const mapDispatch = {
	setLoaderStart,
	setLoaderComplete,
	doUploadImageBanner,
	doUploadHomeBanner
};

export default injectIntl(connect(mapState, mapDispatch)(ImageUploadComponent));

