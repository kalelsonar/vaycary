import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Button,
  Row,
  Col,
  Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { contactHostOpen } from '../../../actions/message/contactHostModal';
// Helper functions
import { checkIn, checkValue } from './helper';
// Internal Component
import ListItem from './ListItem';
import Link from '../../Link';
import Loader from '../../Loader';
import ListBedTypes from './ListBedTypes';

//image
import roomTypeIcon from '/public/SiteIcons/listingRoomTypeIcon.svg';
import guestIcon from '/public/SiteIcons/listingGuestIcon.svg';
import bedIcon from '/public/SiteIcons/listingBedIcon.svg';
import bathIcon from '/public/SiteIcons/listingBathIcon.svg';
import checkInIcon from '/public/SiteIcons/listingCheckIcon.svg';
import rightArrow from '/public/SiteIcons/viewReceiptRight.svg';
import totalRoom from '/public/SiteIcons/totalRooms.svg';

class ListingDetails extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      listingData: PropTypes.shape({
        cancellation: PropTypes.shape({
          policyName: PropTypes.string.isRequired,
          policyContent: PropTypes.string.isRequired
        })
      })
    }),
    getSpecificSettings: PropTypes.any,
    settingsData: PropTypes.object,
    isHost: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
    userBanStatus: PropTypes.number,
    urlParameters: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      guests: PropTypes.string,
      listTitle: PropTypes.string
    })
  };
  static defaultProps = {
    isHost: false,
    description: []
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoad: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoad: false });
  }

  UNSAFE_componentWillMount() {
    this.setState({ isLoad: true });
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { data } = this.props;
    const { formatMessage } = this.props.intl;
    const { open, isLoad } = this.state;

    let checkInStart, checkInEnd, roomType, buildingSize;
    let userAmenities = [], userSafetyAmenities = [];
    let sharedSpaces = [], houseRules = [], listBedTypes = [];
    let description, personCapacity, bathrooms, bedrooms, bedCounts = 0;
    let count = 150, firstArray, restArray, dotString = false;
    let isAmenities, isSharedSpaces, bedResult = [];

    if (data.listingData != undefined) {
      checkInStart = checkValue(data.listingData.checkInStart, '');
      checkInEnd = checkValue(data.listingData.checkInEnd, '');
    }
    if (data.settingsData != undefined && data.settingsData.length > 0) {
      roomType = checkValue(data.settingsData && data.settingsData[0] && data.settingsData[0].listsettings && data.settingsData[0].listsettings.itemName, '');
      buildingSize = checkValue(data.settingsData && data.settingsData[2] && data.settingsData[2].listsettings && data.settingsData[2].listsettings.itemName, '');
    }
    sharedSpaces = checkValue(data.userSpaces, []);
    houseRules = checkValue(data.houseRules, []);
    userAmenities = checkValue(data.userAmenities, []);
    userSafetyAmenities = checkValue(data.userSafetyAmenities, []);
    description = checkValue(data.description, '');
    personCapacity = checkValue(data.personCapacity, 0);
    bathrooms = checkValue(data.bathrooms, 0);
    bedrooms = checkValue(data.bedrooms, 0);
    listBedTypes = checkValue(data.listBedTypes, []);

    if (listBedTypes && listBedTypes.length > 0) {
      bedResult = listBedTypes.reduce((acc, o) => (acc[o.listsettings && o.listsettings.itemName] = (acc[o.listsettings && o.listsettings.itemName] || 0) + 1, acc), {});
      bedCounts = Object.values(bedResult);
      bedCounts = bedCounts.reduce((a, b) => a + b, 0)
    }

    if (description) {
      firstArray = description.slice(0, count);
      restArray = description.slice(count, description.length);
    }
    if (restArray && restArray.length > 0) {
      dotString = true;
    }

    userAmenities.map((item) => {
      if (item.listsettings.isEnable == '1') {
        isAmenities = true;
      }
    });

    sharedSpaces.map((item) => {
      if (item.listsettings.isEnable == '1') {
        isSharedSpaces = true
      }
    });

    return (
      <Row className={cx(s.pageContent)}>
        <div className={cx(s.horizontalLineThrough)}>
          <h2 className={cx(s.sectionTitleText)}> <FormattedMessage {...messages.aboutListing} /></h2>
          <div>
            <p className={cx(s.listingFontSize)} >
              {!this.state.open && count >= 150 &&
                <span className={cx(s.subText, s.lineBreak)}>  {firstArray} {dotString === true && <span>...</span>}</span>
              }
              {
                restArray && restArray.length > 0 &&
                <span>
                  <Collapse in={open}>
                    <div> <span className={cx(s.subText, s.lineBreak)}>
                      {this.state.open && firstArray} {restArray}
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
                            !this.state.open && <FontAwesome.FaAngleDown className={s.navigationIcon} />
                          }

                        </Button>
                      </div>
                    </div>
                  }
                </span>
              }
            </p>
          </div>
        </div>
        <div className={s.listingLine}></div>
        <div className={cx(s.horizontalLineThrough)}>
          <div className={cx(s.space1)}>
            <p className={s.sectionTitleText}><FormattedMessage {...messages.theSpace} /></p>
          </div>
          {!isLoad && <div className={s.grid}>
            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={roomTypeIcon} /></div>
              <div className={cx(s.textCss)}>
                <div><FormattedMessage {...messages.roomType} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{roomType}</div>
              </div>
            </p>
            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={guestIcon} /></div>
              <span className={cx(s.textCss)} >
                <div><FormattedMessage {...messages.guest} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{personCapacity} {personCapacity > 1 ? <FormattedMessage {...messages.guests} /> : <FormattedMessage {...messages.guest} />}</div>
              </span>
            </p>

            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={bedIcon} /></div>
              <span className={cx(s.textCss)}>
                <div><FormattedMessage {...messages.bedrooms} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{bedrooms} {bedrooms > 1 ? <FormattedMessage {...messages.bedrooms} /> : <FormattedMessage {...messages.bedroom} />}</div>
              </span>
            </p>

            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={totalRoom} /></div>
              <div className={cx(s.textCss)}>
                <div><FormattedMessage {...messages.totalRooms} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{buildingSize}</div>
              </div>
            </p>

            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={bedIcon} /></div>
              <span className={cx(s.textCss)}>
                <div><FormattedMessage {...messages.bedsCapital} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{bedCounts} {bedCounts > 1 ? <FormattedMessage {...messages.beds} /> : <FormattedMessage {...messages.bed} />}</div>
              </span>
            </p>

            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={bathIcon} /></div>
              <span className={cx(s.textCss)}>
                <div><FormattedMessage {...messages.bathrooms} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{bathrooms} {bathrooms > 1 ? <FormattedMessage {...messages.bathrooms} /> : <FormattedMessage {...messages.bathroom} />}</div>
              </span>
            </p>

            <p className={s.flex}>
              <div className={cx(s.svgImg, 'svgImg')}><img src={checkInIcon} /></div>
              <span className={cx(s.textCss)}>
                <div><FormattedMessage {...messages.checkIn} /></div>
                <div className={cx(s.smallText, 'textWhite')}>{checkIn(checkInStart, checkInEnd)}</div>
              </span>
            </p>

   

          </div>}
          {isLoad && <Loader type={"text"} />}
        </div>
        <div className={cx(s.listingLine, s.listingLineTwo)}></div>
        {
          listBedTypes && listBedTypes.length > 0 && listBedTypes[0].bedType && <div> <ListBedTypes
            itemList={listBedTypes}
            label={formatMessage(messages.bedsCapital)}
          />
            <div className={cx(s.listingLine, s.listingLineTwo)}></div>
          </div>

        }

        {
          userAmenities && userAmenities.length > 0 && isAmenities && <div> <ListItem
            itemList={userAmenities}
            label={formatMessage(messages.aminities)}
            showLabel={formatMessage(messages.showAmenities)}
            hideLabel={formatMessage(messages.closeAmenities)}
            icon={true}
          />
            <div className={s.listingLine}></div>
          </div>
        }
        {
          userSafetyAmenities.length > 0 && <div><ListItem
            itemList={userSafetyAmenities}
            label={formatMessage(messages.safetyFeatures)}
            showLabel={formatMessage(messages.showAllSafetyFeatures)}
            hideLabel={formatMessage(messages.closeSafetyFeatures)}
            icon={true}
          />
            <div className={s.listingLine}></div>
          </div>
        }
        {
          sharedSpaces && sharedSpaces.length > 0 && isSharedSpaces && <div> <ListItem
            itemList={sharedSpaces}
            label={formatMessage(messages.sharedSpaces)}
            showLabel={formatMessage(messages.showAllSharedSpaces)}
            hideLabel={formatMessage(messages.closeAllSharedSpaces)}
            icon={true}
          />
            <div className={s.listingLine}></div>
          </div>
        }

        {
          houseRules.length > 0 && <div> <ListItem
            itemList={houseRules}
            label={formatMessage(messages.houseRules)}
            showLabel={formatMessage(messages.showAllHouseRules)}
            hideLabel={formatMessage(messages.closeHouseRules)}
            icon={false}
            houseRulesIcon={true}
          />
            <div className={s.listingLine}></div>
          </div>
        }

        {
          data && data.listingData && data.listingData.cancellation && <div className={cx(s.horizontalLineThrough)}>
            <div className={cx(s.space1)}>
              <p className={s.sectionTitleText}><FormattedMessage {...messages.cancellations} /></p>
            </div>
            <div className={cx(s.spaceTop1)}>
              <p className={s.listingFontSize}>
                <span className={cx(s.text)}><strong>{data.listingData.cancellation.policyName}</strong></span>
              </p>
              <p className={s.listingFontSize}>
                <span className={cx(s.text)}>{data.listingData.cancellation.policyContent}</span>
              </p>
              <div className={cx(s.listingFontSize, s.showHideMargin)}>
                <Link
                  to={"/cancellation-policies/" + data.listingData.cancellation.policyName}
                  className={cx(s.sectionCaptionLink, s.viewFlex)}
                >
                  <FormattedMessage {...messages.viewDetails} /> <img src={rightArrow} className={'detailsArrowRTL'}/>
                </Link>
              </div>
            </div>
            <div className={s.listingLine}></div>
          </div>
        }
      </Row>
    );
  }
}
const mapState = (state) => ({
  settingsData: state.viewListing.settingsData,
});
const mapDispatch = {
  getSpecificSettings,
  contactHostOpen
};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingDetails)));