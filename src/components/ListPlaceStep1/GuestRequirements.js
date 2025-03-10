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

// components
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import updateStep3 from './updateStep3';

//Image
import guestIcon from '/public/SiteIcons/gusetIconStep3.svg';


class GuestRequirements extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      guestRequirements: [],
      isDisabled: true,
    };
  }

  componentDidMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    if (listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }
  }

  render() {
    const { handleSubmit, nextPage, previousPage, existingList, formPage, step } = this.props;
    const { guestRequirements, isDisabled } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepThreeCommonHeading)}
          landingContent={formatMessage(messages.guestRequirementsTitle)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <div className={s.sidePanelTitle}>{formatMessage(messages.guestRequirementsTitle)}</div>
            <p className={cx(s.landingStep3, s.space3, 'textWhite')}>
              <FormattedMessage {...messages.guestRequirementsDescription} />
            </p>
            <ul className={cx('list-unstyled', s.noPadding, s.noMargin, s.unorderedList)}>
              {
                guestRequirements.map((item, key) => {
                  if (item.isEnable === "1") {
                    return (
                      <li key={key}>
                        <img src={guestIcon} className={cx(s.checkIcon, 'guestReuireCheckRtl')} />
                        <span className={cx(s.guestCheckText, s.space3, 'textWhite')}>
                          {item.itemName}
                        </span>
                      </li>
                    )
                  }
                })
              }
            </ul>
          </div>
          <FooterButton
            isDisabled={isDisabled}
            nextPage={nextPage}
            previousPage={previousPage}
            nextPagePath={"booking-scenarios"}
            previousPagePath={"calendar"}
            formPage={formPage}
            step={step}
          />
        </form>
      </div>
    );
  }
}

GuestRequirements = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(GuestRequirements);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  existingList: state.location.isExistingList
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(GuestRequirements)));