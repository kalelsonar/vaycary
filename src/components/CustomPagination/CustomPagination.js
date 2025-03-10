import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!./index.css';
import cx from 'classnames';

import messages from '../../locale/messages';
class CustomPagination extends Component {

    static propTypes = {
        total: PropTypes.number.isRequired,
        defaultCurrent: PropTypes.number.isRequired,
        defaultPageSize: PropTypes.number.isRequired,
        change: PropTypes.any.isRequired,
        currentPage: PropTypes.number.isRequired,
        paginationLabel: PropTypes.string
    };

    static defaultProps = {
        paginationLabel: 'items'
    };

    handleChange = (currentPage, size) => {
        const { change, isScroll } = this.props;
        change(currentPage);
        isScroll && window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    renderShowTotal = (total, range) => {
        const { paginationLabel } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={s.resultsCount}>
                <span>{range[0]}</span>
                <span>&nbsp;–&nbsp;</span>
                <span>{range[1]}</span>
                <span>&nbsp;{formatMessage(messages.ofLabel)}&nbsp;</span>
                <span className='paginationRtl'>{total}</span>
                <span>&nbsp;{paginationLabel}</span>
            </div>
        );
    }

    render() {
        const { total, defaultCurrent, defaultPageSize, currentPage } = this.props;
        const locale = { prev_page: 'Previous', next_page: 'Next' };

        return (
            <div className={cx('spaceTop4', 'positionRelative')}>
                <Pagination
                    className="ant-pagination"
                    defaultCurrent={defaultCurrent}
                    current={currentPage}
                    total={total}
                    defaultPageSize={defaultPageSize}
                    onChange={this.handleChange}
                    showTotal={(total, range) => this.renderShowTotal(total, range)}
                    locale={locale}
                    showLessItems
                />
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(CustomPagination));
