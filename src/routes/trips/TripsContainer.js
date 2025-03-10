import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
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
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TripsContainer.css';
import bt from '../../components/commonStyle.css';
import cx from 'classnames'


// Graphql
import getAllReservationQuery from './getAllReservationQuery.graphql';

// Component
import SideMenuTrips from '../../components/ManageListing/SideMenuTrips';
import Reservation from '../../components/Reservation';
import NoItem from '../../components/Reservation/NoItem';
import Loader from '../../components/Loader';
import CustomPagination from '../../components/CustomPagination';

// Locale
import messages from '../../locale/messages';
import { debounce } from '../../helpers/debounce';
import history from '../../core/history';

class TripsContainer extends React.Component {
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
    this.state = {
      currentPage: 1,
      searchKey: ''
    };
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
    this.handleSelect = this.handleSelect.bind(this);
  }

  paginationData(currentPage) {
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  handleSearchChange(searchKey) {
    const { data: { refetch } } = this.props;
    let variables = {
      searchKey,
      currentPage: 1
    };
    this.setState({ searchKey, currentPage: 1 });
    refetch(variables);
  }

  handleSelect(key) {
    const { data: { refetch } } = this.props;
    this.setState({ currentPage: 1 });
    let variables = {
      currentPage: 1
    };
    refetch(variables);
    if (key === 1)
      history.push('/trips/current');
    else
      history.push('/trips/previous')
  }

  handleClick = () => {
    const { data: { refetch } } = this.props;
    this.setState({ currentPage: 1 });
    let variables = {
      currentPage: 1
    };
    refetch(variables);
  }

  render() {
    const { data: { loading, getAllReservation }, userType, type } = this.props;
    const { searchKey } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardListingGrid'}>
                <SideMenuTrips
                  handleClick={this.handleClick}
                  menuItemOne={formatMessage(messages.upcomingTrips)}
                  menuItemTwo={formatMessage(messages.previousTrips)}
                  linkOne={'/trips/current'}
                  linkTwo={'/trips/previous'}
                />
                <div className={cx('commonListingBg', 'tripContainer')}>
                  <Panel className={cx(s.panelHeader, 'bgBlack')}>
                    <div className={cx('listingTab', s.panelBorder, 'listingMobileTab', 'tabReservation')}>
                      <Tabs activeKey={type == 'current' ? 1 : 2} id="uncontrolled-tab-example" onSelect={(e) => this.handleSelect(e)}>
                        <Tab eventKey={1} title={<FormattedMessage {...messages.upcomingTab} />} />
                        <Tab eventKey={2} title={<FormattedMessage {...messages.previousTab} />} />
                      </Tabs>
                    </div>
                    <div className={s.listFlex}>
                      {getAllReservation && getAllReservation.totalCount > 0 && <div className={s.mobileWidth}>
                        <FormGroup className={s.noMargin}>
                          <FormControl
                            type="text"
                            placeholder={formatMessage(messages.searchTrips)}
                            onChange={(e) => this.handleSearchChange(e.target && e.target.value)}
                            className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, 'locationBgIconRTL')}
                            value={searchKey}
                          />
                        </FormGroup>
                      </div>}
                    </div>
                    {
                      loading && <Loader type={"text"} />
                    }
                    {
                      !loading && getAllReservation !== undefined && getAllReservation !== null
                      && getAllReservation.reservationData.length > 0 && <Reservation
                        data={getAllReservation.reservationData}
                        userType={userType}
                        isTrip
                      />
                    }
                    {
                      getAllReservation !== undefined && getAllReservation !== null
                      && getAllReservation.reservationData.length > 0 &&
                      <div>
                        <CustomPagination
                          total={getAllReservation.count}
                          currentPage={this.state.currentPage}
                          defaultCurrent={1}
                          defaultPageSize={5}
                          change={this.paginationData}
                          paginationLabel={formatMessage(messages.trips)}
                        />
                      </div>
                    }
                    {
                      !loading && getAllReservation !== undefined && getAllReservation !== null
                      && getAllReservation.reservationData.length === 0 && <NoItem
                        userType={userType}
                        type={type}
                        isTrip
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

export default compose(
  injectIntl,
  withStyles(s, bt),
  graphql(getAllReservationQuery,
    {
      options: (props) => ({
        variables: {
          userType: props.userType,
          dateFilter: props.type,
          currentPage: 1
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(TripsContainer);