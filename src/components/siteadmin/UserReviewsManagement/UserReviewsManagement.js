import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import StarRating from '../../StarRating';
import Link from '../../../components/Link';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import messages from '../../../locale/messages';
import userReviewsQuery from './userReviewsQuery.graphql';
import { debounce } from '../../../helpers/debounce';
import { updateReviewStatus } from '../../../actions/siteadmin/UserReview/manageReviews';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './UserReviewsManagement.css';

class UserReviewsManagement extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        editUser: PropTypes.func,
        title: PropTypes.string.isRequired,
        updateReviewStatus: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            typing: false,
            typingTimeout: 0
        };
        this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
    }

    paginationData = (currentPage) => {
        const { userReviews: { refetch }, setStateVariable } = this.props;
        let variables = { currentPage };
        setStateVariable({ currentPage });
        refetch(variables);
    }

    handleSearchChange(searchList) {
        const { userReviews: { refetch }, setStateVariable } = this.props;
        let variables = {
            currentPage: 1,
            searchList,
        };
        setStateVariable(variables);
        refetch(variables);
    }

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.listId) },
            { data: formatMessage(messages.reviewContentLabel) },
            { data: formatMessage(messages.adminListTitle) },
            { data: formatMessage(messages.reservationConfirmCode) },
            { data: formatMessage(messages.CheckInDate) },
            { data: formatMessage(messages.CheckOutDate) },
            { data: formatMessage(messages.SenderLabel) },
            { data: formatMessage(messages.receiverLabel) },
            { data: formatMessage(messages.ratingReviewLabel) },
            { data: formatMessage(messages.reviewStatusLabel) },
            { data: formatMessage(messages.actionLabel) }
        ]
    }

    tbody = (props) => {
        const { userReviews: { getReviewsDetails }, currentPage, searchList } = props;
        const { updateReviewStatus } = props;
        const { formatMessage } = props.intl;

        return getReviewsDetails?.results?.map(function (value, key) {
            let content = value.reviewContent, reviewContent = content.slice(0, 10), dots = '...';
            let isContent = content.length > 10, title, confirmationCode, checkInDate, checkOutDate;
            let hostName = value?.userData?.firstName, guestName = value?.authorData?.firstName;
            let hostProfileId = value?.userData?.profileId, guestProfileId = value?.authorData?.profileId;
            title = value?.listData?.title ? value.listData.title : formatMessage(messages.dataMissing);
            confirmationCode = value?.singleReservationData?.confirmationCode ? value.singleReservationData.confirmationCode : '';
            checkInDate = value?.singleReservationData?.checkIn ? moment(value.singleReservationData.checkIn).format('DD-MM-YYYY') : '';
            checkOutDate = value?.singleReservationData?.checkOut ? moment(value.singleReservationData.checkOut).format('DD-MM-YYYY') : '';

            return {
                id: key,
                data: [
                    { data: value?.listId },
                    { data: isContent ? reviewContent?.concat(dots) : reviewContent },
                    {
                        data: title && <a href={"/rooms/" + value?.listId} target="_blank">{title}</a>
                    },
                    { data: confirmationCode },
                    { data: checkInDate },
                    { data: checkOutDate },
                    {
                        data: <a href={"/users/show/" + guestProfileId} target="_blank">{guestName}</a>
                    },
                    {
                        data: <a href={"/users/show/" + hostProfileId} target="_blank">{hostName}</a>
                    },
                    {
                        data: <StarRating className={s.reviewStar} value={value?.rating} name={'review'} starCount={5} />
                    },
                    {
                        data: <select value={value?.isAdminEnable ? 'enable' : 'disable'} onChange={(e) => updateReviewStatus(value?.id, e?.target?.value, currentPage, searchList)}>
                            <option value={'enable'}>{formatMessage(messages.enabledLabel)}</option>
                            <option value={'disable'}>{formatMessage(messages.disabledLabel)}</option>
                        </select>
                    },
                    {
                        data: <Link to={"/siteadmin/management-reviews/" + value?.id}>
                            <FormattedMessage {...messages.editLabel} />
                        </Link>
                    }
                ]
            }
        })
    }

    render() {
        const { userReviews: { getReviewsDetails } } = this.props;
        const { currentPage } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <CommonTable
                    title={formatMessage(messages.usersReviews)}
                    thead={this.thead}
                    tbody={() => this.tbody(this.props)}
                    isSearch
                    handleSearch={(e) => this.handleSearchChange(e?.target?.value)}
                />
                {getReviewsDetails?.results?.length > 0 && <div>
                    <CustomPagination
                        total={getReviewsDetails?.count}
                        currentPage={currentPage}
                        defaultCurrent={1}
                        defaultPageSize={10}
                        change={this.paginationData}
                        paginationLabel={formatMessage(messages.reviews)}
                        isScroll
                    />
                </div>
                }
            </div>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    updateReviewStatus
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(userReviewsQuery, {
        name: 'userReviews',
        options: (props) => ({
            variables: {
                currentPage: props.currentPage,
                searchList: props.searchList,
            },
            fetchPolicy: 'network-only',
        })
    })
)(UserReviewsManagement);