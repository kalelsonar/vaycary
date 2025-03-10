import React from "react";
import { connect } from "react-redux";

import LazyLoadImage from "../../../LazyLoadImage/LazyLoadImage";
import ListingSwiperPhotos from "../../ListingSwiperPhotos/ListingSwiperPhotos";

import { isRTL } from "../../../../helpers/formatLocale";
import { formatURL } from "../../../../helpers/formatURL";

import mediumNoImage from '/public/SiteImages/medium_no_image.png';
import largeNoImage from '/public/SiteImages/large_no_image.jpeg';

class CommonListingPhotos extends React.Component {

    constructor() {
        super();
        this.state = {
            photo: null
        }
    };

    UNSAFE_componentWillMount() {
        const { coverPhoto, listPhotos } = this.props;
        let activePhoto;
        if (listPhotos && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto) {
                listPhotos.find((item) => {
                    if (item.id === coverPhoto) activePhoto = item.name;
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { coverPhoto, listPhotos } = nextProps;
        let activePhoto;
        if (listPhotos?.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto) {
                listPhotos.find((item) => {
                    if (item.id === coverPhoto) activePhoto = item.name;
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    render() {

        const { className, placeholderClassName, photoType, lazyLoad } = this.props;
        const { bgImage, isListingSwiper, locale, coverPhoto, listPhotos, title, id, updatedLocale } = this.props;
        const { photo } = this.state;
        let path = '', source;

        if (photo) {
            source = photo;
            if (photoType) path = '/images/upload/x_medium_';
        } else {
            if (photoType) {
                if (photoType === "x_medium") source = largeNoImage;
                else if (photoType === "x_small") source = mediumNoImage;
            } else source = mediumNoImage
        }

        let activeItem = 0, photoTemp, photosList = listPhotos.slice();
        if (listPhotos.length > 1) {
            listPhotos.map((x, y) => { if (x.id === coverPhoto) activeItem = y });
            if (activeItem > 0) {
                photoTemp = photosList[0];
                photosList[0] = photosList[activeItem];
                photosList[activeItem] = photoTemp;
            }
        }

        if (isListingSwiper) {
            return (
                <ListingSwiperPhotos
                    id={id}
                    coverPhoto={coverPhoto}
                    listPhotos={photosList}
                    title={title}
                    rtl={isRTL(locale)}
                    updatedLocale={updatedLocale}
                />
            )
        } else if (lazyLoad && bgImage) {
            return (
                <a href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
                    <LazyLoadImage
                        src={`${path}${source}`}
                        placeholderSrc={'/images/upload/placeholder_' + source}
                        className={className}
                        placeholderClassName={placeholderClassName}
                    />
                </a>
            );
        } else if (bgImage) {
            return (
                <a href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
                    <div className={className} style={{ backgroundImage: `url(${path}${source})` }}>
                        {this.props.children}
                    </div>
                </a>
            );
        } else {
            return (
                <a href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
                    <div className={className} style={{ backgroundImage: `url(${path + source})` }} />
                </a>
            )
        }
    }
};
const mapState = (state) => ({
    locale: state.intl.locale,
    updatedLocale: state?.intl?.newLocale,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(CommonListingPhotos);