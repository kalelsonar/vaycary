// Plugin.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Component.
import HomeSlider from '../../../components/Home/HomeSlider';

// Action and Helper.
import { setStickyBottom } from '../../../actions/Sticky/StrickyActions';

// Style.
import s from './SimilarListings.css';

class SimilarListings extends Component {

    static propTypes = {
        data: PropTypes.any
    };

    static defaultProps = {
        data: null
    };

    constructor(props) {
        super(props);
        this.state = {
            smallDevice: false
        };
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        const { setStickyBottom } = this.props;
        const { smallDevice } = this.state;
        let sticky = document.querySelector('[data-sticky-bottom]'), stickyBottom = 1615; //2474;
        stickyBottom = (sticky.getBoundingClientRect().top);
        let bottomElementHeight = 600;
        let windowHeight = document.documentElement.getBoundingClientRect().height || 3000;
        let isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        }
        if (!smallDevice) {
            document.addEventListener('scroll', () => {
                windowHeight = document.documentElement.getBoundingClientRect().height;
                if ((windowHeight - bottomElementHeight) > stickyBottom) {
                    stickyBottom = windowHeight - bottomElementHeight;
                    setStickyBottom(stickyBottom + 20);
                }
            });
        }
        else {
            document.addEventListener('scroll', () => {
                windowHeight = document.documentElement.getBoundingClientRect().height;

                if ((windowHeight - bottomElementHeight) > stickyBottom) {
                    stickyBottom = windowHeight - bottomElementHeight;
                    setMobileStickyBottom(stickyBottom + 20);
                }
            });
        }
        stickyBottom = (sticky.getBoundingClientRect().top > stickyBottom) ? sticky.getBoundingClientRect().top : stickyBottom;
        setStickyBottom(stickyBottom);
    }

    componentWillUnmount() {
        let isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            window.removeEventListener('resize', this.handleResize);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { setStickyBottom } = this.props;
        let sticky = document.querySelector('[data-sticky-bottom]'), stickyBottom = 1615; //2474;
        stickyBottom = (sticky.getBoundingClientRect().top);
        setStickyBottom(stickyBottom);
    }

    handleResize(e) {
        let isBrowser = typeof window !== 'undefined';
        let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : false;
        this.setState({ smallDevice });
    }

    render() {
        const { data, hideHeading, viewListingSimilarItem } = this.props;
        return (
            <div data-sticky-bottom>
                <HomeSlider data={data} hideHeading={hideHeading} isViewListing={true} viewListingSimilarItem={viewListingSimilarItem} />
            </div>
        );
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated
});

const mapDispatch = {
    setStickyBottom
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch)
)(SimilarListings);