import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostNew.css';
import cx from 'classnames';
import { graphql, gql, compose } from 'react-apollo';

// Components
import WhyHostBanner from './WhyHostBanner';
import HostingBlock from '../../components/WhyHost/HostingBlock/HostingBlock';
import CoverSection from '../../components/WhyHost/CoverSection/CoverSection';
import ImageBanner from '../../components/WhyHost/ImageBanner/ImageBanner';
import PaymentContent from '../../components/WhyHost/PaymentContent/PaymentContent';
import QuoteSection from '../../components/WhyHost/QuoteSection/QuoteSection';
import FaqSection from '../../components/WhyHost/FaqSection/FaqSection';
import getWhyHostPageSettings from './getWhyHostPageSettings.graphql';
import Loader from '../../components/Loader'
import getWhyHostReview from './getWhyHostReview.graphql';


// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()


let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { data: { loading, getWhyHostPage } } = this.props;
    const { getWhyHostReview: { getHomeWhyHostReview, loading: reviewLoading } } = this.props;
    let settingsCollection = {}

    if (loading && reviewLoading) {

      return <Loader type={"text"} loaderClass={'textLoader'} />;

    } else {

      getWhyHostPage && getWhyHostPage.map((item, key) => {
        settingsCollection[item.name] = item.value
      });

      return (
        <div className={cx('whyhost-content', 'commonWordBreak')}>
          <WhyHostBanner data={settingsCollection} />
          <Element name="test1" className="element">
            <HostingBlock data={settingsCollection} />
            <CoverSection data={settingsCollection} />
            <ImageBanner data={settingsCollection} />
            {!reviewLoading && getHomeWhyHostReview && getHomeWhyHostReview.results && getHomeWhyHostReview.results.length > 0 && <PaymentContent data={settingsCollection} reviewData={getHomeWhyHostReview.results} />}
            <QuoteSection data={settingsCollection} />
            <FaqSection data={settingsCollection} />
          </Element>
        </div>
      );
    }
  }

}


export default compose(
  withStyles(s),
  graphql(getWhyHostPageSettings, {
    options: {
      fetchPolicy: 'network-only',
      ssr: false
    }
  }),
  graphql(getWhyHostReview, {
    name: "getWhyHostReview",
    options: {
      fetchPolicy: 'network-only',
      ssr: false
    }
  })
)(EditProfile);
