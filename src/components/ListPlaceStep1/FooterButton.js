// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
	Button,
} from 'react-bootstrap';

import SaveButton from '../../components/Header/List/SaveButton';


import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';

class FooterButton extends Component {

	static propTypes = {
		previousPage: PropTypes.any,
		nextPage: PropTypes.any,
		nextPagePath: PropTypes.any,
		previousPagePath: PropTypes.any,
	};

	render() {
		const {
			previousPage, nextPage, updateListingMap,
			isDisabled, nextPagePath, previousPagePath,
			type, isExistingList, mapUpdateLoading, loading, isAvailable, skipLabel, formPage,
			step, className
		} = this.props;
		const { formatMessage } = this.props.intl;

		return (
			<div className={s.gridFooter}>
					<div className={cx('bgBlack', s.listNextPosition, className, 'listNextPositionRTL')}>
						<div className={cx(s.listNextBackButton, s.stepEditNextBtn)}>
							<SaveButton
								step={step}
								formPage={formPage}
								className={s.saveExit}
							/>
							<div className={cx(s.footerBtnFlex, 'footerBtnFlexRTL')}>
								<Button className={cx(bt.btnPrimaryBorder, bt.btnLarge, s.backBtnFooter, 'backBtnFooterRTL')} onClick={() => previousPage(previousPagePath)}>
									<FormattedMessage {...messages.back} />
								</Button>
								{!type && <Button className={cx(bt.btnPrimary, bt.btnLarge)} disabled={isDisabled} onClick={() => nextPage(nextPagePath)}>
									{skipLabel ? (isAvailable ? <FormattedMessage {...messages.next} /> : <FormattedMessage {...messages.skip} />) : <FormattedMessage {...messages.next} />}
								</Button>}
								{
									type && type == "submit" && <Button className={cx(bt.btnPrimary, bt.btnLarge)} disabled={isDisabled} type="submit">
										<FormattedMessage {...messages.next} />
									</Button>
								}

								{
									type && type != 'submit' && isExistingList && <div className={s.displayInlineBlock}>
										<Loader
											type={"button"}
											label={formatMessage(messages.next)}
											show={mapUpdateLoading}
											disabled={isDisabled}
											className={cx(bt.btnPrimary, bt.btnLarge, 'arButtonLoader')}
											handleClick={() => updateListingMap()}
										/>
									</div>
								}
								{
									type && type != 'submit' && !isExistingList && <div className={s.displayInlineBlock}>
										<Loader
											type={"button"}
											label={formatMessage(messages.next)}
											buttonType={"submit"}
											show={loading}
											disabled={isDisabled}
											className={cx(bt.btnPrimary, bt.btnLarge, 'arButtonLoader')}
										/>
									</div>
								}
							</div>
						</div>
					</div>
			</div>
		)
	}
}

const mapState = (state) => ({
	isExistingList: state.location.isExistingList,
	loading: state.loader.location,
	mapUpdateLoading: state.location.mapUpdateLoading
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(FooterButton)));