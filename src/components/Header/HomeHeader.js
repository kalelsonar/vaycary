// General
import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Navbar } from 'react-bootstrap';

// Internal Components
import Navigation from '../Navigation';
import Logo from '../Logo';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';
import HeaderLocationSearch from './HeaderLocationSearch';

// Redux action
import { toggleOpen, toggleClose } from '../../actions/Menu/toggleControl';

import history from '../../core/history';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

import closeIcon from '/public/SiteIcons/loginClose.svg';

import s from './Header.css';

class HomeHeader extends React.Component {
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
    searchDisablePages: ['/', '/home']
  }

  constructor(props) {
    super(props);
    this.state = {
      searchHide: true,
      load: false,
      isOpen: 0,
      fixedBgClass: '',
      checked: false,
      scrollLogo: false
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.handleDisableSearchPages();
  }

  componentDidMount() {
    this.setState({ load: true });
    this.handleDisableSearchPages();
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleMenu() {
    const { showMenu, toggleOpen, toggleClose } = this.props;
    showMenu ? toggleClose() : toggleOpen();
  }

  handleDisableSearchPages() {
    const { searchDisablePages } = this.props;
    let location, searchHide;
    location = history.location ? history.location.pathname : null;
    searchHide = false;
    if (location && searchDisablePages.length > 0) {
      searchHide = searchDisablePages.find((o) => location === o);
      searchHide = (searchHide) ? true : false;
    }
    this.setState({ searchHide })
  }
  openMenu() {
    this.setState({ isOpen: 1 })
  }

  openClose() {
    this.setState({ isOpen: 0 })
  }



  handleScroll() {
    let top = document.documentElement.scrollTop || document.body.scrollTop,
      isWeb = (document.documentElement.clientWidth || document.body.clientWidth) >= 1200 ? true : false;
    let fixedBgClass = '', scrollLogo = false;
    if (isWeb && top >= 50) {
      fixedBgClass = 'fixedBgHeader';
      scrollLogo = true;
    }
    this.setState({
      fixedBgClass,
      scrollLogo
    });
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { borderLess, showMenu, layoutType, homeHeaderOnly, account } = this.props;
    const { searchHide, load, fixedBgClass, scrollLogo } = this.state;

    let borderClass, headerDesignClass;
    let location, homeHeader, layoutTwo, layoutFive, afterLogin;
    if (borderLess) {
      borderClass = s.commonHeaderBorderLess;
    }

    if (layoutType && (layoutType != 2)) {
      headerDesignClass = 'headerNewDesign';
    }

    if (history.location) {
      location = history.location.pathname;
    }

    homeHeader = { ['homeHeader']: location === '/' || location === '/home' };
    layoutTwo = (layoutType == 2 ? 'darkBgHeder' : '');
    layoutFive = (layoutType == 5 ? fixedBgClass : '');

    return (
      <div className={cx(headerDesignClass)}>
        <div className={s.root}>
          <Toaster />
          <LoadingBar />
          <div className={cx(s.container, 'bgBlack')}>
            <Navbar className={
              cx(
                s.commonHeader,
                'commonHeader',
                borderClass,
                homeHeader,
                layoutTwo,
                layoutFive,
              )}
              expanded={showMenu}
              onToggle={this.handleMenu}
            >
              <div className={s.headerFlexBox}>
                <Navbar.Header className={cx((!showMenu ? 'normalPosition' : 'fixedPosition'), (layoutType == 2 ? 'layout2Logo' : 'logoPadding'))}>
                  <Navbar.Brand className={(s.homeLogo)}>
                    <Logo link={"/"} className={cx(s.brand, s.brandImg)} scrollLogo={scrollLogo} />
                  </Navbar.Brand>
                </Navbar.Header>
                <div onClick={() => this.openMenu()}>
                  <div className={cx('hidden-lg', 'positionRelative')}>
                    <DropDownMenu />
                  </div>
                </div>
                {
                  !searchHide && <Navbar.Form pullLeft className={('hidden-xs', s.breakPoint)}>
                    <HeaderLocationSearch />
                  </Navbar.Form>
                }
                <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu, 'homeMobileMenu', 'mobileMenuDark')}>
                  <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'hidden-lg')}>
                    <div className={cx(s.closeButtonPosition, 'closeButtonPositionDark')}>
                      <div className={cx(s.closeColor, 'textWhite', 'closeColorRTL', 'svgImg')} onClick={() => this.openClose()} >
                        <img src={closeIcon} />
                      </div>
                    </div>
                  </div>
                  <div onClick={() => this.openClose()}>
                    <Navigation openClose={this.state.isOpen} homeHeaderOnly={homeHeaderOnly}
                      homePage
                    />
                  </div>
                </div>
              </div>
            </Navbar>
          </div>
        </div>
      </div>
    );
  }
}

HomeHeader = reduxForm({
  form: 'HomeHeaderForm', // a unique name for this form
})(HomeHeader);

const mapState = (state) => ({
  showMenu: state.toggle.showMenu,
  layoutType: state.siteSettings.data.homePageType,
  account: state.account.data
});

const mapDispatch = {
  toggleOpen,
  toggleClose
};


export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
)(HomeHeader);
