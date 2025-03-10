// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

import Avatar from '../Avatar';
import update from './update';

import messages from '../../locale/messages';

import BgImage from '/public/SiteImages/createListBg.svg';
import ListImage from '/public/SiteImages/createListImage.svg';
import darkImage from '/public/SiteImages/darkIntro.svg';
import waveIcon from '/public/SiteIcons/waving-hand.png';
class ListIntro extends Component {

    static propTypes = {
        initialValues: PropTypes.object,
        hostDisplayName: PropTypes.string.isRequired,
        guestDisplayName: PropTypes.string,
        nextPage: PropTypes.any,
        hostPicture: PropTypes.string,
        guestPicture: PropTypes.string,
        userData: PropTypes.shape({
            firstName: PropTypes.string.isRequired
        }).isRequired
    };

    static defaultProps = {
        userData: {
            firstName: ''
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            roomType: [],
            personCapacity: []
        }
    }

    UNSAFE_componentWillMount() {
        const { listingFields } = this.props;
        if (listingFields != undefined) {
            this.setState({
                roomType: listingFields.roomType,
                personCapacity: listingFields.personCapacity
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { listingFields } = nextProps;
        if (listingFields != undefined) {
            this.setState({
                roomType: listingFields.roomType,
                personCapacity: listingFields.personCapacity
            });
        }
    }


    render() {
        const { nextPage, userData, hostPicture, hostDisplayName, guestDisplayName } = this.props;
        return (
            <div className={s.listIntroBgSection}>
                <div className={cx(s.listIntroBg, 'listIntroBgImage')} style={{ backgroundImage: `url(${BgImage})` }} ></div>
                <Grid fluid className={s.listIntroContainer}>
                    <div className={s.userRight}>
                        <Avatar
                            isUser
                            title={guestDisplayName}
                            className={s.profileImage}
                        />
                    </div>
                    <h3 className={s.listIntroTitle}><img src={waveIcon} className={s.waveCss} /> <FormattedMessage {...messages.hi} />,<span className={s.userNameColor}>{userData.firstName}!</span></h3>
                    <h3 className={cx(s.listIntroTitle, s.spaceTop4, s.spaceBottom20)}><FormattedMessage {...messages.letYouGetReady} />.</h3>
                    <Button className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.space5, s.spaceTop2, s.textBold)} onClick={() => nextPage('room')}>
                        <FormattedMessage {...messages.letsStart} />
                    </Button>
                    <img className={cx(s.userDescriptionImage, 'lightModeImg')} src={ListImage} />
                    <img className={cx(s.userDescriptionImage, 'darkModeImg')} src={darkImage} />
                </Grid>
            </div>
        )
    }
}

ListIntro = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: update
})(ListIntro);

const mapState = (state) => ({
    userData: state.account.data,
    listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ListIntro)));