import React from 'react';
import { flowRight as compose } from 'lodash';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviews.css';

// Component
import UserReviewsManagement from '../../../components/siteadmin/UserReviewsManagement/UserReviewsManagement';
class UserReviews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            searchList: '',
        };
        this.setStateVariable = this.setStateVariable.bind(this);
    }

    setStateVariable(variables) {
        this.setState(variables)
    }

    render() {
        const { currentPage, searchList } = this.state;

        return (
            <UserReviewsManagement
                currentPage={currentPage}
                searchList={searchList}
                setStateVariable={this.setStateVariable}
            />
        );
    }
}

export default compose(
    withStyles(s),
)(UserReviews);