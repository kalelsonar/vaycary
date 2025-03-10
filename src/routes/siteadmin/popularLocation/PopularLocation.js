import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import PopularLocationManagement from '../../../components/siteadmin/PopularLocation/PopularLocationManagement';

import s from './PopularLocation.css';

class PopularLocation extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getPopularLocation: PropTypes.array,
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
        const { data: { getPopularLocation, refetch } } = this.props;
        const { currentPage } = this.state;

        return (
            <PopularLocationManagement
                data={getPopularLocation}
                refetch={refetch}
                setStateVariable={this.setStateVariable}
                currentPage={currentPage}
            />
        );
    }
}

export default withStyles(s)(PopularLocation);