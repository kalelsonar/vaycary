import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger, or } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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
});

export const defaultStyles = {
  border: `2px solid rgb(255, 255, 255)`,
  color: 'inherit',
  background: 'rgb(237, 246, 246)',
  borderRadius: `7px`,
  padding: `0px`,
  hover: {
    background: '#C09CF9',
    border: `2px solid rgb(255, 255, 255)`,
    color: 'inherit',
    borderRadius: `7px`,
    padding: `0px`,
  },
};

export const defaultDarkStyles = {
  border: `2px solid rgb(255, 255, 255)`,
  color: 'inherit',
  background: '#3c3c3c',
  borderRadius: `7px`,
  padding: `0px`,
  hover: {
    background: '#C09CF9',
    border: `2px solid rgb(255, 255, 255)`,
    color: 'inherit',
    borderRadius: `7px`,
    padding: `0px`,
  },
};

export const outsideStyles = {
  background: color.outside.backgroundColor,
  border: 0,
  color: color.outside.color,
};

export const outsideDarkStyles = {
  background: color.outside.backgroundColor,
  border: 0,
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
  border: `2px solid rgb(255, 255, 255)`,
  borderRadius: `7px`,
  padding: `0px`,
  background: '#C09CF9',
  color: `#fff`,
  hover: {
    border: `2px solid rgb(255, 255, 255)`,
    borderRadius: `7px`,
    padding: `0px`,
    background: '#C09CF9',
    color: `#fff`,
  },
};

export const blockedMinNightsDarkStyles = {
  border: `2px solid rgb(255, 255, 255)`,
  borderRadius: `7px`,
  padding: `0px`,
  background: '#C09CF9',
  color: `#fff`,
  hover: {
    border: `2px solid rgb(255, 255, 255)`,
    borderRadius: `7px`,
    padding: `0px`,
    background: '#C09CF9',
    color: `#fff`,
  },
};

export const blockedCalendarStyles = {
  background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  border: `2px solid rgb(255, 255, 255)`,
  color: `rgb(216, 216, 216)`,
  borderRadius: `7px`,
  padding: `0px`,
  hover: {
    background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
    border: `2px solid rgb(255, 255, 255)`,
    color: `rgb(216, 216, 216)`,
    borderRadius: `7px`,
    padding: `0px`,
  },
};

export const blockedCalendarDarkStyles = {
  background: '#585858',
  border: `2px solid rgb(255, 255, 255)`,
  color: `rgb(216, 216, 216)`,
  borderRadius: `7px`,
  padding: `0px`,
  hover: {
    background: '#585858',
    border: `2px solid rgb(255, 255, 255)`,
    color: `rgb(216, 216, 216)`,
    borderRadius: `7px`,
    padding: `0px`,
  },
};


export const blockedStartCalendarStyles = {
  background: `linear-gradient(to right bottom, #EDF6F6 50%, #f0f0f0 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to right bottom, #EDF6F6 50%, #f0f0f0 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const blockedStartDarkCalendarStyles = {
  background: `linear-gradient(to right bottom, #3c3c3c 50%, #585858 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to right bottom, #3c3c3c 50%, #585858 50%)`,
    color: `#ffffff`,
  },
};

export const blockedEndCalendarStyles = {
  background: `linear-gradient(to left top, #EDF6F6 50%, #f0f0f0 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, #EDF6F6 50%, #f0f0f0 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const blockedEndDarkCalendarStyles = {
  background: `linear-gradient(to left top, #3c3c3c 50%, #585858 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to left top, #3c3c3c 50%, #585858 50%)`,
    color: `#ffffff`,
  },
};

export const selectedStartStyles = {
  background: `linear-gradient(to right bottom, #EDF6F6 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to right bottom, #EDF6F6 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const selectedStartDarkStyles = {
  background: `linear-gradient(to right bottom, #3c3c3c 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to right bottom, #3c3c3c 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
};

export const selectedEndStyles = {
  background: `linear-gradient(to left top, #EDF6F6 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to left top, #EDF6F6 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
};

export const selectedEndDarkStyles = {
  background: `linear-gradient(to left top, #3c3c3c 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to left top, #3c3c3c 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
};

export const blockEndSelectStartStyles = {
  background: `linear-gradient(to right bottom, #f0f0f0 50%, #966FD6 50%)`,
  color: `rgb(51,51,51)`,
  hover: {
    background: `linear-gradient(to right bottom, #f0f0f0 50%, #966FD6 50%)`,
    color: `rgb(51,51,51)`,
  },
}

export const blockEndSelectStartDarkStyles = {
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

export const blockStartSelectEndDarkStyles = {
  background: `linear-gradient(to left top, #3c3c3c 50%, #966FD6 50%)`,
  color: `#ffffff`,
  hover: {
    background: `linear-gradient(to left top, #3c3c3c 50%, #966FD6 50%)`,
    color: `#ffffff`,
  },
}

// List checkin restriction	
export const selectedCheckInDays = {
  background: 'linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  border: `2px solid rgb(255, 255, 255)`,
  color: `rgb(216, 216, 216)`,
  borderRadius: `7px`,
  padding: `0px`,
  cursor: 'defaut',
  hover: {
    background: 'linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
    border: `2px solid rgb(255, 255, 255)`,
    color: `rgb(216, 216, 216)`,
    borderRadius: `7px`,
    padding: `0px`,
    cursor: 'defaut',
  },
};

export const selectedCheckInDarkDays = {
  background: 'linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  border: `2px solid rgb(255, 255, 255)`,
  color: `rgb(216, 216, 216)`,
  borderRadius: `7px`,
  padding: `0px`,
  cursor: 'defaut',
  hover: {
    background: 'linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
    border: `2px solid rgb(255, 255, 255)`,
    color: `rgb(216, 216, 216)`,
    borderRadius: `7px`,
    padding: `0px`,
    cursor: 'defaut',
  },
};

export const blockedOutOfRangeStyles = {
  background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
  border: `2px solid rgb(255, 255, 255)`,
  color: `rgb(216, 216, 216)`,
  borderRadius: `7px`,
  padding: `0px`,
  hover: {
    background: 'repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgb(235, 235, 235) 3px, rgb(235, 235, 235) 4px)',
    border: `2px solid rgb(255, 255, 255)`,
    color: `rgb(216, 216, 216)`,
    borderRadius: `7px`,
    padding: `0px`,
  },
};


export const blockedOutOfRangeDarkStyles = {
  background: 'repeating-linear-gradient(-45deg, rgb(0 0 0), rgb(15 11 11) 3px, rgb(63 63 63) 3px, rgb(235, 235, 235) 4px)',
  border: `2px solid rgb(255, 255, 255)`,
  color: `rgb(216, 216, 216)`,
  borderRadius: `7px`,
  padding: `0px`,
  hover: {
    background: 'repeating-linear-gradient(-45deg, rgb(0 0 0), rgb(15 11 11) 3px, rgb(63 63 63) 3px, rgb(235, 235, 235) 4px)',
    border: `2px solid rgb(255, 255, 255)`,
    color: `rgb(216, 216, 216)`,
    borderRadius: `7px`,
    padding: `0px`,
  },
};

export const hoveredSpanStyles = {
  background: `#C09CF9`,
  border: `2px solid rgb(255, 255, 255)`,
  color: `#fff`,

  hover: {
    background: `#C09CF9`,
    border: `2px solid rgb(255, 255, 255)`,
    color: `#fff`,
  },
};

export const hoveredSpanDarkStyles = {
  background: `#C09CF9`,
  border: `2px solid rgb(255, 255, 255)`,
  color: `#fff`,

  hover: {
    background: `#C09CF9`,
    border: `2px solid rgb(255, 255, 255)`,
    color: `#fff`,
  },
};

export const selectedSpanStyles = {
  background: `#C09CF9`,
  border: `2px solid rgb(255, 255, 255)`,
  color: `#fff`,

  hover: {
    background: `#966FD6`,
    border: `2px solid rgb(255, 255, 255)`,
    color: `#fff`,
  },
};

export const selectedSpanDarkStyles = {
  background: `#C09CF9`,
  border: `2px solid rgb(255, 255, 255)`,
  color: `#fff`,

  hover: {
    background: `#966FD6`,
    border: `2px solid rgb(255, 255, 255)`,
    color: `#fff`,
  },
};

export const lastInRangeStyles = {
  borderRight: color.core.primary,
};

export const lastInRangeDarkStyles = {
  borderRight: color.core.primary,
};

export const selectedStyles = {
  background: `#966FD6`,
  border: `2px solid rgb(255, 255, 255)`,
  color: `#fff`,
  borderRadius: `7px`,
  padding: '0px',
  hover: {
    background: `#966FD6`,
    border: `2px solid rgb(255, 255, 255)`,
    color: `#fff`,
    borderRadius: `7px`,
    padding: '0px',
  },
};

export const selectedDarkStyles = {
  background: `#966FD6`,
  border: `2px solid rgb(255, 255, 255)`,
  color: `#fff`,
  borderRadius: `7px`,
  padding: '0px',
  hover: {
    background: `#966FD6`,
    border: `2px solid rgb(255, 255, 255)`,
    color: `#fff`,
    borderRadius: `7px`,
    padding: '0px',
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

class CustomizableCalendarDay extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isHovered: false,
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
    const { blockedDatesValues, isListBlocked, checkInDays = [] } = this.props;
    const { day } = this.props;
    let blockedStart = false, blocked = false, blockedEnd = false, renderingDate, checkInDay;
    checkInDay = checkInDays.includes(moment(day).format('dddd').toLowerCase());
    if (day) {
      renderingDate = isListBlocked && isListBlocked.filter(item => {
        return moment(moment(item.blockedDates).format('YYYY-MM-DD')).isSame(moment(day).format('YYYY-MM-DD')) && item.calendarStatus == 'blocked'
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
      checkInDay
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
      onDayClick,
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
      day,
      ariaLabelFormat,
      daySize,
      isOutsideDay,
      modifiers,
      tabIndex,
      renderDayContents,
      styles,
      phrases,
      todayStyles: todayStylesWithHover,
      firstDayOfWeekStyles: firstDayOfWeekStylesWithHover,
      lastDayOfWeekStyles: lastDayOfWeekStylesWithHover,
      afterHoveredStartStyles: afterHoveredStartStylesWithHover,
      theme
    } = this.props;

    const { isHovered, blocked, blockedStart, blockedEnd, checkInDay } = this.state;

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
          modifiers.has('blocked-minimum-nights') && getStyles(theme == 'dark' ? blockedMinNightsDarkStyles : blockedMinNightsStyles, isHovered),
          hoveredSpan && getStyles(theme == 'dark' ? hoveredSpanDarkStyles : hoveredSpanStyles, isHovered),
          modifiers.has('blocked-calendar') && getStyles(theme == 'dark' ? blockedCalendarDarkStyles : blockedCalendarStyles, isHovered),
          modifiers.has('after-hovered-start') && getStyles(afterHoveredStartStylesWithHover, isHovered),
          modifiers.has('selected-span') && getStyles(theme == 'dark' ? selectedSpanDarkStyles : selectedSpanStyles, isHovered),
          modifiers.has('before-hovered-end') && getStyles(theme == 'dark' ? defaultDarkStyles : defaultStyles, isHovered),
          modifiers.has('last-in-range') && getStyles(theme == 'dark' ? lastInRangeDarkStyles : lastInRangeStyles, isHovered),
          selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          modifiers.has('selected-start') && getStyles(theme == 'dark' ? selectedStartDarkStyles : selectedStartStyles, isHovered),
          modifiers.has('selected-end') && getStyles(theme == 'dark' ? selectedEndDarkStyles : selectedEndStyles, isHovered),
          isOutsideRange && getStyles(theme == 'dark' ? blockedOutOfRangeDarkStyles : blockedOutOfRangeStyles, isHovered),
          checkInDay && getStyles(theme == 'dark' ? selectedCheckInDarkDays : selectedCheckInDays, isHovered),
          blocked && getStyles(theme == 'dark' ? blockedCalendarDarkStyles : blockedCalendarStyles, isHovered),
          blockedStart && getStyles(theme == 'dark' ? blockedStartDarkCalendarStyles : blockedStartCalendarStyles, isHovered),
          blockedEnd && getStyles(theme == 'dark' ? blockedEndDarkCalendarStyles : blockedEndCalendarStyles, isHovered),
          blockedEnd && modifiers.has('selected-start') && getStyles(theme == 'dark' ? blockEndSelectStartDarkStyles : blockEndSelectStartStyles, isHovered),
          blockedStart && modifiers.has('selected-end') && getStyles(theme == 'dark' ? blockStartSelectEndDarkStyles : blockStartSelectEndStyles, isHovered),
          blockedStart && blockedEnd && getStyles(theme == 'dark' ? blockedCalendarDarkStyles : blockedCalendarStyles, isHovered),
          checkInDay && selected && modifiers.has('selected-span') && getStyles(theme == 'dark' ? selectedSpanDarkStyles : selectedSpanStyles, isHovered),
          checkInDay && modifiers.has('selected-end') && getStyles(theme == 'dark' ? blockStartSelectEndDarkStyles : blockStartSelectEndStyles, isHovered),
          checkInDay && hoveredSpan && getStyles(theme == 'dark' ? hoveredSpanDarkStyles : hoveredSpanStyles, isHovered),
          blockedStart && hoveredSpan && getStyles(theme == 'dark' ? hoveredSpanDarkStyles : hoveredSpanStyles, isHovered),
          blockedEnd && hoveredSpan && getStyles(theme == 'dark' ? hoveredSpanDarkStyles : hoveredSpanStyles, isHovered),
          blocked && hoveredSpan && getStyles(theme == 'dark' ? hoveredSpanDarkStyles : hoveredSpanStyles, isHovered),
          blockedStart && selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          blockedEnd && selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          blocked && selected && getStyles(theme == 'dark' ? selectedDarkStyles : selectedStyles, isHovered),
          blockedEnd && selected && modifiers.has('selected-start') && getStyles(theme == 'dark' ? blockEndSelectStartDarkStyles : blockEndSelectStartStyles, isHovered),
          blockedStart && selected && modifiers.has('selected-end') && getStyles(theme == 'dark' ? blockStartSelectEndDarkStyles : blockStartSelectEndStyles, isHovered),
        )}
        role="button"
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

CustomizableCalendarDay.propTypes = propTypes;
CustomizableCalendarDay.defaultProps = defaultProps;

const mapState = (state) => ({
  blockedDatesValues: state.viewListing.blockedDates,
  isListBlocked: state.viewListing.isListBlocked,
  checkInDays: state.viewListing && state.viewListing.checkInDays,
  theme: state.currency.theme
});

export { CustomizableCalendarDay as PureCustomizableCalendarDay };

export default injectIntl(withStyles(({ reactDates: { font } }) => ({
  CalendarDay: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: font.size,
    textAlign: 'center',
    ':active': {
      outline: 0
    },
  },
  CalendarDay__defaultCursor: {
    cursor: 'default',
  }
}))(connect(mapState, null)(CustomizableCalendarDay)))