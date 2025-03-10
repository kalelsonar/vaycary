
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Internal Component
import IncrementBtnCircle from '../../../../IncrementBtnCircle';

// Submit
import submit from '../../../SearchForm/submit';

//image
import bedIcon from '/public/SiteIcons/bedModalIcon.svg';
import bedsIcon from '/public/SiteIcons/bedsModalIcon.svg';
import bathIcon from '/public/SiteIcons/bathModalIcon.svg';

//Styles
import s from '../../../../../components/common.css';
import cs from '../../../../../components/commonStyle.css';
import c from './RoomsBeds.css';

class RoomsBeds extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      bedrooms: [],
      bathrooms: [],
      beds: []
    },
  };

  constructor(props) {
    super(props);
  }

  renderIncrementButton = (field) => (
    <IncrementBtnCircle
      {...field}
      showSymbol={true}
    />
  );

  render() {
    const { className } = this.props;
    const { fieldsSettingsData: { bedrooms, bathrooms, beds } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(className, 'moreFilterIncrementBtn')}>
        <p className={cx(s.moreFilterTitle, s.space3, s.textBold)}>
          <FormattedMessage {...messages.roomsAndBeds} />
        </p>
        <div className={cx(cs.displayFlex, s.space4, cs.alignCenter, cs.justifyContentSpaceBetween, c.roomsBedGapSection)}>
          <div className={cx(cs.displayFlex, cs.alignCenter, c.roomsBedGap, c.bedsWidth)}>
            <span className={'svgImg'}><img src={bedIcon} className={c.bedIcon} /></span>
            <span className={cx(s.captionTitle, s.capitalizeText)}>{beds && beds.length > 0 && beds[0].otherItemName}</span>
          </div>
            <Field
              name="beds"
              type="text"
              component={this.renderIncrementButton}
              maxValue={beds && beds.length > 0 && beds[0].endValue}
              minValue={0}
              incrementBy={1}
            />
        </div>
        <div className={cx(cs.displayFlex, s.space4, cs.alignCenter, cs.justifyContentSpaceBetween, c.roomsBedGapSection)}>
          <div className={cx(cs.displayFlex, cs.alignCenter, c.roomsBedGap, c.bedsWidth)}>
            <span className={'svgImg'}><img src={bedsIcon} className={c.bedIcon} /></span>
            <span className={cx(s.captionTitle, s.capitalizeText)}>{bedrooms && bedrooms.length > 0 && bedrooms[0].otherItemName}</span>
          </div>
            <Field
              name="bedrooms"
              type="text"
              component={this.renderIncrementButton}
              maxValue={bedrooms && bedrooms.length > 0 && bedrooms[0].endValue}
              minValue={0}
              incrementBy={1}
            />
        </div>
        <div className={cx(cs.displayFlex, s.space4, cs.alignCenter, cs.justifyContentSpaceBetween, c.roomsBedGapSection)}>
          <div className={cx(cs.displayFlex, cs.alignCenter, c.roomsBedGap, c.bedsWidth)}>
            <span className={'svgImg'}>
              <img src={bathIcon} className={c.bedIcon} />
            </span>
            <span className={cx(s.captionTitle, s.capitalizeText)}>{bathrooms && bathrooms.length > 0 && bathrooms[0].otherItemName}</span>
          </div>
            <Field
              name="bathrooms"
              type="text"
              component={this.renderIncrementButton}
              maxValue={bathrooms && bathrooms.length > 0 && bathrooms[0].endValue}
              minValue={0}
              incrementBy={1}
            />
        </div>
      </div>
    );
  }
}

RoomsBeds = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(RoomsBeds);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s, cs, c)(connect(mapState, mapDispatch)(RoomsBeds)));