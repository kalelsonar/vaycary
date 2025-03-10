import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import { connect } from 'react-redux';
import { change, formValueSelector, submit as submitForm } from 'redux-form';

import CustomCheckbox from '../../CustomCheckbox';

import messages from '../../../locale/messages';
import { getAddress } from '../../../helpers/getAddress';

import s from './RedoSearch.css';

class RedoSearch extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = async (event) => {
        const { personalized, change, submitForm } = this.props;
        if (!event) {
            let locationData;
            if (personalized?.location) {
                locationData = await getAddress(personalized?.location);
            }
            await Promise.all([
                change('SearchForm', 'lat', locationData?.data?.GetAddressComponents?.lat ? locationData?.data?.GetAddressComponents?.lat : null),
                change('SearchForm', 'lng', locationData?.data?.GetAddressComponents?.lng ? locationData?.data?.GetAddressComponents?.lng : null),
                change('SearchForm', 'sw_lat', locationData?.data?.GetAddressComponents?.sw_lat ? locationData?.data?.GetAddressComponents?.sw_lat : null),
                change('SearchForm', 'sw_lng', locationData?.data?.GetAddressComponents?.sw_lng ? locationData?.data?.GetAddressComponents?.sw_lng : null),
                change('SearchForm', 'ne_lat', locationData?.data?.GetAddressComponents?.ne_lat ? locationData?.data?.GetAddressComponents?.ne_lat : null),
                change('SearchForm', 'ne_lng', locationData?.data?.GetAddressComponents?.ne_lng ? locationData?.data?.GetAddressComponents?.ne_lng : null),
                change('SearchForm', 'searchByMap', event),
                change('SearchForm', 'initialLoad', !event)
            ]);
            await submitForm('SearchForm');
        } else {
            await Promise.all([
                change('SearchForm', 'searchByMap', event),
                change('SearchForm', 'initialLoad', !event)
            ]);
        }

    }

    render() {
        const { searchByMap, change } = this.props;

        return (
            <div className={cx(s.redoContainer, 'redoContainerRTL')}>
                <div className={cx(s.redoContent, 'bgBlack')}>
                    <CustomCheckbox
                        className={'icheckbox_square-green'}
                        value={true}
                        checked={searchByMap}
                        onChange={this.handleChange}
                    />
                    <small className={cx(s.redoText, 'textWhite')}>
                        <FormattedMessage {...messages.searchAsIMove} />
                    </small>
                </div>
            </div>
        );
    }


}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
    searchByMap: selector(state, 'searchByMap'),
    personalized: state?.personalized,
});

const mapDispatch = {
    change,
    submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(RedoSearch)));