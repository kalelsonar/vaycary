import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Listings.css';

// Query
import listingsQuery from './listingsQuery.graphql';

// Component
import ListingManagement from '../../../components/siteadmin/ListingManagement';
import Loader from '../../../components/Loader';

class Listings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    getAllListings: PropTypes.shape({
      loading: PropTypes.bool,
      getAllListings: PropTypes.array,
    })
  };

  static defaultProps = {
    getAllListings: {
      loading: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      load: false
    };
  }

  componentDidMount() {
    this.setState({
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
        })
      }, 1000);
    }
  }

  render() {
    const { getAllListings: { loading, getAllListings } } = this.props;
    const { load } = this.state;
    if (!load || loading) {
      return <Loader type={"text"} />;
    } else {
      return <ListingManagement  />;
    }
  }

}

export default compose(
  withStyles(s),
  injectIntl,
  graphql(listingsQuery, {
    name: 'getAllListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only'
    }
  }),
)(Listings);
