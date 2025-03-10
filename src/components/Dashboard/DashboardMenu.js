import React, { Component } from 'react';
import Link from '../Link';

// Style
import {
    Row,
    Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import s from './Dashboard.css';
import bt from '../../components/commonStyle.css';

// Locale
import messages from '../../locale/messages';

//Images
import ChatIMage from '/public/SiteIcons/chat.svg';
import ChatArrow from '/public/SiteIcons/15-1.svg';
import StarImage from '/public/SiteIcons/star.svg';
import starArrow from '/public/SiteIcons/15-2.svg';
import UserGreen from '/public/SiteIcons/userGreen.svg';
import UserGreenArrow from '/public/SiteIcons/15-3.svg';

class DashboardMenu extends React.Component {

    render() {

        return (
            <div className={bt.space2}>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <Link to={'/inbox'} className={s.noTextDecoration}>
                            <div className={cx(s.dashBoardSideMenuBox, bt.space3, 'bgBlack')}>
                                <span className={cx(s.menuIcons, 'menuIconsRTL')}><img src={ChatIMage} /></span>
                                <p className={cx(s.menuIconsTexts, 'textWhite')}>
                                    <span><FormattedMessage {...messages.allMessages} /></span>
                                    <span className={cx(s.pullRight, 'floatLeft')}><img src={ChatArrow} className={'rightArrowItineraryRTL'}/></span>
                                </p>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <Link to={'/user/reviews/about-you'} className={s.noTextDecoration}>
                            <div className={cx(s.dashBoardSideMenuBox, bt.space3, 'bgBlack')}>
                                <span className={cx(s.menuIcons, 'menuIconsRTL')}><img src={StarImage} /></span>
                                <p className={cx(s.menuIconsTexts, 'textWhite')}>
                                    <span><FormattedMessage {...messages.reviews} /></span>
                                    <span className={cx(s.pullRight, 'floatLeft')}><img src={starArrow} className={'rightArrowItineraryRTL'}/></span>
                                </p>
                            </div>
                        </Link>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={4}>
                        <Link to={'/user/edit'} className={s.noTextDecoration}>
                            <div className={cx(s.dashBoardSideMenuBox, bt.space3, 'bgBlack')}>
                                <span className={cx(s.menuIcons, 'menuIconsRTL')}><img src={UserGreen} /></span>
                                <p className={cx(s.menuIconsTexts, 'textWhite')}>
                                    <span><FormattedMessage {...messages.updateProfile} /></span>
                                    <span className={cx(s.pullRight, 'floatLeft')}><img src={UserGreenArrow} className={'rightArrowItineraryRTL'}/></span>
                                </p>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default (injectIntl, withStyles(s, bt))(DashboardMenu);