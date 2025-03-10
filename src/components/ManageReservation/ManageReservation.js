import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import {
  Grid,
  Row,
  Col,
  Panel,
  Tabs,
  Tab,
  FormControl,
  FormGroup,
  Button
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageReservation.css';
import cx from 'classnames';
import bt from '../../components/commonStyle.css';
// Graphql
import getAllReservationQuery from './getAllReservationQuery.graphql';
// Component
import SideMenu from '../ManageListing/SideMenu/SideMenu';
import Reservation from '../Reservation/Reservation';
import NoItem from '../Reservation/NoItem/NoItem';
import Loader from '../Loader/Loader';
import CustomPagination from '../CustomPagination/CustomPagination';
import ModalFilter from './ModalFilter/ModalFilter';

import history from '../../core/history';
import { openFilterModal } from '../../actions/modalActions';
// Locale
import messages from '../../locale/messages';
import { debounce } from '../../helpers/debounce';
//Image
import addIcon from '/public/SiteIcons/reservationFilter.svg';

class ManageReservation extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    userType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getAllReservation: PropTypes.shape({
        count: PropTypes.number,
        reservationData: PropTypes.array
      }),
      refetch: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.paginationData = this.paginationData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSearchChange(searchKey) {
    const { data: { refetch }, setStateVariable } = this.props;
    let variables = {
      searchKey,
      currentPage: 1
    };
    setStateVariable(variables);
    refetch(variables);
  }

  paginationData(currentPage) {
    const { data: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  handleChange({ listId, startDate, endDate, orderBy }) {
    const { data: { refetch }, setStateVariable, searchKey } = this.props;
    let variables = { currentPage: 1, listId, orderBy, startDate, endDate, searchKey };
    setStateVariable(variables);
    refetch(variables);
  }

  handleSelect(key) {
    const { setStateVariable } = this.props;
    let variables = { dateFilter: key == 1 ? 'current' : 'previous', currentPage: 1 };
    setStateVariable(variables);
    if (key === 1)
      history.push('/reservation/current');
    else
      history.push('/reservation/previous')
  }

  renderPlacesSuggest = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { data: { loading, getAllReservation, refetch }, openFilterModal } = this.props;
    const { searchKey, currentPage, listId, startDate, endDate, orderBy, dateFilter, userType } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardListingGrid'}>
                <SideMenu />
                <div className={cx('commonListingBg', 'tripContainer')}>
                  <Panel className={cx(s.panelHeader, 'bgBlack')}>
                    <div className={cx('listingTab', s.panelBorder, 'listingMobileTab', 'tabReservation')}>
                      <Tabs activeKey={dateFilter == 'current' ? 1 : 2} id="uncontrolled-tab-example" onSelect={(e) => this.handleSelect(e)}>
                        <Tab eventKey={1} title={<FormattedMessage {...messages.upcomingTab} />} />
                        <Tab eventKey={2} title={<FormattedMessage {...messages.previousTab} />} />
                      </Tabs>
                    </div>
                    <div className={s.listFlex}>
                      {getAllReservation && getAllReservation.totalCount > 0 && <>
                        <div className={s.mobileSearchWidth}>
                          <FormGroup className={s.noMargin}>
                            <FormControl
                              type="text"
                              placeholder={formatMessage(messages.searchReservations)}
                              onChange={(e) => this.handleSearchChange(e.target && e.target.value)}
                              className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, 'locationBgIconRTL')}
                              value={searchKey}
                            />
                          </FormGroup>
                        </div>
                        <Button className={cx({ [s.linkCssActive]: (listId || startDate || endDate || orderBy) }, s.linkCss, s.mobileSearchWidth, 'textWhite', 'svgImg')} onClick={() => openFilterModal()}>
                          <img src={addIcon} className={cx(s.plusIcon, 'addPlusIcon')} />
                          <FormattedMessage {...messages.filters} />
                        </Button>
                      </>}
                    </div>
                    <ModalFilter
                      handleResults={this.handleChange}
                      refetch={refetch}
                      type={dateFilter}
                    />
                    {
                      loading && <Loader type={"text"} />
                    }
                    {
                      !loading && getAllReservation !== undefined && getAllReservation !== null
                      && getAllReservation.reservationData.length > 0 && <Reservation
                        data={getAllReservation.reservationData}
                        userType={userType}
                        currentPage={currentPage}
                        searchKey={searchKey}
                        listId={listId}
                        startDate={startDate}
                        endDate={endDate}
                        orderBy={orderBy}
                        dateFilter={dateFilter}
                      />
                    }
                    {
                      getAllReservation !== undefined && getAllReservation !== null
                      && getAllReservation.reservationData.length > 0 &&
                      <CustomPagination
                        total={getAllReservation.count}
                        currentPage={this.props.currentPage}
                        defaultCurrent={1}
                        defaultPageSize={5}
                        change={this.paginationData}
                        paginationLabel={formatMessage(messages.panelReservation)}
                      />
                    }
                    {
                      !loading && getAllReservation !== undefined && getAllReservation !== null
                      && getAllReservation.reservationData.length === 0 && <NoItem
                        userType={userType}
                        type={dateFilter}
                      />
                    }
                  </Panel>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  openFilterModal,
};

export default compose(
  injectIntl,
  connect(mapState, mapDispatch),
  withStyles(s, bt),
  graphql(getAllReservationQuery,
    {
      options: (props) => ({
        variables: {
          userType: props.userType,
          dateFilter: props.dateFilter,
          currentPage: props.currentPage,
          listId: props.listId,
          startDate: props.startDate,
          endDate: props.endDate,
          orderBy: props.orderBy,
          searchKey: props.searchKey,
        },
        fetchPolicy: 'network-only'
      })
    }
  ),
)(ManageReservation);
