import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import Grid from 'react-bootstrap/lib/Grid';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Loader from '../Loader';
import Avatar from '../Avatar';
import CommentModal from '../siteadmin/ListingApprovalManagement/CommentModal/CommentModal';

import { ManagePublishStatus, submitForVerification, approveListing } from '../../actions/Listing/ManagePublishStatus';
import { openCommentModal, closeCommentModal } from '../../actions/modalActions';
import messages from '../../locale/messages';

import BgImage from '/public/SiteImages/becomeHostBg.svg';
import ListImage from '/public/SiteImages/editFooterVector.svg';
import iconOne from '/public/SiteIcons/exitpageIconOne.svg';
import exitIcon from '/public/SiteIcons/exitArrowIcon.svg';
import iconTwo from '/public/SiteIcons/exitpageIconTwo.svg';
import iconThree from '/public/SiteIcons/exitpageIconThree.svg';
import darkImage from '/public/SiteImages/editDarkBg.svg';
import waveIcon from '/public/SiteIcons/waving-hand.png';
import completedIcon from '/public/SiteIcons/completedIcon.svg';

import bt from '../../components/commonStyle.css';
import s from './ExistingPage.css';
class ExistingPage1 extends Component {
  static propTypes = {
    listingSteps: PropTypes.shape({
      step1: PropTypes.string.isRequired,
      step2: PropTypes.string.isRequired,
      step3: PropTypes.string.isRequired,
      guestDisplayName: PropTypes.string,
      listing: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isReady: PropTypes.bool.isRequired,
        isPublished: PropTypes.bool.isRequired
      }),
      user: PropTypes.shape({
        userBanStatus: PropTypes.number,
      }),
      userData: PropTypes.shape({
        firstName: PropTypes.string.isRequired
      }).isRequired
    }),
    nextPage: PropTypes.any.isRequired,
    stepsLoading: PropTypes.bool,
    ManagePublishStatus: PropTypes.any.isRequired,
    publishListLoading: PropTypes.bool,
  };
  static defaultProps = {
    listingSteps: {
      step1: "inactive",
      step2: "inactive",
      step3: "inactive",
      step4: "active",
      listing: {
        id: 0,
        isReady: false,
        isPublished: false
      },
      user: {
        userBanStatus: 0,
      }
    },
    photosCount: 0,
    stepsLoading: false,
    publishListLoading: false,
    userData: {
      firstName: ''
    }
  };

  constructor(props) {
    super(props);
  }

  handleApprove = async (event) => {
    const { approveListing, listingSteps: { listing: { id } }, openCommentModal } = this.props;
    if (event.target.value === 'approved') {
      await approveListing(id, 'approved');
    } else if (event.target.value === 'declined') {
      openCommentModal(id);
    }
  }

  handleDecline = async (listId, comment) => {
    const { closeCommentModal, approveListing } = this.props;
    await approveListing(listId, 'declined', comment);
    closeCommentModal();
  }


  render() {
    const { nextPage, listingSteps, photosCount, stepsLoading, account, publishListLoading, userData } = this.props;
    const { formatMessage } = this.props.intl;
    const { listingSteps: { listing: { id, isReady, isPublished, user, listApprovalStatus } } } = this.props;
    const { listingSteps: { step1, step2, step3, step4 } } = this.props;
    const { ManagePublishStatus, submitForVerification, guestDisplayName } = this.props;

    let userDelete = user && user.userDeletedAt;
    let isShowButton = false, stepOneCircle = false, stepTwoCircle = false, stepThreeCircle = false;
    let userBanStatusValue, stepFour = false, isPhotoAvailable, isAdmin;

    if (stepsLoading) {
      return <Loader type={"text"} />
    }

    if (user) {
      const { listingSteps: { listing: { user: { userBanStatus } } } } = this.props;
      userBanStatusValue = userBanStatus;
    }

    isShowButton = !userDelete ? true : false;
    isPhotoAvailable = photosCount > 0 ? true : false;
    isAdmin = !account ? true : false;

    if (step1 == 'completed') {
      stepOneCircle = true;
    }
    if (step2 == 'completed' && isPhotoAvailable) {
      stepTwoCircle = true;
    }
    if (step4 == 'completed') {
      stepThreeCircle = true;
    }

    if (step3 == "active") {
      stepFour = true;
    }

    if (step3 == "completed" && step4 == "active") {
      stepFour = true;
    }


    return (
      <div className={cx(s.mainSectionPadding, 'noPaddingBottom')}>
        <CommentModal handleDecline={this.handleDecline} />
        <div className={s.grid}>
          <div className={s.listIntroBgSection}>
            <div className={cx(s.listIntroBg, 'listIntroBgDark')} style={{ backgroundImage: `url(${BgImage})` }} ></div>
            <Grid fluid className={s.listIntroContainer}>
              <div className={s.userRight}>
                <Avatar
                  isUser
                  title={guestDisplayName}
                  className={s.profileImage}
                />
              </div>
              <h3 className={s.listIntroTitle}><img src={waveIcon} className={s.waveCss} />{' '}
                <FormattedMessage {...messages.hi} />,
                <span className={s.userNameColor}>{!isAdmin && userData.firstName} {isAdmin && <FormattedMessage {...messages.admin} />}!</span></h3>
              {!isAdmin && <h3 className={s.listIntroTitle}><FormattedMessage {...messages.letYouGetReady} /></h3>}
              <img className={cx(s.userDescriptionImage, 'lightModeImg')} src={ListImage} />
              <img className={cx(s.userDescriptionImage, 'darkModeImg')} src={darkImage} />
            </Grid>
          </div>
          <div className={s.landingMainContent}>
            <div>
              <strong className={cx(s.step)}><span><FormattedMessage {...messages.stepOneCommonHeading} /></span></strong>
              <div className={cx(s.contentSection, 'bgBlack')}>
                <div className={s.exitFlex}>
                  <div className={s.flexDirection}>
                    <span className={cx(s.iconCss)}><img src={iconOne} />
                      {step1 == "completed" && <img src={completedIcon} className={cx(s.completedCss, 'completedCssRTL')} />}
                    </span>
                    <span > <h3 className={s.landingContentTitle}><FormattedMessage {...messages.Sayyourspace} /></h3></span>
                  </div>
                  <div className={s.stepActionBtnContainer}>
                    {
                      step1 == "active" && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('map')}>
                        <FormattedMessage {...messages.continue} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                    {
                      step1 == "completed" && <a className={s.modalCaptionLink} onClick={() => nextPage('room')}>
                        <FormattedMessage {...messages.editLabel} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                  </div>
                </div>
                <p className={cx(s.landingTitleStep, 'textWhite', 'bgBlack')}><span><FormattedMessage {...messages.step1HeadingContent} /></span></p>
              </div>
            </div>
            <div className={s.innerStepTop}>
              <strong className={s.step}><span><FormattedMessage {...messages.stepTwoCommonHeading} /></span></strong>
              <div className={cx(s.contentSection, 'bgBlack')}>
                <div className={s.exitFlex}>
                  <div className={s.flexDirection}>
                    <span className={cx(s.iconCss)}><img src={iconTwo} />
                      {step2 == "completed" && isPhotoAvailable && <img src={completedIcon} className={cx(s.completedCss, 'completedCssRTL')} />}
                    </span>
                    <span ><h3 className={s.landingContentTitle}><FormattedMessage {...messages.step2SubHeading} /></h3></span>
                  </div>
                  <div className={s.stepActionBtnContainer}>
                    {
                      step2 == "active" && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('photos')}>
                        <FormattedMessage {...messages.continue} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                    {
                      step2 == "completed" && !isPhotoAvailable && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('photos')}>
                        <FormattedMessage {...messages.continue} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                    {
                      step2 == "completed" && isPhotoAvailable && <a className={s.modalCaptionLink} onClick={() => nextPage('photos')}>
                        <FormattedMessage {...messages.editLabel} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                  </div>
                </div>
                <p className={cx(s.landingTitleStep, 'textWhite', 'bgBlack')}><span><FormattedMessage {...messages.step2HeadingContent} /></span></p>
              </div>
            </div>

            <div className={s.innerStepTop}>
              <strong className={s.step}><span><FormattedMessage {...messages.stepThreeCommonHeading} /></span></strong>
              <div className={cx(s.contentSection, 'bgBlack')}>
                <div className={s.exitFlex}>
                  <div className={s.flexDirection}>
                    <span className={cx(s.iconCss)}><img src={iconThree} />
                      {step4 == "completed" && <img src={completedIcon} className={cx(s.completedCss, 'completedCssRTL')} />}
                    </span>
                    <span > <h3 className={s.landingContentTitle}><FormattedMessage {...messages.step3SubHeading} /></h3></span>
                  </div>
                  <div className={s.stepActionBtnContainer}>
                    {
                      stepFour == true && <a href="javascript:void(0);" className={s.modalCaptionLink} onClick={() => nextPage('house-rules')}>
                        <FormattedMessage {...messages.continue} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                    {
                      step4 == "completed" && <a className={s.modalCaptionLink} onClick={() => nextPage('house-rules')}>
                        <FormattedMessage {...messages.editLabel} /> <img src={exitIcon} className={cx(s.commonIcon, 'commonIconRTL')} />
                      </a>
                    }
                  </div>
                </div>
                <p className={cx(s.landingTitleStep, 'textWhite', 'bgBlack')}><span><FormattedMessage {...messages.step3HeadingContent} /></span></p>
              </div>
            </div>
          </div>
        </div>
        <div className={s.gridFooter}>
          {/* ````````````````Publish Button````````````` */}
          {
            listingSteps && isReady && listApprovalStatus === 'approved' && !isPublished && !userBanStatusValue && isShowButton && <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div>
                  <h3 className={cx(s.spaceTop1, s.textColor)}>
                    <FormattedMessage {...messages.readyToPublish} />
                  </h3>
                </div>
                <div className={s.btnFlex}>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.button, bt.btnPrimary, 'buttonLoaderRTL')}
                      handleClick={() => ManagePublishStatus(id, 'publish')}
                      show={publishListLoading}
                      label={formatMessage(messages.publishNow)}
                    />
                  </div>
                </div>

              </div>
            </div>
          }
          {/* ````````````````UnPublish Button````````````` */}
          {
            listingSteps && isReady && listApprovalStatus === 'approved' && isPublished && !userBanStatusValue && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div>
                  <h3 className={cx(s.spaceTop1, s.textColor)}>
                    {/* <FormattedMessage {...messages.listingPublished} /> */}
                  </h3>
                </div>
                <div className={s.btnFlex}>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}><FormattedMessage {...messages.previewListing} /> </a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.button, bt.btnPrimary, 'buttonLoaderRTL')}
                      handleClick={() => ManagePublishStatus(id, 'unPublish')}
                      show={publishListLoading}
                      label={formatMessage(messages.unPublishNow)}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          {/* ````````````````Submit for verification Button````````````` */}
          {
            !isAdmin && listingSteps && isReady && !listApprovalStatus && !userBanStatusValue && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div>
                  <h3 className={cx(s.spaceTop1, s.textColor)}>
                    <FormattedMessage {...messages.readyForVerification} />
                  </h3>
                </div>
                <div className={s.btnFlex}>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.button, bt.btnPrimary, s.waitingBtn, 'buttonLoaderRTL')}
                      handleClick={() => submitForVerification(id, 'pending')}
                      show={publishListLoading}
                      label={formatMessage(messages.submitForVerification)}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          {
            !isAdmin && listingSteps && isReady && listApprovalStatus === 'pending' && !userBanStatusValue && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div>
                  <h3 className={cx(s.spaceTop1, s.textColor)}>
                    <FormattedMessage {...messages.readyForApproval} />
                  </h3>
                </div>
                <div className={s.btnFlex}>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.button, bt.btnPrimary, s.waitingBtn, 'buttonLoaderRTL')}
                      disabled={true}
                      label={formatMessage(messages.waitingForAdmin)}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          {/* ````````````````Submit for appeal Button````````````` */}
          {
            !isAdmin && listingSteps && isReady && listApprovalStatus === 'declined' && !userBanStatusValue && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div>
                  <h3 className={cx(s.spaceTop1, s.textColor)}>
                    <FormattedMessage {...messages.readyForVerification} />
                  </h3>
                </div>
                <div className={s.btnFlex}>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                  <div className={s.displayInline}>
                    <Loader
                      type={"button"}
                      className={cx(s.button, bt.btnPrimary, 'buttonLoaderRTL')}
                      handleClick={() => submitForVerification(id, 'pending')}
                      label={formatMessage(messages.submitForAppeal)}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          {/* ````````````````Approve/Decline Admin Button````````````` */}
          {
            isAdmin && listingSteps && isReady && (listApprovalStatus === 'pending' || !listApprovalStatus) && !userBanStatusValue && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div className={'existingSelect'}>
                  <select className={cx(s.formSelect)} value={listApprovalStatus} onChange={this.handleApprove}>
                    <option value="pending">{formatMessage(messages.messageStatus5)}</option>
                    <option value="approved">{formatMessage(messages.approved)}</option>
                    <option value="declined">{formatMessage(messages.declined)}</option>
                  </select>
                </div>
                <div>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                </div>
              </div>
            </div>
          }
          {
            isAdmin && listingSteps && isReady && listApprovalStatus === 'declined' && !userBanStatusValue && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={s.listNextBackButton}>
                <div>
                  <h3 className={cx(s.spaceTop1, s.textColor)}>
                    <FormattedMessage {...messages.declineAdmin} />
                  </h3>
                </div>
                <div>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLink, 'prviewLinkAR', bt.btnPrimaryBorder)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                </div>
              </div>
            </div>
          }
          {
            userBanStatusValue == true && isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={cx(s.listNextBackButton, s.flexEnd)}>
                <div>
                  <a target="_blank" href={"/rooms/" + id + "/preview"} className={cx(s.previewLinkUserBan)}>
                    <FormattedMessage {...messages.previewListing} />
                  </a>
                </div>
              </div>
            </div>
          }
          {
            !isShowButton &&
            <div className={cx('bgBlack', s.listNextPosition, s.exitNextPosition, 'listNextPositionRTL')}>
              <div className={cx(s.listNextBackButton, s.flexCenter)}>
                <div>
                  <h3 className={s.spaceTop1}>
                    <FormattedMessage {...messages.listDeleted} />
                  </h3>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  stepsLoading: state.location.stepsLoading,
  account: state.account.data,
  publishListLoading: state.location.publishListLoading,
  userData: state.account.data,
});
const mapDispatch = {
  ManagePublishStatus,
  submitForVerification,
  approveListing,
  openCommentModal,
  closeCommentModal
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ExistingPage1)));
