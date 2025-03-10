import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
	Button,
	Grid,
	Row,
	FormGroup,
	Col,
	FormControl,
	Tooltip,
	OverlayTrigger,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Verification.css';
import bt from '../../../components/commonStyle.css';
import envelope from '/public/SiteIcons/envelope.png';
import refreshIcon from '/public/SiteIcons/Refresh.svg';
import { loadAccount } from '../../../actions/account';
// Locale
import messages from '../../../locale/messages';

class Verification extends Component {
	static propTypes = {
		guestEmail: PropTypes.string.isRequired,
		resendEmailVerification: PropTypes.any.isRequired,
		formatMessage: PropTypes.any,
	};


	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	async handleClick() {
		const { nextPage, loadAccount } = this.props;
		await loadAccount();
		const { account } = this.props;
		if (account.verification.isEmailConfirmed) {
			nextPage('payment');
		}
	}

	render() {
		const { guestEmail, resendEmailVerification } = this.props;
		const { formatMessage } = this.props.intl;

		const toolTipText = formatMessage(messages.refreshToolTip);

		function LinkWithTooltip({ children, href, tooltip }) {
			return (
				<OverlayTrigger
					overlay={<Tooltip className={s.tooltip}>{tooltip}</Tooltip>}
					placement="top"
					delayShow={300}
					delayHide={150}
				>
					{children}
				</OverlayTrigger>
			);
		}

		return (
			<Grid>
				<Row>
					<div className={s.pageContainer}>
						<div className={s.activationStepPanel}>
							<div className={s.panelBody}>
								<h3 className={s.space1}><span><FormattedMessage {...messages.checkEmail} /></span></h3>
								<div className={cx(s.textLead, s.space4)}>
									<div>
										<span><FormattedMessage {...messages.verificationInfo1} /></span>
									</div>
									<div>
										<span><FormattedMessage {...messages.verificationInfo2} /></span>
									</div>
								</div>
								<div className={cx(s.space4, s.spaceTop4)}>
									<div className={cx(s.iconContainer)}>
										<div className={s.space2}>
											<img
												src={envelope}
												className={cx(s.iconEnvelope, s.iconGray, s.iconSize)}
											/>
										</div>
									</div>
								</div>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
										<FormGroup className={s.formGroup}>
											<FormControl value={guestEmail} className={cx(bt.commonControlInput, s.textCenter)} disabled />
										</FormGroup>
									</Col>
								</Row>
								
								<div className={s.refreshSection}>
									<Button className={cx(s.button, bt.btnPrimary, s.btnMarginRight)} onClick={resendEmailVerification}>
										<FormattedMessage {...messages.resendEmail} />
									</Button>
									<LinkWithTooltip
										tooltip={toolTipText}
									>
										<img src={refreshIcon} className={cx(s.refreshImage, 'refreshImageRTL')} onClick={this.handleClick} />
									</LinkWithTooltip>
								</div>
							</div>
						</div>
					</div>
				</Row>
			</Grid>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data,
});

const mapDispatch = {
	loadAccount
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Verification)));