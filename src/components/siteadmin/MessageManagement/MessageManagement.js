import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import messages from '../../../locale/messages';
import messageManagementQuery from './messageManagement.graphql';

import s from './MessageManagement.css';
class MessageManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
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
                payEmail: PropTypes.string.isRequired
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
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
        })),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentPage: 1,
            searchList: '',
            typing: false,
            typingTimeout: 0
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    paginationData(currentPage) {
        const { messageManagement: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    handleClick(searchList) {
        const { messageManagement: { refetch } } = this.props;
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

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.adminListTitle) },
            { data: formatMessage(messages.host) },
            { data: formatMessage(messages.hostEmailIdLabel) },
            { data: formatMessage(messages.guest) },
            { data: formatMessage(messages.guestEmailIdLabel) },
            { data: formatMessage(messages.messageHistroy) },
        ]
    }

    tbody = (props) => {
        const { messageManagement: { messageManagement } } = props;
        let userType = 'host';
        return messageManagement?.usersData?.map((value, index) => {
            return {
                id: index,
                data: [
                    {
                        data: <a target="_blank" href={"/rooms/" + value?.listId} className={cx(s.previewLink)}>
                            {
                                value?.threadItemForType?.reservation?.listTitle ? value?.threadItemForType?.reservation?.listTitle : (value?.listData ? value?.listData?.title : 'List is missing')
                            }
                        </a>
                    },
                    { data: value?.hostProfile?.displayName },
                    {
                        data: value?.hostUserData?.email && <a href={"/users/show/" + value?.hostProfile?.profileId} target="_blank" >
                            {value?.hostUserData?.email}
                        </a>
                    },
                    { data: value?.guestProfile?.displayName },
                    {
                        data: value?.guestUserData?.email && <a href={"/users/show/" + value?.guestProfile?.profileId} target="_blank" >
                            {value?.guestUserData?.email}
                        </a>
                    },
                    {
                        data: value?.id && <a target="_blank" href={"/message/" + value?.id + "/" + userType} className={cx(s.previewLink)}>
                            <FormattedMessage {...messages.messageHistroyLabel} />
                        </a>
                    },
                ]
            }
        });
    }


    render() {
        const { messageManagement: { messageManagement } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <CommonTable
                    title={formatMessage(messages.messages)}
                    thead={this.thead}
                    tbody={() => this.tbody(this.props)}
                    isSearch
                    handleSearch={(e) => this.handleSearchChange(e)}
                />
                { messageManagement?.usersData?.length > 0 && <div>
                        <CustomPagination
                            total={messageManagement.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={formatMessage(messages.messagesLabel)}
                            isScroll
                        />
                    </div>
                }
            </div>
        );
    }

}

const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});

const mapDispatch = {
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(messageManagementQuery, {
        name: 'messageManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(MessageManagement);