import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './BecomeHost.css';

import ListPlaceStep1 from '../../components/ListPlaceStep1';
class BecomeHost extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    mode: PropTypes.string,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string
  };

  render() {
    const { formPage, formBaseURI, mode, listId, baseCurrency, step } = this.props;
    return (
      <div className={'existingPage'}>
        <ListPlaceStep1
          listId={listId}
          formPage={formPage}
          formBaseURI={formBaseURI}
          mode={mode}
          baseCurrency={baseCurrency}
          step={step}
        />
      </div>
    );
  }
}


export default injectIntl(withStyles(s)(BecomeHost));