// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// GraphQL
import { graphql, gql, compose } from 'react-apollo';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

// Locale
import messages from '../../locale/messages';

import { openAddWishListGroupModal } from '../../actions/WishList/modalActions';

// GraphQL
import getAllWishListGroupQuery from './getAllWishListGroup.graphql';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Grid,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import s from './WishLists.css';
import bt from '../../components/commonStyle.css';

// Components
import Loader from '../../components/Loader';
import WishListGroupItem from './WishListGroupItem';
import WishListGroupModal from './WishListGroupModal';
import Link from '../Link';

//Image
import noListImage from '/public/SiteImages/noWishList.svg';

class WishListComponent extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllWishListGroup: PropTypes.any
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    }

    render() {
        const { profileId } = this.props;
        const { data: { loading, getAllWishListGroup } } = this.props;
        const { formatMessage } = this.props.intl;
        const { openAddWishListGroupModal } = this.props;
        return (
            <div>
                <WishListGroupModal actionType={'add'} />
                <Grid fluid>
                    <div className={s.flexWish}>
                        <div>
                            <h2 className={s.landingTitle}><FormattedMessage {...messages.wishLists} /></h2>
                            {
                                getAllWishListGroup && getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length > 0 && getAllWishListGroup.count > 0 && <span className={s.countingCss}>({getAllWishListGroup.count}) </span>
                            }
                        </div>
                        <div>
                            <Button className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.pullRight, s.noMargin, s.smPosition, 'shareIconRtl')}
                                onClick={() => openAddWishListGroupModal({}, 'AddWishListGroupForm')}>
                                <FormattedMessage {...messages.createWishList} />
                            </Button>
                        </div>
                    </div>
                    {
                        loading && <Col xs={12} sm={12} md={12} lg={12} >
                            <Loader type="text" />
                        </Col>
                    }
                    {
                        !loading && getAllWishListGroup && getAllWishListGroup.status == 'success' && <div className={s.smTop4}>

                            {
                                getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length > 0 && getAllWishListGroup.count > 0 && <div className={s.wishGrid}>
                                    {
                                        getAllWishListGroup.wishListGroupData.map((item, index) => {
                                            return (
                                                <div>
                                                    <WishListGroupItem data={item} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {
                                getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length == 0 && getAllWishListGroup.count == 0 && <div className={s.textCenter}>
                                    <img src={noListImage} className={cx(s.imgWidth, "wishlistImgBox")} />
                                    <div className={cx(s.noListSubHeading, 'textWhite')}>
                                        <FormattedMessage {...messages.noWishListText} />
                                    </div>
                                    {/* <Link to={'/become-a-host?mode=new'} className={cx(bt.btnPrimary, s.addNewBtn)}>
                                    <FormattedMessage {...messages.createWishList} />
                                </Link> */}
                                </div>
                            }
                        </div>
                    }
                </Grid>
            </div >
        )
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    openAddWishListGroupModal
};

export default compose(
    injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
    graphql(getAllWishListGroupQuery,
        {
            options: (props) => ({
                variables: {
                    profileId: props.profileId
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(WishListComponent);
