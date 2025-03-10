import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import bt from '../../components/commonStyle.css';

// Components
import Summary from './Summary';
import DetailsForHost from './DetailsForHost';
import DetailsForGuest from './DetailsForGuest';
import NotFound from '../../routes/notFound/NotFound';
import Link from '../Link';
import Avatar from '../Avatar';

import validate from './validate';
import submit from './submit';
import messages from '../../locale/messages';
import { getDateRanges } from '../../helpers/dateRange';

import s from './Cancellation.css';

class CancellationPolicy extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    userType: PropTypes.string.isRequired,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      profileId: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      hostId: PropTypes.string.isRequired,
      guestId: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      cleaningPrice: PropTypes.number.isRequired,
      guestServiceFee: PropTypes.number.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
      taxPrice: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      picture: PropTypes.string,
      confirmationCode: PropTypes.number.isRequired,
      reservationState: PropTypes.string.isRequired,
      listData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        country: PropTypes.string,
        listingData: PropTypes.shape({
          cancellation: PropTypes.shape({
            id: PropTypes.number.isRequired,
            policyName: PropTypes.string.isRequired,
            priorDays: PropTypes.number.isRequired,
            accommodationPriorCheckIn: PropTypes.number.isRequired,
            accommodationBeforeCheckIn: PropTypes.number.isRequired,
            accommodationDuringCheckIn: PropTypes.number.isRequired,
            guestFeePriorCheckIn: PropTypes.number.isRequired,
            guestFeeBeforeCheckIn: PropTypes.number.isRequired,
            guestFeeDuringCheckIn: PropTypes.number.isRequired,
          })
        })
      }),
      messageData: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
      hostData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string
      }),
      guestData: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        picture: PropTypes.string,
      }),
    })
  };

  static defaultProps = {
    data: {
      checkIn: null,
      checkOut: null
    }
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async handleCancel() {
    const { handleSubmit } = this.props;
    await handleSubmit();
  }

  renderFormControlTextArea = ({ input, label, meta: { dirty, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space1}>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={label}
          rows={6}
        >
          {children}
        </FormControl>
        {dirty && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  calculateCancellation(interval, nights) {
    const { data, data: { listData: { listingData } } } = this.props;

    let accomodation, guestFees, remainingNights, policyName, policyContent, priorDays, policyId, cancellation, nonRefundableNights, type = 'priorCheckIn', isTaxRefunded;
    cancellation = data?.cancellation ? data?.cancellation : listingData?.cancellation;

    let cancellationRuleObj = {
      accomodation,
      guestFees,
      nonRefundableNights,
      priorDays,
      policyName,
      remainingNights,
      interval,
      nights,
      policyContent,
      isTaxRefunded
    }

    if (interval > cancellation?.priorDays) {
      type = 'priorCheckIn'
    } else if (interval <= cancellation?.priorDays && interval > 0) {
      type = 'beforeCheckIn'
    } else {
      type = 'duringCheckIn'
    }

    if (type == 'priorCheckIn') {
      cancellationRuleObj = {
        accomodation: cancellation?.accommodationPriorCheckIn,
        guestFees: cancellation?.guestFeePriorCheckIn,
        nonRefundableNights: cancellation?.nonRefundableNightsPriorCheckIn,
        priorDays: cancellation?.priorDays,
        policyName: cancellation?.policyName,
        policyContent: cancellation?.policyContent,
        interval,
        nights,
        cleaningFeePercent: 100,
        taxFeePercent: 100,
        isTaxRefunded: true
      }
    } else if (type == 'beforeCheckIn') {
      cancellationRuleObj = {
        accomodation: cancellation?.accommodationBeforeCheckIn,
        guestFees: cancellation?.guestFeeBeforeCheckIn,
        nonRefundableNights: cancellation?.nonRefundableNightsBeforeCheckIn,
        priorDays: cancellation?.priorDays,
        policyName: cancellation?.policyName,
        policyContent: cancellation?.policyContent,
        interval,
        nights,
        cleaningFeePercent: 100,
        taxFeePercent: 100,
        isTaxRefunded: true
      }
      if (cancellation.id === 3) {
        cancellationRuleObj['cleaningFeePercent'] = 0;
        cancellationRuleObj['taxFeePercent'] = 0;
        cancellationRuleObj['isTaxRefunded'] = false;
      }
    } else {
      cancellationRuleObj = {
        accomodation: cancellation?.accommodationDuringCheckIn,
        guestFees: cancellation?.guestFeeDuringCheckIn,
        nonRefundableNights: cancellation?.nonRefundableNightsDuringCheckIn,
        priorDays: cancellation?.priorDays,
        policyName: cancellation?.policyName,
        policyContent: cancellation?.policyContent,
        remainingNights: (nights - 1) + interval,
        interval,
        nights,
        cleaningFeePercent: 0,
        taxFeePercent: 0,
        isTaxRefunded: false
      }
    }
    return { cancellationRuleObj };
  }

  render() {
    const { userType, valid, handleSubmit, data, data: { guestData, hostData, messageData, listData, listTitle, taxPrice }, isLoading } = this.props;
    const { nights, interval } = getDateRanges({ checkIn: data.checkIn, checkOut: data.checkOut, country: listData.country });
    const { formatMessage } = this.props.intl;
    let cancelData = {}, placeholder;

    if (guestData && hostData && messageData && listData && data?.checkIn && data?.checkOut && (-interval) < (nights - 1)) {
      cancelData = this.calculateCancellation(interval, nights);
      if (userType === 'host') {
        placeholder = formatMessage(messages.cancellationNote) + ' ' + guestData?.firstName + ' ' + formatMessage(messages.cancellationNoteForHost);
      } else {
        // placeholder = formatMessage(messages.cancellationNote) + ' ' + hostData.firstName + ' ' + formatMessage(messages.cancellationNoteForGuest);
        placeholder = formatMessage(messages.cancellationNote);
      }
      return (
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
              <form onSubmit={handleSubmit(submit)} className={s.displayGridParent}>
                <div>
                  <Summary
                    userType={userType}
                    firstName={userType === 'host' ? guestData?.firstName : hostData?.firstName}
                    guests={data?.guests}
                    nights={nights}
                    interval={interval}
                    checkIn={data?.checkIn}
                    checkOut={data?.checkOut}
                  />
                  <hr className={s.horizontalLineThrough} />
                  <div className={s.space3}>
                    <p className={cx(s.landingSubTitle, 'textWhite')}>
                      <FormattedMessage {...messages.needToCancel} />
                    </p>
                    <div className={s.displayFlexAvatar}>
                      <Avatar
                        source={userType === 'host' ? guestData?.picture : hostData?.picture}
                        height={60}
                        width={60}
                        title={userType === 'host' ? guestData?.firstName : hostData?.firstName}
                        className={s.profileAvatar}
                        withLink
                        linkClassName={s.profileAvatarLink}
                        profileId={userType === 'host' ? guestData?.profileId : hostData?.profileId}
                      />
                      <p className={s.hostedText}>
                        {userType === 'guest' && <span><FormattedMessage {...messages.hostedBy} /> {' '}</span>}
                        {userType === 'host' ? <span>{guestData?.firstName}</span> : <span>{hostData?.firstName}</span>}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Field
                      className={s.textareaInput}
                      name="message"
                      component={this.renderFormControlTextArea}
                      label={placeholder}
                    />
                  </div>
                  <p className={cx(s.landingStepDesc, s.space5, 'textWhite')}>
                    <span><FormattedMessage {...messages.reservationCancel} /></span>
                  </p>
                  <FormGroup className={cx(s.formGroup, bt.textAlignRight, s.mobileCenter)}>
                    <Link
                      className={cx(bt.btnPrimaryBorder, bt.btnLarge, s.linkBtn, 'rtlCancelLinkBtl')}
                      to={userType === 'host' ? "/reservation/current" : "/trips/current"}
                    >
                      {userType === 'host' ? <FormattedMessage {...messages.keepReservation} /> : <FormattedMessage {...messages.keepTrip} />}
                    </Link>
                    <Button
                      className={cx(bt.btnPrimary, bt.btnLarge, s.mobileBtn)}
                      onClick={() => this.handleCancel()}
                      disabled={!valid || isLoading}
                    >
                      {userType === 'host' ? <FormattedMessage {...messages.cancelYourReservation} /> : <FormattedMessage {...messages.cancelYourTrip} />}
                    </Button>
                  </FormGroup>
                </div>
                <div>
                  {
                    userType === 'host' && <DetailsForHost
                      userType={userType}
                      firstName={guestData?.firstName}
                      guestEmail={guestData?.userData.id}
                      hostName={hostData?.firstName}
                      profileId={guestData?.profileId}
                      picture={guestData?.picture}
                      checkIn={data?.checkIn}
                      checkOut={data?.checkOut}
                      guests={data?.guests}
                      listData={listData}
                      listTitle={data?.listTitle}
                      listId={data?.listId}
                      basePrice={data?.basePrice}
                      cleaningPrice={data?.cleaningPrice}
                      guestServiceFee={data?.guestServiceFee}
                      hostServiceFee={data?.hostServiceFee}
                      taxPrice={data?.taxPrice}
                      total={data?.total}
                      currency={data?.currency}
                      cancelData={cancelData}
                      reservationId={data?.id}
                      threadId={data?.messageThreadId?.id ? data?.messageThreadId?.id : data?.messageData?.id}
                      confirmationCode={data?.confirmationCode}
                      holdeData={data}
                      taxRate={data?.taxRate}
                      interval={interval}
                      hostServiceFeeType={data?.hostServiceFeeType}
                      hostServiceFeeValue={data?.hostServiceFeeValue}
                      isSpecialPriceAverage={data?.isSpecialPriceAverage}
                      discount={data?.discount ? data?.discount : 0}
                    />
                  }
                  {
                    userType === 'guest' && <DetailsForGuest
                      userType={userType}
                      firstName={hostData?.firstName}
                      hostEmail={hostData?.userData.id}
                      guestName={guestData?.firstName}
                      profileId={hostData?.profileId}
                      picture={hostData?.picture}
                      checkIn={data?.checkIn}
                      checkOut={data?.checkOut}
                      guests={data?.guests}
                      listData={listData}
                      listTitle={data?.listTitle}
                      listId={data?.listId}
                      basePrice={data?.basePrice}
                      cleaningPrice={data?.cleaningPrice}
                      guestServiceFee={data?.guestServiceFee}
                      hostServiceFee={data?.hostServiceFee}
                      taxPrice={data?.taxPrice}
                      total={data?.total}
                      currency={data?.currency}
                      cancelData={cancelData}
                      reservationId={data?.id}
                      threadId={data?.messageThreadId?.id ? data?.messageThreadId?.id : data?.messageData?.id}
                      confirmationCode={data?.confirmationCode}
                      discount={data?.discount ? data?.discount : 0}
                      holdeData={data}
                      taxRate={data?.taxRate}
                      interval={interval}
                      hostServiceFeeType={data?.hostServiceFeeType}
                      hostServiceFeeValue={data?.hostServiceFeeValue}
                      isSpecialPriceAverage={data?.isSpecialPriceAverage}
                    />
                  }
                </div>
              </form>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return <NotFound />
    }
  }
}

CancellationPolicy = reduxForm({
  form: 'CancellationForm', // a unique name for this form
  validate,
  onSubmit: submit
})(CancellationPolicy);

const mapState = (state) => ({
  isLoading : state?.loader?.cancelLoading
});

const mapDispatch = {
  initialize
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CancellationPolicy)));