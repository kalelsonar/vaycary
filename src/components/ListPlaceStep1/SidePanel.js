// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import Logo from '../Logo';

//Image
import commonBg from '/public/SiteImages/becomeHostBg.svg';
import footerImage from '/public/SiteImages/vectorFooterImage.svg';
import darkImage from '/public/SiteImages/stepDarkBg.svg';

// Style
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';


class SidePanel extends Component {

	static propTypes = {
		title: PropTypes.any,
		landingContent: PropTypes.any,
	};

	render() {
		const { title, landingContent } = this.props;
		return (
			<div className={s.listBannerImageSection}>
				<div className={cx(s.listBannerImageBg, 'listBannerImageBgDark')} style={{ backgroundImage: `url(${commonBg})` }} />
				<div className={s.commonListStepSection}>
					<Logo link={"/"} className={cx(s.brandImg)} />
					<h3 className={s.sidePanelTitle}>{title}</h3>
					<p className={s.stepOneCommon}>{landingContent}</p>
				</div>
				<img src={footerImage} className={cx(s.footerVector, 'lightModeImg')} />
				<img src={darkImage} className={cx(s.footerVector, 'darkModeImg')} />
			</div>
		)
	}
}


export default withStyles(s, bt)(SidePanel);