import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { graphql, gql, compose } from 'react-apollo';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import reservationsQuery from './reservationsQuery.graphql';
import { updatePayoutStatus } from '../../../actions/updatePayoutStatus';
import { getPayoutStatus } from './getPayoutStatus';
import messages from '../../../locale/messages';
import formatReservationState from '../../../helpers/formatReservationState';

import s from './ManagePayout.css';

class ManagePayout extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        getAllPayouts: PropTypes.shape({
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
                    hostFailedTransaction: PropTypes.shape({
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
                    }),
                })),
            }),
        }).isRequired,
    }

    static defaultProps = {
        getAllPayouts: {
            loading: true,
            getAllPayoutReservation: {
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
            typingTimeout: 0
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { getAllPayouts: { completed, loading } } = nextProps;
        const { searchList, currentPage } = this.state;
        const { getAllPayouts: { refetch } } = this.props;
        let variables = { currentPage, searchList };
        if (completed && !loading) {
            refetch(variables);
        }
    }

    paginationData = (currentPage) => {
        const { getAllPayouts: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }

    handleClick = (searchList) => {
        const { getAllPayouts: { refetch } } = this.props;
        const { currentPage } = this.state;
        let variables = {
            currentPage: 1,
            searchList: searchList
        };
        this.setState({ currentPage: 1 });
        refetch(variables);
    }

    handleSearchChange = (e) => {
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }
        self.setState({
            searchList: e.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.handleClick(self.state.searchList);
            }, 450)
        });
    }

    handleHoldPayout = async(e, id, currentPage) => {
        const { updatePayoutStatus, getAllPayouts: { refetch } } = this.props;
        let isHold = e.target.value;
        isHold = isHold == "true" ? true : false;
        await updatePayoutStatus(id, isHold);
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.reservationId) },
            { data: formatMessage(messages.codeLabel) },
            { data: formatMessage(messages.adminListTitle) },
            { data: formatMessage(messages.hostNameLabel) },
            { data: formatMessage(messages.payoutLabel) },
            { data: formatMessage(messages.reservationStatus) },
            { data: formatMessage(messages.payoutStatus) },
            { data: formatMessage(messages.holdPayout) },
            { data: formatMessage(messages.details) }
        ]
    }

    tbody = (props) => {
        const { getAllPayouts: { getAllPayoutReservation } } = props;
        const { currentPage } = this.state;
        const { formatMessage } = props.intl;

        return getAllPayoutReservation?.reservationData?.map((item, key) => {
            let payoutAmount;
            let status = getPayoutStatus(item);
            if (item?.reservationState == 'cancelled') {
                payoutAmount = item?.cancellationDetails?.payoutToHost;
            } else {
                payoutAmount = item?.total - item?.hostServiceFee;
            }
            return {
                id: key,
                data: [
                    { data: item?.id },
                    { data: item?.confirmationCode },
                    {
                        data: item?.listData ? <a href={"/rooms/" + item?.listId} target='_blank'>
                            {item?.listTitle ? item?.listTitle : item?.listData?.title}
                        </a> : formatMessage(messages.dataMissing)
                    },
                    { data: item?.hostData?.firstName },
                    {
                        data: <CurrencyConverter
                            amount={payoutAmount}
                            from={item?.currency}
                        />
                    },
                    { data: formatReservationState(item?.reservationState) },
                    {
                        data: status?.defaultMessage === 'Failed' ? <Link to={'/siteadmin/failed-payout/' + item?.id}>{formatMessage(status)}</Link> :
                            (status ? formatMessage(status) : status)
                    },
                    {
                        data: (item?.hostTransaction || item?.reservationState === 'expired'
                            || item?.reservationState === 'declined') ? ' - ' : <select
                                value={item?.isHold} onChange={(e) => this.handleHoldPayout(e, item?.id, currentPage)}>
                            <option value={true}>{formatMessage(messages.grant)}</option>
                            <option value={false}>{formatMessage(messages.deny)}</option>
                        </select>
                    },
                    {
                        data: <Link to={"/siteadmin/viewpayout/" + item?.id + '/payout'} >
                            <FormattedMessage {...messages.messageHistroyLabel} />
                        </Link>
                    }
                ]
            }
        });
    }

    render() {
        const { getAllPayouts: { getAllPayoutReservation } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <CommonTable
                    title={formatMessage(messages.payoutManagement)}
                    thead={this.thead}
                    tbody={() => this.tbody(this.props)}
                    isSearch
                    handleSearch={(e) => this.handleSearchChange(e)}
                />
                {
                    getAllPayoutReservation?.reservationData?.length > 0 &&
                    <CustomPagination
                        total={getAllPayoutReservation.count}
                        currentPage={currentPage}
                        defaultCurrent={1}
                        defaultPageSize={10}
                        change={this.paginationData}
                        paginationLabel={formatMessage(messages.payoutsLabel)}
                        isScroll
                    />
                }
            </div>
        )
    }
}

const mapState = (state) => ({
    completed: state.payout.completed,
    loading: state.payout.loading,
});

const mapDispatch = {
    updatePayoutStatus,
};
export default compose(injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(reservationsQuery, {
        name: 'getAllPayouts',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(ManagePayout);