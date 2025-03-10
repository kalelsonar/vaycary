import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FormControl, Button } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

import cx from 'classnames';
import bt from '../../../components/commonStyle.css';
import s from './ModalFilter.css';

import DateRange from './DateRange';

// Locale
import messages from '../../../locale/messages';
import { onChangeListing } from '../../../actions/Listing/onChangeListing';
import { closeFilterModal } from '../../../actions/modalActions';

class Listings extends Component {
	static propTypes = {
		className: PropTypes.string,
		formatMessage: PropTypes.any,
		data: PropTypes.shape({
			loading: PropTypes.bool,
			ManageListings: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.number.isRequired,
				title: PropTypes.string.isRequired
			}))
		}),
		refetch: PropTypes.any.isRequired,
		formatMessage: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.state = {
			smallDevice: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		let isBrowser = typeof window !== 'undefined';
		if (isBrowser) {
			this.handleResize();
			window.addEventListener('resize', this.handleResize);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		let isBrowser = typeof window !== 'undefined';
		if (isBrowser) {
			window.removeEventListener('resize', this.handleResize);
		}
	}


	handleResize(e) {
		let isBrowser = typeof window !== 'undefined';
		let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : true;
		this.setState({
			smallDevice,
		});
	}


	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.handleSubmit();
		}
	}

	handleChange(e) {
		const { onChangeListing, startDate, endDate, order } = this.props;
		onChangeListing({ listId: e.target.value, startDate, endDate, order });
	}

	async handleSubmit() {
		const { handleResults, startDate, endDate, closeFilterModal, listId, order } = this.props;
		await handleResults({ listId, startDate, endDate, orderBy: order });
		await closeFilterModal();
	}

	handleSort(e) {
		const { onChangeListing, startDate, endDate, listId } = this.props;
		onChangeListing({ order: e.target.value, startDate, endDate, listId });
	}

	async handleClear() {
		const { onChangeListing, handleResults, closeFilterModal } = this.props;
		await onChangeListing({ order: null, startDate: null, endDate: null, listId: 0 });
		await handleResults({ orderBy: null, startDate: null, endDate: null, listId: null });
	}

	render() {
		const { className, data: { loading, ManageListingTransaction }, type, listId, startDate, endDate, order } = this.props;
		const { formatMessage } = this.props.intl;
		const { smallDevice } = this.state;

		return (
			<div ref={this.setWrapperRef}>
				<div>
					<h3 className={s.title}><FormattedMessage {...messages.filterByDate} /></h3>
					<DateRange
						startDate={startDate}
						endDate={endDate}
						listId={listId}
						order={order}
						smallDevice={smallDevice}
						type={type}
					/>
				</div>
				<div>
					<h3 className={s.title}><FormattedMessage {...messages.filterByListingsDate} /></h3>
					<FormControl componentClass="select" className={s.selectField} onChange={this.handleChange} value={listId}>
						<option value="0">{formatMessage(messages.allListings)}</option>
						{
							!loading && ManageListingTransaction && ManageListingTransaction.map((item, index) => {
								return (
									<option value={item.id} key={index}>{item.title}</option>
								)
							})

						}
					</FormControl>
				</div>
				<div className={s.marginTop}>
					<h3 className={s.title}><FormattedMessage {...messages.sortByListings} /></h3>
					<FormControl componentClass="select" className={s.selectField} onChange={this.handleSort} value={order ? order : (type == 'previous' ? 'DESC' : 'ASC')}>
						<option value="ASC">{formatMessage(messages.ascending)}</option>
						<option value="DESC">{formatMessage(messages.descending)}</option>
					</FormControl>
				</div>

				<div className={s.alignRight}>
					<a className={cx(s.cancelBtn, 'modalcancelBtnRTL')} onClick={() => this.handleClear()}> {formatMessage(messages.clear)}</a>
					<Button className={cx(bt.btnSecondaryFull)} onClick={() => this.handleSubmit()}>
						<FormattedMessage {...messages.apply} />
					</Button>
				</div>

			</div>
		);
	}
}
const mapState = (state) => ({
	listId: state.onChangeListing.listId,
	startDate: state.onChangeListing.startDate,
	endDate: state.onChangeListing.endDate,
	order: state.onChangeListing.order,
});

const mapDispatch = {
	onChangeListing,
	closeFilterModal
};

export default compose(
	connect(mapState, mapDispatch),
	injectIntl,
	graphql(gql`
    	{
		    ManageListingTransaction {
		        id
                title
                isReady
            }
		}
    `,
		{
			options: {
				ssr: false
			}
		}),
)(Listings);
