import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'react-apollo';
import { change } from 'redux-form';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Loader from '../../../Loader/Loader';
import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';

import messages from '../../../../locale/messages';
import { photosShow } from '../../../../helpers/photosShow';
import { ogImageuploadDir } from '../../../../config';

import defaultPic from '/public/adminIcons/defaultAdmin.svg';

import bt from '../../../../components/commonStyle.css';
import s from './OgImageUploader.css';

class OgImageUploder extends Component {

    static defaultProps = {
        ogImageLoader: false
    };

    success = async (file, fromServer) => {
        const { change } = this.props;
        let fileName = fromServer.file.filename;
        await change('SiteSettingsForm', 'ogImage', fileName);
    }

    render() {
        const { ogImageLoader, image } = this.props;
        const { formatMessage } = this.props.intl;
        let path = photosShow(ogImageuploadDir);
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
                    <div className={bt.picContainerMain}>
                        <div className={bt.picContainer}>
                            <div className={bt.profilePic}>
                                <Loader
                                    show={ogImageLoader}
                                    type={"page"}
                                >
                                    <div className={'positionRelative'}>
                                        {
                                            <div
                                                style={{ backgroundImage: !image ? `url(${defaultPic})` : `url(${path}${image})` }}
                                                className={cx(bt.profileImageBg, 'darkModeProfileImageBg', { [bt.defaultImg]: !image })}
                                            />
                                        }
                                    </div>
                                </Loader>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
                        <ImageUploadComponent
                            defaultMessage={formatMessage(messages.clickHeretoUploadOgImage)}
                            componentConfig={{
                                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                                multiple: false,
                                showFiletypeIcon: false,
                                postUrl: '/uploadOgImage'
                            }}
                            loaderName={'ogImageLoader'}
                            success={this.success}
                        />
                    </Col>
                </Col>
            </Row>
        )
    }
}

const mapState = (state) => ({
    ogImageLoader: state?.loader?.ogImageLoader,
})

const mapDispatch = {
    change
}

export default compose(
    injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
)(OgImageUploder);
