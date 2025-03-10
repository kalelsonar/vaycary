import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Home.css";
import cx from 'classnames';
import { injectIntl } from "react-intl";

//Components
import HomeSlider from "../../components/Home/HomeSlider";
import NewsBox from "../../components/Home/NewsBox";
import Loader from "../../components/Loader";
import HomeKindofTrip from "../../components/Home/HomeKindofTrip";
import PopularLocationGrid from "../../components/Home/PopularLocationGrid";
import Feedback from '../../components/Feedback';

// Graphql
import getRecommendQuery from "./getRecommend.graphql";
import getMostViewedListingQuery from "./getMostViewedListing.graphql";
import getPopularLocationQuery from "./getPopularLocation.graphql";
import getImageBannerQuery from "./getImageBanner.graphql";
import getStaticBlockInfoQuery from "./getStaticBlockInfo.graphql";

// Skeleton Loader
import Shimmer from "../../components/Skeleton/Shimmer";
import HomeSliderSkleton from "../../components/Skeleton/HomeSliderSkleton";
import HomePopularSkeleton from "../../components/Skeleton/HomePopularSkeleton";
import NewsBoxSkeleton from "../../components/Skeleton/NewsBoxSkeleton";
import HomeKindofTripSkeleton from "../../components/Skeleton/HomeKindofTripSkeleton";
import l from '../../components/Skeleton/Skeleton.css'
import LayoutSections from "../../components/Home/LayoutSections";

class Homepage extends React.Component {
  static propTypes = {
    getRecommendData: PropTypes.shape({
      loading: PropTypes.bool,
      getRecommendData: PropTypes.array,
    }),
    getImageBannerData: PropTypes.shape({
      loading: PropTypes.bool,
      getImageBanner: PropTypes.object,
    }),
    getMostViewedListingData: PropTypes.shape({
      loading: PropTypes.bool,
      GetMostViewedListing: PropTypes.array,
    }),
    getPopularLocationData: PropTypes.shape({
      loading: PropTypes.bool,
      GetMostViewedListing: PropTypes.array,
    }),
    getHomeBannerData: PropTypes.shape({
      loading: PropTypes.bool,
      getHomeBanner: PropTypes.object,
    }),
    formatMessage: PropTypes.func,
  };

  static defaultProps = {
    getRecommendData: {
      loading: true,
    },
    getPopularLocationData: {
      loading: true,
    },
    getMostViewedListingData: {
      loading: true,
    },
    getImageBannerData: {
      loading: true,
    },
    homeBannerImages: {
      loading: true,
    },
    getHomeBanner: {
      loading: true,
    },
    getStaticBlockInfoData: {
      loading: true
    }
  };

  render() {
    const { layoutType, wholeData, getRecommendData, getMostViewedListingData } = this.props;
    const { getImageBannerData, getStaticBlockInfoData, getPopularLocationData } = this.props;
    let title, content, getHomeBanner;

    if (wholeData) {
      title = wholeData?.title;
      content = wholeData?.content;
      getHomeBanner = wholeData?.getHomeBanner;
    }

    if (!wholeData) return <Loader type="text" />;

    return (
      <div className={s.root}>
        <div>
          <LayoutSections
            layoutType={layoutType}
            title={title}
            content={content}
            homeBannerImages={getHomeBanner}
            cx={cx}
            s={s}
          />
          {getPopularLocationData && getPopularLocationData.loading ? (<div className={cx(s.popularGridWidth, 'bgBlackTwo')}>
            <div className={s.container}>
              <div className={cx(l.popularSkeletonTwoTitle, 'bgBlackTwo')}>
                <Shimmer />
              </div>
              <div className={s.displayGridTwo}>
                {[1, 2, 3, 4].map((n) => (
                  <HomePopularSkeleton key={n} />
                ))}
              </div>
            </div>
          </div>
          ) : (
            getPopularLocationData && getPopularLocationData.getPopularLocationAdmin && getPopularLocationData.getPopularLocationAdmin.length > 0 &&
            <div className={s.popularGridWidthPadding}>
              <div className={cx(s.popularGridWidth, 'bgBlackTwo')}>
                <div className={s.container}>
                  <PopularLocationGrid data={getPopularLocationData.getPopularLocationAdmin} />
                </div>
              </div>
            </div>
          )}
        </div>

        {getRecommendData && getRecommendData.loading ? (<div className={s.pageContainer}>
          <div className={cx(s.container, 'containerLoaderRTL')}>
            <div className={cx(l.popularSkeletonTitle, 'bgBlackTwo')}>
              <Shimmer />
            </div>
            <div className={s.displayGrid}>
              {[1, 2, 3, 4].map((n) => (
                <HomeSliderSkleton key={n} />
              ))}
            </div>
          </div>
        </div>
        ) : (getRecommendData?.getRecommend?.length > 0 &&
          <div className={s.pageContainer}>
            <div className={s.container}>
              <HomeSlider
                data={getRecommendData && getRecommendData.getRecommend}
                isRecommand={true}
              />
            </div>
          </div>
        )}
        {getMostViewedListingData && getMostViewedListingData.loading ? (<div className={s.pageContainer}>
          <div className={cx(s.container, 'containerLoaderRTL')}>
            <div className={cx(l.popularSkeletonTitle, 'bgBlackTwo')}>
              <Shimmer />
            </div>
            <div className={s.displayGrid}>
              {[1, 2, 3, 4].map((n) => (
                <HomeSliderSkleton key={n} />
              ))}
            </div>
          </div>
        </div>
        ) : (
          <>
            {
              getMostViewedListingData?.GetMostViewedListing?.length > 0 &&
              <div className={s.container}>
                <div className={s.pageContainer}>
                  <HomeSlider
                    data={getMostViewedListingData.GetMostViewedListing}
                    isRecommand={false}
                  />
                </div>
              </div>
            }
          </>
        )}
        {getImageBannerData && getImageBannerData.loading ?
          <div className={s.pageContainer}>
            <div className={s.container}>
              <NewsBoxSkeleton />
            </div>
          </div> :
          <div className={s.pageContainer}>
            <div className={s.container}>
              <NewsBox data={getImageBannerData?.getImageBanner} />
            </div>
          </div>
        }
        <div className={s.pageContainer}>
          <Feedback />
        </div>
        {
          getStaticBlockInfoData && getStaticBlockInfoData.loading ? <div className="hidden-xs">
            <div className={s.container}>
              <HomeKindofTripSkeleton />
            </div>
          </div> :
            <div className="hidden-xs">
              <div className={s.container}>
                <HomeKindofTrip data={getStaticBlockInfoData.getStaticInfo} />{" "}
              </div>
            </div>
        }
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s, l),
  graphql(getRecommendQuery, {
    name: "getRecommendData",
    options: {
      ssr: false,
    },
  }),
  graphql(getPopularLocationQuery, {
    name: "getPopularLocationData",
    options: {
      ssr: false,
    },
  }),
  graphql(getMostViewedListingQuery, {
    name: "getMostViewedListingData",
    options: {
      ssr: false,
    },
  }),
  graphql(getImageBannerQuery, {
    name: "getImageBannerData",
    options: {
      ssr: false,
    },
  }),
  graphql(getStaticBlockInfoQuery, {
    name: "getStaticBlockInfoData",
    options: {
      ssr: false,
    },
  })
)(Homepage);