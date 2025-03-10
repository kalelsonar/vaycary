import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SiteSettings.css';

// Component
import SiteSettingsForm from '../../../components/siteadmin/SiteSettingsForm';
import Loader from '../../../components/Loader';

// Query
import siteSettingsQuery from './siteSettingsQuery.graphql';

class SiteSettings extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      siteSettings: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };


  render() {
    const { data: { loading, siteSettings } } = this.props;
    let settingsCollection = {};
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      siteSettings.map((item, key) => {
        settingsCollection[item.name] = item.value;
      });
      return <SiteSettingsForm initialValues={settingsCollection} />
    }
  }

}

export default compose(
  withStyles(s),
  graphql(siteSettingsQuery,
    {
      options: (props) => ({
        variables: {
          type: 'site_settings',
        },
        fetchPolicy: 'network-only'
      })
    }
  ),
)(SiteSettings);
