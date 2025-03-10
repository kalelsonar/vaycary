import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import DayDragCalendar from '../../components/DayDragCalendar';
import Logo from '../Logo';
import FooterButton from './FooterButton';

import updateStep3 from './updateStep3';
import messages from '../../locale/messages';

import toolTipIcon from '/public/SiteIcons/listCommonToolTip.svg';
import defaultPic from '/public/SiteImages/large_no_image.jpeg';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';
class Calendar extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    disabledDates: PropTypes.array,
    blockedDates: PropTypes.array,
  };

  static defaultProps = {
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
    disabledDates: [],
    blockedDates: [],
    availableDatesPrices: [],
    availableDates: []
  };

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
    };
  }


  componentDidMount() {
    const { listBlockedPrice } = this.props;
    let sources = [];
    let sourceObject = {};

    listBlockedPrice && listBlockedPrice.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.blockedDates;
      sources.push(sourceObject);
    });
    this.setState({ sources });

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listBlockedPrice } = nextProps;
    let sources = [];
    let sourceObject = {};

    listBlockedPrice && listBlockedPrice.map((item, key) => {
      sourceObject = {};
      sourceObject["isSpecialPrice"] = item.isSpecialPrice;
      sourceObject["blockedDates"] = item.blockedDates;
      sources.push(sourceObject);
    });
    this.setState({ sources });

  }

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { disabledDates, blockedDates, listId, listingSteps: { step3 } } = this.props;
    const { minNight, maxNight, houseRules, checkInEnd, checkInStart } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, weeklyDiscount, monthlyDiscount } = this.props;
    const { availableDates, availableDatesPrices, baseCurrency, currency, availableCurrencies } = this.props;
    const { basePrice, cleaningPrice, stepTwoDetails, formPage, step, tax  } = this.props;

    const { sources } = this.state;

    let isAdminCurrency;
    isAdminCurrency = availableCurrencies && availableCurrencies.find(o => o.isBaseCurrency == true)
    let title = stepTwoDetails && stepTwoDetails.title;
    let description = stepTwoDetails && stepTwoDetails.description;
    let coverPhoto = stepTwoDetails && stepTwoDetails.coverPhoto;
    let coverImage = stepTwoDetails && stepTwoDetails.listPhotos.find(o => o.id == coverPhoto);
    let path = '/images/upload/x_medium_';
    let showImage;
    let className = 'calendarFooter'
    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && stepTwoDetails && stepTwoDetails.listPhotos && stepTwoDetails.listPhotos.length > 0) {
      showImage = path + (stepTwoDetails && stepTwoDetails.listPhotos && stepTwoDetails.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }

    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, s.fullWidthCalendar)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.landingContent, 'landingContentRTL')}>
            <div>
              {step3 == 'completed' && <div className={s.editStepLogo}><Logo link={"/"} className={(s.brandImg)}/></div>}
              <h1 className={s.availabilityText}><FormattedMessage {...messages.availability} /></h1>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.calendar} /></h3>
              <div className={s.lableWeight}>
                <p className={cx(s.bookedWidth)}><span className={cx(s.notAvailableColor, 'availableRTl')}></span><FormattedMessage {...messages.booked} /></p>
                <p className={s.calenderColorText}><span className={cx(s.bookedColor, 'availableRTl')}></span><FormattedMessage {...messages.notAvailable} /></p>
                <p className={s.calenderColorText}><span className={cx(s.availableColor, 'availableRTl')}></span><FormattedMessage {...messages.availableLabel} /></p>
                <p className={s.calenderColorText}><span className={cx(s.specialColor, 'availableRTl')}></span><FormattedMessage {...messages.sessionPrice} /></p>
              </div>
              <div className={s.tipCommonCss}>
                <img src={toolTipIcon} />
                <span className={cx(s.commonTipCsss, s.calendarNoted, 'textWhite')}><FormattedMessage {...messages.unBlockInfo} /></span>
              </div>
              <form onSubmit={handleSubmit}>
                <FormGroup className={cx(s.formGroup, s.posRelative)}>
                  {/* <div className={s.imagefeed}>
                      <div className={s.caListimg} style={{ backgroundImage: `url(${showImage})` }}>
                      </div>
                      <div className={s.caListPara}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                      </div>
                    </div> */}
                  <DayDragCalendar
                    formName={"ListPlaceStep3"}
                    disabledDates={disabledDates}
                    blockedDates={blockedDates}
                    listId={listId}
                    availableDates={availableDates}
                    availableDatesPrices={availableDatesPrices}
                    sources={sources}
                    minNight={minNight}
                    maxNight={maxNight}
                    houseRules={houseRules}
                    checkInEnd={checkInEnd}
                    checkInStart={checkInStart}
                    cancellationPolicy={cancellationPolicy}
                    maxDaysNotice={maxDaysNotice}
                    bookingNoticeTime={bookingNoticeTime}
                    baseCurrency={baseCurrency}
                    currency={currency}
                    isAdminCurrency={isAdminCurrency}
                    basePrice={basePrice}
                    cleaningPrice={cleaningPrice}
                    tax={tax}
                    weeklyDiscount={weeklyDiscount}
                    monthlyDiscount={monthlyDiscount}
                    transitionDuration={0}
                    todayLabel={formatMessage(messages.todayLabel)}
                  />
                </FormGroup>
                <FooterButton
                  isDisabled={error}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  nextPagePath={"guest-requirements"}
                  previousPagePath={"min-max-nights"}
                  formPage={formPage}
                  step={step}
                  className={className}
                />
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Calendar = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Calendar);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  disabledDates: selector(state, 'disabledDates'),
  blockedDates: selector(state, 'blockedDates'),
  listBlockedPrice: selector(state, 'listBlockedPrice'),
  minNight: selector(state, 'minNight'),
  maxNight: selector(state, 'maxNight'),
  houseRules: selector(state, 'houseRules'),
  checkInStart: selector(state, 'checkInStart'),
  checkInEnd: selector(state, 'checkInEnd'),
  bookingNoticeTime: selector(state, 'bookingNoticeTime'),
  maxDaysNotice: selector(state, 'maxDaysNotice'),
  cancellationPolicy: selector(state, 'cancellationPolicy'),
  availableDates: selector(state, 'availableDates'),
  availableDatesPrices: selector(state, 'availableDatesPrices'),
  currency: selector(state, 'currency'),
  availableCurrencies: state?.currency?.availableCurrencies?.results,
  basePrice: selector(state, 'basePrice'),
  cleaningPrice: selector(state, 'cleaningPrice'),
  weeklyDiscount: selector(state, 'weeklyDiscount'),
  monthlyDiscount: selector(state, 'monthlyDiscount'),
  tax: selector(state, 'tax'),
  stepTwoDetails: state.calendar.stepTwoDetails,
  listingSteps: state.location.listingSteps
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Calendar)));
