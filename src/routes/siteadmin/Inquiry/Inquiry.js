import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import InquiryManagement from '../../../components/siteadmin/InquiryManagement/InquiryManagement';
import inquiryQuery from './inquiryQuery.graphql'

class Inquiry extends Component {

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            searchList: '',
        }
    }

    changeState = (variables) => {
        this.setState(variables)
    }

    render() {
        const { getAllInquiryQuery } = this.props;
        return (
            <div>
                <InquiryManagement
                    changeStateValues={this.changeState}
                    getAllInquiryQuery={getAllInquiryQuery}
                    currentPage={this.state.currentPage}
                    searchList={this.state.searchList}
                    refetch={getAllInquiryQuery?.refetch}
                />
            </div>
        )
    }
};

export default compose(
    graphql(inquiryQuery, {
        name: 'getAllInquiryQuery',
        options: {
            variables: {
                currentPage: 1,
                searchList: '',
            },
            fetchPolicy: 'network-only',
        }
    })
)(Inquiry);