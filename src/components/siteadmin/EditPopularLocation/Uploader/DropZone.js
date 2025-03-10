import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { injectIntl } from 'react-intl';

import { doUploadLocation, doRemoveLocation } from '../../../../actions/siteadmin/manageLocationImage';
import messages from '../../../../locale/messages';
import { getSpecificConfig } from '../../../../helpers/getConfigValue';
import showToaster from '../../../../helpers/showToaster';

class Dropzone extends Component {

    static propTypes = {
        doUploadLocation: PropTypes.any.isRequired,
        doRemoveLocation: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.error = this.error.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadLocation, data, change, maxUploadSize } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data.image != null ? data.image : null;
        let filePath = fromServer.file.path;
        let image = fileName;
        doUploadLocation(image, filePath, oldPicture, data.id);
        await change('EditPopularLocation', 'image', fileName);
    }

    async error(file) {
        let fileFormates = [
            'image/svg+xml',
            'application/sql',
            'application/pdf',
            'application/vnd.oasis.opendocument.presentation',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/epub+zip',
            'application/zip',
            'text/plain',
            'application/rtf',
            'application/vnd.oasis.opendocument.text',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.spreadsheet',
            'text/tab-separated-values',
            'text/calendar',
            'application/json'
        ];

        if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
            showToaster({ messageId: 'fileTypeError', toasterType: 'error' })
            return;
        }
    };

    async addedfile(file) {
        let isOnline = typeof window !== 'undefined' && window.navigator.onLine;

        if(!isOnline) {
			showToaster({ messageId: 'offlineError', toasterType: 'error' })
			this.dropzone.removeFile(file);
			return;
		}
        const siteData = await getSpecificConfig({ name: ['maxUploadSize'] });
        if (file.size > (1024 * 1024 * parseInt(siteData.maxUploadSize))) {
            showToaster({ messageId: 'limitError', toasterType: 'error' })
            this.dropzone.removeFile(file);
            return;
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: '',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadLocation'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile,
            error: this.error,
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                >
                    {formatMessage(messages.clickHeretoUploadImage)}
                </DropzoneComponent>
            </div>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    doUploadLocation,
    doRemoveLocation,
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
