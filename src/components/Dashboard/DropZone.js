import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import { doUploadProfilePicture, doRemoveProfilePicture } from '../../actions/manageUserProfilePicture';
import { setLoaderComplete, setLoaderStart } from '../../actions/loader/loader';
import showToaster from '../../helpers/showToaster';

import EditIcon from '/public/SiteIcons/profileEditIcon.svg';
import updateIcon from '/public/SiteIcons/writeIcon.svg';

class Dropzone extends Component {

    static propTypes = {
        doUploadProfilePicture: PropTypes.any.isRequired,
        doRemoveProfilePicture: PropTypes.any.isRequired,
        startProfilePhotoLoader: PropTypes.any.isRequired,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        // this.removeExistingFile = this.removeExistingFile.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    componentDidUpdate() {
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

    async success(file, fromServer) {
        const { setLoaderStart, setLoaderComplete } = this.props;
        const { doUploadProfilePicture, data } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != undefined ? data.picture : null;
        await setLoaderStart('profilePhotoLoader');
        await doUploadProfilePicture(fileName, oldPicture);
        await setLoaderComplete('profilePhotoLoader');
    }

    addedfile(file) {
        const { maxUploadSize, setLoaderStart, setLoaderComplete } = this.props;
        let isOnline = typeof window !== 'undefined' && window.navigator.onLine;

        if(!isOnline) {
			showToaster({ messageId: 'offlineError', toasterType: 'error' })
			this.dropzone.removeFile(file);
            setLoaderComplete('profilePhotoLoader');
			return;
		}

        setLoaderStart('profilePhotoLoader')
        let filetypes = ['image/jpeg', 'image/png', 'image/jpg']
        if (file.size > (1024 * 1024 * parseInt(maxUploadSize))) {
            this.dropzone.removeFile(file);
            showToaster({ messageId: 'limitError', toasterType: 'error' })
            setLoaderComplete('profilePhotoLoader');
        }

        if (!filetypes.includes(file.type)) {
            showToaster({ messageId: 'fileTypeError', toasterType: 'error' })
            this.dropzone.removeFile(file);
            setLoaderComplete('profilePhotoLoader');
        }
    }


    render() {
        const { formatMessage } = this.props.intl;
        const { defaultMessage, isEditIcon, maxUploadSize, className } = this.props;
        const djsConfig = {
            dictDefaultMessage: '',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: maxUploadSize,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            hiddenInputContainer: '.dzInputContainer',
            maxFiles: 1,
            init: function () {
                this.on('addedfile', function (file) {
                    if (this.files.length > 1) {
                        this.removeFile(this.files[0]);
                    }
                });
            }
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadProfilePhoto'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile,
        };

        return (
            <>
                <div className={cx('dzInputContainer', 'dashBoardDroupZone', className)}>
                    <DropzoneComponent
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                    >
                        {
                            isEditIcon &&
                            <img src={EditIcon} className={'dropShadow'} />
                        }
                        {!isEditIcon && <img src={updateIcon} className={cx('dropzoneImgSpace')} />}
                        {defaultMessage && defaultMessage}
                    </DropzoneComponent>
                </div>
            </>
        );
    }
}

const mapState = (state) => ({
    account: state.account.data,
});

const mapDispatch = {
    doUploadProfilePicture,
    doRemoveProfilePicture,
    setLoaderStart,
    setLoaderComplete
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
