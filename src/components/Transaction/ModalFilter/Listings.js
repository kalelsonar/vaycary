import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FormControl, Button, FormGroup } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

//Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalFilter.css';
import cx from 'classnames';
import bt from '../../../components/commonStyle.css';

// Locale
import messages from '../../../locale/messages';

//Actions
import { onChangeListing } from '../../../actions/Listing/onChangeListing';
import { closeTransactionModal } from '../../../actions/modalActions';

class Listings extends Component {

	constructor(props) {
		super(props);
		this.handleListChange = this.handleListChange.bind(this);
		this.handlePayoutChange = this.handlePayoutChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}


	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.handleSubmit();
		}
	}

	handleListChange(e) {
		const { onChangeListing, payoutId } = this.props;
		onChangeListing({ listId: e.target.value, payoutId });
	}

	handlePayoutChange(e) {
		const { onChangeListing, listId } = this.props;
		onChangeListing({ payoutId: e.target.value, listId });
	}

	async handleSubmit() {
		const { handleResults, closeTransactionModal, listId, mode, payoutId } = this.props;
		await handleResults({ listId, payoutId, mode });
		await closeTransactionModal();
	}

	async handleClear() {
		const { onChangeListing, handleResults, closeTransactionModal, mode } = this.props;
		await onChangeListing({ listId: null, payoutId: null });
		await handleResults({ listId: null, payoutId: null, mode });
		await closeTransactionModal();
	}

	render() {
		const { manageListingTransaction: { ManageListingTransaction }, getPayouts: { getPayouts } } = this.props;
		const { listId, payoutId } = this.props;
		const { formatMessage } = this.props.intl;

		return (
			<div ref={this.setWrapperRef}>
				<FormGroup className={bt.space4}>
					<label className={cx(bt.commonLabelText, 'textWhite')}><FormattedMessage {...messages.filterByPayout} /></label>
					<FormControl
						componentClass="select"
						className={cx(bt.commonControlSelect, 'transactionSelectRTL')}
						onChange={this.handlePayoutChange}
						value={payoutId}
					>
						<option value="0">{formatMessage(messages.allPayoutMethod)}</option>
						{
							getPayouts && getPayouts.map((item, index) => {
								if (item.paymentMethod.id === 2) {
									return (
										<option
											value={item.id}
											key={index}
										>
											******{item.last4Digits}
										</option>
									)
								} else {
									return (
										<option
											value={item.id}
											key={index}
										>
											{item.payEmail}
										</option>
									)
								}

							})

						}
					</FormControl>
				</FormGroup>
				<FormGroup className={bt.space4}>
					<label className={cx(bt.commonLabelText, 'textWhite')}><FormattedMessage {...messages.filterByListingsDate} /></label>
					<FormControl componentClass="select" className={cx(bt.commonControlSelect, 'transactionSelectRTL')} onChange={this.handleListChange} value={listId}>
						<option value="0">{formatMessage(messages.allListings)}</option>
						{
							ManageListingTransaction && ManageListingTransaction.map((item, index) => {
								return (
									<option value={item.id} key={index}>{item.title}</option>
								)
							})

						}
					</FormControl>
				</FormGroup>
				<div className={bt.textAlignRight}>
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
	payoutId: state.onChangeListing.payoutId,
});

const mapDispatch = {
	onChangeListing,
	closeTransactionModal
};

export default compose(
	connect(mapState, mapDispatch),
	injectIntl,
	withStyles(s, bt),
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
			name: 'manageListingTransaction',
			options: {
				ssr: false
			}
		}),
	graphql(gql`
    	query getPayouts {
		  getPayouts {
		    id
		    methodId
		    paymentMethod{
		      id
		      name
		    }
		    userId
		    payEmail
		    address1
		    address2
		    city
		    state
		    country
		    zipcode
		    currency
		    default
		    createdAt
            status
            last4Digits
		  }
		}
    `,
		{
			name: 'getPayouts',
			options: {
				ssr: false
			}
		}),
)(Listings);