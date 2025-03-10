import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import moment from 'moment';

import CustomPagination from '../../CustomPagination/CustomPagination';
import Link from '../../Link/Link';
import CommonTable from '../../CommonTable/CommonTable';

import showToaster from '../../../helpers/showToaster';
import messages from '../../../locale/messages';

import s from './InquiryManagement.css';
class InquiryManagement extends Component {

    handleSearchChange = (e) => {
        const { getAllInquiryQuery: { refetch }, changeStateValues } = this.props;
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

    paginationData = (currentPage) => {
        const { getAllInquiryQuery: { refetch }, changeStateValues, searchList } = this.props;
        let variables = { currentPage, searchList };
        changeStateValues({ currentPage });
        refetch(variables);
    }

    takeAction = async (threadId) => {
        const { refetch } = this.props;
        let query = `query checkThreadData($threadId:Int){
            checkThreadData(threadId:$threadId){
                status
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
                variables: { threadId },
            }),
            credentials: 'include',
        });

        const { data } = await resp.json();
        if (data?.checkThreadData?.status == '200') {
            return true
        } else {
            showToaster({ messageId: 'alreadyApprove', toasterType: 'error' })
            let variables = {
                searchKey: '',
                currentPage: 1
            };
            await refetch(variables)
            return false
        }
    }

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.id) },
            { data: formatMessage(messages.adminListTitle) },
            { data: formatMessage(messages.checkInAndCheckOut) },
            { data: formatMessage(messages.bookingStatus) },
            { data: formatMessage(messages.bookingAction) },
            { data: formatMessage(messages.guestEmail) },
            { data: formatMessage(messages.hostEMailLabel) },
            { data: formatMessage(messages.details) }
        ]
    }


    tbody = (props) => {
        const { getAllInquiryQuery } = props;
        const { formatMessage } = props.intl;
        let userType = 'host';
        return getAllInquiryQuery?.getAllInquiryAdmin?.inquiryData?.map((value, key) => {
            let checkIn = moment(value?.startDate).format('DD MMMM YYYY')
            let checkOut = moment(value?.endDate).format('DD MMMM YYYY')
            return {
                id: key,
                data: [
                    { data: value?.id },
                    {
                        data: value?.threadsData?.listData?.title && <a href={"/rooms/" + value?.threadsData?.listId} target='_blank'>
                            {value?.threadsData?.listData?.title}
                        </a>
                    },
                    { data: `${checkIn} - ${checkOut}` },
                    {
                        data: <p>{value?.data ? formatMessage(messages.messageStatus2) : formatMessage(messages.panelInquiry)}</p>
                    },
                    {
                        data: value?.data == "preApproved" ?
                            <span>-</span> :
                            <a
                                onClick={() => this.takeAction(value.threadId)}
                                target="_blank" href={"/message/" + value?.threadId + "/" + userType}
                                className={cx(s.previewLink)}>
                                < FormattedMessage {...messages.manageLabel} />
                            </a>
                    },
                    { data: value?.threadsData?.guestUserData?.email },
                    { data: value?.threadsData?.hostUserData?.email },
                    {
                        data: <Link to={"/siteadmin/viewInquiry/" + value?.id + "/inquiry"} >
                            < FormattedMessage {...messages.viewLabel} />
                        </Link>
                    }
                ]
            }
        });
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { getAllInquiryQuery, currentPage, searchList, toCurrency } = this.props;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <CommonTable
                    title={formatMessage(messages.manageInquiry)}
                    thead={this.thead}
                    tbody={() => this.tbody(this.props)}
                    isSearch
                    handleSearch={(e) => this.handleSearchChange(e)}
                    exportURL={getAllInquiryQuery?.getAllInquiryAdmin?.inquiryData?.length > 0 ? `/export-admin-data?type=inquiry&keyword=${searchList}&toCurrency=${toCurrency}` : null}
                />
                {
                    getAllInquiryQuery?.getAllInquiryAdmin?.inquiryData?.length > 0
                    && <div>
                        <CustomPagination
                            total={getAllInquiryQuery.getAllInquiryAdmin.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={formatMessage(messages.panelInquiry)}
                            isScorll
                        />
                    </div>
                }
            </div >
        )
    }
};

const mapState = (state) => ({
    toCurrency: state.currency.to || state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(InquiryManagement)));