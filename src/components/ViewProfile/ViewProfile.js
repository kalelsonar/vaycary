import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import moment from 'moment';
import {
  Row,
  Col,
  Grid,
  Collapse,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import * as FontAwesome from 'react-icons/lib/fa';

import { connect } from 'react-redux';

import { openReportUserModal } from '../../actions/modalActions';
import ReportUserModal from '../ReportUserModal';

import ThankYouModal from '../ThankYouModal';

// Component
import Reviews from './Reviews';
import VerifiedInfo from '../VerifiedInfo';
import Link from '../Link';
import Avatar from '../Avatar';
import PanelWrapper from './ManageListing/PanelWrapper';

// Locale
import messages from '../../locale/messages';
import EditIcon from '/public/SiteIcons/arrowGreen.svg';
import DashBoardSideMenu from '../Dashboard/DashBoardSideMenu';

class ViewProfile extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      profileId: PropTypes.number.isRequired,
      reviewsCount: PropTypes.number.isRequired,
    }).isRequired,
    isUser: PropTypes.bool,
    loadMore: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    data: {
      createdAt: new Date(),
      picture: null
    },
    isUser: false
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {

    const { data, isUser, loadMore, openReportUserModal, profileId, userData, isAuthenticate } = this.props;
    let date = moment(data.createdAt).format('MMMM YYYY');
    let count = 150, firstArray, restArray, dotString = false;

    if (data && data.info) {
      firstArray = data.info.slice(0, count);
      restArray = data.info.slice(count, data.info.length);
      if (restArray && restArray.length > 0) {
        dotString = true;
      }
    }


    return (
      <div className={cx('ViewProfile')}>
        <Grid fluid>
          <div className={s.viewProfileGrid}>
            <div>
              <DashBoardSideMenu isProfilePage={true} isUser={isUser} data={data} />
            </div>
            <div>
              <div className={s.borderCommon}>
                <div className={s.paddingOne}>
                  <div className={cx(s.textalign, 'textAlignRightRtl', s.profileFlex)}>
                    <div>
                      <h1 className={s.profileTitle}>
                        <FormattedMessage {...messages.hey} />{' '} {data.firstName}!
                      </h1>
                      <p className={cx(s.profileInfo, 'textWhite')}>
                        <span>
                          {data.location} {data.location && ' '}
                          <FormattedMessage {...messages.joinedIn} /> {date}</span>
                      </p>
                      {
                        !isUser && isAuthenticate &&
                        <p className={cx(s.reportProfile, 'textAlignRightRtl', 'textWhite')}>
                          <ReportUserModal profileId={profileId} />
                          <Link
                            className={cx(s.reportProfile, 'textWhite')}
                            onClick={openReportUserModal}
                          >
                            <FontAwesome.FaFlag className={cx(s.flagIcon, 'reportUserFlagRTL', 'textWhite')} />
                            <FormattedMessage {...messages.reportUser} />
                          </Link>
                          <ThankYouModal />
                        </p>
                      }
                    </div>
                    <div className={cx(s.textAlignRight, 'textAlignLeftRtl')}>
                      {
                        isUser && <Link to={"/user/edit"} className={s.editFlex}>
                          <FormattedMessage {...messages.editProfile} />
                          <img src={EditIcon} className={cx('editIconPayRTL')} />
                        </Link>
                      }
                    </div>
                  </div>
                  {data.info && <>
                    <div className={s.lineCss}></div>
                    <div>
                      <h3 className={s.subTitle}><FormattedMessage {...messages.aboutMe} /></h3>
                      <p className={cx(s.subContent, 'textWhite')}>
                        {!this.state.open && count >= 150 &&
                          <span className={cx(s.subText, s.lineBreak)}>  {firstArray} {dotString === true && <span>...</span>}</span>
                        }
                        {
                          restArray && restArray.length > 0 &&
                          <span>
                            <Collapse in={open}>
                              <div> <span className={cx(s.subText, s.lineBreak)}>
                                {this.state.open && <>{firstArray}{restArray}</>}
                              </span></div>
                            </Collapse>
                            {
                              dotString && <div className={s.btnContainer}>
                                <div className={s.showHidePadding}>
                                  <Button
                                    bsStyle="link"
                                    className={cx(s.button, s.noPadding, s.btnLInk, s.showHideBtn, 'bgTransparent')}
                                    onClick={() => this.handleClick()}
                                  >
                                    {this.state.open ? <FormattedMessage {...messages.closeAll} /> : <FormattedMessage {...messages.showDescription} />}

                                    {
                                      this.state.open && <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                    }
                                    {
                                      !this.state.open && <FontAwesome.FaAngleDown className={cx(s.navigationIcon, s.positionTop)} />
                                    }

                                  </Button>
                                </div>
                              </div>
                            }
                          </span>
                        }
                      </p>
                    </div></>}

                  <PanelWrapper userId={data.userId} firstName={data.firstName} />

                </div>
                {
                  data.reviewsCount > 0 && <Reviews
                    reviewsCount={data.reviewsCount}
                    data={data.reviews}
                    loadMore={loadMore}
                  />
                }
              </div>
            </div>
          </div>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  listSettingsData: state.adminListSettingsData.data,
  userData: state.account.data,
  isAuthenticate: state.runtime.isAuthenticated
});

const mapDispatch = {
  openReportUserModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ViewProfile)));