import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';

//Images
import DoneIcon from '/public/SiteIcons/verifiedIcon.svg';

class AccountItem extends Component {

  static propTypes = {
    itemName: PropTypes.string.isRequired
  };

  render() {
    const { itemName } = this.props;

    return (
      <p className={s.marginIfonText}>
        <span>
          {itemName}
        </span>
        <span className={'svgImg'}>
          <img src={DoneIcon} />
        </span>
      </p>
    );
  }
}

export default withStyles(s)(AccountItem);