import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger, or } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { formValueSelector } from 'redux-form';

// Redux Form
import { change } from 'redux-form';

import { CalendarDayPhrases } from 'react-dates/lib/defaultPhrases';
import getPhrasePropTypes from 'react-dates/lib/utils/getPhrasePropTypes';
import getCalendarDaySettings from 'react-dates/lib/utils/getCalendarDaySettings';

import { DAY_SIZE } from 'react-dates/lib/constants';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

const { reactDates: { color } } = DefaultTheme;

function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;

  const { hover } = stylesObj;
  if (isHovered && hover) {
    return hover;
  }

  return stylesObj;
}

let mothWiseDateCheck = false;
const DayStyleShape = PropTypes.shape({
  background: PropTypes.string,
  border: or([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,

  hover: PropTypes.shape({
    background: PropTypes.string,
    border: or([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }),
});

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,

  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  firstDayOfWeekStyles: DayStyleShape,
  lastDayOfWeekStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  // blockedDates 
  blockedDatesValues: PropTypes.array
});

export const defaultStyles = {
  border: `1px solid rgb(228, 231, 231)`,
  background: `#ffffff`,
  padding: `0px`,
  hover: {
    border: `1px solid rgb(228, 231, 231)`,
    background: `#ffffff`,
    padding: `0px`,
  },
};

export const defaultDarkStyles = {
  border: `1px solid rgb(228, 231, 231)`,
  background: `#3c3c3c`,
  padding: `0px`,
  hover: {
    border: `1px solid rgb(228, 231, 231)`,
    background: `#3c3c3c`,
    padding: `0px`,
  },
};

export const outsideStyles = {
  border: `1px solid`,
  color: color.outside.color,
};

export const outsideDarkStyles = {
  border: `1px solid`,
  color: color.outside.color,
};

export const highlightedCalendarStyles = {
  background: 'red',
  color: color.highlighted.color,

  hover: {
    background: color.highlighted.backgroundColor_hover,
    color: color.highlighted.color_active,
  },
};

export const highlightedDarkCalendarStyles = {
  background: 'red',
  color: color.highlighted.color,

  hover: {
    background: color.highlighted.backgroundColor_hover,
    color: color.highlighted.color_active,
  },
};

export const blockedMinNightsStyles = {
  background: '#C09CF9',
  color: `#fff`,
  padding: `0px`,
  hover: {
    background: '#C09CF9',
    color: `#fff`,
    padding: `0px`,
  },
};

export const blockedDarkMinNightsStyles = {
  background: '#C09CF9',
  color: `#fff`,
  padding: `0px`,
  hover: {
    background: '#C09CF9',
    color: `#fff`,
    padding: `0px`,
  },
};

export const blockedCalendarStyles = {
  background: '#f0f0f0',
  border: '1px solid #f0f0f0',
  color: `#82888a`,
  hover: {
    background: '#f0f0f0',
    border: '1px solid #f0f0f0',
    color: `#82888a`,
  },
};

export const blockedDarkCalendarStyles = {
  background: '#585858',
  border: '1px solid #585858',
  color: `#82888a`,
  hover: {
    background: '#585858',
    border: '1px solid #585858',
    color: `#82888a`,
  },
};

export const blockedStartCalendarStyles = {
  background: `linear-gradient(to right bottom, rgb(255,255,255) 50%, #f0f0f0 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to right bottom, rgb(255,255,255) 50%, #f0f0f0 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const blockedDarkStartCalendarStyles = {
  background: `linear-gradient(to right bottom, #3c3c3c 50%, #585858 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to right bottom, #3c3c3c 50%, #585858 50%)`,
    color: `#ffffff`,
  },
};

export const blockedEndCalendarStyles = {
  background: `linear-gradient(to left top, rgb(255,255,255) 50%, #f0f0f0 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, rgb(255,255,255) 50%, #f0f0f0 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const blockedDarkEndCalendarStyles = {
  background: `linear-gradient(to left top, #3c3c3c 50%, #585858 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to left top, #3c3c3c 50%, #585858 50%)`,
    color: `#ffffff`,
  },
};

export const blockedOutOfRangeStyles = {
  background: '#ffffff',
  color: `#cacccd`,
  padding: `0px`, DayStyleShape,
  hover: {
    background: '#ffffff',
    color: `#cacccd`,
  },
};

export const blockedDarkOutOfRangeStyles = {
  background: 'repeating-linear-gradient(-45deg, rgb(0, 0, 0), rgb(15, 11, 11) 3px, rgb(63, 63, 63) 3px, rgb(235, 235, 235) 4px)',
  color: `#cacccd`,
  padding: `0px`, DayStyleShape,
  hover: {
    background: '#3c3c3c',
    color: `#ffffff`,
  },
};

export const hoveredSpanStyles = {
  background: '#C09CF9',
  color: '#282828',

  hover: {
    background: `linear-gradient(to left top, #f8f8f8 50%, #966FD6 50%)`,
    color: '#282828',
  },
};

export const hoveredDarkSpanStyles = {
  background: '#C09CF9',
  color: `#fff`,
  hover: {
    background: '#C09CF9',
    color: `#fff`,
  },
};

export const selectedSpanStyles = {
  background: color.selectedSpan.backgroundColor,
  color: color.selectedSpan.color,

  hover: {
    background: color.selectedSpan.backgroundColor_hover,
    color: color.selectedSpan.color_active,
  },
};

export const selectedDarkSpanStyles = {
  background: color.selectedSpan.backgroundColor,
  color: color.selectedSpan.color,

  hover: {
    background: color.selectedSpan.backgroundColor_hover,
    color: color.selectedSpan.color_active,
  },
};

export const lastInRangeStyles = {
  borderRight: color.core.primary,
};

export const lastInDarkRangeStyles = {
  borderRight: color.core.primary,
};

export const selectedStyles = {
  background: '#966FD6',
  color: `rgb(248, 248, 248)`,
  padding: '0px',
  hover: {
    background: '#966FD6',
    color: `rgb(248, 248, 248)`,
    padding: '0px',
  },
};

export const selectedDarkStyles = {
  background: '#966FD6',
  color: `rgb(248, 248, 248)`,
  padding: '0px',
  hover: {
    background: '#966FD6',
    color: `rgb(248, 248, 248)`,
    padding: '0px',
  },
};

export const selectedStartStyles = {
  background: `linear-gradient(to right bottom, #ffffff 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to right bottom, #ffffff 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const selectedDarkStartStyles = {
  background: `linear-gradient(to right bottom, #3c3c3c 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to right bottom, #3c3c3c 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
};

export const selectedEndStyles = {
  background: `linear-gradient(to left top, #ffffff 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, #ffffff 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
};


export const selectedDarkEndStyles = {
  background: `linear-gradient(to left top, #3c3c3c 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to left top, #3c3c3c 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
};

export const blockEndSelectStartStyles = {
  background: `linear-gradient(to right bottom, #f0f0f0 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to right bottom, #f0f0f0 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
}

export const blockEndDarkSelectStartStyles = {
  background: `linear-gradient(to right bottom, #3c3c3c 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to right bottom, #3c3c3c 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
}

export const blockStartSelectEndStyles = {
  background: `linear-gradient(to left top, #f0f0f0 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, #f0f0f0 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
}

export const blockStartDarkSelectEndStyles = {
  background: `linear-gradient(to left top, #f0f0f0 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, #f0f0f0 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
}

export const blockedSelectedStyles = {
  background: `linear-gradient(to left top, rgb(222,224,222) 50%, rgb(222,224,222) 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, rgb(222,224,222) 50%, rgb(222,224,222) 50%)`,
    color: `rgb(51,51,51)`,
  }
}

export const blockedSelectedDarkStyles = {
  background: `linear-gradient(to left top, rgb(222,224,222) 50%, rgb(222,224,222) 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, rgb(222,224,222) 50%, rgb(222,224,222) 50%)`,
    color: `rgb(51,51,51)`,
  }
}

export const selectedCheckInDays = {
  background: '#3c3c3c',
  color: `#cacccd`,
  padding: `0px`,
  hover: {
    background: '#3c3c3c',
    color: `#cacccd`,
    padding: `0px`,
  },
};

export const selectedDarkCheckInDays = {
  background: '#3c3c3c',
  color: `#cacccd`,
  padding: `0px`,
  hover: {
    background: '#3c3c3c',
    color: `#cacccd`,
    padding: `0px`,
  },
};


const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() { },
  onDayMouseEnter() { },
  onDayMouseLeave() { },
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',
  todayStyles: {},
  afterHoveredStartStyles: {},
  firstDayOfWeekStyles: {},
  lastDayOfWeekStyles: {},

  phrases: CalendarDayPhrases,
};

class CustomBookingFormDay extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isHovered: false,
      isCheckAlready: false
    };

    this.setButtonRef = this.setButtonRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  componentDidMount() {
    const { day, isListBlocked } = this.props;
    const { isCheckAlready } = this.state;
    let blockedStart = false, blocked = false, blockedEnd = false, renderingDate;

    if (day && !isCheckAlready) {
      renderingDate = isListBlocked && isListBlocked.filter(item => {
        return moment(moment(item.blockedDates).format('YYYY-MM-DD')).isSame(moment(day).format('YYYY-MM-DD'));
      });

      if (renderingDate && renderingDate.length > 0) {
        blocked = true; // Full block
        renderingDate.map(d => {
          if (d.dayStatus == 'secondHalf') {
            blockedStart = true;
          }
          if (d.dayStatus == 'firstHalf') {
            blockedEnd = true;

          }
        });
      }
    }
    this.setState({
      blocked,
      blockedEnd,
      blockedStart,
      isCheckAlready: true
    });
  }


  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    this.setState({ isHovered: true });
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    this.setState({ isHovered: false });
    onDayMouseLeave(day, e);
  }

  onKeyDown(day, e) {
    const {
      onDayClick
    } = this.props;

    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  }

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day, daySize, renderDayContents, phrases, isOutsideDay, ariaLabelFormat, modifiers, theme,
      tabIndex,
      styles,
      todayStyles: todayStylesWithHover,
      firstDayOfWeekStyles: firstDayOfWeekStylesWithHover,
      lastDayOfWeekStyles: lastDayOfWeekStylesWithHover,
      afterHoveredStartStyles: afterHoveredStartStylesWithHover,

    } = this.props;

    const { isHovered, blocked, blockedStart, blockedEnd, isCheckAlready, checkInDay } = this.state;

    if (!day) return <td />;
    const {
      daySizeStyles,
      useDefaultCursor,
      selected,
      hoveredSpan,
      isOutsideRange,
      ariaLabel,
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    return (
      <td
        {...css(
          styles.CalendarDay,
          useDefaultCursor && styles.CalendarDay__defaultCursor,
          daySizeStyles,
          getStyles(theme == 'dark' ? defaultDarkStyles : defaultStyles, isHovered),
          isOutsideDay && getStyles(theme == 'dark' ? outsideDarkStyles : outsideStyles, isHovered),
          modifiers.has('today') && getStyles(todayStylesWithHover, isHovered),
          modifiers.has('first-day-of-week') && getStyles(firstDayOfWeekStylesWithHover, isHovered),
          modifiers.has('last-day-of-week') && getStyles(lastDayOfWeekStylesWithHover, isHovered),
          modifiers.has('highlighted-calendar') && getStyles(theme == 'dark' ? highlightedDarkCalendarStyles : highlightedCalendarStyles, isHovered),
          modifiers.has('blocked-minimum-nights') && getStyles(theme == 'dark' ? blockedDarkMinNightsStyles : blockedMinNightsStyles, isHovered),
          hoveredSpan && getStyles(theme == 'dark' ? hoveredDarkSpanStyles : hoveredSpanStyles, isHovered),
          modifiers.has('after-hovered-start') && getStyles(afterHoveredStartStylesWithHover, isHovered),
          modifiers.has('selected-span') && getStyles(theme == 'dark' ? selectedDarkSpanStyles : selectedSpanStyles, isHovered),
          modifiers.has('last-in-range') && getStyles(theme == 'dark' ? lastInDarkRangeStyles : lastInRangeStyles, isHovered),
          selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          modifiers.has('selected-start') && getStyles(theme == 'dark' ? selectedDarkStartStyles : selectedStartStyles, isHovered),
          modifiers.has('selected-end') && getStyles(theme == 'dark' ? selectedDarkEndStyles : selectedEndStyles, isHovered),
          isOutsideRange && getStyles(theme == 'dark' ? blockedDarkOutOfRangeStyles : blockedOutOfRangeStyles, isHovered),
          checkInDay && getStyles(theme == 'dark' ? selectedDarkCheckInDays : selectedCheckInDays, isHovered),
          blocked && getStyles(theme == 'dark' ? blockedDarkCalendarStyles : blockedCalendarStyles, isHovered),
          blockedStart && getStyles(theme == 'dark' ? blockedDarkStartCalendarStyles : blockedStartCalendarStyles, isHovered),
          blockedEnd && getStyles(theme == 'dark' ? blockedDarkEndCalendarStyles : blockedEndCalendarStyles, isHovered),
          blockedEnd && modifiers.has('selected-start') && getStyles(theme == 'dark' ? blockEndDarkSelectStartStyles : blockEndSelectStartStyles, isHovered),
          blockedStart && modifiers.has('selected-end') && getStyles(theme == 'dark' ? blockStartDarkSelectEndStyles : blockStartSelectEndStyles, isHovered),
          blockedStart && blockedEnd && getStyles(theme == 'dark' ? blockedDarkCalendarStyles : blockedCalendarStyles, isHovered),
          checkInDay && modifiers.has('selected-span') && getStyles(theme == 'dark' ? selectedDarkSpanStyles : selectedSpanStyles, isHovered),
          checkInDay && modifiers.has('selected-end') && getStyles(theme == 'dark' ? blockStartDarkSelectEndStyles : blockStartSelectEndStyles, isHovered),
          checkInDay && hoveredSpan && getStyles(theme == 'dark' ? hoveredDarkSpanStyles : hoveredSpanStyles, isHovered),
          blockedStart && hoveredSpan && getStyles(theme == 'dark' ? hoveredDarkSpanStyles : hoveredSpanStyles, isHovered),
          blockedEnd && hoveredSpan && getStyles(theme == 'dark' ? hoveredDarkSpanStyles : hoveredSpanStyles, isHovered),
          blocked && hoveredSpan && getStyles(theme == 'dark' ? hoveredDarkSpanStyles : hoveredSpanStyles, isHovered),
          blockedStart && selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          blockedEnd && selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          blocked && selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          blockedEnd && selected && modifiers.has('selected-start') && getStyles(theme == 'dark' ? blockEndDarkSelectStartStyles : blockEndSelectStartStyles, isHovered),
          blockedStart && selected && modifiers.has('selected-end') && getStyles(theme == 'dark' ? blockStartDarkSelectEndStyles : blockStartSelectEndStyles, isHovered),

        )}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ref={this.setButtonRef}
        aria-label={ariaLabel}
        onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
        onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
        onMouseUp={(e) => { e.currentTarget.blur(); }}
        onClick={(e) => { this.onDayClick(day, e); }}
        onKeyDown={(e) => { this.onKeyDown(day, e); }}
        tabIndex={tabIndex}
      >
        {renderDayContents ? renderDayContents(day, modifiers) : day.format('D')}
      </td>
    );
  }
}

CustomBookingFormDay.propTypes = propTypes;
CustomBookingFormDay.defaultProps = defaultProps;

const bookingFormSelector = formValueSelector('BookingForm');

const mapState = (state) => ({
  blockedDatesValues: state.viewListing && state.viewListing.blockedDates,
  isListBlocked: state.viewListing && state.viewListing.isListBlocked,
  dateChoose: bookingFormSelector(state, 'dateChoose'),
  checkInDays: state.viewListing && state.viewListing.checkInDays,
  theme: state.currency.theme
});

const mapDispatch = {
  change
};


export { CustomBookingFormDay as PureCustomBookingFormDay };
export default injectIntl(withStyles(({ reactDates: { font } }) => ({
  CalendarDay: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: font.size,
    textAlign: 'center',
    ':active': {
      outline: 0,
    },
  },

  CalendarDay__defaultCursor: {
    cursor: 'default',
  },
}))(connect(mapState, mapDispatch)(CustomBookingFormDay)));