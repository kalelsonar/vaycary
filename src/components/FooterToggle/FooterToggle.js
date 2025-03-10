import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import Button from 'react-bootstrap/lib/Button';
import * as FontAwesome from 'react-icons/lib/fa';
import Footer from '../Footer';
import ReactDrawer from 'react-drawer';

import s from '!isomorphic-style-loader/!css-loader!react-drawer/lib/react-drawer.css';
import S from './FooterToggle.css';

// Locale
import messages from '../../locale/messages';

//Images
import closeIcon from '/public/SiteIcons/loginClose.svg';

class FooterToggle extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            position: 'bottom',
            noOverlay: true
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.onDrawerClose = this.onDrawerClose.bind(this);
        this.setNoOverlay = this.setNoOverlay.bind(this);
    }

    setNoOverlay(e) {
        this.setState({ noOverlay: e.target.checked });
    }
    toggleDrawer() {
        this.setState({ open: !this.state.open });
    }
    closeDrawer() {
        this.setState({ open: false });
    }
    onDrawerClose() {
        this.setState({ open: false });
    }
    render() {
        return (
            <div className={'footerBannerToggleSection'}>
                <Button
                    onClick={this.toggleDrawer}
                    disabled={this.state.open && !this.state.noOverlay}
                    className={cx(S.buttonStyle, S.buttonPosition, 'buttonPositionRTL', 'bgBlack', 'bgBlackHover', 'toggleButtonColor',
                     S.displayFlex, S.toggleBtnGap, S.buttonPositionMobile)}
                >
                    {!this.state.open ? <>
                        <span><FontAwesome.FaGlobe className={cx(S.iconStyle, 'textWhite', 'iconStyleRTL', 'footerIconMobileViewRTL')} /> </span>
                        <span className={'hidden-xs'}><FormattedMessage {...messages.footerTerms} /></span>
                    </> :
                        <>
                            <img src={closeIcon} className={cx(S.iconStyle, 'iconStyleRTL', 'imageWhiteColor', 'footerIconMobileViewRTL')} />
                            <span className={'hidden-xs'}><FormattedMessage {...messages.footerClose} /></span>
                        </>
                    }
                </Button>
                <ReactDrawer
                    open={this.state.open}
                    position={this.state.position}
                    onClose={this.onDrawerClose}
                    noOverlay={this.state.noOverlay}>
                    <Footer />
                </ReactDrawer>
            </div>
        );
    }
}
export default injectIntl(withStyles(s, S)(FooterToggle));