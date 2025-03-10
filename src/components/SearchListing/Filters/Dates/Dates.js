
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';
import cx from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

import DateRange from '../../DateRange';

import messages from '../../../../locale/messages';
import submit from '../../SearchForm/submit';
import { setPersonalizedValues } from '../../../../actions/personalized';

import dateIcon from '/public/SiteIcons/selectCalendarIcon.svg';
import arrowIcon from '/public/SiteIcons/selectLeftArrow.svg';
import closeBtn from '/public/SiteIcons/dateCloseBtn.svg';

import s from './Dates.css';

class Dates extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
    personalized: PropTypes.shape({
      isOneTotalToggle: PropTypes.bool,
    }),
  };

  static defaultProps = {
    isExpand: false,
    smallDevice: false,
    verySmallDevice: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleSubmit = async () => {
    const { handleTabToggle, isExpand } = this.props;
    const { change, submitForm, personalized, setPersonalizedValues } = this.props;
    let endDate;
    if (personalized?.startDate && !personalized?.endDate) {
      endDate = moment(personalized?.startDate).add('days', 1).format("YYYY-MM-DD");
      setPersonalizedValues({ name: 'endDate', value: endDate });
      change('dates', `'${moment(personalized?.startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`)
    }
    if (personalized?.startDate && personalized?.endDate) {
      setPersonalizedValues({ name: 'isOneTotalToggle', value: true });
    }
    await change('currentPage', 1);
    submitForm('SearchForm');
    handleTabToggle('dates', !isExpand);
  }

  handleReset = () => {
    const { change, setPersonalizedValues } = this.props;
    change('dates', null);
    change('isOneTotalToggle', false);
    change('totalPrice', false);
    setPersonalizedValues({ name: 'startDate', value: null });
    setPersonalizedValues({ name: 'endDate', value: null });
    setPersonalizedValues({ name: 'isOneTotalToggle', value: false });
    setPersonalizedValues({ name: 'totalPrice', value: false });
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  setBtnWrapperRef = (node) => {
    this.btnWrapperRef = node;
  }

  handleClickOutside = (event) => {
    const { change, submitForm, personalized, setPersonalizedValues, handleTabToggle, isExpand } = this.props;
    let endDate;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (personalized?.startDate && !personalized?.endDate) {
        endDate = moment(personalized?.startDate).add('days', 1).format("YYYY-MM-DD");
        setPersonalizedValues({ name: 'endDate', value: endDate });
        change('dates', `'${moment(personalized?.startDate).format("YYYY-MM-DD")}' AND '${moment(endDate).format("YYYY-MM-DD")}'`)
      }
      change('currentPage', 1);
      submitForm('SearchForm');
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('dates', !isExpand);
      }
    }
  }

  renderDateRange = ({ input, label, meta: { touched, error }, className, formName, numberOfMonths }) => {
    const { smallDevice, verySmallDevice } = this.props;
    return (
      <div className={cx('searchFilter', 'searchFilterDate')}>
        <DateRange
          {...input}
          formName={formName}
          numberOfMonths={numberOfMonths}
          onChange={(value) => {
            input.onChange(value);
          }}
          smallDevice={smallDevice}
          verySmallDevice={verySmallDevice}
        />
      </div>
    )
  }

  render() {
    const { className, handleTabToggle, isExpand, personalized, smallDevice } = this.props;
    const { formatMessage } = this.props.intl;

    let buttonLabel, isActive;
    buttonLabel = isExpand ? formatMessage(messages.checkIn) + ' - ' + formatMessage(messages.checkOut) : formatMessage(messages.selectDates);
    isActive = false;
    if (personalized) {
      if (personalized?.startDate && !personalized?.endDate) {
        buttonLabel = moment(personalized?.startDate).format('MMM D') + ' - ' + formatMessage(messages.checkOut);
        isActive = true;
      } else if (!personalized?.startDate && personalized?.endDate) {
        buttonLabel = formatMessage(messages.checkIn) + ' - ' + moment(personalized?.endDate).format('MMM D');
        isActive = true;
      } else if (personalized?.startDate && personalized?.endDate) {
        if (personalized?.startDate == personalized?.endDate) {
          buttonLabel = moment(personalized?.startDate).format('MMM D, YYYY');
        } else {
          buttonLabel = moment(personalized?.startDate).format('MMM D, YYYY') + ' - ' + moment(personalized?.endDate).format('MMM D, YYYY');
        }
        isActive = true;
      }
    }

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx({ [s.btnSecondary]: (isExpand === true || isActive == true) }, s.btn, s.selectDateBtn)}
            onClick={() => handleTabToggle('dates', !isExpand)}>
            <img src={dateIcon} /><span>{buttonLabel}</span><img src={arrowIcon} className={cx(s.arrowCss, 'dateArrowRTL')} />
          </Button>
        </div>
        {
          isExpand && <div className={cx(s.searchFilterPopover, s.dateFilterpopVerlayHeight, { [s.searchFilterPopoverFull]: smallDevice == true }, 'searchFilterPopoverRtl', 'bgBlack')} ref={this.setWrapperRef}>
            <div className={cx(s.searchFilterPopoverContent, s.dateFilterpopVerlayContentHeight)}>
              <div className={cx('visible-xs', s.searchFilterPopoverHeader, 'bgBlack')}>
                <div className={cx(s.dFlex)}>
                  <div className={cx('searchFilterCloseIconDark', 'svgImg')}>
                    <span onClick={this.handleSubmit}>
                      <img src={closeBtn} className={'closeDateIconRTL'}/>
                    </span>
                  </div>
                  <div className={s.title}>
                    <FormattedMessage {...messages.selectDates} />
                  </div>
                </div>
              </div>
              <div className={s.datePanel}>
                <Field
                  name="dates"
                  component={this.renderDateRange}
                  formName={'SearchForm'}
                  numberOfMonths={2}
                  smallDevice={smallDevice}
                />
              </div>
              <div className={cx(s.bottomFixed, 'bgBlack')}>
                <div>
                  {
                    personalized?.startDate && personalized?.endDate && <Button
                      bsStyle="link"
                      className={cx(s.btnLink, s.clearMobileBtn)}
                      onClick={this.handleReset}>
                      <FormattedMessage {...messages.clear} />
                    </Button>
                  }
                </div>
                <div>
                  <Button
                    className={cx(s.btn, s.applyBtn)}
                    onClick={this.handleSubmit}>
                    <FormattedMessage {...messages.selectLabel} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


Dates = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Dates);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  personalized: state.personalized,
  isOneTotalToggle: state.personalized.isOneTotalToggle,
});

const mapDispatch = {
  change,
  setPersonalizedValues,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dates)));
