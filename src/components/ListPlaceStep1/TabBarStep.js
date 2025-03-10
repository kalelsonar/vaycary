// General
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Translation
import { injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tab } from "react-tabs-scrollable";
import s from './TabBarStep.css';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history';

//image 
import nextIcon from '/public/SiteIcons/popular-right.png';
import prevIcon from '/public/SiteIcons/popular-left.png';

import { activeTabs } from '../../helpers/listingTabs';
import setTabActiveIndex from '../../actions/setTabActiveIndex';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img src={nextIcon} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img src={prevIcon} />
    </div>
  );
}
class TabBarStep extends Component {

  static propTypes = {
    listingSteps: PropTypes.shape({
      step1: PropTypes.string,
      step2: PropTypes.string,
      step3: PropTypes.string
    }),
  };

  static defaultProps = {
    arrow: true,
    listingSteps: {
      step1: 'inactive',
      step2: 'inactive',
      step3: 'inactive'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      load: false,
      isClient: false,
      isBeginning: true,
      isEnd: false,
      activeTab: 1
    };
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      isClient: true,
      load: true
    });
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;
    if (locale !== prevLocale) {
      this.setState({
        load: false
      });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => {
        this.setState({
          load: true
        });
      }, 3000);
    }
  }


  goNext() {
    if (!this.swiper) return;
    this.swiper.slideNext();
    this.setState({
      isEnd: this.swiper.isEnd,
      isBeginning: this.swiper.isBeginning,
    });
  }

  goPrev() {
    if (!this.swiper) return;
    this.swiper.slidePrev();
    this.setState({
      isBeginning: this.swiper.isBeginning,
      isEnd: this.swiper.isEnd,
    });
  }

  nextPage(formPage) {
    history.push(formPage);
  }

  onTabClick(e, index) {
    const { setTabActiveIndex } = this.props;
    setTabActiveIndex(index);
  };

  render() {
    const { formPage, step, arrow, listingSteps, activeIndex } = this.props;
    const { formatMessage } = this.props.intl;
    const { load, isClient } = this.state;

    let pathname = formPage;
    let tabBarData = [];
    let arrow_display = this.props.arrow;
    arrow_display = false;
    let th = this;

    tabBarData = activeTabs(step, listingSteps);

    return (
      <div>
        {tabBarData && tabBarData.length > 0 &&
          <div>
            {load && isClient &&
              <Tabs
                activeTab={activeIndex || 0}
                onTabClick={this.onTabClick}
                hideNavBtns={true}
                hideNavBtnsOnMobile={true}
                tabsContainerClassName="becomeHostInnerBox becomeHostInnerBoxRtl"
                tabsUpperContainerClassName="becomeHostTabsContainer"
                isRTL={true}>
                {tabBarData.map((item, index) => {
                  let isActive = item?.activePaths ? item?.activePaths?.includes(pathname) : (pathname === item.pathname);
                  return (
                    <Tab key={item.pathname} tabAs="div">
                      <a onClick={() => this.nextPage(item.pathname)}>
                        <div
                          className={cx(s.progressSection, s.progressStyle, s.linkReset,
                            { [s.active]: isActive }, { ['darkActive']: isActive }, 'linkResetDarkHover')}
                        >
                          <span className={s.iconCss}>
                            <img src={item.icon} />
                          </span>
                          <span className={cx(s.progressStep, s.textTrunck, 'textWhite', 'progressStepRTL')}>{formatMessage(item.text)} </span>
                        </div>
                      </a>
                    </Tab>
                  )
                })
                }
              </Tabs>
            }
          </div>
        }
      </div>
    );
  }

}

const mapState = (state) => ({
  listingSteps: state.location.listingSteps,
  existingList: state.location.isExistingList,
  activeIndex: state?.calendar?.activeIndex
});

const mapDispatch = {
  setTabActiveIndex
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(TabBarStep)));

