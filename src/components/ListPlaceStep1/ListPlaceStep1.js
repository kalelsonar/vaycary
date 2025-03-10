import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import ExistingPage1 from './ExistingPage1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';
import Photos from './Photos';
import Description from './Description';
import GuestRequirements from './GuestRequirements';
import HouseRules from './HouseRules';
import ReviewGuestBook from './ReviewGuestBook';
import AdvanceNotice from './AdvanceNotice';
import MinMaxNights from './MinMaxNights';
import Calendar from './Calendar';
import Pricing from './Pricing';
import Discount from './Discount';
import Booking from './Booking';
import LocalLaws from './LocalLaws';
import ListIntro from './ListIntro';

import history from '../../core/history';
import submit from './submit';
import update from './update';
import updateStep2 from './updateStep2';
import updateStep3 from './updateStep3';
import { activeTabIndex } from '../../helpers/listingTabs';
import setTabActiveIndex from '../../actions/setTabActiveIndex';

class ListPlaceStep1 extends Component {

  static propTypes = {
    listData: PropTypes.object,
    existingList: PropTypes.bool,
    listingSteps: PropTypes.object,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 'index',
    };
  }

  UNSAFE_componentWillMount() {
    const { step, formPage, setTabActiveIndex } = this.props;
    const activeIndex = activeTabIndex(formPage, step);
    setTabActiveIndex(activeIndex);
  }

  nextPage(formPage) {
    const { listId, existingList, formBaseURI, step, setTabActiveIndex } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
    const activeIndex = activeTabIndex(formPage, step);
    setTabActiveIndex(activeIndex);
  }

  previousPage(formPage) {
    const { listId, existingList, formBaseURI, step, setTabActiveIndex } = this.props;
    let pathName = formBaseURI + formPage;
    if (existingList === true) {
      pathName = formBaseURI + listId + "/" + formPage;
    }
    history.push(pathName);
    this.setState({ page: formPage })
    const activeIndex = activeTabIndex(formPage, step);
    setTabActiveIndex(activeIndex);
  }

  render() {
    const { formPage, photosCount, mode, existingList, listId, baseCurrency, step } = this.props;
    const { page } = this.state;

    let currentPage = page;
    if (mode != undefined && mode === "new") {
      currentPage = 'index';
    } else if (formPage != undefined) {
      currentPage = formPage;
    }

    return (
      <div className={'inputFocusColor'}>
        {currentPage === "index" && <ListIntro nextPage={this.nextPage} formPage={formPage} step={step} />}
        {currentPage === "home" && <ExistingPage1
          nextPage={this.nextPage}
          photosCount={photosCount}
        />}
        {currentPage === "room" && <Page2
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "bedrooms" && <Page3
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "location" && <Page5
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          listId={listId}
          onSubmit={existingList ? update : submit}
          formPage={formPage} step={step}
        />}
        {currentPage === "map" && <Page6
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "amenities" && <Page7
          nextPage={this.nextPage}
          previousPage={this.previousPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "spaces" && <Page8
          previousPage={this.previousPage}
          onSubmit={update}
          formPage={formPage} step={step}
        />}
        {currentPage === "photos" && <Photos
          previousPage={this.previousPage}
          listId={listId}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "description" && <Description
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          onSubmit={updateStep2}
          formPage={formPage} step={step}
        />}
        {currentPage === "guest-requirements" && <GuestRequirements
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "house-rules" && <HouseRules
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "review-how-guests-book" && <ReviewGuestBook
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "advance-notice" && <AdvanceNotice
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "min-max-nights" && <MinMaxNights
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          listId={listId}
          formPage={formPage} step={step}
        />}
        {currentPage === "pricing" && <Pricing
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "calendar" && <Calendar
          listId={listId}
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          baseCurrency={baseCurrency}
          formPage={formPage} step={step}
        />}
        {currentPage === "discount" && <Discount
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "booking-scenarios" && <Booking
          previousPage={this.previousPage}
          nextPage={this.nextPage}
          formPage={formPage} step={step}
        />}
        {currentPage === "local-laws" && <LocalLaws
          previousPage={this.previousPage}
          onSubmit={updateStep3}
          formPage={formPage} step={step}
        />}
      </div>
    );
  }

}


const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingSteps: state.location.listingSteps,
  photosCount: state.location.photosCount
});

const mapDispatch = {
  setTabActiveIndex
};

export default injectIntl(connect(mapState, mapDispatch)(ListPlaceStep1));