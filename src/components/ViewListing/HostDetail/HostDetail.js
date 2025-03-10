import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';
// External Component
import moment from 'moment';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Row,
  Collapse
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import s from './HostDetail.css';
import bt from '../../../components/commonStyle.css';

// Component
import Avatar from '../../Avatar';
import ContactHost from '../ContactHost';
import Link from '../../Link';

// Redux Action
import { contactHostOpen } from '../../../actions/message/contactHostModal';

// Locale
import messages from '../../../locale/messages';
class HostDetail extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    personCapacity: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      profileId: PropTypes.number.isRequired,
      displayName: PropTypes.string.isRequired,
      picture: PropTypes.string,
      location: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      info: PropTypes.string,
    }).isRequired,
    listingData: PropTypes.shape({
      minNight: PropTypes.number,
      maxNight: PropTypes.number,
      maxDaysNotice: PropTypes.string,
    }).isRequired,
    blockedDates: PropTypes.array,
    contactHostOpen: PropTypes.any.isRequired,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
    userBanStatus: PropTypes.number,
    country: PropTypes.string,
    urlParameters: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      guests: PropTypes.string,
      listTitle: PropTypes.string
    })
  };
  static defaultProps = {
    id: 0,
    userId: null,
    userBanStatus: 0,
    personCapacity: 0,
    city: null,
    profile: {
      profileId: 0,
      displayName: null,
      picture: null,
      location: null,
      createdAt: null,
      info: null
    },
    listingData: {
      minNight: 0,
      maxNight: 0
    },
    blockedDates: [],
    showContactHostModal: false,
    isHost: false,
    country: null,
    urlParameters: null
  }

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
    const { contactHostOpen, isHost, hostEmail, userBanStatus, urlParameters } = this.props;
    const { id, personCapacity, userId, city, blockedDates, country } = this.props;
    const { profile: { profileId, displayName, firstName, lastName, picture, location, info, createdAt } } = this.props;
    const { listingData: { minNight, maxNight, maxDaysNotice } } = this.props;
    let joinedDate = createdAt != null ? moment(createdAt).format("MMMM YYYY") : '';
    let initialValues = {
      listId: id,
      host: userId,
      hostEmail,
      firstName,
      startDate: urlParameters.startDate,
      endDate: urlParameters.endDate,
      personCapacity: urlParameters.guests,
    };
    let count = 150, firstArray, restArray, dotString = false;
    if (info) {
      firstArray = info.slice(0, count);
      restArray = info.slice(count, info.length);
    }
    if (restArray && restArray.length > 0) {
      dotString = true;
    }

    return (
      <div>
        <ContactHost
          initialValues={initialValues}
          id={id}
          userId={userId}
          city={city}
          profileId={profileId}
          picture={picture}
          displayName={firstName}
          personCapacity={personCapacity}
          blockedDates={blockedDates}
          minNight={minNight}
          maxNight={maxNight}
          maxDaysNotice={maxDaysNotice}
          country={country}
        />
        <div className={cx(s.pageContent)}>
          {/* <Col xs={12} sm={12} md={8} lg={8} className={cx(s.padding3, s.paddingTop3, s.horizontalLineThrough)}>
            <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.yourHost} /></h1>
          </Col> */}
          <div className={s.flex}>
            <div>
              <Avatar
                source={picture}
                height={63}
                width={63}
                title={firstName}
                className={s.profileAvatar}
                withLink
                linkClassName={s.profileAvatarLink}
                profileId={profileId}
              />
            </div>
            <div>
              <Link to={"/users/show/" + profileId}>
                <h1 className={cx(s.titleText, s.space1, 'textWhite')}>
                  <FormattedMessage {...messages.hostedBy} /> {' '}  {firstName}
                </h1>
              </Link>
              <p className={cx(s.textMuted, 'textWhite')}><FormattedMessage {...messages.joinedIn} /> {joinedDate}</p>
            </div>
          </div>
          <div className={cx(s.infoContent)}>
            {!this.state.open && count >= 150 && dotString === true &&
              <span className={cx(s.subText, s.lineBreak)}>  {firstArray} ...</span>
            }
            {!this.state.open && count >= 150 && dotString === false &&
              <span className={cx(s.subText, s.lineBreak)}>  {firstArray}</span>
            }
            {
              restArray && restArray.length > 0 &&
              <span>
                <Collapse in={this.state.open}>
                  <div> <span className={cx(s.subText, s.lineBreak)}>
                    {firstArray}{restArray}
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
                        {
                          !this.state.open ? <FormattedMessage {...messages.showMore} /> : <FormattedMessage {...messages.showLess} />
                        }
                        {
                          this.state.open ? <FontAwesome.FaAngleUp className={s.navigationIcon} /> : <FontAwesome.FaAngleDown className={s.navigationIcon} />
                        }
                      </Button>
                    </div>
                  </div>
                }
              </span>
            }

          </div>
          {
            !isHost && !userBanStatus && <Button className={cx(s.btn, bt.btnLarge, s.btnPrimary)} onClick={() => contactHostOpen(id, urlParameters)}>
              <FormattedMessage {...messages.contactHost} />
            </Button>
          }
        </div>
        <div className={s.listingLine}></div>
      </div>
    );
  }
}
const mapState = (state) => ({
});
const mapDispatch = {
  contactHostOpen
};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(HostDetail)));
