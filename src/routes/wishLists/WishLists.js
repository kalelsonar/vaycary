import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishLists.css';
import cx from 'classnames';

// Components
import WishLists from '../../components/WishLists';
import NotFound from '../../routes/notFound/NotFound';
import EditWishListGroup from '../../components/WishLists/EditWishListGroup';

class WishListsContainer extends React.Component {

  static propTypes = {
    profileId: PropTypes.number,
    wishListId: PropTypes.number
  };

  render() {
    const { profileId, wishListId } = this.props;
    
    return (
        <div className={s.container}>
            {
              wishListId && profileId && <div className={cx(s.mainSection, 'bgBlack')}>
              <EditWishListGroup profileId={profileId} wishListId={wishListId} />
              </div>
            }
            {
              !wishListId && profileId && <div className={cx(s.mainSection, 'bgBlack')}>
                <WishLists profileId={profileId} />
              </div>
            }
            {
              !wishListId && !profileId && <div className={cx(s.mainSection, 'bgBlack')}>
                <NotFound />
              </div>   
            }
        </div>
    );
  }
}

export default withStyles(s)(WishListsContainer);
