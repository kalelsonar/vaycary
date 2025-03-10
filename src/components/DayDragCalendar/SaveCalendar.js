import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MockDate from 'mockdate';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, formValueSelector } from 'redux-form';
import { DateUtils } from 'react-day-picker';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./DayDragCalendar.css';

import Loader from '../Loader';
import AvailableDates from './AvailableDates';
import DateRange from './DateRange';
import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { getListBlockedDates } from '../../actions/Listing/getListBlockedDates';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { getDateUsingTimeZone } from '../../helpers/dateRange';
import showToaster from '../../helpers/showToaster';
import messages from '../../locale/messages';
import c from './SaveCalendar.css';
import bt from '../commonStyle.css';
class SaveCalendar extends Component {

  static propTypes = {
    change: PropTypes.func,
    formName: PropTypes.string,
    selectedDays: PropTypes.array,
    start: PropTypes.any,
    end: PropTypes.any
  };

  static defaultProps = {
    selectedDays: [],
    start: undefined,
    end: undefined,
    formName: 'ListPlaceStep3',
    formNameValue: 'CalendarPrice',
    isCurrentStatus: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateRange: [],
      isLoading: false
    };
    this.chooseDates = this.chooseDates.bind(this);
  }

  componentDidMount() {
    this.setState({ isCurrentStatus: 2 });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { start, end } = nextProps;
    let dateRange = [], rangeStart, rangeEnd;

    if (start && !end) {
      rangeStart = new Date(start);
      dateRange.push(rangeStart);
    } else if (start && end) {
      rangeStart = new Date(start);
      rangeEnd = new Date(end);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRange.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < end) {

          dateRange.push(rangeStart);
          var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      }
    }
    this.setState({ dateRange });
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          placeholder={label}
          type={type}
          className={className}
          maxLength={3}
        />
      </div>
    )
  }

  renderDateRange = ({ input, label, meta: { touched, error }, formName, numberOfMonths, index, defaultStartDate, defaultEndDate, isCurrentStatus, resetCalendar, startLabel, endLabel }) => {
    const { formatMessage } = this.props.intl;
    const { locale } = this.props;
    let localeData = 'en-US';
    if (locale == 'ar-AR') {
      localeData = 'ar-AR';
      moment.locale('ar-AR');
    }

    return (
      <div className={'saveCalenderDate'}>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <DateRange
          {...input}
          formName={formName}
          numberOfMonths={numberOfMonths}
          index={index}
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          isCurrentStatus={isCurrentStatus}
          resetCalendar={resetCalendar}
          startDatePlaceholderText={startLabel}
          endDatePlaceholderText={endLabel}
        />
      </div>
    )
  }

  async handleSave() {
    const { change, formName, start, end, selectedDays } = this.props;
    const { resetCalendar, mutate, listId, getListingDataStep3, getListBlockedDates } = this.props;
    const { formatMessage } = this.props.intl;
    const { minNight, maxNight, houseRules, checkInEnd, checkInStart } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, tax, weeklyDiscount, monthlyDiscount } = this.props;
    const { basePrice, cleaningPrice, currency, isStartDate, isEndDate, manageListingSteps, country } = this.props;
    const { dateRange } = this.state;

    let minNightValues = minNight != '' ? minNight : 0;
    let maxNightValues = maxNight != '' ? maxNight : 0;
    let checkInEndValue = checkInEnd != '' ? checkInEnd : 'flexible';
    let checkInStartValue = checkInStart != '' ? checkInStart : 'flexible';
    let isCancel = cancellationPolicy ? cancellationPolicy : '1';
    let isMaxDays = maxDaysNotice ? maxDaysNotice : 'unavailable';
    let isBooking = bookingNoticeTime ? bookingNoticeTime : 58;

    let updatedSelectedDays = selectedDays, mockedNewDate;

    let successMsg = formatMessage(messages.selectedDatesSuccess);
    let errorMsg = formatMessage(messages.selectedDatesError);

    let propertyToday = getDateUsingTimeZone(country, true);

    if (propertyToday != null) {
      MockDate.set(propertyToday);
      mockedNewDate = new Date();
    }

    let dateRangeNew = [], rangeStart, rangeEnd;
    if (isStartDate && !isEndDate) {
      rangeStart = new Date(isStartDate);
      dateRangeNew.push(rangeStart);
    } else if (isStartDate && isEndDate) {
      rangeStart = new Date(isStartDate);
      rangeEnd = new Date(isEndDate);

      if (!DateUtils.isSameDay(rangeStart, rangeEnd)) {
        dateRangeNew.push(rangeStart);

        rangeStart = new Date(+rangeStart);

        while (rangeStart < isEndDate) {

          dateRangeNew.push(rangeStart);
          var newDate = rangeStart.setDate(rangeStart.getDate() + 1);
          rangeStart = new Date(newDate);
        }
      }
    }

    MockDate.reset();

    this.setState({ isLoading: true });
    if (dateRangeNew && dateRangeNew.length > 0) {
      dateRangeNew.forEach(async (item, index) => {
        let selectedIndex = updatedSelectedDays.findIndex(selectedDay =>
          DateUtils.isSameDay(selectedDay, item)
        );

        if (selectedIndex < 0) {
          updatedSelectedDays.push(item);
        }
      });

      const { data } = await mutate({
        variables: {
          listId,
          blockedDates: updatedSelectedDays,
          calendarStatus: 'blocked'
        }
      })


      if (data && data.UpdateBlockedDates && data.UpdateBlockedDates.status == '200') {
        await change("blockedDates", updatedSelectedDays);
        await getListingDataStep3(listId);
        await getListBlockedDates(
          listId,
          minNightValues,
          maxNightValues,
          checkInEndValue,
          checkInStartValue,
          houseRules,
          isCancel,
          isMaxDays,
          isBooking,
          basePrice,
          cleaningPrice,
          currency,
          tax,
          weeklyDiscount,
          monthlyDiscount
        );
        await getListingDataStep3(listId);
        this.setState({ isLoading: false });
        await resetCalendar();
      } else {
        showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: errorMsg })
      }
    }
  }

  chooseDates(e) {
    this.setState({ isCurrentStatus: e });
  }

  render() {
    const { selectedDays, start, end, formName, resetCalendar, listId, resetDatePickerChange } = this.props;
    const { formatMessage } = this.props.intl;
    const { minNight, maxNight, houseRules, checkInEnd, checkInStart } = this.props;
    const { cancellationPolicy, maxDaysNotice, bookingNoticeTime, isStartDate, isEndDate } = this.props;
    const { basePrice, cleaningPrice, currency, tax, weeklyDiscount, monthlyDiscount } = this.props;
    const { isCurrentStatus } = this.state;

    const { dateRange, isLoading } = this.state;
    let convertStart = start ? moment(start).format('YYYY-MM-DD') : null;
    let convertEnd = end ? moment(end).format('YYYY-MM-DD') : null;
    let isBlock = 1, isAvailable = 2;

    return (
      <div>
        {
          (start || isStartDate) && <Col lg={12} md={12} sm={12} xs={12} className={cx(c.saveCalendarContainer, c.CalendarPopup)}>
            <div className={c.innerCPopup}>
              <FormGroup className={cx(c.formGroup, c.textLeft)}>

                <Button bsStyle="link"
                  className={cx(c.noPadding, c.space3, 'saveCalendarDark')}
                  onClick={() => { resetCalendar() }}>
                  <svg viewBox="0 0 24 24" role="img"
                    style={{ height: '14px', width: '14px', display: 'block', fill: 'rgb(118, 118, 118)' }}>
                    <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"></path>
                  </svg>
                </Button>
              </FormGroup>
              <div className={cx(c.aBlockWrap, 'bgBlackTwo')}>
                <div className={c.aBWLeft}>
                  <Button
                    className={cx(c.btnBg, { [c.active]: isCurrentStatus == 2 }, c.leftRadius, 'bgBlackTwo')}
                    onClick={() => this.chooseDates(isAvailable)}
                  >
                    <FormattedMessage {...messages.availableLabel} />
                  </Button>
                </div>
                <div className={c.aBWRight}>
                  <Button
                    className={cx(c.btnBg, { [c.active]: isCurrentStatus == 1 }, c.rightRadius, 'bgBlackTwo')}
                    onClick={() => this.chooseDates(isBlock)}
                  >
                    <FormattedMessage {...messages.blockLabel} />
                  </Button>
                </div>
              </div>
              <div className={c.saveBorder}>
                <div className={c.datesBorder}>
                  <FormGroup className={cx(c.formGroup, c.sDateWrap)}>
                    <label>
                      <FormattedMessage {...messages.dates} />
                    </label>
                  </FormGroup>
                  <FormGroup className={c.noMargin}>
                    <Field
                      name="blockedDates"
                      component={this.renderDateRange}
                      defaultStartDate={start}
                      defaultEndDate={end}
                      formName={formName}
                      isCurrentStatus={isCurrentStatus}
                      resetCalendar={resetDatePickerChange}
                      startLabel={formatMessage(messages.StartDate)}
                      endLabel={formatMessage(messages.EndDate)}
                    />
                  </FormGroup>
                </div>
                {
                  isCurrentStatus == 2 && <AvailableDates
                    start={start}
                    end={end}
                    listId={listId}
                    selectedDays={selectedDays}
                    resetCalendar={resetCalendar}
                    dateRange={dateRange}
                    minNight={minNight}
                    maxNight={maxNight}
                    houseRules={houseRules}
                    checkInEnd={checkInEnd}
                    checkInStart={checkInStart}
                    cancellationPolicy={cancellationPolicy}
                    maxDaysNotice={maxDaysNotice}
                    bookingNoticeTime={bookingNoticeTime}
                    cleaningPrice={cleaningPrice}
                    basePrice={basePrice}
                    currency={currency}
                    isStartDate={isStartDate}
                    isEndDate={isEndDate}
                    tax={tax}
                    weeklyDiscount={weeklyDiscount}
                    monthlyDiscount={monthlyDiscount}
                  />
                }
              </div>
              {
                isCurrentStatus == 1 && <FormGroup className={cx(c.formGroup, c.buttonLeft, 'saveRightRtl', 'arButtonLoader')}>
                  <Loader
                    type={"button"}
                    buttonType={"button"}
                    show={isLoading}
                    className={cx(c.btnPrimary, c.btnlarge, bt.btnSecondary, c.saveBg)}
                    disabled={isLoading}
                    label={formatMessage(messages.blockDates)}
                    handleClick={() => { this.handleSave() }}
                    containerClass={cx(c.loaderContainer, 'calBtnRtl')}
                  />
                </FormGroup>
              }

              <Button
                className={cx(c.btnPrimaryBorder, c.btnlarge, c.buttonRight)}
                onClick={() => { resetCalendar() }}
              >
                <FormattedMessage {...messages.deSelect} />
              </Button>
              <div className='clearBoth'></div>
            </div>
          </Col>

        }
      </div>
    );
  }

}

const step1FormSelector = formValueSelector('ListPlaceStep1');

const mapState = (state) => ({
  locale: state.intl.locale,
  country: step1FormSelector(state, 'country')
});

const mapDispatch = {
  change,
  getListingDataStep3,
  getListBlockedDates,
  manageListingSteps
};

export default compose(
  injectIntl,
  withStyles(s, c, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation (
      $listId: Int!, 
      $blockedDates: [String],
      $calendarStatus: String
    ) {
          UpdateBlockedDates (
            listId: $listId, 
            blockedDates: $blockedDates,
            calendarStatus: $calendarStatus
        ) {
          status
        }
        }
  `)
)(SaveCalendar);

