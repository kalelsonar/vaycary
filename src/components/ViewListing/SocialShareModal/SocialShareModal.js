// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialShareModal.css';
import {
  Modal,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Actions
import { openSocialShareModal, closeSocialShareModal } from '../../../actions/modalActions';

import { formatURL } from '../../../helpers/formatURL';

import messages from '../../../locale/messages';

//Images
import facebookIcon from '/public/SiteIcons/shareFacebook.svg';
import twitterIcon from '/public/SiteIcons/shareTwitter.svg';
import emailIcon from '/public/SiteIcons/shareEmail.svg';
import copyIcon from '/public/SiteIcons/shareLink.svg';

import { url } from '../../../config';

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

class SocialShareModal extends Component {
  static propTypes = {
    closeSocialShareModal: PropTypes.func,
    socialshareModal: PropTypes.bool,
    openSocialShareModal: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      socialshareModalStatus: false,
      isFormOpen: false,
      copied: false,
    };
    this.openForm = this.openForm.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  openForm() {
    this.setState({ isFormOpen: true });
  }

  componentDidMount() {
    const { socialshareModal } = this.props;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { socialshareModal } = nextProps;
    if (socialshareModal === true) {
      this.setState({ socialshareModalStatus: true });
    } else {
      this.setState({ socialshareModalStatus: false });
    }
  }

  async copyText() {
    this.setState({
      copied: true
    })

    setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 2000)
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { closeSocialShareModal, title, city, state, country, siteName, listId } = this.props;
    const { socialshareModalStatus, copied } = this.state;
    const shareUrl = url + '/rooms/' + formatURL(title) + '-' + listId;
    let previewText = `Check out this listing on ${siteName}!`;
    let bodyText = `Share this place with friends and family!
    Check out ${title} in ${city}, ${state}, ${country}" on ${siteName}. ` + shareUrl;

    return (
      <div>
        <Modal show={socialshareModalStatus} animation={false} onHide={closeSocialShareModal} dialogClassName={cx(s.signupModalContainer, 'signupModal', 'sharesocialModal')} >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body bsClass={s.signupModalBody}>
            <div className={s.paddingbottom24}>
              <div className={s.share}>
                <FormattedMessage {...messages.shareLabel} />
              </div>
              <div className={s.content}>
                <FormattedMessage {...messages.socialShareDesc} /> <FormattedMessage {...messages.checkOutShare} /> <span>{title} <FormattedMessage {...messages.inLabel} /> {city}, {state}, {country} <FormattedMessage {...messages.onLabel} />{' '}{siteName}</span>
              </div>
            </div>
            <ListGroup className={cx('sharingsocial', 'shareSocialLink')}>
              <div className={s.mainBorder}>
                <ListGroupItem tag="a" href={shareUrl} className={s.borderradiusNone}>
                  <FacebookShareButton
                    url={shareUrl}
                  >
                    <img src={facebookIcon} className={cx(s.socialIcons, 'socialIconsRtl')} />
                    <FormattedMessage {...messages.facebook} />
                  </FacebookShareButton>
                </ListGroupItem>
              </div>
              <div className={s.mainBorder}>
                <ListGroupItem tag="a" href={shareUrl}>
                  <TwitterShareButton
                    url={shareUrl}
                    className={s.displayIcon}>
                    <img src={twitterIcon} className={cx(s.socialIcons, 'socialIconsRtl')} />
                    <FormattedMessage {...messages.twitter} />
                  </TwitterShareButton>
                </ListGroupItem>
              </div>
              <div className={s.mainBorder}>
                <ListGroupItem tag="a" href={shareUrl}>
                  <EmailShareButton
                    url={shareUrl}
                    subject={previewText}
                    body={bodyText}
                    className={s.displayIcon}>
                    <img src={emailIcon} className={cx(s.socialIcons, 'socialIconsRtl')} />
                    <FormattedMessage {...messages.emailLabel} />
                  </EmailShareButton>
                </ListGroupItem>
              </div>
              <div>
                <ListGroupItem>
                  <CopyToClipboard
                    text={shareUrl}
                    onCopy={() => this.copyText()}
                  >
                    <div>
                      <img src={copyIcon} className={cx(s.socialIcons, 'socialIconsRtl')} />
                      <span>{copied ? formatMessage(messages.linkCopiedLabel) : formatMessage(messages.copyLinkLabel)}</span>
                    </div>
                  </CopyToClipboard>
                </ListGroupItem>
              </div>
            </ListGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const mapState = state => ({
  socialshareModal: state.modalStatus.isSocialShareModal,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  closeSocialShareModal,
  openSocialShareModal
};

export default (injectIntl)(withStyles(s)(connect(mapState, mapDispatch)(SocialShareModal)));