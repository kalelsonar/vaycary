
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ShowPrice from './ShowPrice';

import s from "./ListingItem.css";
import cx from 'classnames';

class TotalPricePopup extends Component {

    static propTypes = {
        className: PropTypes.any,
        handleTabToggle: PropTypes.any,
        isExpand: PropTypes.bool,
        totalPrice: PropTypes.bool,
        basePrice: PropTypes.number,
        oneTotalPrice: PropTypes.number,
        currency: PropTypes.string,
    };

    render() {
        const { className, handleTabToggle, isExpand, totalPrice, basePrice, oneTotalPrice, currency, showMap, listingURL } = this.props;
        return (
            <>
                <a href={showMap ? listingURL : ''} target={'_blank'}
                    onClick={(e) => {
                        if (!showMap && totalPrice) {
                            e.preventDefault();
                            handleTabToggle(!isExpand)
                        } else {
                            void (0);
                        }
                    }}
                    className={cx(s.currencyText, 'textWhite', s.cursorPointer, { ['totalTaxText']: totalPrice })}>
                    <ShowPrice totalPrice={totalPrice} oneTotalPrice={oneTotalPrice} basePrice={basePrice} currency={currency} />
                </a>
            </>
        );
    }
}

export default injectIntl(withStyles(s)(TotalPricePopup));