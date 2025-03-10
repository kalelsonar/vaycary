import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  change,
  submit as submitForm,
  formValueSelector,
  reduxForm,
} from "redux-form";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { compose } from "react-apollo";

import CustomPagination from "../CustomPagination";
import NoResults from "../NoResults";
import PriceDetailsModal from "../ListingItem/PriceDetailsModal";
import InfiniteScrollResults from "./InfiniteScrollResults";
import ShowOneTotalPrice from "../Filters/ShowOneTotalPrice/ShowOneTotalPrice";
import ListingItemsData from "./ListingItemsData";

import submit from "../SearchForm/submit";
import { showMap } from "../../../actions/mobileSearchNavigation";
import { searchPagination, searchLimit } from "../../../config";

import s from "./SearchResults.css";

class SearchResults extends React.Component {
  static propTypes = {
    change: PropTypes.any,
    submitForm: PropTypes.any,
    results: PropTypes.array,
    currentPage: PropTypes.number,
    total: PropTypes.number,
    isResultLoading: PropTypes.bool,
    personalized: PropTypes.shape({
      isOneTotalToggle: PropTypes.bool,
    }),
  };

  static defaultProps = {
    results: [],
    showMap: false,
    showMapLoader: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { currentPage } = this.props;
    if (currentPage != undefined) {
      this.setState({ page: currentPage });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { currentPage } = nextProps;
    if (currentPage != undefined) {
      this.setState({ page: currentPage });
    }
  }

  handlePagination = async (currentPage) => {
    const { change, handleSubmit } = this.props;
    await change("currentPage", currentPage);
    window.scrollTo({
      top: 0,
      left: 0
    });
    await handleSubmit();
  };

  render() {
    const { results, total, isResultLoading, showMapLoader, guests, isOneTotalToggle, searchCount } = this.props;
    const { page } = this.state;

    if (!total) {
      return <NoResults />;
    } else {
      return (
        <div className={s.searchResults}>
          {isOneTotalToggle ? (
            <ShowOneTotalPrice
              className={cx(
                s.filterButtonContainer,
                s.hiddenResponsive,
                s.hideTabletSection
              )}
              handleTabToggle={this.handleTabToggle}
            />
          ) : (
            <></>
          )}

          {!showMapLoader && (
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                {isResultLoading && (
                  <div className={cx(s.loadingOverlay, "loadingOverlayDark")} />
                )}
                <PriceDetailsModal />
                {searchCount > searchPagination ? (
                  <ListingItemsData results={results} guests={guests} />
                ) : (
                  <InfiniteScrollResults results={results} guests={guests} />
                )}
              </Col>
            </Row>
          )}

          {searchCount > searchPagination && (
            <div className={s.resultsFooter}>
              <div className={s.resultsPagination}>
                <div className={s.pagination}>
                  <CustomPagination
                    total={total}
                    current={page}
                    defaultCurrent={1}
                    defaultPageSize={searchLimit}
                    handleChange={this.handlePagination}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

SearchResults = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(SearchResults);

const selector = formValueSelector("SearchForm");

const mapState = (state) => ({
  results: state?.search?.data,
  currentPage: selector(state, "currentPage"),
  total: state?.search?.count,
  searchCount: state?.search?.searchCount,
  isResultLoading: state?.search?.isResultLoading,
  showMap: state?.personalized?.showMap,
  showMapLoader: state?.loader?.showMapLoading,
  guests: Number(selector(state, "personCapacity")),
  isOneTotalToggle: state?.personalized?.isOneTotalToggle,
});

const mapDispatch = {
  change,
  submitForm,
  showMap,
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(SearchResults);
