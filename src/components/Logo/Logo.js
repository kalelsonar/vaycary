import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

// components
import Link from '../Link';

//helpers
import history from '../../core/history';

//styles
import s from './Logo.css';

class Logo extends Component {
    static propTypes = {
        siteName: PropTypes.string.isRequired,
        logoImage: PropTypes.string,
        link: PropTypes.string,
        className: PropTypes.string,
        showMenu: PropTypes.bool,
    };

    static defaultProps = {
        siteName: null,
        logoImage: null,
        link: '/',
        showMenu: false
    }

    render() {
        const { siteName, logoImage, link, className, homeLogo, showMenu, layoutType, scrollLogo } = this.props;

        let location = history.location ? history.location.pathname : null;
        if (history.location) {
            location = history.location.pathname;
        }

        return (
            <Link to={link} className={className}>
                {
                    homeLogo && location === '/' && !logoImage && layoutType != 2 &&
                    <img src={"/images/logo/" + homeLogo} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}
                    />
                }
                {
                    homeLogo && location === '/' && !logoImage && showMenu &&
                    <span className={cx(s.logoColor, s.logoTextTabViewWidth)}>{siteName}</span>
                }
                {
                    homeLogo && !scrollLogo && location === '/' && logoImage && layoutType != 2 &&
                    <img src={"/images/logo/" + homeLogo} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}

                    />
                }
                {
                    homeLogo && scrollLogo && location === '/' && logoImage && layoutType == 5 &&
                    <img src={"/images/logo/" + logoImage} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}

                    />
                }
                {
                    homeLogo && location === '/' && logoImage && layoutType == 2 &&
                    <img src={"/images/logo/" + logoImage} className={cx(!showMenu ? 'displayBlock' : 'displayNone')}

                    />
                }
                {
                    homeLogo && location === '/' && showMenu && logoImage &&
                    <img src={"/images/logo/" + logoImage} />
                }
                {
                    !homeLogo && location === '/' && logoImage &&
                    <img src={"/images/logo/" + logoImage} />
                }
                {
                    !homeLogo && !logoImage && siteName && location && location !== '/' && <span className={cx(s.logoColor, s.logoTextTabViewWidth)}>{siteName}</span>
                }
                {
                    !homeLogo && !logoImage && siteName && location && location === '/' && <span className={cx(!showMenu && (layoutType == '2' ? s.logoColor : layoutType == '5' ? s.whiteColor : s.whiteColor), 'logoColor', s.logoTextTabViewWidth)}>{siteName}</span>
                }
                {
                    !homeLogo && !logoImage && siteName === null && <span className={cx(s.logoColor, s.logoTextTabViewWidth)}>Site Name</span>
                }
                {
                    logoImage && location && location !== '/' && <img src={"/images/logo/" + logoImage} />
                }
                {
                    !logoImage && homeLogo && location && location !== '/' && siteName && <span className={cx(s.logoColor, s.logoTextTabViewWidth)}>{siteName}</span>
                }
            </Link>
        );
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    logoImage: state.siteSettings.data.Logo,
    homeLogo: state.siteSettings.data.homeLogo,
    showMenu: state.toggle.showMenu,
    layoutType: state.siteSettings.data.homePageType
});

const mapDispatch = {};

export default compose(
    connect(mapState, mapDispatch),
    withStyles(s)
)(Logo);