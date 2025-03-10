import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import BlogManagement from '../../../components/siteadmin/Blog/BlogManagement';
import s from './BlogManagement.css';

class BlogManagements extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getBlogDetails: PropTypes.array,
        })
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    setStateVariable = (variables) => {
        this.setState(variables);
    }

    render() {
        const { currentPage } = this.state;
        return (
            <BlogManagement
                setStateVariable={this.setStateVariable}
                currentPage={currentPage}
            />
        );
    }
}

export default withStyles(s)(BlogManagements);