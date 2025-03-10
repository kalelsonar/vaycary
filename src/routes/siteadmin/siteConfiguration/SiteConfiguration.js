import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SiteConfiguration.css';

// Component
import SiteConfigForm from '../../../components/siteadmin/SiteConfigForm/SiteConfigForm';
import Loader from '../../../components/Loader/Loader';

// Query
import siteSettingsQuery from '../siteSettings/siteSettingsQuery.graphql';

class SiteConfiguration extends React.Component {

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


  render () {
    const { data: { loading, siteSettings } } = this.props;
    let settingsCollection = {};
    if(loading){
      return <Loader type={"text"} />;
    } else {
      siteSettings.map((item, key) => {
        settingsCollection[item.name] = item.value;
      });
      return <SiteConfigForm initialValues={settingsCollection} />
    }
  } 

}

export default compose(
    withStyles(s),
    graphql(siteSettingsQuery,
      {
        options: (props) => ({
          variables: {
            type: 'config_settings',
          },
          fetchPolicy: 'network-only'
        })
      }
    ),
)(SiteConfiguration);
