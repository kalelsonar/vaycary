import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListGroupItem.css';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

// Component
import StarRating from '../../StarRating';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ListCoverPhoto from '../../ListCoverPhoto';

// Locale
import messages from '../../../locale/messages';

import defaultImg from '/public/SiteIcons/defaultHomeIcon.svg'

class WishListGroupItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    data: PropTypes.object
  };

  render() {
    const { data, data: { id, name, userId, isPublic, updatedAt, createdAt, wishListCount, wishListCover } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Link className={s.linkContainer} to={"/wishlists/" + id}>
          <div className={cx(s.imgContainer)}>
            <div className={cx(s.parent, { [s.defaultBg]: (!wishListCover) }, 'bgBlackTwo')}>
              <div className={cx(s.children)}>
                <div className={cx(s.content)} >
                  {
                    wishListCover && wishListCover.listData && wishListCover.listData.listPhotos && <div>
                      <ListCoverPhoto
                        className={cx(s.imageContent)}
                        coverPhoto={wishListCover.listData.coverPhoto != null ? wishListCover.listData.coverPhoto : wishListCover.listData.listPhotos[0].id}
                        listPhotos={wishListCover.listData.listPhotos}
                        photoType={"x_medium"}
                        bgImage
                      />
                    </div>
                  }
                  {
                    !wishListCover && <div className={s.defaultImgSection}>
                      <img src={defaultImg} className={s.defaultWishlistImg} />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className={s.infoContainer}>
          <span className={cx(s.infoTitle, s.textEllipsis)}>{name}</span>
          {
            wishListCount > 0 && <span className={s.infoText}>
              ({wishListCount})
            </span>
          }
        </div>
      </div>
    );

  }
}

export default injectIntl(withStyles(s)(WishListGroupItem));
