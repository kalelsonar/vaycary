import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationBeforeLogin.css';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { connect } from 'react-redux';

// Modals
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import ForgotPassword from '../ForgotPassword';
import HeaderModal from '../HeaderModal';
import NavLink from '../NavLink';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

// Locale
import messages from '../../locale/messages';
import { openHeaderModal } from '../../actions/modalActions';
import { choseToTheme } from '../../actions/getCurrencyRates';


//Images
import gobalIcon from '/public/SiteIcons/gobalIcon.svg'
import SearchForm from '../Home/SearchForm/SearchForm';
import gobalIconTwo from '/public/SiteIcons/gobalIconTwo.svg';
import lightMode from '/public/SiteIcons/lightModeIcon.svg';
import darkMode from '/public/SiteIcons/darkModeIcon.svg';
import dropDownLightIcon from '/public/SiteIcons/lightIcon.svg';
import dropDownDarkIcon from '/public/SiteIcons/darkIcon.svg';
import selectedLightIcon from '/public/SiteIcons/selectedLightIcon.svg'
import selectedDarkIcon from '/public/SiteIcons/selectedDarkIcon.svg'
import blackLightMode from '/public/SiteIcons/blackLightMode.svg'

class NavigationBeforeLogin extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
  };

  static defaultProps = {
    homeHeaderOnly: false,
  };

  render() {
    const { openLoginModal, openSignupModal, openHeaderModal, layoutType, choseToTheme, selectedTheme } = this.props;
    const { homeHeaderOnly, homePage, page } = this.props;
    return (
      <div>
        <LoginModal />
        <SignupModal />
        <ForgotPassword />
        <HeaderModal modalType={'languageModal'} />
        <HeaderModal modalType={'currencyModal'} />
        <Nav pullRight className={cx('floatLeftAR', (layoutType == 2 ? 'layout2Padding' : ''))}>

          <NavLink to="/" className={cx("hidden-lg", s.newMenuDesign)}>
            <FormattedMessage {...messages.home} />
          </NavLink>
          <NavLink
            noLink
            onClick={(e) => openHeaderModal('languageModal')}
            className={cx(s.breakPointScreen, "hidden-lg")}
          >
            <FormattedMessage {...messages.languageCurrency} />
          </NavLink>
          <NavLink to="/whyhost" className={cx("hidden-lg")}>
            <FormattedMessage {...messages.becomeAHost} />
          </NavLink>
          <NavLink to="#" noLink onClick={openLoginModal} className={cx("hidden-lg")}>
            <FormattedMessage {...messages.login} />
          </NavLink>
          <NavLink to="#" noLink onClick={openSignupModal} className={cx("hidden-lg")}>
            <FormattedMessage {...messages.signup} />
          </NavLink>
          <NavLink to="/help" className={cx("hidden-lg")}>
            <FormattedMessage {...messages.help} />
          </NavLink>
          <NavLink to="#" className={cx("hidden-lg")} onClick={() => { choseToTheme('light') }}>
            <span className={cx(s.themeIconAlignment, { [s.selectedThemeColor]: selectedTheme === "light" })}>
              <FormattedMessage {...messages.lightMode} />
              {
                selectedTheme && selectedTheme === "light" ?
                  <img src={selectedLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                  <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
              }

            </span>
          </NavLink>
          <NavLink to="#" className={cx("hidden-lg")} onClick={() => { choseToTheme('dark') }}>
            <span className={cx(s.themeIconAlignment, { [s.selectedThemeColor]: selectedTheme === "dark" })}>
              <FormattedMessage {...messages.darkMode} />
              {
                selectedTheme && selectedTheme === "dark" ?
                  <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                  <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
              }
            </span>
          </NavLink>
          <div className={cx('centerMenu', s.tabViewHidden)}>
            {homeHeaderOnly &&
              <div className={cx('scrollOff', s.paddingTop, (layoutType == 2 ? 'layout2CenterPadding' : ''))}>
                <NavLink to="/#" className={cx(s.centerLink, s.dot, 'centerLinkRTL', 'dotRTL', (layoutType == 2 ? 'centerLink2' : ''), (layoutType == 2 ? 'dot2' : ''))}>
                  <FormattedMessage {...messages.placesToStay} />
                </NavLink>
                <NavLink to="/whyhost" className={cx(s.centerLink, 'centerLinkRTL', (layoutType == 2 ? 'centerLink2' : ''))}>
                  <FormattedMessage {...messages.becomeAHost} />
                </NavLink>
              </div>
            }
            {
              layoutType && layoutType == 5 && <div className={cx('layout5Css', 'scrollOn')}>
                <SearchForm />
              </div>
            }
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
            }

              noCaret id="basic-nav-dropdown1" className={cx('hidden-xs', 'hidden-md', 'hidden-sm', s.nonBreakPointScreen, 'themeIconDropDown', 'hidden-xs', 'hidden-sm', 'hidden-md')}>
              <NavLink to="#" onClick={() => { choseToTheme('light') }} className={'themeIconDropDownLink'}>
                <div className={cx({ [s.selectedThemeColor]: selectedTheme === "light" }, s.themeIconSec)}>
                  {
                    (selectedTheme && selectedTheme === "light") ?
                      <img src={selectedLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> : <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                  }
                  <FormattedMessage {...messages.lightMode} />
                </div>
              </NavLink>
              <NavLink to="#" onClick={() => { choseToTheme('dark') }} className={'themeIconDropDownLink'}>
                <div className={cx({ [s.selectedThemeColor]: selectedTheme === "dark" }, s.themeIconSec)}>
                  {
                    (selectedTheme && selectedTheme === "dark") ?
                      <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> : <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                  }
                  <FormattedMessage {...messages.darkMode} />
                </div>
              </NavLink>
            </NavDropdown>
          }
          {!homeHeaderOnly && !homePage && <div className={cx(s.floatLeft, s.tabViewHidden, 'floatRight', s.languageFlex)}>
            <NavLink
              noLink
              onClick={(e) => openHeaderModal('languageModal')}
              className={cx(s.breakPointScreen, s.disPlayInline)}
            >
              <img src={gobalIconTwo} />
            </NavLink>
          </div>
          }
          {homePage &&
            <NavLink
              noLink
              onClick={(e) => openHeaderModal('languageModal')}
              className={cx(s.breakPointScreen, s.mbTop, s.tabViewHidden)}
            >
              {
                layoutType != 2 && <span>
                  <img src={gobalIcon} className={cx('scrollOff', s.tabViewHidden)} />
                  <img src={gobalIconTwo} className={cx('scrollOn')} />

                </span>
              }
              {
                layoutType && layoutType == 2 && <span>
                  <img src={gobalIconTwo} />
                </span>
              }
            </NavLink>
          }
          <NavDropdown
            className={cx(s.tabViewHidden, s.paddingDropDown, 'rtlDropDownPaddingHeader')} eventKey={3} title={
              <DropDownMenu />
            } noCaret id="basic-nav-dropdown"
          >

            <NavLink to="#" noLink onClick={openLoginModal}>
              <FormattedMessage {...messages.login} />
            </NavLink>
            {page && <NavLink to="/whyhost" className={cx(s.disPlayInline, s.innerLink, 'innerLinkRTL', 'textWhite')}>
              <FormattedMessage {...messages.becomeAHost} />
            </NavLink>}
            <NavLink to="#" noLink onClick={openSignupModal}>
              <FormattedMessage {...messages.signup} />
            </NavLink>
            <NavLink to="/help">
              <FormattedMessage {...messages.help} />
            </NavLink>

            {homePage == true ?
              <MenuItem className={cx('layout5Css')}>
                <NavLink to="#" onClick={() => { choseToTheme('light') }} className={'textDecorationNone'}>
                  <div className={cx(s.themeIconAlignment, s.selectedThemeColor, { ['textWhite']: selectedTheme === "dark" })}>
                    <FormattedMessage {...messages.lightMode} />
                    {
                      (selectedTheme && selectedTheme === "light") ?
                        <img src={selectedLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                        <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                    }

                  </div>
                </NavLink>
                <NavLink to="#" onClick={() => { choseToTheme('dark') }} className={'textDecorationNone'}>
                  <div className={cx(s.themeIconAlignment, s.textColor, { [s.selectedThemeColor]: selectedTheme === "dark" })}>
                    <FormattedMessage {...messages.darkMode} />
                    {
                      (selectedTheme && selectedTheme === "dark") ?
                        <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                        <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                    }
                  </div>
                </NavLink>
              </MenuItem>
              :
              <MenuItem className={cx('layout5Css')}>
                <NavLink to="#" onClick={() => { choseToTheme('light') }} className={'textDecorationNone'}>
                  <div className={cx(s.themeIconAlignment, s.selectedThemeColor, { ['textWhite']: selectedTheme === "dark" })}>
                    <FormattedMessage {...messages.lightMode} />
                    {
                      (selectedTheme && selectedTheme === "light") ?
                        <img src={selectedLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                        <img src={dropDownLightIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                    }

                  </div>
                </NavLink>
                <NavLink to="#" onClick={() => { choseToTheme('dark') }} className={'textDecorationNone'}>
                  <div className={cx(s.themeIconAlignment, s.textColor, { [s.selectedThemeColor]: selectedTheme === "dark" })}>
                    <FormattedMessage {...messages.darkMode} />
                    {
                      (selectedTheme && selectedTheme === "dark") ?
                        <img src={selectedDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} /> :
                        <img src={dropDownDarkIcon} alt='' className={cx(s.themeIcon, 'themeIconRTL')} />
                    }
                  </div>
                </NavLink>
              </MenuItem>
            }
          </NavDropdown>
        </Nav>

      </div>
    );
  }
}

const mapState = state => ({
  baseCurrency: state?.currency?.base,
  toCurrency: state?.currency?.to,
  currentLocale: state?.intl?.locale,
  layoutType: state?.siteSettings?.data?.homePageType,
  selectedTheme: state?.currency?.theme

});
const mapDispatch = {
  openHeaderModal,
  choseToTheme
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
)(NavigationBeforeLogin);