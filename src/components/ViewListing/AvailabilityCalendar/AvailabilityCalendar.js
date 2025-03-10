import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import 'react-dates/initialize';

import CustomizableCalendarDay from './CustomizableCalendarDay';
import Loader from '../../../components/Loader';

import messages from '../../../locale/messages';
import { checkAvailability } from '../../../actions/checkAvailability';
import { getBlockedDates } from '../../../actions/Listing/getBlockedDates';
import { getSpecialPricingData } from '../../../actions/Listing/getSpecialPricingData';
import { isRTL } from '../../../helpers/formatLocale';
import { getDateUsingTimeZone } from '../../../helpers/dateRange';

import S from '!isomorphic-style-loader!css-loader!react-dates/lib/css/_datepicker.css';
import s from './AvailabilityCalendar.css';
class AvailabilityCalendar extends React.Component {
  static propTypes = {
    listId: PropTypes.number.isRequired,
    blockedDates: PropTypes.array,
    smallDevice: PropTypes.bool,
    verySmallDevice: PropTypes.bool,
    country: PropTypes.string
  };

  static defaultProps = {
    blockedDates: [],
    listId: null,
    maxDaysNotice: 'unavailable',
    autoFocusEndDate: false,
    showInputs: false,
    keepOpenOnDateSelect: false,
    initialVisibleMonth: null,
    hideKeyboardShortcutsPanel: true,
    noBorder: true,
    startDateOffset: undefined,
    endDateOffset: undefined,
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    smallDevice: false,
    verySmallDevice: false,
    formName: 'BookingForm',
    formStartDate: null,
    formEndDate: null,
    country: '',
    paymentCalendar: false
  }

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
      startDate: null,
      endDate: null,
      blockedDatesSet: new Set(),
      smallDevice: false,
      load: true
    };
  }

  componentDidMount() {
    const { blockedDates, queryStartDate, queryEndDate, isFullDayBlock } = this.props;
    const blockedDatesSet = new Set();
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);

    }
    isFullDayBlock?.forEach(day => {
      // we save the unique timestamp of that day
      if (day?.calendarStatus != 'available') {
        blockedDatesSet?.add(moment(day?.blockedDates).format('YYYY-MM-DD'));
      }
    });
    this.setState({ blockedDatesSet });
    if (queryStartDate && queryEndDate) {
      this.setState({ startDate: moment(queryStartDate), endDate: moment(queryEndDate) });
    }
  }

  async componentWillUnmount() {
    const { listingData, checkAvailability, getSpecialPricingData, listId, formStartDate, formEndDate } = this.props;
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
    if (formStartDate && formEndDate) {
      await getSpecialPricingData(listId, moment(formStartDate).format('YYYY-MM-DD'), moment(formEndDate).format('YYYY-MM-DD'));
      await checkAvailability(listId, moment(formStartDate).format('YYYY-MM-DD'), moment(formEndDate).format('YYYY-MM-DD'), listingData?.maxNight, listingData?.minNight);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { blockedDates, formStartDate, formEndDate, checkIn, checkOut, formName, queryStartDate, queryEndDate, isFullDayBlock } = nextProps;
    const { blockedDatesSet } = this.state;

    isFullDayBlock?.forEach(day => {
      // we save the unique timestamp of that day
      if (day.calendarStatus != 'available') {
        blockedDatesSet?.add(moment(day?.blockedDates).format('YYYY-MM-DD'));
      }
    });

    this.setState({ blockedDatesSet });

    if (formName == 'BookingForm' && formStartDate && formEndDate) {
      this.setState({
        startDate: moment(formStartDate),
        endDate: moment(formEndDate)
      });
    } else if ((formName == 'PaymentForm') && checkIn && checkOut) {
      this.setState({
        startDate: moment(checkIn),
        endDate: moment(checkOut)
      });
    } else if ((formName == 'PaymentFormModal') && queryStartDate && queryEndDate) {
      this.setState({
        startDate: moment(queryStartDate),
        endDate: moment(queryEndDate)
      });
    }

    if (!formEndDate) {
      this.setState({
        endDate: null
      });
    }

  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({ load: false });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
    }
  }

  onDatesChange = async ({ startDate, endDate }) => {
    const { listId, formName, checkAvailability, change, maximumNights, getSpecialPricingData, listingData } = this.props;
    const { focusedInput } = this.state;

    this.setState({ startDate, endDate });

    if (formName === 'PaymentForm' || formName === 'PaymentFormModal') {
      await Promise.all([
        await change(formName, 'checkIn', moment(startDate).format('YYYY-MM-DD')),
        await change(formName, 'checkOut', endDate),
      ])
    } else {
      await Promise.all([
        await change(formName, 'startDate', startDate),
        await change(formName, 'endDate', endDate),
      ])
    }

    if ((focusedInput === END_DATE || focusedInput === START_DATE) && endDate) {
      await getSpecialPricingData(listId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
      await checkAvailability(listId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), listingData?.maxNight, listingData?.minNight);
    }
  }

  onFocusChange = (focusedInput) => {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  isDayBlocked = (day) => {
    const { blockedDatesSet } = this.state;
    if (blockedDatesSet) {
      return blockedDatesSet.has(moment(day).format('YYYY-MM-DD'));
    } else {
      return null;
    }
  }


  onNextMonthChange = async (e) => {
    const { getBlockedDates, listId, country } = this.props;
    const { blockedDatesSet } = this.state;
    let today, navigationDate, monthsDiff;
    today = getDateUsingTimeZone(country, true);
    navigationDate = moment(e).format('YYYY-MM-DD');
    monthsDiff = moment(navigationDate).diff(moment(today), 'months');
    //const blockedDatesSet = new Set();
    if (monthsDiff && monthsDiff > 0) {
      let isRangedMonth = Number(monthsDiff) % 5;
      if (isRangedMonth === 0) {
        const { data } = await getBlockedDates(listId, moment(navigationDate).startOf('month').format('YYYY-MM-DD'));
        if (data?.getBlockedDatesCalendar?.length > 0) {
          data?.getBlockedDatesCalendar?.forEach(day => {
            blockedDatesSet?.add(moment(day.blockedDates).format('YYYY-MM-DD'));
          });
          this.setState({ blockedDatesSet });
        }
      }
    }
  }

  onPrevMonthChange = async (e) => {
    const { getBlockedDates, listId, country } = this.props;
    const { blockedDatesSet } = this.state;
    let today = getDateUsingTimeZone(country, true);
    let navigationDate = moment(e).format('YYYY-MM-DD');
    let monthsDiff = moment(navigationDate).diff(moment(today), 'months');
    //const blockedDatesSet = new Set();
    let filterDate = moment(e).add(-5, 'months');

    if (monthsDiff && monthsDiff > 0) {
      let isRangedMonth = Number(monthsDiff) % 4;
      if (isRangedMonth === 0) {
        const { data } = await getBlockedDates(listId, moment(filterDate).startOf('month').format('YYYY-MM-DD'));
        if (data?.getBlockedDatesCalendar?.length > 0) {
          data?.getBlockedDatesCalendar?.forEach(day => {
            blockedDatesSet?.add(moment(day?.blockedDates).format('YYYY-MM-DD'));
          });
          this.setState({ blockedDatesSet });
        }
      }
    }

  }

  handleResize = (e) => {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : false;
    this.setState({ smallDevice });
  }

  render() {
    const { focusedInput, startDate, endDate, load, smallDevice } = this.state;
    const { listingData, locale, paymentCalendar } = this.props;
    const { loading, blockedDates, country, paymentCalendarHeight } = this.props;

    let numberOfMonths, today, breakPoint, minNight, maxNight, maxDaysNotice, bookingNoticeTime, condition;
    numberOfMonths = (smallDevice) ? 1 : 2;
    today = getDateUsingTimeZone(country, false), condition;
    breakPoint = getDateUsingTimeZone(country, false);
    minNight = listingData?.minNight;
    maxNight = listingData?.maxNight;
    maxDaysNotice = listingData?.maxDaysNotice;
    bookingNoticeTime = listingData?.bookingNoticeTime;

    if (maxDaysNotice === 'unavailable') {
      condition = day =>
        !isInclusivelyAfterDay(day, today) ||
        isInclusivelyAfterDay(day, today)
    } else {

      if (maxDaysNotice === '3months') {
        breakPoint.add(3, 'months');
      } else if (maxDaysNotice === '6months') {
        breakPoint.add(6, 'months');
      } else if (maxDaysNotice === '9months') {
        breakPoint.add(9, 'months');
      } else if (maxDaysNotice === '12months') {
        breakPoint.add(12, 'months');
      }

      if (maxDaysNotice !== 'available') {
        condition = day =>
          !isInclusivelyAfterDay(day, today) ||
          isInclusivelyAfterDay(day, breakPoint)
      } else if (maxDaysNotice == 'available') {
        condition = day => !isInclusivelyAfterDay(day, today)
      }
    }

    if (loading) {
      return <Loader type="text" />
    } else {
      return (
          <div className={cx(s.pageContent, paymentCalendarHeight)}>
            {
              !loading && <div className={cx(s.sectionContainer, s.boxContainer, s.listOneLeft, s.noPadddingLeftRight, { [s.borderTop]: paymentCalendar })}>
                {!paymentCalendar && <h1 className={cx(s.titleText, s.space2, 'textWhite')}>
                  <FormattedMessage {...messages.availability} />
                </h1>}
                {
                  minNight > 0 &&
                  <p className={cx({ [s.subTitle]: paymentCalendar }, s.displayInline)}><span className={cx(s.text)}> <strong>{minNight} {minNight > 1 ? <FormattedMessage {...messages.nights} /> : <FormattedMessage {...messages.night} />}{' '}</strong>
                    <FormattedMessage {...messages.minimumStay} />
                  </span>
                  </p>
                }
                {
                  maxNight > 0 &&
                  <div className={s.displayInline}>
                    <span className={s.dotsCss}></span>
                    <p className={cx({ [s.subTitle]: paymentCalendar }, s.displayInline)}><span className={cx(s.text)}> <strong>{maxNight} {maxNight > 1 ? <FormattedMessage {...messages.nights} /> : <FormattedMessage {...messages.night} />}{' '}</strong>
                      <FormattedMessage {...messages.maximumNightStay} />
                    </span>
                    </p>
                  </div>
                }
                <div className={cx(s.calendarContainer, 'availabilityCalendar', 'calendarContainerDark')}>
                  {!load && <Loader />}
                  {
                    load && <DayPickerRangeController
                      {...this.props}
                      focusedInput={focusedInput}
                      startDate={startDate}
                      endDate={endDate}
                      onDatesChange={this.onDatesChange}
                      onFocusChange={this.onFocusChange}
                      numberOfMonths={numberOfMonths}
                      isOutsideRange={condition}
                      daySize={40}
                      minimumNights={minNight > 0 ? minNight : 1}
                      onOutsideClick={() => { console.log('') }}
                      renderCalendarDay={props => <CustomizableCalendarDay {...props} blockedDates={blockedDates} />}
                      onPrevMonthClick={(props) => { this.onPrevMonthChange(props) }}
                      onNextMonthClick={(props) => { this.onNextMonthChange(props) }}
                      transitionDuration={0}
                      anchorDirection={isRTL(locale) ? 'right' : 'left'}
                      isRTL={isRTL(locale)}
                      isDayBlocked={day => this.isDayBlocked(day)}
                    />
                  }
                </div>
              </div>
            }
          </div>
      );
    }
  }
}

const selector = formValueSelector('BookingForm');

const mapState = state => ({
  formStartDate: selector(state, 'startDate'),
  formEndDate: selector(state, 'endDate'),
  checkIn: selector(state, 'checkIn'),
  checkOut: selector(state, 'checkOut'),
  locale: state?.intl?.locale,
  isFullDayBlock: state?.viewListing?.isFullDayBlock
});

const mapDispatch = {
  change,
  checkAvailability,
  getBlockedDates,
  getSpecialPricingData
};

export default injectIntl(withStyles(s, S)(connect(mapState, mapDispatch)(AvailabilityCalendar)));
