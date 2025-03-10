import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';

import {
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Transaction.css';
import bt from '../../components/commonStyle.css';

// Component
import CompletedTransactions from './Completed/CompletedTransactions';
import FutureTransactions from './Future/FutureTransactions';
import GrossEarnings from './GrossEarnings/GrossEarnings';
import TotalAmount from './TotalAmount';
import Loader from '../Loader';
import ModalFilter from './ModalFilter/ModalFilter';
import CustomPagination from '../CustomPagination';

import { onChangeListing } from '../../actions/Listing/onChangeListing';
import { payoutChangeListing } from '../../actions/Payout/payoutChangeListing';
import { openTransactionModal } from '../../actions/modalActions';

// Locale
import messages from '../../locale/messages';
import { debounce } from '../../helpers/debounce';
import history from '../../core/history';

//images
import exportIcon from '/public/SiteIcons/exportItemIcon.svg';
import filterIcon from '/public/SiteIcons/reservationFilter.svg';

class Transaction extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.any.isRequired,
      getTransactionHistory: PropTypes.shape({
        count: PropTypes.number.isRequired,
        reservationData: PropTypes.arrayOf(PropTypes.shape({
          hostId: PropTypes.string.isRequired,
          checkIn: PropTypes.string.isRequired,
          checkOut: PropTypes.string.isRequired,
          confirmationCode: PropTypes.number.isRequired,
          listData: PropTypes.shape({
            title: PropTypes.string.isRequired
          }),
          guestData: PropTypes.shape({
            firstName: PropTypes.string.isRequired
          }),
          hostTransaction: PropTypes.shape({
            payoutId: PropTypes.number,
            payEmail: PropTypes.string,
            amount: PropTypes.number,
            currency: PropTypes.string,
            createdAt: PropTypes.string
          })
        }))
      }),
    }).isRequired
  };

  static defaultProps = {
    data: {
      loading: true,
      getTransactionHistory: {
        count: null,
        reservationData: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      payoutId: null,
      listId: null,
      searchKey: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.paginationData = this.paginationData.bind(this);
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

  handleChange({ payoutId, listId, mode }) {
    const { data: { refetch } } = this.props;
    const { searchKey } = this.state;
    let variables = {
      mode,
      currentPage: 1,
      payoutId,
      listId,
      searchKey
    };
    this.setState({ currentPage: 1, payoutId, listId });
    refetch(variables);
  }

  handleChangeFirst(mode) {
    const { onChangeListing, payoutChangeListing } = this.props;
    const { data: { refetch } } = this.props;
    let variables = {
      currentPage: 1,
      payoutId: null,
      listId: null
    };
    history.push('/user/transaction/' + mode);
    this.setState({ currentPage: 1, payoutId: null, listId: null });
    onChangeListing({ listId: null, payoutId: null });
    payoutChangeListing(null)
    refetch(variables);
  }

  paginationData(currentPage) {
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  render() {
    const { data: { loading, getTransactionHistory }, mode } = this.props;
    const { currentPage, payoutId, listId, searchKey } = this.state;
    const { formatMessage } = this.props.intl;
    const { toCurrency, openTransactionModal, siteName } = this.props;
    let page1Active, page2Active, page3Active;
    let showPayouts, showTotal, userId;
    page1Active = mode === 'completed' ? s.active : '';
    page2Active = mode === 'future' ? s.active : '';
    page3Active = mode === 'grossEarnings' ? s.active : '';
    if (mode === 'completed' || mode === 'grossEarnings') {
      showPayouts = true;
    }
    if (mode === 'completed' || mode === 'future') {
      showTotal = true;
    }

    if (!loading && getTransactionHistory && getTransactionHistory.reservationData) {
      if (getTransactionHistory.reservationData.length > 0) {
        userId = getTransactionHistory.reservationData[0].hostId;
      }
    }


    return (
      <div>
        <div className={cx('commonListingBg', 'noMarginBottom', 'transactionList')}>
          <ul className={cx('list-inline', s.noMargin, 'noPaddingTransaction')}>
            <li className={cx(page1Active, s.mobileWidth)}>
              <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleChangeFirst('completed')}>
                <FormattedMessage {...messages.completedTransactions} />
              </a>
            </li>
            <li className={cx(page2Active, s.mobileWidth)}>
              <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleChangeFirst('future')}>
                <FormattedMessage {...messages.futureTransactions} />
              </a>
            </li>
            <li className={cx(page3Active, s.mobileWidth)}>
              <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleChangeFirst('grossEarnings')}>
                <FormattedMessage {...messages.grossEarnings} />
              </a>
            </li>
          </ul>
          {
            !loading && showTotal && getTransactionHistory && getTransactionHistory.totalCount > 0 && getTransactionHistory.totalData
            && <TotalAmount
              mode={mode}
              data={getTransactionHistory.totalData}
            />
          }
          {getTransactionHistory && getTransactionHistory.totalCount > 0 && <div className={s.listFlex}>
            <div className={s.searchWidth}>
              <FormGroup className={s.noMargin}>
                <FormControl
                  type="text"
                  placeholder={formatMessage(messages.SearchTransactions)}
                  className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, 'locationBgIconRTL')}
                  onChange={(e) => this.handleSearchChange(e.target && e.target.value)}
                  value={searchKey}
                />
              </FormGroup>
            </div>
            <div className={s.filterBtnSection}>
              {getTransactionHistory.count > 0 && <>
                <a href={`/export-transaction?siteName=${siteName}&type=${mode}&toCurrency=${toCurrency}&listId=${listId > 0 && listId || ''}&payoutId=${payoutId > 0 && payoutId || ''}&searchKey=${searchKey || ''}`}
                  className={s.csvLink}
                >
                  <img src={exportIcon} className={cx(s.filterIcon, 'filterIconRTL')} />
                  <FormattedMessage {...messages.exportCSV} />
                </a>
              </>}
              <Button className={cx({ [s.linkCssActive]: (payoutId || listId) }, s.linkCss, s.mobileSearchWidth, s.filterBtn, 'filterBtnRTL', 'textWhite', 'svgImg')} onClick={() => openTransactionModal()}>
                <img src={filterIcon} />
                <FormattedMessage {...messages.filters} />
              </Button>

            </div>
          </div>}

          <ModalFilter
            handleResults={this.handleChange}
            showPayouts={showPayouts}
            mode={mode}
          />

          {
            loading && <Loader type={"text"} />
          }
          {
            !loading && mode === 'completed' && getTransactionHistory && getTransactionHistory.reservationData !== null
            && <CompletedTransactions data={getTransactionHistory.reservationData} totalCount={getTransactionHistory.totalCount} />
          }

          {
            !loading && mode === 'future' && getTransactionHistory && getTransactionHistory.reservationData !== null
            && <FutureTransactions data={getTransactionHistory.reservationData} totalCount={getTransactionHistory.totalCount} />
          }

          {
            !loading && mode === 'grossEarnings' && getTransactionHistory && getTransactionHistory.reservationData !== null
            && <GrossEarnings data={getTransactionHistory.reservationData} totalCount={getTransactionHistory.totalCount} />
          }
        </div>
        {
          getTransactionHistory && getTransactionHistory.count !== null && getTransactionHistory.count > 0 && <div>
            <CustomPagination
              total={getTransactionHistory.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={5}
              change={this.paginationData}
              componentReference={mode}
              paginationLabel={formatMessage(messages.transactions)}
            />
          </div>
        }
      </div>
    );
  }
}


const mapState = (state) => ({
  toCurrency: state.currency.to || state.currency.base,
  siteName: state.siteSettings && state.siteSettings.data.siteName
});

const mapDispatch = {
  onChangeListing,
  openTransactionModal,
  payoutChangeListing
};

export default compose(
  injectIntl,
  connect(mapState, mapDispatch),
  withStyles(s, bt)
)(Transaction);