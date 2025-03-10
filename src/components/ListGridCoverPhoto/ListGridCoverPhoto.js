import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Assets
import mediumNoImage from '/public/SiteImages/medium_no_image.png';
import largeNoImage from '/public/SiteImages/large_no_image.jpeg';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListGridCoverPhoto.css'
import cx from 'classnames';
import {
	Col
} from 'react-bootstrap';
import { openExactImageLightBox } from '../../actions/ImageLightBox';
class ListGridCoverPhoto extends React.Component {
	static propTypes = {
		coverPhoto: PropTypes.number,
		listPhotos: PropTypes.array,
		className: PropTypes.string,
		bgImage: PropTypes.bool
	};

	static defaultProps = {
		bgImage: false
	}

	constructor(props) {
		super(props);
		this.state = {
			photo: null
		};
	}

	UNSAFE_componentWillMount() {
		const { coverPhoto, listPhotos } = this.props;
		let activePhoto;
		if (listPhotos != undefined && listPhotos.length > 0) {
			activePhoto = listPhotos[0].name;
			if (coverPhoto != undefined && coverPhoto != null) {
				listPhotos.map((item) => {
					if (item.id === coverPhoto) {
						activePhoto = item.name;
					}
				})
			}
			this.setState({ photo: activePhoto });
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { coverPhoto, listPhotos } = nextProps;
		let activePhoto;
		if (listPhotos != undefined && listPhotos.length > 0) {
			activePhoto = listPhotos[0].name;
			if (coverPhoto != undefined && coverPhoto != null) {
				listPhotos.map((item) => {
					if (item.id === coverPhoto) {
						activePhoto = item.name;
					}
				})
			}
			this.setState({ photo: activePhoto });
		}
	}

	render() {
		const { className, photoType, bgImage, listPhotos, openExactImageLightBox } = this.props;
		const { photo } = this.state;
		let img0, img1, img2, img3, img4;
		if (listPhotos != undefined && listPhotos.length > 0) {
			img0 = listPhotos[0] && listPhotos[0].src;
			img1 = listPhotos[1] && listPhotos[1].src;
			img2 = listPhotos[2] && listPhotos[2].src;
			img3 = listPhotos[3] && listPhotos[3].src;
			img4 = listPhotos[4] && listPhotos[4].src;
		}

		let path = '', source;
		if (photo != null) {
			source = photo;
			if (photoType != undefined) {
				path = '/images/upload/x_medium_';
			}
		} else {
			if (photoType != undefined) {
				if (photoType === "xx_large") {
					source = largeNoImage;
				} else if (photoType === "x_medium") {
					source = mediumNoImage;
				}
			} else {
				source = mediumNoImage
			}
		}

		if (bgImage) {

			return (
				<div>
					{
						listPhotos && listPhotos.length == 1 && <div className={cx(s.leftBanner, 'rightTopBannerRTL')}>
							<a
								onClick={() => openExactImageLightBox(0)}>
								<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img0})` }}>
									{this.props.children}
								</div>
							</a>
						</div>
					}
					{
						listPhotos && listPhotos.length == 2 && <div className={cx(s.leftBanner, 'rightTopBannerRTL')}>
							<div className={s.gridTwo}>
								<a onClick={() => openExactImageLightBox(0)} >
									<div className={cx(className, s.bgbanner, s.leftBorderRadius)} style={{ backgroundImage: `url(${img0})` }}>
										{this.props.children}
									</div>
								</a>
								<a onClick={() => openExactImageLightBox(1)}>
									<div className={cx(className, s.bgbanner, s.rightBorderRadius)} style={{ backgroundImage: `url(${img1})` }}>
										{this.props.children}
									</div>
								</a>
							</div>
						</div>
					}

					{
						listPhotos && listPhotos.length == 3 && <div className={cx(s.leftBanner, 'rightTopBannerRTL')}>
							<div className={s.gridTwo}>
								<a
									onClick={() => openExactImageLightBox(0)} >
									<div className={cx(className, s.bgbanner, s.leftBorderRadius)} style={{ backgroundImage: `url(${img0})` }}>
										{this.props.children}
									</div>
								</a>
								<div>
									<a
										onClick={() => openExactImageLightBox(1)} >
										<div className={cx(className, s.bgbanner, s.bgBannerTwo, s.bannerBottom, s.rightBorderTopRadius)} style={{ backgroundImage: `url(${img1})` }}>
											{this.props.children}
										</div>
									</a>
									<a
										onClick={() => openExactImageLightBox(2)} >
										<div className={cx(className, s.bgbanner, s.bgBannerTwo, s.rightBorderTopRadius)} style={{ backgroundImage: `url(${img2})` }}>
											{this.props.children}
										</div>
									</a>
								</div>
							</div>
						</div>
					}

					{
						listPhotos && listPhotos.length == 4 && <div className={cx(s.leftBanner, 'rightTopBannerRTL')}>
							<div className={s.gridTwo}>
								<a
									onClick={() => openExactImageLightBox(0)}>
									<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img0})` }}>
										{this.props.children}
									</div>
								</a>
								<div>
									<a
										onClick={() => openExactImageLightBox(1)}>
										<div className={cx(className, s.bgbanner, s.bgBannerTwo, s.bannerBottom)} style={{ backgroundImage: `url(${img1})` }}>
											{this.props.children}
										</div>
									</a>
									<div className={s.gridTwo}>
										<a
											onClick={() => openExactImageLightBox(2)}>
											<div className={cx(className, s.bgbanner, s.bgBannerTwo)} style={{ backgroundImage: `url(${img2})` }}>
												{this.props.children}
											</div>
										</a>
										<a
											onClick={() => openExactImageLightBox(3)}>
											<div className={cx(className, s.bgbanner, s.bgBannerTwo)} style={{ backgroundImage: `url(${img3})` }}>
												{this.props.children}
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					}

					{
						listPhotos && listPhotos.length >= 5 && <div className={cx(s.leftBanner, 'rightTopBannerRTL')}>
							<div className={s.gridTwo}>
								<a
									onClick={() => openExactImageLightBox(0)} >
									<div className={cx(className, s.bgbanner)} style={{ backgroundImage: `url(${img0})` }}>
										{this.props.children}
									</div>
								</a>

								<div>
									<div className={s.gridTwo}>
										<a
											onClick={() => openExactImageLightBox(1)} >
											<div className={cx(className, s.bgbanner, s.bgBannerTwo, s.bannerBottom)} style={{ backgroundImage: `url(${img1})` }}>
												{this.props.children}
											</div>
										</a>
										<a
											onClick={() => openExactImageLightBox(2)} >
											<div className={cx(className, s.bgbanner, s.bgBannerTwo, s.bannerBottom)} style={{ backgroundImage: `url(${img2})` }}>
												{this.props.children}
											</div>
										</a>
									</div>
									<div className={s.gridTwo}>
										<a
											onClick={() => openExactImageLightBox(3)} >
											<div className={cx(className, s.bgbanner, s.bgBannerTwo)} style={{ backgroundImage: `url(${img3})` }}>
												{this.props.children}
											</div>
										</a>
										<a
											onClick={() => openExactImageLightBox(4)} >
											<div className={cx(className, s.bgbanner, s.bgBannerTwo)} style={{ backgroundImage: `url(${img4})` }}>
												{this.props.children}
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			);
		} else {
			return (
				<img src={path + source} className={className} alt={'ListingCoverPhoto'} />
			);
		}
	}
}

const mapState = (state) => ({
	imageLightBox: state.viewListing.imageLightBox
});

const mapDispatch = {
	openExactImageLightBox
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListGridCoverPhoto));

