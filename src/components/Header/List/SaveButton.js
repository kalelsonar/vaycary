import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { submit, getFormSyncErrors, change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Loader from '../../Loader';

import messages from '../../../locale/messages';
import { isEmpty } from '../../../helpers/mergeObjects';
import { updateListingMap } from '../../../actions/updateListingMap';
import showToaster from '../../../helpers/showToaster';

import s from './SaveButton.css';

class SaveButton extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		updateListing: PropTypes.bool,
		step: PropTypes.number.isRequired,
		submit: PropTypes.any.isRequired,
		formPage: PropTypes.string.isRequired,
		updateListingMap: PropTypes.any.isRequired,
		listingSteps: PropTypes.shape({
			step1: PropTypes.string,
			step2: PropTypes.string,
			step3: PropTypes.string
		}),
		className: PropTypes.string,
		step1Errors: PropTypes.object,
		step2Errors: PropTypes.object,
		step3Errors: PropTypes.object,
	};

	static defaultProps = {
		updateListing: false,
		listingSteps: {
			step1: 'inactive',
			step2: 'inactive',
			step3: 'inactive'
		}
	};

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit() {
		const { submit, updateListingMap, step, formPage, change } = this.props;
		const { step1Errors, step2Errors, step3Errors } = this.props;

		if (step === 1 && isEmpty(step1Errors)) {
			if (formPage === 'location') {
				let isHeader = true;
				await updateListingMap(isHeader);
			} else {
				await submit('ListPlaceStep1');
			}

		} else if (step === 2 && isEmpty(step2Errors)) {
			await submit('ListPlaceStep2');
		} else if (step === 3 && isEmpty(step3Errors)) {
			await submit('ListPlaceStep3');
		} else {
			showToaster({ messageId: 'missingField', toasterType: 'error' })
		}
	}

	render() {
		const { step, listingSteps, className, updateListing } = this.props;
		const { formatMessage } = this.props.intl;
		let visible = false;

		if (step === 1) {
			if (listingSteps.step1 != undefined && listingSteps.step1 === "completed") {
				visible = true;
			}
		}
		if (step === 2) {
			if (listingSteps.step2 != undefined && listingSteps.step2 === "completed") {
				visible = true;
			}
		}
		if (step === 3) {
			if (listingSteps.step4 != undefined && listingSteps.step4 === "completed") {
				visible = true;
			}
		}

		// if (!visible) {
		// 	return <span />
		// }

		return (
			<div eventKey={2} onClick={this.handleSubmit} className={'textLoaderSave'}>
				<span className={className}>
					{
						visible && updateListing && <span>
							<span className={s.nonVerySmallScreen}>
								<Loader loadingText={formatMessage(messages.savingButton)} type={"text"} />
							</span>
						</span>
					}
					{
						!updateListing && visible && <span>
							<span className={s.nonVerySmallScreen}>
								<FormattedMessage {...messages.saveAndExit} />
							</span>
						</span>
					}
					{
						!visible && < span />
					}
				</span>
			</div>
		);
	}
}

const mapState = (state) => ({
	updateListing: state.loader.updateListing,
	listingSteps: state.location.listingSteps,
	step1Errors: getFormSyncErrors('ListPlaceStep1')(state),
	step2Errors: getFormSyncErrors('ListPlaceStep2')(state),
	step3Errors: getFormSyncErrors('ListPlaceStep3')(state),

});

const mapDispatch = {
	submit,
	updateListingMap,
	change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SaveButton)));
