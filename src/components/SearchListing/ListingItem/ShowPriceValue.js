import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import TotalPricePopup from "./TotalPricePopup";
import PriceDetails from "./PriceDetails";

import { openTotalPriceModal } from "../../../actions/modalActions";
import messages from "../../../locale/messages";
import ShowPrice from "./ShowPrice";

//Images
import closeIcon from '/public/SiteIcons/close.svg';

//Styles
import s from "./ListingItem.css";
import cs from '../../../components/commonStyle.css';

class ShowPriceValue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayTotalPrice: false,
			smallDevice: false,
		};
	}

	componentDidMount() {
		let isBrowser = typeof window !== "undefined";
		if (isBrowser) {
			this.handleResize();
			window.addEventListener("resize", this.handleResize);
		}
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		let isBrowser = typeof window !== 'undefined';
		if (isBrowser) {
			window.removeEventListener('resize', this.handleResize);
		}
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	setWrapperRef = (node) => {
		this.wrapperRef = node;
	}

	setBtnWrapperRef = (node) => {
		this.btnWrapperRef = node;
	}

	handleClickOutside = (event) => {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
				this.setState({ displayTotalPrice: false });
			}
		}
	}

	handleResize = (e) => {
		let isBrowser = typeof window !== 'undefined';
		let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : false;
		this.setState({ smallDevice });
	}

	handleTabToggle = (isExpand) => {
		this.setState({ displayTotalPrice: isExpand });
	}

	handleClose = () => {
		this.setState({ displayTotalPrice: false });
	}

	render() {
		const { totalPrice, oneTotalPrice, basePrice, currency, base, rates, openTotalPriceModal, listingData, listBlockedDates, serviceFees, bookingType, calculatedValues, showMap, listingURL } = this.props;
		const { displayTotalPrice, smallDevice } = this.state;
		return (
			<div ref={this.setBtnWrapperRef}>
				{(!smallDevice) && (
					<TotalPricePopup
						handleTabToggle={this.handleTabToggle}
						listingURL={listingURL}
						isExpand={displayTotalPrice}
						oneTotalPrice={oneTotalPrice} basePrice={basePrice} currency={currency} showMap={showMap} totalPrice={totalPrice}
					/>
				)}
				{(smallDevice) && (
					<a href={showMap ? listingURL : ''} target={'_blank'}
						onClick={(e) => {
							if (!showMap && totalPrice) {
								e.preventDefault();
								openTotalPriceModal(listingData, listBlockedDates, serviceFees, base, rates);
							} else {
								void (0);
							}
						}}
						className={cx(s.currencyText, 'textWhite', s.cursorPointer, { ['totalTaxText']: totalPrice })}>
						<ShowPrice totalPrice={totalPrice} oneTotalPrice={oneTotalPrice} basePrice={basePrice} currency={currency} />
					</a>
				)}
				<span className={cx(s.pernightText, cs.siteTextColor, 'textWhite')}>
					{' '}{!totalPrice ? (
						<span>
							/ <FormattedMessage {...messages.perNight} />
						</span>
					) : ''}
					{
						bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
					}
				</span>

				<div className={cx('popUpSection', 'popUpSection', { ['popUpOpen']: displayTotalPrice })} ref={this.setWrapperRef} onClick={(e) => { e.preventDefault() }}>
					<div className={s.popUpTitleSection}>
						<span onClick={(e) => { e.preventDefault(); this.handleClose(); }}>
							<img src={closeIcon} className={cx(cs.curderPointer, 'closeIcon')} />
						</span>
						<p className={cx(s.priceBreakDownText, 'textWhite')}><FormattedMessage {...messages.priceBreakdown} /></p>
					</div>
					<PriceDetails calculatedValues={calculatedValues} />
				</div>
			</div>
		);
	}
}
const mapState = (state) => ({
	base: state.currency.base,
	rates: state.currency.rates,
	totalPrice: state.personalized.totalPrice,
});


const mapDispatch = {
	openTotalPriceModal
};

export default withStyles(s, cs)(connect(mapState, mapDispatch)(ShowPriceValue));