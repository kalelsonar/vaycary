import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reservation.css';
import {
  Label, DropdownButton
} from 'react-bootstrap';

// Component
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';
import MenuItemLink from '../MenuItemLink';

// Redux action
import { sendMessageAction } from '../../actions/message/sendMessageAction';
import { readMessage } from '../../actions/message/readMessage';

// Locale
import messages from '../../locale/messages';

//Helper
import { getDateRanges } from '../../helpers/dateRange';

//Image
import tripChatIcon from '/public/SiteIcons/tripChatIcon.svg';
import receiptIcon from '/public/SiteIcons/moreReceipt.svg';
import ItineryIcon from '/public/SiteIcons/moreItinerary.svg';
import ItineryIconHover from '/public/SiteIcons/moreItineraryHover.svg';
import ApproveIcon from '/public/SiteIcons/moreApprove.svg';
import declineIcon from '/public/SiteIcons/moreDecline.svg';
import emailIcon from '/public/SiteIcons/reservationEdit.svg';
import phoneIcon from '/public/SiteIcons/reservationPhone.svg';
import receiptIconHover from '/public/SiteIcons/receiptIconHover.svg';
import approveIconHover from '/public/SiteIcons/moreApproveHove.svg';
import declineIconHover from '/public/SiteIcons/moreDeclineHover.svg';

class ReservationItem extends Component {
  static propTypes = {
    noList: PropTypes.bool,
    userType: PropTypes.string.isRequired,
    threadId: PropTypes.number.isRequired,
    reservationId: PropTypes.number.isRequired,
    reservationState: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    listId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    sendMessageAction: PropTypes.any.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    noList: false,
    checkIn: null,
    checkOut: null
  };

  state = {
    smallDevice: false
  };

  componentDidMount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }

  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize = (e) => {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : true;
    this.setState({
      smallDevice,
    });
  }

  sendMessage(type) {
    const { sendMessageAction, threadId, checkIn, checkOut, guests, reservationId } = this.props;
    const { searchKey, currentPage, listIdKey, startDate, endDate, orderBy, dateFilter, userType } = this.props;
    sendMessageAction(threadId, userType, null, type, checkIn, checkOut, guests, reservationId, null, null, null, null, currentPage, searchKey, listIdKey, startDate, endDate, orderBy, dateFilter);
  }

  reservationStyle(type) {
    const { reservationState } = this.props;
    let style, label;
    switch (reservationState) {
      case 'pending':
        label = <FormattedMessage {...messages.messageStatus5} />
        style = 'primary';
        break;
      case 'expired':
        label = <FormattedMessage {...messages.messageStatus9} />
        style = 'warning';
        break;
      case 'approved':
        label = <FormattedMessage {...messages.messageStatus4} />
        style = 'success';
        break;
      case 'declined':
        label = <FormattedMessage {...messages.messageStatus3} />
        style = 'danger';
        break;
      case 'completed':
        label = <FormattedMessage {...messages.panelHeader2} />
        style = 'success';
        break;
      case 'cancelled':
        label = <FormattedMessage {...messages.messageStatus11} />
        style = 'danger';
        break;
    }
    if (type) {
      return label;
    } else {
      return <Label className={s.labelText} bsStyle={style}>{label}</Label>;
    }
  }

  render() {
    const { threadId, userType, reservationId, reservationState, checkIn, checkOut, createdAt, phoneNumberStatus } = this.props;
    const { listId, title, street, city, state, country, zipcode } = this.props;
    const { profileId, displayName, picture, phoneNumber, countryCode, email, isPhoneVerified } = this.props;
    const { guestServiceFee, hostServiceFee, total, currency, readMessage } = this.props;
    const { noList } = this.props;
    const { formatMessage } = this.props.intl;

    let isValue;
    let enableCancel = false, enableIternary = false, enableContactSupport = false, enableGuestReceipt = false;
    let enableApprove = false, enableDecline = false, enableHostReceipt = false;

    if (reservationState == 'completed' || reservationState == 'approved') {
      isValue = '#5cb85c'
    } else if (reservationState == 'expired') {
      isValue = '#f0ad4e'
    } else if (reservationState == 'pending') {
      isValue = '#007bff'
    } else if (reservationState == 'declined' || reservationState == ' cancelled') {
      isValue = '#d9534f'
    }

    let checkInDate = checkIn ? moment(checkIn).format('MM/DD/YYYY') : '';
    let checkOutDate = checkOut ? moment(checkOut).format('MM/DD/YYYY') : '';
    let createdDate = createdAt ? moment(createdAt).format('Do MMM, YYYY') : '';
    let subTotal = 0;
    let formattedCheckout = moment(checkOut);

    const { nights, interval, today } = getDateRanges({ checkIn, checkOut, country })

    if (reservationState === 'approved' && !noList && userType === 'guest') enableIternary = true;
    if (noList) enableContactSupport = true;
    if (!noList && userType === 'guest') enableGuestReceipt = true;
    if (!noList && userType === 'host' && (reservationState === 'approved' || reservationState === 'completed')) enableHostReceipt = true;
    if (!noList && userType === 'host' && reservationState === 'pending') enableApprove = true;
    if (!noList && userType === 'host' && reservationState === 'pending') enableDecline = true;
    if (!noList && reservationState === 'approved' && formattedCheckout > today && (-interval) < (nights - 1)) {
      enableCancel = true;
    }

    if (userType === 'host') {
      subTotal = total - hostServiceFee;
    } else {
      subTotal = total + guestServiceFee
    }

    let mailTo = 'mailto:' + email, showPhoneNumber;

    showPhoneNumber = phoneNumberStatus === '1' && !isPhoneVerified ? false : true;

    return (
      <div>
        <div className={cx(s.dateBottom, 'textWhite')}>{createdDate}</div>
        <div className={cx(s.positionRelative, 'bgBlackTwo')}>
          <div className={s.grid}>
            <div className={s.flex}>
              <div>
                <Avatar
                  source={picture}
                  height={83}
                  width={83}
                  title={displayName}
                  className={cx(s.profileAvatar, s.profileAvatarLink)}
                  withLink={noList ? false : true}
                  profileId={profileId}
                />
              </div>
              <div>
                <div> <Link to={"/users/show/" + profileId} className={s.sectionTitleLight}>{displayName}</Link> </div>
                {
                 !noList && reservationState && (reservationState === 'approved' || reservationState === 'completed') && <ul className={cx(s.listLayout, 'listLayoutArbic')}>
                    <div className={cx(s.textWordBreak, s.iconFlex, 'svgImg')}>
                      <a href={mailTo} className={s.emailFlex}>
                        <img src={emailIcon} />
                        <span>{email}</span>
                      </a>
                    </div>
                    { showPhoneNumber && countryCode && phoneNumber &&
                      <div className={s.textWordBreak}>
                        <a href={this.state.smallDevice && `tel:${countryCode}${phoneNumber}`}>
                          <img src={phoneIcon} />
                          <span>{phoneNumber}</span>
                        </a>
                      </div>
                    }
                  </ul>
                }

                {!noList && <div><Link to={"/message/" + threadId + "/" + userType} onClick={() => readMessage(threadId, userType)} className={s.chatFlex}>
                  <img src={tripChatIcon} />
                  <span><FormattedMessage {...messages.chatText} /></span>
                </Link></div>}
              </div>
            </div>
            <div>
              <div className={cx(s.displayTableCell, s.addressWidth, s.responsiveDisplay, s.tabScreenresolution)}>
                {
                  !noList && <div>
                    <a href={"/rooms/" + listId} target={'_blank'} className={s.linkTitle}> {title} </a><br />
                  </div>
                }

                {
                  noList && userType === 'guest' && <span className={s.errorMessage}> <FormattedMessage {...messages.noList} /> </span>
                }
                {
                  noList && userType === 'host' && <span className={s.errorMessage}> <FormattedMessage {...messages.notexist} /> </span>
                }
                {
                  !noList && <div>
                    <div className={s.streetCss}>{street}</div>
                    <div className={s.cityCss}>{city + (city ? ', ' : '')}{state + (state ? ', ' : '')}{country + (country ? ', ' : '')}{zipcode} </div>
                  </div>
                }
                <div className={s.cityCss}>({checkInDate} - {checkOutDate})</div>
              </div>
            </div>

          </div>
          <div className={s.flexBottom}>
            <div>
              <p className={cx(s.sectionTitleLight, s.spaceTop1)}>
                {this.reservationStyle()}
              </p>
            </div>
            <div className={cx(s.textCenter, s.alignRightMobile, 'alignRightMobileRTL')}>
              <p className={cx(s.space1, s.dateFont)}>
                <CurrencyConverter
                  amount={subTotal}
                  className={s.bookItPrice}
                  from={currency}
                />
              </p>
            </div>
            {(enableContactSupport || enableIternary || enableGuestReceipt || enableHostReceipt || enableApprove || enableDecline || enableCancel) && <div className={cx('tripDropDown', s.textAlignRight, s.textAlignCenterMobile, 'textAlignLeftRtl', 'textAlignCenterMobileRTL')}>
              <DropdownButton
                bsSize="small"
                title={formatMessage(messages.moreText)}
                id="dropdown-size-small"
                className={s.moreTextSize}
              >
                {enableContactSupport && <MenuItemLink to={"/contact"} className={'svgImg'}><img src={receiptIcon} className={'hideIcon'} /> <img src={receiptIconHover} className={'showIcon'} /> <FormattedMessage {...messages.contactSupport} /></MenuItemLink>}
                {enableIternary && <MenuItemLink to={"/users/trips/itinerary/" + reservationId} className={'svgImg'}><img src={ItineryIcon} className={'hideIcon'} /> <img src={ItineryIconHover} className={'showIcon'} /><FormattedMessage {...messages.viewItinerary} /></MenuItemLink>}
                {enableGuestReceipt && <MenuItemLink to={"/users/trips/receipt/" + reservationId} className={'svgImg'}><img src={receiptIcon} className={'hideIcon'} /> <img src={receiptIconHover} className={'showIcon'} /><FormattedMessage {...messages.viewReceipt} /></MenuItemLink>}
                {enableHostReceipt && <MenuItemLink to={"/users/trips/receipt/" + reservationId} className={'svgImg'}><img src={receiptIcon} className={'hideIcon'} /> <img src={receiptIconHover} className={'showIcon'} /><FormattedMessage {...messages.viewReceipt} /></MenuItemLink>}
                {enableApprove && <MenuItemLink onClick={() => this.sendMessage('approved')} className={'svgImg'}>
                  <img src={ApproveIcon} className={'hideIcon'} /> <img src={approveIconHover} className={'showIcon'} /> <FormattedMessage {...messages.approve} />
                </MenuItemLink>}
                {enableDecline && <MenuItemLink onClick={() => this.sendMessage('declined')} className={'svgImg'}>
                  <img src={declineIcon} className={'hideIcon'} /> <img src={declineIconHover} className={'showIcon'} /> <FormattedMessage {...messages.decline} />
                </MenuItemLink>}
                {enableCancel && <MenuItemLink to={"/cancel/" + reservationId + "/" + userType} className={'svgImg'}><img src={declineIcon} className={'hideIcon'} /> <img src={declineIconHover} className={'showIcon'} /> <FormattedMessage {...messages.cancel} /></MenuItemLink>}
              </DropdownButton>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  phoneNumberStatus: state.siteSettings.data.phoneNumberStatus
});

const mapDispatch = {
  sendMessageAction,
  readMessage
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReservationItem)));