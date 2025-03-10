import React from 'react';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import FormControl from 'react-bootstrap/lib/FormControl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import CustomPagination from '../../CustomPagination';
import ReportManagementInformation from './ReportManagementInformation';

import ReportManagementQuery from './ReportManagement.graphql';

import messages from '../../../locale/messages';

import s from './ReportManagement.css';
class ReportManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            currentPage: 1,
            searchList: '',
            typing: false,
            typingTimeout: 0
        }
    }
    paginationData = (currentPage) => {
        const { reportUserManagement: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    handleClick = (searchList) => {
        const { reportUserManagement: { refetch } } = this.props;
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


    render() {
        const { reportUserManagement: { reportUserManagement } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <>
                    <ReportManagementInformation reportUserManagement={reportUserManagement} formatMessage={formatMessage} handleSearch={(e) => this.handleSearchChange(e)} />
                    {
                        reportUserManagement && reportUserManagement.reportsData && reportUserManagement.reportsData.length > 0
                        && <div>
                            <CustomPagination
                                total={reportUserManagement.count}
                                currentPage={currentPage}
                                defaultCurrent={1}
                                defaultPageSize={10}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.messagesLabel)}
                                isScroll
                            />
                        </div>
                    }
                </>
            </div>
        );
    }

}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(ReportManagementQuery, {
        name: 'reportUserManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(ReportManagement);