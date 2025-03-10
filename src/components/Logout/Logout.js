import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, injectIntl } from 'react-intl';

// import s from './NavigationAfterLogin.css';
import { Button } from 'react-bootstrap';

// Locale
import messages from '../../locale/messages';
class Logout extends React.Component {

  static propTypes = {};

  render() {
    const { className, url } = this.props;
    return (
      <li className={className}>
        <form action={url ? url : "/logout"} method="post">
          <Button type="submit" bsStyle="link">
            <FormattedMessage {...messages.logout} />
          </Button>
        </form>
      </li>
    );
  }

}

export default injectIntl(Logout);
