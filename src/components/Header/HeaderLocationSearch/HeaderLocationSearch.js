import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
// Translation
import { injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import c from './HeaderLocationSearch.css';

// History
import SearchForm from '../SearchForm/SearchForm';

class HeaderLocationSearch extends Component {

    render() {
        const { page, viewListingHeader, guests } = this.props;
        return (
            <div className={'headerSearch'}>
                <SearchForm page={page} viewListingHeader={viewListingHeader} guests={guests} />
            </div>
        )
    }
}


export default compose(
    injectIntl,
    withStyles(s, c),
)(HeaderLocationSearch);