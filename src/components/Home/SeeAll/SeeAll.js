import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SeeAll.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import history from '../../../core/history';

//Image
import seeallIcon from '/public/SiteIcons/seeallIcon.svg';

class SeeAll extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/s');
  }

  render() {
    return (
      <div className={cx(s.seeAllContainer, 'seeALlAr')}>
        <Button
          bsStyle="link"
          className={cx(s.seeAllBtn, 'seeAllBtnAR')}
          onClick={() => this.handleClick()}
        >
          <FormattedMessage {...messages.seeAll} />
          <img src={seeallIcon} className={cx(s.seeAllBtnIcon, 'seeAllBtnIcon')} />
        </Button>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(SeeAll));