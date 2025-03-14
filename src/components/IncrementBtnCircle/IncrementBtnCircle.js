// General
import React from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'react-bootstrap';
import s from './IncrementBtnCircle.css';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';

//Image
import plusIcon from '/public/SiteIcons/plusIncrement.svg';
import minusIcon from '/public/SiteIcons/minusIncrement.svg';

class IncrementBtnCircle extends React.Component {
  static propTypes = {
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    labelSingluar: PropTypes.string,
    labelPlural: PropTypes.string,
    incrementBy: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.any
  };

  static defaultProps = {};

  increment = (value, maxValue, incrementBy) => {
    let currentValue = (value) ? value : 0;
    if (currentValue < maxValue) {
      return (Number(currentValue) + Number(incrementBy));
    }
  }

  decrement = (value, minValue, incrementBy) => {
    let currentValue = (value) ? value : 0;
    if (currentValue > minValue) {
      return (Number(currentValue) - Number(incrementBy));
    }
  }

  render() {

    const { input: { value, onChange }, maxValue, minValue, incrementBy, showSymbol } = this.props;
    const { formatMessage } = this.props.intl;
    let incrementDisabled = false;
    let decrementDisabled = false;
    let valueLabel = 0;
    if (value >= 1) {
      valueLabel = value;
      if (showSymbol)
        valueLabel = value;
    } else if (value < 0) {
      valueLabel = '-' + value;
    }

    incrementDisabled = (value >= maxValue) ? true : false;
    decrementDisabled = (value <= minValue) ? true : false;

    return (
      <div className={s.incrementDecrementButton}>
        <div className={cx(s.tableCell, 'text-left', 'textAlignRightRtl')}>
          <Button
            className={cx(s.iconButton)}
            disabled={decrementDisabled}
            onClick={() => onChange(this.decrement(value, minValue, incrementBy))}>
           <img src={minusIcon} />
          </Button>
        </div>
        <div className={cx(s.tableCell, 'text-center')}>
          <label className={cx(s.incrementDecrementText, 'bgBlack', 'incrementDecrementTextRTL')}>
            {valueLabel}
          </label>
        </div>
        <div className={cx(s.tableCell, 'text-right', 'textAlignLeftRtl')}>
          <Button
            className={cx(s.iconButton, 'incrementBtnRTL')}
            disabled={incrementDisabled}
            onClick={() => onChange(this.increment(value, maxValue, incrementBy))}>
            <img src={plusIcon} />
          </Button>
        </div>
      </div>
    )
  }
}

export default injectIntl(withStyles(s)(IncrementBtnCircle));
