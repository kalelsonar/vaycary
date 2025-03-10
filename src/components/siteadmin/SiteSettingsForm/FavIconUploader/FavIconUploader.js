import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ImageUploadComponent from '../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../locale/messages';
import { updateFaviconLogo } from '../../../../actions/siteadmin/manageLogo';
import { faviconUploadDir } from '../../../../config';
import { photosShow } from '../../../../helpers/photosShow';

import s from './FavIconUploader.css';
import bt from '../../../../components/commonStyle.css';

class FavIconUploader extends React.Component {

    static propTypes = {
        favIconLoader: PropTypes.bool,
        data: PropTypes.object
    };

    static defaultProps = {
        favIconLoader: false
    };

    success = async (file, fromServer) => {
        const { updateFaviconLogo, getSiteSettingsLogo } = this.props;
        await updateFaviconLogo('Favicon Logo', 'faviconLogo', fromServer.file.filename, getSiteSettingsLogo?.value);
    }

    render() {
        const { favIconLoader, data: { loading, getSiteSettingsLogo = {} } } = this.props;
        const { formatMessage } = this.props.intl;
        let path = photosShow(faviconUploadDir);
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.textAlignCenter, s.positionRelative)}>
                    {getSiteSettingsLogo &&
                        <div className={bt.picContainerMain}>
                            <div className={cx(bt.picContainer, 'bgBlack')}>
                                <div className={bt.profilePic}>
                                    <CommonImageDisplay
                                        loading={loading}
                                        loader={favIconLoader}
                                        image={path + getSiteSettingsLogo?.value}
                                        isDefaultPic={getSiteSettingsLogo?.value ? false : true}
                                        isDelete={false}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    <p className={s.pngFontSize}><FormattedMessage {...messages.pngOnlyLabel} /></p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
                    <div className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
                        <ImageUploadComponent
                            defaultMessage={formatMessage(messages.clickHeretoUploadFavIcon)}
                            componentConfig={{
                                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                                multiple: false,
                                showFiletypeIcon: false,
                                postUrl: '/uploadFavIcon'
                            }}
                            loaderName={'favIconLoader'}
                            success={this.success}
                            fieldName={'faveIcon'}
                        />
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapState = (state) => ({
    favIconLoader: state?.loader?.favIconLoader
});

const mapDispatch = {
    updateFaviconLogo
};

export default compose(
    injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
    graphql(gql`
        query getSiteSettingsLogo($title: String!, $name: String!) {
            getSiteSettingsLogo(title:$title, name: $name) {
                status
                errorMessage
                title
                name
                value
            }
        }
    `, {
        options: {
            ssr: true,
            variables: {
                title: 'Favicon Logo',
                name: 'faviconLogo'
            }
        }
    }),
)(FavIconUploader);