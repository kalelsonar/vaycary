import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';

// Component
import PanelItem from '../PanelItem';
import NoItem from '../NoItem';

// Locale
import messages from '../../../locale/messages';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelWrapper.css';

import {
    Tabs,
    Tab,
    Button
} from 'react-bootstrap';



class PanelWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        formatMessage: PropTypes.any,
    };

    handleClick() {
        history.push('/become-a-host');
    }

    setValue = (value) => {
        this.setState({ searchValue: value })
    }

    render() {
        const { data: { ManageListings, refetch, loading } } = this.props;
        let listedItems = [];
        let inProgressItems = [];
        let unListedItems = [];
        const { searchValue } = this.state;

        if (ManageListings && ManageListings.status == 200 && ManageListings.userListingCount > 0) {
            ManageListings.results && ManageListings.results.length > 0 && ManageListings.results.map((item) => {
                if (!item.isReady) {
                    inProgressItems.push(item);
                } else if (item.isReady && item.isPublished) {
                    listedItems.push(item);
                } else if (item.isReady && !item.isPublished) {
                    unListedItems.push(item);
                }
            });
            return (
                <div className={cx('listingTab', s.panelBorder, 'listingMobileTab', 'tabReservation')}>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title={<FormattedMessage {...messages.panelHeader1} />}>
                            <PanelItem data={inProgressItems} refetch={refetch} loading={loading} searchKey={searchValue} setValue={this.setValue} />
                        </Tab>
                        <Tab eventKey={2} title={<FormattedMessage {...messages.listed} />}>
                            <PanelItem data={listedItems} refetch={refetch} loading={loading} searchKey={searchValue} setValue={this.setValue} />
                        </Tab>
                        <Tab eventKey={3} title={<FormattedMessage {...messages.unListed} />}>
                            <PanelItem data={unListedItems} refetch={refetch} loading={loading} searchKey={searchValue} setValue={this.setValue} />
                        </Tab>
                    </Tabs>
                </div>
            );
        } else {
            return <NoItem />;
        }

    }
}

export default injectIntl(withStyles(s)(PanelWrapper));