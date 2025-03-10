import React from 'react';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Layout5.css';
import cx from 'classnames';
import { connect } from 'react-redux';

// Components
import SearchForm from '../SearchForm/SearchForm';

class Layout5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideMenu: '', //hideMenu
    };
    this.scrollTop = this.scrollTop.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleDisableSearchPages = this.handleDisableSearchPages.bind(this);
  }

  scrollTop() {
    window.scrollTo({
      top: screen.height,
      behavior: 'smooth',
    });
  }

  componentDidMount() {
    this.setState({
      load: true
    });
    this.handleDisableSearchPages();
    document.addEventListener('scroll', this.handleScroll);
  }
  handleDisableSearchPages() {

  };
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    let top = document.documentElement.scrollTop || document.body.scrollTop,
      isWeb = (document.documentElement.clientWidth || document.body.clientWidth) >= 1200 ? true : false;
    let hideMenu = '';
    if (isWeb && top >= 50) {
      hideMenu = 'hideMenu';
    } else {
      hideMenu = '';
    }

    this.setState({
      hideMenu
    });
  }

  render() {
    const { title, content, homeBannerImages } = this.props;
    const { hideMenu } = this.state;

    let path = '/images/home/', homeBannerFirst, layout5Css = 'layout5Css'

    if (homeBannerImages && homeBannerImages.length > 0) homeBannerFirst = path + homeBannerImages[0].name;

    return (
      <div>
        <div className={cx(s.bannerLayoutContainer, 'layoutFive')}>
          <div className={cx(s.bannerBackgroundImage)}
            style={{ backgroundImage: `url(${homeBannerFirst})` }} />
          <div className={s.searchFormContainer}>
          <div className={cx(s.marginTop, hideMenu)}>
              <SearchForm
                layout5Css={layout5Css}
              />
            </div>
            <div className={s.positionRelative}>
              <h1 className={cx(s.noMargin, s.bannerCaptionText)}>
                <span>{title}</span>
                {' '} {content}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
)(Layout5);
