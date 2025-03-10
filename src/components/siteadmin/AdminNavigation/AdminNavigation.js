import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import {
  Nav, NavDropdown
} from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminNavigation.css';

// Internal Components
import NavLink from '../../NavLink';
import Logout from '../../Logout';
import HeaderModal from '../../HeaderModal';
import MenuItemLink from '../../MenuItemLink';

import { choseToTheme } from '../../../actions/getCurrencyRates';
import { openHeaderModal } from '../../../actions/modalActions';
import { setUserLogout } from '../../../actions/logout';
import { formatLocale } from '../../../helpers/formatLocale';
import getAdminUserStatusQuery from './getAdminUserStatus.graphql';

// Translation
import messages from '../../../locale/messages';

//local
import languageIcon from '/public/languageIcon.svg'
import dropDownLightIcon from '/public/SiteIcons/lightIcon.svg';
import dropDownDarkIcon from '/public/SiteIcons/darkIcon.svg';
import selectedLightIcon from '/public/SiteIcons/selectedLightIcon.svg';
import selectedDarkIcon from '/public/SiteIcons/selectedDarkIcon.svg';
class AdminNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { openHeaderModal, currentLocale, choseToTheme, selectedTheme, hideCurrency, checkLoginUserExist: { userExistloading, getAdminUserStatus }, setUserLogout } = this.props;

    if (!userExistloading && getAdminUserStatus) {
      if (getAdminUserStatus.userExistStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          window.location.reload();
          setUserLogout({ isAdmin: true });
        }
      }
    }

    return (
      <Nav pullRight className='pullLeftHeaderAR'>
        <NavDropdown title={
          <>
            {
              (selectedTheme && selectedTheme === "light") &&
              <span className={s.selectedThemeColor}> <img src={selectedLightIcon} alt='' /> <FormattedMessage {...messages.lightMode} /></span>
            }
            {
              (selectedTheme && selectedTheme === "dark") &&
              <span className={s.selectedThemeColor}> <img src={selectedDarkIcon} alt='' /> <FormattedMessage {...messages.darkMode} /></span>
            }
          </>
        }

          noCaret id="basic-nav-dropdown1" className={cx('hidden-xs', s.nonBreakPointScreen, 'themeIconDropDown')}>
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
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('languageModal')}
          className={s.mozCss}
        >
          <span className={'svgImg'}><img src={languageIcon} className={cx(s.languageIcon, 'languageIconRTL')} /></span>
          <span>{formatLocale(currentLocale)}</span>
        </NavLink>
        <NavLink to="/" >
          <FormattedMessage {...messages.goToMainSite} />
        </NavLink>
        <Logout url={'/admin-logout'} />
        <HeaderModal modalType={'languageModal'} hideCurrency={true} />
      </Nav>
    );
  }

}
const mapState = state => ({
  currentLocale: state.intl.locale,
  selectedTheme: state.currency.theme
});
const mapDispatch = {
  openHeaderModal,
  choseToTheme,
  setUserLogout
};

export default
  compose(
    injectIntl,
    withStyles(s),
    graphql(getAdminUserStatusQuery, {
      name: 'checkLoginUserExist',
      options: {
        ssr: false,
        pollInterval: 5000,
      },
    }),
    (connect(mapState, mapDispatch)))(AdminNavigation);