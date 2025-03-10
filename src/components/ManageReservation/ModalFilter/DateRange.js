import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl } from 'react-intl';

import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

// Redux  Action
import { onChangeListing } from '../../../actions/Listing/onChangeListing';

// Locale
import messages from '../../../locale/messages';
import { isRTL } from '../../../helpers/formatLocale';

class DateRange extends React.Component {
  static propTypes = {
    onChange: PropTypes.any,
    numberOfMonths: PropTypes.number,

    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { startDate, endDate } = this.props;
    if (startDate && endDate) {
      this.setState({
        startDate: moment(startDate),
        endDate: moment(endDate),
      });
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = nextProps;
    this.setState({
      startDate: startDate ? moment(startDate) : null,
      endDate: endDate ? moment(endDate) : null,
    });

  }

  onDatesChange({ startDate, endDate }) {
    const { onChangeListing, listId, order } = this.props;
    this.setState({ startDate, endDate });
    if (startDate != null && endDate != null) {
      onChangeListing({ listId, order, startDate: moment(startDate).format("YYYY-MM-DD"), endDate: moment(endDate).format("YYYY-MM-DD") });
    }
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    const { smallDevice, type } = this.props;
    const { formatMessage } = this.props.intl;
    const { locale } = this.props;
    const isOutsideRange = (day) => {
      if (type == 'current') return isInclusivelyBeforeDay(day, moment())
    }

    return (
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={smallDevice ? 1 : 2}
          startDatePlaceholderText={formatMessage(messages.StartDate)}
          endDatePlaceholderText={formatMessage(messages.EndDate)}
          hideKeyboardShortcutsPanel
          readOnly
          startDateId={'startDateId'}
          endDateId={'endDateId'}
          transitionDuration={0}
          anchorDirection={isRTL(locale) ? 'right' : 'left'}
          isRTL={isRTL(locale)}
          isOutsideRange={isOutsideRange}
        />
      </div>
    );
  }
}

const mapState = state => ({
  locale: state.intl.locale
});

const mapDispatch = {
  onChangeListing
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));

