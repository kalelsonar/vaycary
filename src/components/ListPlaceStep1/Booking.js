// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

// Component
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import updateStep3 from './updateStep3';

//Image
import toolTipIcon from '/public/SiteIcons/listCommonToolTip.svg';

class Booking extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  render() {
    const { handleSubmit, nextPage, formPage, step, isDisabled, previousPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.grid, 'customRatioButton')}>
        <SidePanel
          title={formatMessage(messages.stepThreeCommonHeading)}
          landingContent={formatMessage(messages.instantPanelText)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <h3 className={s.landingContentTitle}><FormattedMessage {...messages.instantBookingTitle} /></h3>
            <div className={cx(s.space4)}>
              <span className={cx(s.bookingLandingStep, 'textWhite')}>
                <FormattedMessage {...messages.instantBookingInfo} />
              </span>
            </div>

            <div className={s.spaceTop3}>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.whoCanBook} /></h3>
              <div className={s.tipCommonCss}>
                <img src={toolTipIcon} />
                <span className={cx(s.commonTipCsss, 'textWhite')}> <FormattedMessage {...messages.whoCanBookInfo} /></span>
              </div>
              <span className={cx(s.landingStep, 'textWhite')}>

              </span>
            </div>

            <div className={s.spaceTop3}>
              <label className={s.displayTable}>
                <span className={s.displayTableRow}>
                  <span className={s.displayTableCellTop}>
                    <Field name="bookingType" component="input" type="radio" value="instant" className={s.BookingradioInput} />
                  </span>
                  <span className={s.displayTableCell}>
                    <span className={cx(s.bookText, 'rtlBookText')}><FormattedMessage {...messages.whoCanBookInfo1} /></span>
                    <span className={cx(s.subText, 'textWhite')}><FormattedMessage {...messages.whoCanBookInfo2} /></span>
                  </span>
                </span>
              </label>
            </div>
            <div className={cx(s.space6, s.spaceTop3)}>
              <label className={s.displayTable}>
                <span className={s.displayTableRow}>
                  <span className={s.displayTableCellTop}>
                    <Field name="bookingType" component="input" type="radio" value="request" className={s.BookingradioInput} />
                  </span>
                  <span className={s.displayTableCell}>
                    <span className={cx(s.bookText, 'rtlBookText')}><FormattedMessage {...messages.whoCanBookInfo3} /></span>
                  </span>
                </span>
              </label>
            </div>
            <FooterButton
              isDisabled={isDisabled}
              nextPage={nextPage}
              previousPage={previousPage}
              previousPagePath={"guest-requirements"}
              nextPagePath={"local-laws"}
              formPage={formPage}
              step={step}
            />
          </div>
        </form>
      </div>
    );
  }
}

Booking = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Booking);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Booking)));
