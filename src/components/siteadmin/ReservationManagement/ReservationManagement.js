import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import cx from 'classnames';
import moment from 'moment';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Payout from './Payout';
import Refund from './Refund';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from './ModalForm';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import messages from '../../../locale/messages';
import formatReservationState from '../../../helpers/formatReservationState';
import history from '../../../core/history';
import { getDateRanges } from '../../../helpers/dateRange';
import showToaster from '../../../helpers/showToaster';

import s from './ReservationManagement.css';
import bt from '../../../components/commonStyle.css';

class ReservationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.any.isRequired,
      getTransactionHistory: PropTypes.shape({
        count: PropTypes.number.isRequired,
        reservationData: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          listId: PropTypes.number.isRequired,
          hostId: PropTypes.string.isRequired,
          guestId: PropTypes.string.isRequired,
          checkIn: PropTypes.string.isRequired,
          checkOut: PropTypes.string.isRequired,
          guestServiceFee: PropTypes.number.isRequired,
          hostServiceFee: PropTypes.number.isRequired,
          taxPrice: PropTypes.number.isRequired,
          total: PropTypes.number.isRequired,
          currency: PropTypes.string.isRequired,
          reservationState: PropTypes.string.isRequired,
          listData: PropTypes.shape({
            title: PropTypes.string.isRequired
          }),
          hostData: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
          }),
          hostPayout: PropTypes.shape({
            id: PropTypes.number.isRequired,
            payEmail: PropTypes.string.isRequired,
            methodId: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            last4Digits: PropTypes.number
          }),
          hostTransaction: PropTypes.shape({
            id: PropTypes.number.isRequired,
          }),
          guestData: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired
          }),
          transaction: PropTypes.shape({
            payerEmail: PropTypes.string.isRequired,
            paymentType: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            paymentMethodId: PropTypes.number
          }),
          refundStatus: PropTypes.shape({
            id: PropTypes.number.isRequired,
            receiverEmail: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired
          }),
          cancellationDetails: PropTypes.shape({
            refundToGuest: PropTypes.number.isRequired,
            payoutToHost: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            isTaxRefunded: PropTypes.bool.isRequired
          }),
        })),
      }),
    }).isRequired,
    viewReceiptAdmin: PropTypes.any.isRequired,
  };

  static defaultProps = {
    getAllReservations: {
      loading: true,
      getAllReservationAdmin: {
        count: null,
        reservationData: []
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0,
      selectedRefund: [],
      successRefund: [],
      selectedPayout: [],
      successPayout: [],
    };
  }

  changeState = (type, value) => {
    const { selectedRefund, successRefund, selectedPayout, successPayout } = this.state;
    const { searchList, currentPage, getAllReservations: { refetch } } = this.props;
    let variables = {};

    if (type === 'addRefund') variables = { selectedRefund: [...selectedRefund, value] };

    if (type === 'removeRefund') {
      let index = selectedRefund.findIndex(i => i === value);
      if (index === -1) return '';
      let data = [...selectedRefund];
      data.splice(index, 1)
      variables = { selectedRefund: data };
    }

    if (type === 'successRefund') variables = { successRefund: [...successRefund, value] };

    if (type === 'addPayout') variables = { selectedPayout: [...selectedPayout, value] };

    if (type === 'removePayout') {
      let index = selectedPayout.findIndex(i => i === value);
      if (index === -1) return '';
      let data = [...selectedPayout];
      data.splice(index, 1)
      variables = { selectedPayout: data };
    }
    if (type === 'successPayout') {
      variables = { successPayout: [...successPayout, value] };
      refetch({ currentPage, searchList });
    }
    this.setState(variables)
  }

  paginationData = (currentPage) => {
    const { getAllReservations: { refetch }, changeStateValues, searchList } = this.props;
    let variables = { currentPage: currentPage || this.state.currentPage, searchList };
    changeStateValues({ currentPage });
    this.setState(variables)
    refetch(variables);
  }

  handleSearchChange = (e) => {
    const { getAllReservations: { refetch }, changeStateValues } = this.props;
    let variables = {
      currentPage: 1,
      searchList: e.target.value,
    };
    changeStateValues({
      currentPage: 1,
      searchList: e.target.value,
    });
    refetch(variables);
  }

  handleDropDown = async (event) => {
    const { getAllReservations: { refetch }, changeStateValues } = this.props;
    let variables = {
      currentPage: 1,
      searchType: event.target.value,
    };

    changeStateValues({
      currentPage: 1,
      searchType: event.target.value,
    });
    refetch(variables);
  }

  takeAction = async (id, type) => {
    const { getAllReservations: { refetch } } = this.props;
    let query = `query checkReservationData ($id:Int,$type:String){
          checkReservationData (id:$id,type:$type){
              status,
              errorMessage
          }
      }`;

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { id, type },
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();
    if (data?.checkReservationData?.status == '200') {
      if (type == 'cancellation') {
        history.push("/siteadmin/cancel/" + id + '/' + 'host')
        return true
      }
    } else {
      showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.checkReservationData?.errorMessage })
      let variables = {
        searchKey: '',
        currentPage: 1
      };
      await refetch(variables);
      return false
    }
  }

  isEnableToCancel = (reservationData) => {
    const { nights, interval, today } = getDateRanges({ checkIn: reservationData?.checkIn, checkOut: reservationData?.checkOut, country: reservationData?.listData?.country });
    return (
      reservationData?.reservationState === 'approved' && moment(reservationData?.checkOut) > today && (-interval) < (nights - 1) ?
        <span onClick={() => this.takeAction(reservationData?.id, 'cancellation')} className={s.cancelBtn}>
          <FormattedMessage {...messages.deSelect} />
        </span> : <div>
          -
        </div>
    );
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.reservationId) },
      { data: formatMessage(messages.codeLabel) },
      { data: formatMessage(messages.adminListTitle) },
      { data: formatMessage(messages.bookingStatus) },
      { data: formatMessage(messages.bookingAction) },
      { data: formatMessage(messages.refundToGuest) },
      { data: formatMessage(messages.subTotalLabel) },
      { data: formatMessage(messages.payoutLabelAdmin) },
      { data: formatMessage(messages.details) },
      { data: formatMessage(messages.setEnableDisable) }
    ]
  }

  tbody = (props) => {
    const { getAllReservations: { loading, getAllReservationAdmin } } = props;
    const { selectedRefund, successRefund, selectedPayout, successPayout } = this.state;
    const { formatMessage } = props.intl;
    let userType = 'host';
    return getAllReservationAdmin?.reservationData?.map((value, key) => {
      let subTotal = value?.total + value?.guestServiceFee;
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.confirmationCode },
          {
            data: value?.listData ? <a href={"/rooms/" + value?.listId} target='_blank'>
              {value.listTitle ? value?.listTitle : value?.listData?.title}
            </a> : formatMessage(messages.dataMissing)
          },
          { data: <p className={s.ChangeToUpperCase}> {formatReservationState(value?.reservationState)} </p> },
          {
            data: value?.reservationState == 'pending' ?
              <a onClick={() => this.takeAction(value?.id, 'request')} target="_blank" href={"/message/" + value?.threadData?.threadId + "/" + userType}>
                {formatMessage(messages.manageLabel)}
              </a>
              :
              <p>-</p>
          },
          {
            data: <Refund
              id={value?.id}
              reservationState={value?.reservationState}
              transactionData={value?.transaction}
              refundData={value?.refundStatus}
              cancelData={value?.cancellationDetails}
              selectedRefund={selectedRefund}
              changeState={this.changeState}
              successRefund={successRefund}
              reservationCurrency={value?.currency}
              taxPrice={value?.cancellationDetails?.isTaxRefunded === true ? value?.taxPrice : 0}
            />
          },
          {
            data: <CurrencyConverter
              amount={subTotal}
              from={value.currency}
            />
          },
          {
            data: <Payout
              hostId={value?.hostId}
              checkIn={value?.checkIn}
              id={value?.id}
              hostPayout={value?.hostPayout}
              amount={value?.total}
              currency={value?.currency}
              hostTransaction={value?.hostTransaction}
              reservationState={value?.reservationState}
              cancelData={value?.cancellationDetails}
              hostData={value?.hostData}
              hostServiceFee={value?.hostServiceFee}
              country={value?.listData ? value?.listData?.country : ''}
              selectedPayout={selectedPayout}
              successPayout={successPayout}
              changeState={this.changeState}
              taxPrice={value?.cancellationDetails?.isTaxRefunded === false || value?.reservationState === 'completed' ? value?.taxPrice : 0}
            />
          },
          {
            data: <Link to={"/siteadmin/viewreservation/" + value?.id + '/reservation'} >
              <FormattedMessage {...messages?.viewLabel} />
            </Link>
          },
          { data: this.isEnableToCancel(value) }
        ]
      }
    })

  }

  tableFilter = () => {
    const { formatMessage } = this.props.intl;
    return [
      { value: "", label: formatMessage(messages.allLabel) },
      { value: "approved", label: formatMessage(messages.approved) },
      { value: "declined", label: formatMessage(messages.declined) },
      { value: "completed", label: formatMessage(messages.completedLabel) }
    ]
  }

  render() {
    const { toCurrency, currentPage, searchList, searchType } = this.props;
    const { getAllReservations: { getAllReservationAdmin } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <ModalForm />
        <div>
        <CommonTable
          title={formatMessage(messages.adminManageReservation)}
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          isSearch
          filterOption={this.tableFilter()}
          handleFilter={this.handleDropDown}
          handleSearch={(e) => this.handleSearchChange(e)}
          exportURL={getAllReservationAdmin?.reservationData?.length > 0 ? `/export-admin-data?type=reservations&keyword=${searchList}&toCurrency=${toCurrency}&searchType=${searchType}` : null}
        />
        {
          getAllReservationAdmin?.reservationData?.length > 0
          && <div>
            <CustomPagination
              total={getAllReservationAdmin?.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.panelReservation)}
              isScroll
            />
          </div>
        }
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
  completed: state.reservation.completed,
  loading: state.reservation.loading,
  toCurrency: state.currency.to || state.currency.base,
});

const mapDispatch = {
};

export default compose(injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(ReservationManagement);

// data={formatReservationState(value.reservationState)}