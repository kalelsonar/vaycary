import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Book.css';

// Component
import Booking from '../../components/Booking';

class Book extends Component {
    static propTypes = {
    };

    render() {
        return (
            <div className={cx(s.container, s.overFlowHiddenMobile)}>
                    <Booking />
            </div>
        );
    }
}

export default withStyles(s)(Book);

