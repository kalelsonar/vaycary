// General
import React from 'react';
import PropTypes from 'prop-types';

import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Navbar } from 'react-bootstrap';
import LoadingBar from 'react-redux-loading-bar';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Toaster from '../Toaster';
import HeaderLocationSearch from './HeaderLocationSearch';

import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';

import history from '../../core/history';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

import closeIcon from '/public/SiteIcons/loginClose.svg';

import s from './Header.css';

class Header extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool,
    showMenu: PropTypes.bool,
    toggleOpen: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    checked: PropTypes.any,
  };

  static defaultProps = {
    borderLess: false,
    showMenu: false,
    searchDisablePages: [
      '/',
      '/home'
    ],
    whyHostSearchHide: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchHide: true,
      isOpen: 0
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
  }

  componentDidMount() {
    this.handleDisableSearchPages();
  }

  UNSAFE_componentWillReceiveProps() {
    this.handleDisableSearchPages();
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    showMenu ?  toggleClose() : toggleOpen();
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location, searchHide;
    location = history.location ? history.location.pathname : null;
    searchHide = false;
    if (location && searchDisablePages?.length > 0) {
      searchHide = searchDisablePages.find((o) => location === o);
      searchHide = (searchHide) ? true : false;
    }
    this.setState({ searchHide })
  }

  openMenu() {
    this.setState({ isOpen: 1 })
    if (this.state.isOpen == 0) {
      document.body.classList.add('menu-open');
    }
  }

  openClose() {
    this.setState({ isOpen: 0 })
    if (this.state.isOpen == 1) {
      document.body.classList.remove('menu-open');
    }
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { borderLess, showMenu, whyHostSearchHide, fixedHeader, whyHostHeader } = this.props;
    const { viewListingHeader, page, guests, account } = this.props;
    const { searchHide, isOpen } = this.state;
    let borderClass, location;

    if (borderLess) {
      borderClass = s.commonHeaderBorderLess;
    }
    if (history.location) location = history.location.pathname;

    return (
      <div className={s.root}>
        <Toaster />
        <LoadingBar />
        <div className={cx(s.container, 'bgBlack', 'dashboardBottomLayout')}>
          <Navbar
            className={cx(
            s.commonHeader, 'commonHeader', 
            borderClass, 'darkModeInnerMenu', 
            { ['homeHeader']: location === '/' || location === '/home' }, 
            fixedHeader, whyHostHeader, viewListingHeader, 
            )}
            expanded={showMenu}
            onToggle={this.handleMenu}
          >
            <div className={s.headerFlexBox}>
              <Navbar.Header className={cx('logoPadding', 'innerMenuLogo', !showMenu ? 'normalPosition' : 'fixedPosition')}>
                <Navbar.Brand className={(s.homeLogo)}>
                  <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
                </Navbar.Brand>
              </Navbar.Header>
              <div onClick={() => this.openMenu()}>
                <div className={cx('hidden-lg', 'hamburgerButton', 'hamburgerInnerButton')}>
                  <DropDownMenu />
                </div>
              </div>
              {
                !searchHide && <Navbar.Form pullLeft className={cx('hidden-xs', s.breakPoint, 'searchHeaderAR')}>
                  { !whyHostSearchHide && <HeaderLocationSearch guests={guests} page={page} viewListingHeader={viewListingHeader} />}
                </Navbar.Form>
              }

              <div className={cx({ [s.menuOpen]: isOpen == 1 }, s.mobileMenu, 'homeMobileMenu', 'mobileMenuDark')}>
                <div className={cx({ [s.menuClose]: isOpen == 0 }, s.rightMenuClose, 'hidden-lg')}>
                  <div className={cx(s.closeButtonPosition, 'closeButtonPositionDark')}>
                    <div className={cx(s.closeColor, 'textWhite', 'closeColorRTL', 'svgImg')} onClick={() => this.openClose()} >
                      <img src={closeIcon} />
                    </div>
                  </div>
                </div>
                <div onClick={() => this.openClose()}>
                  <Navigation whyHostSearchHide={whyHostSearchHide} page={page} />
                </div>
              </div>
            </div>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  showMenu: state.toggle.showMenu,
  account : state.account.data
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
)(Header);