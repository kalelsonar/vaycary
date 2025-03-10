import React, { Component } from "react";
import PropTypes from 'prop-types';
import CurrencyConverter from "../../CurrencyConverter/CurrencyConverter";
import { FormattedMessage } from "react-intl";
import messages from "../../../locale/messages";
import s from "./ListingItem.css";

class ShowPrice extends Component {

    static propTypes = {
        totalPrice: PropTypes.bool,
        basePrice: PropTypes.number,
        oneTotalPrice: PropTypes.number,
        currency: PropTypes.string,
    };

    render() {
        const { totalPrice, basePrice, oneTotalPrice, currency } = this.props;
        return (
            <>
                <CurrencyConverter
                    amount={totalPrice ? oneTotalPrice : basePrice}
                    from={currency}
                />
                {totalPrice && (<span className={s.totalBeforeTaxText}> <FormattedMessage {...messages.totalBeforeTaxes} /> </span>)}
            </>
        )
    }
}

export default ShowPrice;