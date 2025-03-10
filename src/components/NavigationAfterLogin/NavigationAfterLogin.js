import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { connect } from 'react-redux';

import NavLink from '../NavLink';
import MenuItemLink from '../MenuItemLink';
import Logout from '../Logout';
import Message from '../Message';
import WishListModal from '../WishListModal';
import HeaderModal from '../HeaderModal';
import { choseToTheme } from '../../actions/getCurrencyRates';
import SearchForm from '../Home/SearchForm/SearchForm';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

import UserBanStatusQuery from './getUserBanStatus.graphql';
import CheckUserStatusQuery from './getCheckUserStatus.graphql';
import UserStatusQuery from './getUserStatus.graphql';
import messages from '../../locale/messages';

import { setUserLogout } from '../../actions/logout';
import { openHeaderModal } from '../../actions/modalActions';

import gobalIcon from '/public/SiteIcons/gobalIcon.svg';
import gobalIconTwo from '/public/SiteIcons/gobalIconTwo.svg';
import lightMode from '/public/SiteIcons/lightModeIcon.svg';
import darkMode from '/public/SiteIcons/darkModeIcon.svg';
import dropDownLightIcon from '/public/SiteIcons/lightIcon.svg';
import dropDownDarkIcon from '/public/SiteIcons/darkIcon.svg';
import selectedLightIcon from '/public/SiteIcons/selectedLightIcon.svg';
import selectedDarkIcon from '/public/SiteIcons/selectedDarkIcon.svg';
import blackLightMode from '/public/SiteIcons/blackLightMode.svg';

import s from './NavigationAfterLogin.css';

class NavigationAfterLogin extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    setUserLogout: PropTypes.any,
    formatMessage: PropTypes.any,
    loginUserBanStatus: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUserBanStatus: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
    }),
  };
  static defaultProps = {
    loginUserBanStatus: {
      loading: true,
      getUserBanStatus: {
        userBanStatus: 0,
      },
      whyHostSearchHide: false,
    },
    userDeleteStatus: {
      userLoading: true,
      getUserStatus: {
        userStatus: null,
      },
    },
    checkLoginUserExist: {
      userExistloading: true,
      getCheckUserStatus: {
        userExistStatus: null,
      },
    }
  };
  render() {
    const { loginUserBanStatus: { loading, getUserBanStatus }, userDeleteStatus: { userLoading, getUserStatus }, openClose } = this.props;
    const { checkLoginUserExist: { userExistloading, getCheckUserStatus }, className, setUserLogout, wishListModal } = this.props;
    const { userData, openHeaderModal } = this.props;
    const { layoutType, homeHeaderOnly, whyHostSearchHide, homePage, choseToTheme, selectedTheme, page } = this.props;

    let isVerified;
    if (userData) {
      isVerified = userData.profileId;
    }
    if (!userExistloading && getCheckUserStatus) {
      if (getCheckUserStatus.userExistStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          setUserLogout({ isAdmin: false });
        }
      }
    }
    if (!loading && getUserBanStatus) {
      if (getUserBanStatus.userBanStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          setUserLogout({ isAdmin: false });
        }
      }
    }
    if (!userLoading && getUserStatus) {
      if (getUserStatus.userStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          setUserLogout({ isAdmin: false });
        }
      }
    }
    return (
      <Nav pullRight className={cx('floatLeftAR', 'afterLoginHeaderDropDownHeight', (layoutType == 2 ? 'layout2Padding' : ''))}>
        <NavLink
          to="/"
          className={cx(s.breakPointScreen, s.newMenuDesign)}
        >
          <FormattedMessage {...messages.home} />
        </NavLink>
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('languageModal')}
          className={s.breakPointScreen}
        >
          <FormattedMessage {...messages.languageCurrency} />
        </NavLink>
        <NavLink to="/whyhost" className={s.breakPointScreen}>
          <FormattedMessage {...messages.becomeAHost} />
        </NavLink>
        <div className={cx(s.menuDividerMobile, s.breakPointScreen)}></div>
        <NavLink
          to="/dashboard"
          className={cx(s.breakPointScreen)}
        >
          <FormattedMessage {...messages.dashboard} />
        </NavLink>
        <NavLink to="/become-a-host?mode=new" className={s.breakPointScreen}>
          <FormattedMessage {...messages.createListing} />
        </NavLink>
        <NavLink to="/rooms" className={s.breakPointScreen}>
          <FormattedMessage {...messages.hosting} />
        </NavLink>
        <NavLink to="/trips/current" className={s.breakPointScreen}>
          <FormattedMessage {...messages.traveling} />
        </NavLink>

        <Message className={cx(s.breakPointScreen)} />
        <div className={cx(s.menuDividerMobile, s.breakPointScreen)}></div>
        <NavLink to="/user/payout" className={s.breakPointScreen}>
          <FormattedMessage {...messages.account} />
        </NavLink>
        <NavLink
          to={'/user/edit'}
          className={cx(s.breakPointScreen)}
        >
          <FormattedMessage {...messages.editProfile} />
        </NavLink>
        <NavLink to="/wishlists" className={cx(s.breakPointScreen)}>
          <FormattedMessage {...messages.wishList} />
        </NavLink>
        <NavLink to="/help" className={cx(s.breakPointScreen)}>
          <FormattedMessage {...messages.help} />
        </NavLink>
        <div className={cx(s.breakPointScreen, s.menuDivider)}></div>
        <div className={cx('centerMenu', s.tabViewHidden, (layoutType == 5 ? 'centerMenuTop' : ''))}>
          {homeHeaderOnly &&
            <div className={cx('scrollOff', (layoutType == 2 ? 'layout2CenterPadding' : ''))}>
              <NavLink to="/#" className={cx(s.centerLink, s.dot, 'headerDotRTL', (layoutType == 2 ? 'centerLink2' : ''), (layoutType == 2 ? 'dot2' : ''))}>
                <FormattedMessage {...messages.placesToStay} />
              </NavLink>
              <NavLink to="/whyhost" className={cx(s.centerLink, 'centerLinkRTL', (layoutType == 2 ? 'centerLink2' : ''))}>
                <FormattedMessage {...messages.becomeAHost} />
              </NavLink>
            </div>
          }
          <div className={cx('layout5Css', 'scrollOn')}>
            <SearchForm />
          </div>
        </div>
        {homePage &&
          <NavDropdown title={
            <>
              {
                (selectedTheme && selectedTheme === "light" && (layoutType && layoutType != 2)) &&
                <>
                  <img src={lightMode} alt='' className='scrollOff' />
                  <img src={blackLightMode} className={cx('scrollOn')} />
                </>
              }
              {
                (selectedTheme && selectedTheme === "light" && (layoutType && layoutType == 2)) &&
                <img src={blackLightMode} alt='' />

              }
              {
                (selectedTheme && selectedTheme === "dark") &&
                <img src={darkMode} alt='' />
              }
            </>
          } noCaret id="basic-nav-dropdown1" className={cx('themeIconDropDown', 'hidden-xs', 'hidden-sm', 'hidden-md')}>
            <MenuItemLink to="#" onClick={() => { choseToTheme('light') }} className={'themeIconDropDownLink'}>
              <div className={cx({ [s.selectedThemeColor]: selectedTheme === "light" }, s.themeIconSec)}>
                {
                  (selectedTheme && selectedTheme === "light") ?
                    <img src={selectedLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> : <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                }
                <FormattedMessage {...messages.lightMode} />
              </div>
            </MenuItemLink>
            <MenuItemLink to="#" onClick={() => { choseToTheme('dark') }} className={'themeIconDropDownLink'}>
              <div className={cx({ [s.selectedThemeColor]: selectedTheme === "dark" }, s.themeIconSec)}>
                {
                  (selectedTheme && selectedTheme === "dark") ?
                    <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> : <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                }
                <FormattedMessage {...messages.darkMode} />
              </div>
            </MenuItemLink>
          </NavDropdown>
        }
        {!homeHeaderOnly && !homePage && <div className={cx(s.floatLeft, 'hidden-xs', 'floatRight', s.tabViewHidden, s.dFlex)}>
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx(s.disPlayInline)}
          >
            <img src={gobalIconTwo} />
          </NavLink>
        </div>
        }
        {homePage &&
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx(s.mbTop, s.nonBreakPointScreen)}
          >
            {
              layoutType != 2 && <span>
                <img src={gobalIcon} className={cx('scrollOff', 'hidden-xs')} />
                <img src={gobalIconTwo} className={cx('scrollOn')} />
                <img src={gobalIconTwo} className={cx('visible-xs')} />
              </span>
            }
            {
              layoutType && layoutType == 2 && <span>
                <img src={gobalIconTwo} />
              </span>
            }
          </NavLink>
        }

        <NavLink to="#" onClick={() => { choseToTheme('light') }} className={cx('visible-xs', s.breakPointScreen)}>
          <span className={cx(s.themeIconAlignment, { [s.selectedThemeColor]: selectedTheme === "light" })}>
            <FormattedMessage {...messages.lightMode} />
            {
              selectedTheme && selectedTheme === "light" ?
                <img src={selectedLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
            }
          </span>
        </NavLink>
        <NavLink to="#" onClick={() => { choseToTheme('dark') }} className={cx('visible-xs', s.breakPointScreen)}>
          <span className={cx(s.themeIconAlignment, { [s.selectedThemeColor]: selectedTheme === "dark" })}>
            <FormattedMessage {...messages.darkMode} />
            {
              selectedTheme && selectedTheme === "dark" ?
                <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
            }
          </span>
        </NavLink>
        <div className={cx(s.menuDividerMobile, s.breakPointScreen)}></div>
        <Logout className={cx('visible-xs', s.breakPointScreen)} />
        <NavDropdown
          className={cx('hidden-xs', s.nonBreakPointScreen, s.paddingDropDown, 'rtlDropDownPaddingHeader')} eventKey={3} title={
            <DropDownMenu />
          } noCaret id="basic-nav-dropdown"
        >
          <MenuItemLink to="/dashboard">
            <FormattedMessage {...messages.dashboard} />
          </MenuItemLink>
          <NavLink to="/become-a-host?mode=new">
            <FormattedMessage {...messages.createListing} />
          </NavLink>
          <MenuItemLink to="/rooms">
            <FormattedMessage {...messages.hosting} />
          </MenuItemLink>
          <NavLink to="/trips/current" >
            <FormattedMessage {...messages.traveling} />
          </NavLink>
          <Message />
          <div className={s.menuDivider}></div>
          <MenuItemLink to="/user/payout">
            <FormattedMessage {...messages.account} />
          </MenuItemLink>
          <MenuItemLink to="/user/edit">
            <FormattedMessage {...messages.editProfile} />
          </MenuItemLink>
          <NavLink to="/wishlists" >
            <FormattedMessage {...messages.wishList} />
          </NavLink>
          <div className={s.menuDivider}></div>
          {page && <NavLink to="/whyhost" className={cx(s.disPlayInline, s.innerLink, 'textWhite', 'innerLinkRTL')} title={<FormattedMessage {...messages.becomeAHost} />}>
            <FormattedMessage {...messages.becomeAHost} />
          </NavLink>}
          <NavLink
            to={'/user/edit'}
            className={cx('visible-xs', s.breakPointScreen)}
          >
            <FormattedMessage {...messages.profile} />
          </NavLink>
          <NavLink
            to="/user/payout"
            className={cx('visible-xs', s.breakPointScreen)}
          >
            <FormattedMessage {...messages.accountSettings} />
          </NavLink>
          <NavLink to="/rooms" className={cx('visible-xs', s.breakPointScreen)}>
            <FormattedMessage {...messages.host} />
          </NavLink>

          <MenuItem to="#" onClick={() => { choseToTheme('light') }}>
            <div className={cx(s.themeIconAlignment, { [s.selectedThemeColor]: selectedTheme === "light" })}>
              <FormattedMessage {...messages.lightMode} />
              {
                (selectedTheme && selectedTheme === "light") ?
                  <img src={selectedLightIcon} alt='' className={cx(s.themeIcon)} /> :
                  <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon)} />
              }

            </div>
          </MenuItem>
          <MenuItem to="#" onClick={() => { choseToTheme('dark') }}>
            <div className={cx(s.themeIconAlignment, { [s.selectedThemeColor]: selectedTheme === "dark" })}>
              <FormattedMessage {...messages.darkMode} />
              {
                (selectedTheme && selectedTheme === "dark") ?
                  <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon)} /> :
                  <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon)} />
              }
            </div>
          </MenuItem>
          <div className={s.menuDivider}></div>
          <NavLink to="/help">
            <FormattedMessage {...messages.help} />
          </NavLink>
          <Logout />
        </NavDropdown>
        {
          wishListModal && <WishListModal />
        }
        <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
      </Nav>
    );
  }
}
const mapState = state => ({
  wishListModal: state.modalStatus.wishListModalOpen,
  userData: state.account.data,
  baseCurrency: state.currency.base,
  toCurrency: state.currency.to,
  currentLocale: state.intl.locale,
  layoutType: state.siteSettings.data.homePageType,
  selectedTheme: state.currency.theme
});
const mapDispatch = {
  setUserLogout,
  openHeaderModal,
  choseToTheme
};
export default
  compose(
    injectIntl,
    withStyles(s),
    graphql(UserBanStatusQuery, {
      name: 'loginUserBanStatus',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    graphql(UserStatusQuery, {
      name: 'userDeleteStatus',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    graphql(CheckUserStatusQuery, {
      name: 'checkLoginUserExist',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    (connect(mapState, mapDispatch)))(NavigationAfterLogin);
