// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import updateStep3 from './updateStep3';

class ReviewGuestBook extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      reviewGuestBook: []
    };
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ reviewGuestBook: listingFields.reviewGuestBook });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({ reviewGuestBook: listingFields.reviewGuestBook });
    }
  }

  render() {
    const { handleSubmit, previousPage, nextPage, existingList, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, reviewGuestBook } = this.state;
    let path = "index";
    if (existingList) {
      path = "home";
    }

    return (
      <div>
        <div className={s.grid}>
          <SidePanel
            title={formatMessage(messages.stepThreeCommonHeading)}
            landingContent={formatMessage(messages.reviewGuestBookTitle)}
          />
          <div>
            <p className={cx(s.landingStep3, s.space3, 'textWhite')}><span><FormattedMessage {...messages.reviewGuestBookDescription} /></span></p>
            <form onSubmit={handleSubmit}>
              <div className={s.landingMainContent}>
                <FormGroup className={s.formGroup}>
                  <ul className={cx('list-unstyled', s.noPadding, s.noMargin, s.unorderedList)}>
                    {
                      reviewGuestBook.map((item, key) => {
                        if (item.isEnable === "1") {
                          return (
                            <li key={key}>
                              <span className={s.displayTable}>
                                <span className={s.displayTableRow}>
                                  <span className={cx(s.displayTableCell, s.tableWidth)}><FontAwesome.FaCheck className={cx(s.checkIcon)} /></span>
                                  <span className={cx(s.landingStep3, s.space3, s.displayTableCell, s.tableWidthTwo, 'textWhite')}> {item.itemName} </span>
                                </span>
                              </span>
                            </li>
                          )
                        }
                      })
                    }
                  </ul>
                  <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                    <FormattedMessage {...messages.reviewGuestBookNote} />
                  </ControlLabel>
                </FormGroup>
              </div>
              <FooterButton
                isDisabled={isDisabled}
                nextPage={nextPage}
                previousPage={previousPage}
                nextPagePath={"advance-notice"}
                previousPagePath={path}
                formPage={formPage}
                step={step}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ReviewGuestBook = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(ReviewGuestBook);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  existingList: state.location.isExistingList,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ReviewGuestBook)));