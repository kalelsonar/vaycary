import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import LanguageSwitcher from '../LanguageSwitcher';
import Link from '../Link';

import PlayStoreImage from '/public/SiteImages/playStore.png';
import AppStoreImage from '/public/SiteImages/appStore.png';
import facebookIcon from '/public/SiteImages/facebook.svg';
import twitterIcon from '/public/SiteImages/twitter.svg';
import instagramIcon from '/public/SiteImages/instagram.svg'
import footerBgImage from '/public/SiteImages/footerBg.svg'

// Locale
import messages from '../../locale/messages';

import getEnabledBlog from './getEnabledBlog.graphql';

class Footer extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    appAvailableStatus: PropTypes.string,
    playStoreUrl: PropTypes.string,
    appStoreUrl: PropTypes.string,
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getEnabledBlog: PropTypes.array,
    })
  };

  constructor(props) {
    super(props);

  }

  render() {
    const { siteName, facebook, twitter, instagram, appAvailableStatus, playStoreUrl, appStoreUrl } = this.props;
    const { data: { getEnabledBlog } } = this.props;

    return (
      <footer className={s.fixedFooter}>
        <div className={s.positionRelative}>
          <div
            className={cx(s.footerBgBanner, s.root, 'footerBannerImg', 'footerBannerToggle', 'commonWordBreak')} >
            <div className={s.container}>
              <div className={cx(s.footerSectionContainer, 'hidden-print')}>
                <Grid fluid>
                  <Row>
                    <div className={s.responsivePadding}>
                      <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                        <label className={cx(s.landingLabel)}>{siteName}</label>
                        <ul className={s.listContainer}>
                          <li className={s.footerLinks}>
                            <Link to={'/about'} className={cx(s.textLink, 'darkModeFooterLink')} >
                              <FormattedMessage {...messages.about} />
                            </Link>
                          </li>
                          <li className={s.footerLinks}>
                            <Link to={'/contact'} className={cx(s.textLink, 'darkModeFooterLink')} >
                              <FormattedMessage {...messages.contactForm} />
                            </Link>
                          </li>
                          {
                            getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.filter((item) => item.footerCategory != 'discover' && item.footerCategory != 'hosting')
                              .map((item) => {
                                return (
                                  <li className={s.footerLinks}>
                                    <Link to={'/page/' + item.pageUrl} className={cx(s.textLink, 'darkModeFooterLink')} >
                                      {item.pageTitle}
                                    </Link>
                                  </li>
                                )
                              })
                          }
                        </ul>
                      </Col>
                      <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                        <label className={cx(s.landingLabel)}><FormattedMessage {...messages.discover} /></label>
                        <ul className={s.listContainer}>
                          <li className={s.footerLinks}>
                            <Link to={'/safety'} className={cx(s.textLink, 'darkModeFooterLink')} >
                              <FormattedMessage {...messages.trustSafety} />
                            </Link>
                          </li>
                          <li className={s.footerLinks}>
                            <Link to={'/travel'} className={cx(s.textLink, 'darkModeFooterLink')} >
                              <FormattedMessage {...messages.travelCredit} />
                            </Link>
                          </li>
                          {
                            getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.filter((item) => item.footerCategory == 'discover')
                              .map((item) => {

                                return (
                                  <li className={s.footerLinks}>
                                    <Link to={'/page/' + item.pageUrl} className={cx(s.textLink, 'darkModeFooterLink')} >
                                      {item.pageTitle}
                                    </Link>
                                  </li>
                                )

                              })
                          }
                        </ul>
                      </Col>
                      <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                        <label className={cx(s.landingLabel)}><FormattedMessage {...messages.hosting} /></label>
                        <ul className={s.listContainer}>
                          <li className={s.footerLinks}>
                            <Link to={'/whyhost'} className={cx(s.textLink, 'darkModeFooterLink')} >
                              <FormattedMessage {...messages.becomeAHost} />
                            </Link>
                          </li>
                          <li className={s.footerLinks}>
                            <Link to={'/privacy'} className={cx(s.textLink, 'darkModeFooterLink')} >
                              <FormattedMessage {...messages.termsPrivacy} />
                            </Link>
                          </li>
                          {
                            getEnabledBlog && getEnabledBlog.length > 0 && getEnabledBlog.filter((item) => item.footerCategory == 'hosting')
                              .map((item) => {
                                return (
                                  <li className={s.footerLinks}>
                                    <Link to={'/page/' + item.pageUrl} className={cx(s.textLink, 'darkModeFooterLink')} >
                                      {item.pageTitle}
                                    </Link>
                                  </li>
                                )
                              })
                          }
                        </ul>
                      </Col>
                      <Col sm={3} md={3} lg={3} xs={12} className={cx(s.responsiveMargin, s.noPaddingMobile)}>
                        {
                          appAvailableStatus == 1 && (playStoreUrl || appStoreUrl) &&
                          <div>
                            <label className={cx(s.landingLabel)}><FormattedMessage {...messages.appsAvailableOn} /></label>
                            <div className={cx(s.spaceTop21, s.iosFlex)}>
                              {
                                playStoreUrl && <a href={playStoreUrl} target="_blank" className={s.displayInlineBlock}>
                                  <img alt="Image" src={PlayStoreImage} />
                                </a>
                              }
                              {
                                appStoreUrl && <a href={appStoreUrl} target="_blank" className={s.displayInlineBlock}>
                                  <img alt="Image" src={AppStoreImage} />
                                </a>
                              }
                            </div>
                          </div>
                        }
                      </Col>
                    </div>
                  </Row>

                  <Row className={cx(s.copyrightSection, s.copyrightSpaceTop, s.copyRightTabNoMargin)}>
                    <Col xs={6} sm={4} md={4} lg={7} className={s.noPaddingMobile}>
                      <span className={cx(s.text, s.footerSiteName, 'darkModeFooterLink')}>© {siteName}.</span>
                    </Col>
                    <Col xs={6} sm={8} md={8} lg={5} className={cx(s.noPaddingMobile, s.socialIcons, 'socialIconsFooterRTL')}>
                      {
                        facebook && <a href={facebook} target="_blank" className={cx(s.shareIcon, 'shareIconRtl')}>
                          <img alt="" src={facebookIcon} />
                        </a>
                      }
                      {
                        twitter && <a href={twitter} target="_blank" className={cx(s.shareIcon, 'shareIconRtl')}>
                          <img alt="" src={twitterIcon} />
                        </a>
                      }
                      {
                        instagram && <a href={instagram} target="_blank" className={cx(s.shareIcon, 'shareIconRtl')}>
                          <img alt="" src={instagramIcon} />
                        </a>
                      }
                    </Col>
                  </Row>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}


const mapState = state => ({
  siteName: state.siteSettings.data.siteName,
  facebook: state.siteSettings.data.facebookLink,
  twitter: state.siteSettings.data.twitterLink,
  instagram: state.siteSettings.data.instagramLink,
  appAvailableStatus: state.siteSettings.data.appAvailableStatus,
  playStoreUrl: state.siteSettings.data.playStoreUrl,
  appStoreUrl: state.siteSettings.data.appStoreUrl
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(getEnabledBlog,
    {
      options: {
        fetchPolicy: 'network-only',
        ssr: false
      }
    }),
)(Footer);
