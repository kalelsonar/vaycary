import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListNavigation.css';

// Locale
import TabBarStep from '../../ListPlaceStep1/TabBarStep';

class ListNavigation extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
  };

  render() {
    const { formPage, step } = this.props;
    return (
      <div>
        <TabBarStep step={step} formPage={formPage} />
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ListNavigation));
