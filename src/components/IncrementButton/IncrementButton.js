import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import plusIcon from '/public/SiteIcons/plusIncrementIcon.svg';
import minusIcon from '/public/SiteIcons/minusDecrementIcon.svg';
import s from './IncrementButton.css';

class IncrementButton extends React.Component {
  static propTypes = {
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    labelSingluar: PropTypes.string,
    labelPlural: PropTypes.string,
    incrementBy: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.any
  };

  increment = (value, maxValue, incrementBy) => {
    if (value < maxValue) {
      return (Number(value) + Number(incrementBy));
    }
  }

  decrement = (value, minValue, incrementBy) => {
    if (value > minValue) {
      return (Number(value) - Number(incrementBy));
    }
  }

  render() {

    const { input: { value, onChange }, maxValue, minValue, labelSingluar, labelPlural, incrementBy } = this.props;

    let isDisableIncrement = value >= maxValue, isDisableDecrement = value <= minValue;

    let label = value > 1 ? labelPlural : labelSingluar;

    return (
      <div className={s.incrementDecrementButton}>
        <label className={cx(s.incrementDecrementText, 'bgBlack', 'incrementDecrementTextRTL')}> {value} {label}</label>
        <Button className={cx(s.iconButton, 'iconBtnDark')} onClick={() => onChange(this.decrement(value, minValue, incrementBy))} disabled={isDisableDecrement}>
          <img src={minusIcon} />
        </Button>
        <Button className={cx(s.iconButton, 'iconBtnDark', 'incrementBtnRTL')} onClick={() => onChange(this.increment(value, maxValue, incrementBy))} disabled={isDisableIncrement}>
          <img src={plusIcon} />
        </Button>
      </div>
    )
  }
}

export default injectIntl(withStyles(s)(IncrementButton));
