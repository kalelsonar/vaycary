import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql, gql } from 'react-apollo';
import { flowRight as compose } from 'lodash';


import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListIcon.css';

import { connect } from 'react-redux';

// Helper
import { getwishListStatus } from '../../helpers/wishListStatus';
import cx from 'classnames';

//Images
import heartImage from '/public/SiteIcons/heartrIconOff.svg';
import heartIconFill from '/public/SiteIcons/heartIconOn.svg'

import heartImageView from '/public/SiteIcons/heart.png';
import heartIconFillView from '/public/SiteIcons/heartFill.svg'

// Redux Actions
import { openWishListModal } from '../../actions/WishList/modalActions';
import { openLoginModal } from '../../actions/modalActions';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class WishListIcon extends Component {

    static propTypes = {
        isChecked: PropTypes.bool,
        formatMessage: PropTypes.any,
        listId: PropTypes.number,
        type: PropTypes.string
    };

    static defaultProps = {
        isChecked: false,
        type: 'icon'
    };

    constructor(props) {
        super(props);
        this.state = {
            iconSelected: false,
            clicked: false
        };
        this.iconAction = this.iconAction.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { isChecked, listId } = this.props;
        this.setState({ iconSelected: isChecked });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        const { wishListModalStatus, wishListRoomId, isChecked, listId } = nextProps;
        const { iconSelected, clicked } = this.state;
        let currentwishListStatus = false;
        // Trigger request on Modal action done/close
        if (wishListRoomId && wishListModalStatus === false) {
            // Get Current List's Wish List Status( True/False )
            currentwishListStatus = await getwishListStatus(listId);

            this.setState({
                iconSelected: currentwishListStatus
            });
        } else {
            // On the flow process
            if (!clicked && !wishListModalStatus) {
                this.setState({ iconSelected: isChecked });
            }
        }
    }

    iconAction() {
        const { isChecked, listId, isAuthenticated } = this.props;
        const { openLoginModal, openWishListModal, isViewListing } = this.props;
        if (isAuthenticated) {
            this.setState({ clicked: true });
            openWishListModal(listId, isViewListing);
        } else {
            openLoginModal();
        }
    }

    render() {
        const { isChecked, listId, type, heartIcon, showOnlyImage, key } = this.props;
        const { iconSelected } = this.state;

        return (
            <div key={key}>
                {
                    type == 'icon' && <div className={cx(s.iconContainer, heartIcon, 'heartIconRtl')} onClick={this.iconAction}>
                        {
                            iconSelected && <img src={heartIconFill} className={cx(s.wishListIcon)} alt={'Wishlist'} />
                        }
                        {
                            !iconSelected && <img src={heartImage} className={cx(s.wishListIcon)} alt={'Wishlist'} />
                        }
                    </div>
                }
                {
                    type == 'button' && <div className={cx(s.buttonContainer, 'bgBlack', s.iconAlignCenter)} onClick={this.iconAction}>
                        {
                            iconSelected && <img src={heartIconFillView} className={cx(s.wishListIcon, s.vtrMiddle)} alt={'Wishlist'} />
                        }
                        {
                            !iconSelected && <img src={heartImageView} className={cx(s.wishListIcon, s.vtrMiddle)} alt={'Wishlist'} />
                        }
                        <span className={cx(s.buttonText, s.vtrBottom, 'textWhite')}>
                            {
                                iconSelected ? <FormattedMessage {...messages.saved} /> : <FormattedMessage {...messages.wishListSave} />
                            }
                        </span>
                    </div>
                }
            </div>
        );
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated,
    wishListModalStatus: state.modalStatus.wishListModalOpen,
    wishListRoomId: state.modalStatus.listId
});

const mapDispatch = {
    openLoginModal,
    openWishListModal
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(gql`
        query UserListing($listId: String!, $preview: Boolean) {
          UserListing (listId: $listId, preview: $preview) {
            wishListStatus
          }
        }     
    `)
)(WishListIcon);

