import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Component
import DateRange from '../DateRange';
import BillDetails from './BillDetails';
import BookingButton from './BookingButton';
// Redux action
import { bookingProcess } from '../../../actions/booking/bookingProcess';
// Locale
import messages from '../../../locale/messages';
import bt from '../../../components/commonStyle.css';
import s from './Calendar.css';

class BookingForm extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    country: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    tax: PropTypes.number,
    currency: PropTypes.string,
    monthlyDiscount: PropTypes.number,
    weeklyDiscount: PropTypes.number,
    minNight: PropTypes.number,
    maxNight: PropTypes.number,
    maxDaysNotice: PropTypes.string,
    loading: PropTypes.bool,
    availability: PropTypes.bool,
    maximumStay: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    blockedDates: PropTypes.array,
    isHost: PropTypes.bool.isRequired,
    guests: PropTypes.number,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    bookingLoading: PropTypes.bool,
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userBanStatus: PropTypes.number,
    })
  };
  static defaultProps = {
    blockedDates: [],
    availability: true,
    maximumStay: false,
    minimumStay: false,
    startDate: null,
    endDate: null,
    guests: 1,
    personCapacity: 0,
    country: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      personCapacityData: [],
    };
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ personCapacityData: listingFields.personCapacity });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({ personCapacityData: listingFields.personCapacity });
    }
  }

  renderFormControlSelect({ input, label, meta: { touched, error }, children, className }) {
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    );
  }
  renderGuests(personCapacity) {
    const { personCapacityData } = this.state;
    const rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? personCapacityData && personCapacityData.length > 0 && personCapacityData[0] && personCapacityData[0].otherItemName : personCapacityData && personCapacityData.length > 0 && personCapacityData[0] && personCapacityData[0].itemName}</option>);
    }
    return rows;
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { id, personCapacity, basePrice, cleaningPrice, tax, currency, isHost, bookingType, taxRate } = this.props;
    console.log({ id, personCapacity, basePrice, cleaningPrice, tax, currency, isHost, bookingType, taxRate });
    const { monthlyDiscount, weeklyDiscount, minNight, maxNight, maxDaysNotice } = this.props;
    const { isLoading, availability, maximumStay, guests, startDate, endDate, account, blockedDates, minimumStay, country } = this.props;
    const { bookingProcess, serviceFees, base, rates, bookingLoading, initialValues } = this.props;
    const isDateChosen = startDate != null && endDate != null || false;
    let userBanStatusValue;
    if (account) {
      const { account: { userBanStatus } } = this.props;
      userBanStatusValue = userBanStatus;
    }

    return (
      <Form>
        <FormGroup className={s.noMargin}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <label className={cx(s.guestText, 'guestTextRTL')}>
                <FormattedMessage {...messages.dates} />
              </label>
              <span className={cx('viewListingDate')}>
                <DateRange
                  listId={id}
                  minimumNights={minNight}
                  maximumNights={maxNight}
                  blockedDates={blockedDates}
                  formName={'BookingForm'}
                  maxDaysNotice={maxDaysNotice}
                  country={country}
                />
              </span>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <ControlLabel className={cx(s.guestText, 'guestTextRTL')}><FormattedMessage {...messages.howManyGuest} /></ControlLabel>
              <Field
                name="guests"
                component={this.renderFormControlSelect}
                className={cx(s.formControlSelect, bt.commonControlSelect, 'viewGuestCount', s.guestFormControlSelect)}
              >
                {this.renderGuests(personCapacity)}
              </Field>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          {
            !isLoading && maximumStay && isDateChosen && !userBanStatusValue && <div className={cx(s.bookItMessage, s.spaceTop3)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.maximumStay} /> {maxNight} {maxNight > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
              </p>
            </div>
          }
          {
            !isLoading && minimumStay && isDateChosen && !userBanStatusValue && <div
              className={cx(s.bookItMessage, s.spaceTop3)}
            >
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.minimumNightStay} />  {minNight} {minNight > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}
              </p>
            </div>
          }

          {
            !isLoading && !availability && isDateChosen && !userBanStatusValue && <div className={cx(s.bookItMessage, s.spaceTop3)}>
              <p className={cx(s.noMargin, s.textCenter, s.textError)}>
                <FormattedMessage {...messages.hostErrorMessage2} />
              </p>
            </div>
          }
        </FormGroup>
        {
          !isLoading && !maximumStay && !minimumStay && availability && isDateChosen && !userBanStatusValue && <BillDetails
            basePrice={basePrice}
            cleaningPrice={cleaningPrice}
            tax={tax}
            currency={currency}
            monthlyDiscount={monthlyDiscount}
            weeklyDiscount={weeklyDiscount}
            startDate={startDate}
            endDate={endDate}
            serviceFees={serviceFees}
            base={base}
            rates={rates}
            taxRate={taxRate}
          />
        }
        <BookingButton
          listId={id}
          startDate={startDate}
          endDate={endDate}
          guests={!isNaN(guests) ? guests : 1}
          bookingProcess={bookingProcess}
          availability={availability}
          isDateChosen={isDateChosen}
          userBanStatus={userBanStatusValue}
          basePrice={basePrice}
          isHost={isHost}
          bookingType={bookingType}
          bookButton={!isLoading && !maximumStay && !minimumStay && availability && isDateChosen && !userBanStatusValue}
          bookingLoading={bookingLoading}
          maximumStay={maximumStay}
          taxRate={taxRate}
          minimumStay={minimumStay}
        />
      </Form>
    );
  }
}
BookingForm = reduxForm({
  form: 'BookingForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BookingForm);
// Decorate with connect to read form values
const selector = formValueSelector('BookingForm'); // <-- same as form name
const mapState = state => ({
  isLoading: state.viewListing.isLoading,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  minimumStay: state.viewListing.minimumStay,
  startDate: selector(state, 'startDate'),
  endDate: selector(state, 'endDate'),
  guests: Number(selector(state, 'guests')),
  account: state.account.data,
  serviceFees: state.book.serviceFees,
  base: state.currency.base,
  rates: state.currency.rates,
  bookingLoading: state.book.bookingLoading,
  listingFields: state.listingFields.data,
});
const mapDispatch = {
  bookingProcess,
};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(BookingForm)));
