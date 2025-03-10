import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import messages from '../../../locale/messages';
import CommonTable from '../../CommonTable/CommonTable';
import s from './ReportManagement.css';
class ReportManagementInformation extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            reporterId: PropTypes.string.isRequired,
            reporterType: PropTypes.string.isRequired,
        })),
        formatMessage: PropTypes.func.isRequired,
    };

    static defaultProps = {
        data: []
    };

    thead = () => {
        const { formatMessage } = this.props;
        return [
            { data: formatMessage(messages.idLabel) },
            { data: formatMessage(messages.reporterName) },
            { data: formatMessage(messages.reporterEmail) },
            { data: formatMessage(messages.userNameLabel) },
            { data: formatMessage(messages.userEmailLabel) },
            { data: formatMessage(messages.reportType) },
            { data: formatMessage(messages.transferDate) }
        ]
    }

    tbody = (props) => {
        const { formatMessage, reportUserManagement } = props;

        return reportUserManagement?.reportsData?.map((value, index) => {
            let transferDate = moment(value?.createdAt).format('MM/DD/YYYY');

            return {
                id: index,
                data: [
                    { data: value?.id },
                    { data: value?.reporterData?.displayName ? value?.reporterData?.displayName : formatMessage(messages.userDeletedLabel) },
                    {
                        data: value?.reporterEmail?.email ? <a href={"/users/show/" + value?.userProfileId?.profileId} target="_blank">
                            {value?.reporterEmail?.email}
                        </a> : formatMessage(messages.userDeletedLabel)
                    },
                    { data: value?.userData?.displayName ? value?.userData?.displayName : formatMessage(messages.userDeletedLabel) },
                    {
                        data: value?.userEmail?.email ? <a href={"/users/show/" + value?.userData?.profileId} target="_blank">
                            {value?.userEmail?.email}
                        </a> : formatMessage(messages.userDeletedLabel)
                    },
                    { data: value?.reportType && value?.reportType },
                    { data: transferDate }
                ]
            };
        })

    }

    render() {
        const { reportUserManagement, formatMessage, handleSearch } = this.props;

        return (
            <CommonTable
            title={formatMessage(messages.reportUserMessage)}
            thead={this.thead}
            tbody={() => this.tbody(this.props)}
            isSearch
            handleSearch={handleSearch}
          />
        );
    }
}

export default ReportManagementInformation;