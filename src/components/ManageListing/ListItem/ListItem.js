import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// External Component
import moment from 'moment';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
  Button,
  Row,
  Col,
  ProgressBar,
} from 'react-bootstrap';

import s from './ListItem.css';
import bt from '../../../components/commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

// For Redirect
import history from '../../../core/history';
// Component
import ListCoverPhoto from '../../ListCoverPhoto';
import PublishOption from './PublishOption';

// Redux
import { connect } from 'react-redux';

// Redux action
import { removeListing } from '../../../actions/removeListing';

// Locale
import messages from '../../../locale/messages';

//Imgae
import closeIcon from '/public/SiteIcons/listCloseIcon.svg';
class ListItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      isRemove: false
    };
    this.openRemoveList = this.openRemoveList.bind(this);
    this.closeRemoveList = this.closeRemoveList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  percentage(data) {
    let totalPercentage = 100;
    let percentage = 0;
    let step1Percentage = 0, step2Percentage = 0, step2PhotosPercentage = 0, step3Percentage = 0;
    let step1 = data.listingSteps.step1;
    let step2 = data.listingSteps.step2;
    let step3 = data.listingSteps.step3;
    let step4 = data.listingSteps.step4;
    let listPhotos = data.listPhotos;
    if (data) {
      if (step1 === "active") {
        step1Percentage = 0.20;
      }
      if (step1 === "completed") {
        step1Percentage = 0.30;
      }
      if (step2 === "completed") {
        step2Percentage = 0.20;
      }
      if (listPhotos.length > 0) {
        step2PhotosPercentage = 0.10;
      }
      // if (step3 === "completed") {
      //   step3Percentage = 0.40;
      // }
      if (step4 === "completed") {
        step3Percentage = 0.40;
      }
    }
    percentage = step1Percentage + step2Percentage + step2PhotosPercentage + step3Percentage;
    return Number(totalPercentage * percentage);
  }
  title(data) {
    if (data) {
      if (data.title != null) {
        return data.title
      } else {
        return data.settingsData && data.settingsData[0] && data.settingsData[0].listsettings && data.settingsData[0].listsettings.itemName + " in " + data.city;
      }
    }
  }
  handlePreview(listId) {
    if (listId) {
      history.push('/rooms/' + listId + '/preview');
    }
  }
  handleEditListing(listId) {
    if (listId) {
      history.push('/become-a-host/' + listId + '/home');
    }
  }
  async handleRemoveListing(listId) {
    const { removeListing, refetch, searchKey } = this.props;
    this.setState({ isRemove: false });
    await removeListing(listId);
    let variables = { searchKey }
    await refetch(variables);
  }
  openRemoveList() {
    this.setState({ isRemove: true });
  }
  closeRemoveList() {
    this.setState({ isRemove: false });
  }
  removeItem(listId) {
    return (
      <li className={s.panelBodyAlert}>
        <div className={cx(s.alertBlock, 'bgBlackTwo')}>
          <div>
            <h3 className={s.heading}><FormattedMessage {...messages.deleteListing} /></h3>
            <p className={s.text}><FormattedMessage {...messages.deleteListingInfo} /></p>
            <div>
              <Button
                className={cx(s.button, bt.btnPrimary, bt.btnlarge, s.spaceRight2, s.smButton, 'spaceRight2AR')}
                onClick={() => this.handleRemoveListing(listId)}>
                <FormattedMessage {...messages.delete} />
              </Button>
              <Button
                className={cx(s.button, bt.btnPrimaryBorder, bt.btnLarge, s.smButton, s.marginTopMb, 'bgBlack')}
                onClick={this.closeRemoveList}>
                <FormattedMessage {...messages.goBack} />
              </Button>
            </div>
          </div>
        </div>
      </li>
    )
  }
  handleChange(event) {
    const { listId, ManagePublishStatus } = this.props;
    let action = event.target.value;
    ManagePublishStatus(listId, action);
  }
  render() {
    const { isRemove } = this.state;
    const { data } = this.props;
    let updatedDate = moment(data.lastUpdatedAt).format('Do MMMM YYYY');
    let listId = data.id;
    let coverPhoto = data.coverPhoto;
    let listPhotos = data.listPhotos;
    if (isRemove) {
      return this.removeItem(listId);
    } else {
      return (
        <li className={cx(s.panelBody, 'bgBlackTwo')} >
          <Row>
            <Col xs={12} sm={12} className={cx('hidden-md hidden-lg', s.space2)}>
              <a href="javascript:void(0);" onClick={this.openRemoveList}>
                <img src={closeIcon} className={cx(s.iconRemove, s.icon, 'pull-right', 'pullLeftHeaderAR')} />
              </a>
            </Col>
            <Col xs={12} sm={12} md={5} lg={4}>
              <div className={s.listPhotoCover}>
                <div className={s.listPhotoMedia}>
                  <a target="_blank" href={"/rooms/" + listId + "/preview"}>
                    <ListCoverPhoto
                      className={s.imgResponsive}
                      coverPhoto={coverPhoto}
                      listPhotos={listPhotos}
                      photoType={"x_medium"}
                    />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={8} className={s.listDetailContent}>
              <a href="javascript:void(0);" onClick={this.openRemoveList} className={'svgImg'}>
                <img src={closeIcon} className={cx(s.iconRemove, s.icon, "hidden-sm hidden-xs", 'pull-right', 'iconRemoveRtl')} />
              </a>
              <Col xs={12} sm={12} md={10} lg={10} className={cx(s.noPadding, s.textOverFlow)}>
                <a target="_blank" href={"/rooms/" + listId + "/preview"} className={s.listTitleSection}>
                  <span className={cx(s.listContent, 'textWhite')}> {this.title(data)} </span>
                </a>
              </Col>
              <Col xs={12} sm={12} md={10} lg={10} className={cx(s.noPadding, s.spaceTop1)}>
                <span className={cx(s.landingStep, 'textWhite')}><FormattedMessage {...messages.listingUpdateInfo} /> {updatedDate}</span>
              </Col>
              <Col xs={12} sm={12} md={10} lg={10} className={cx(s.noPadding, s.spaceTop2, s.space2)}>
                <ProgressBar
                  bsClass={s.leanProgressBar}
                  className={s.leanProgressContainer}
                  now={this.percentage(data)}
                />
                <span className={s.labelText}><FormattedMessage {...messages.progressBarText1} /> {this.percentage(data)}% <FormattedMessage {...messages.progressBarText2} /></span>
              </Col>
              <Button className={cx(s.button, bt.btnPrimary, s.spaceRight2, s.spaceTop2, s.smButton, 'spaceRight2AR')} onClick={() => this.handleEditListing(listId)}>
                {
                  data.listingSteps.step4 === "completed" && listPhotos.length > 0 && <span><FormattedMessage {...messages.editListing} /></span>
                }
                {
                  data.listingSteps.step4 === "completed" && listPhotos.length <= 0 && <span><FormattedMessage {...messages.finishListing} /></span>
                }
                {
                  data.listingSteps.step4 !== "completed" && <span><FormattedMessage {...messages.finishListing} /></span>
                }
              </Button>

              {
                data && data.listingSteps && data.isReady && <a
                  href={"/rooms/" + listId + "/preview"}
                  target="_blank"
                  className={cx('btn btn-default', s.button, bt.btnPrimaryBorder, s.spaceTop2, s.smButton, s.spaceRight2, 'spaceRight2AR', s.noBg)}
                >
                  <FormattedMessage {...messages.preview} />
                </a>
              }

              {
                data && data.isReady && data.user.userBanStatus != 1 && data.listApprovalStatus === 'approved' && <PublishOption
                  listId={listId}
                  isPublished={data.isPublished}
                />
              }
            </Col>
          </Row>
        </li>
      );
    }
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  removeListing
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ListItem)));