// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, reset, formValueSelector, change } from 'redux-form';

// Locale
import messages from '../../../locale/messages';
import s from './CreateWishList.css';
import bt from '../../../components/commonStyle.css';

// Redux
import { connect } from 'react-redux';

import { graphql, gql, compose } from 'react-apollo';

import getAllWishListGroupQuery from '../getAllWishListGroup.graphql';
import validate from './validate';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
    Button,
    FormGroup,
    Col,
    FormControl
} from 'react-bootstrap';

//Images
import createIcon from '/public/SiteIcons/createWishListIcon.svg';

class CreateWishList extends Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        listId: PropTypes.number,
        getListingData: PropTypes.shape({
            loading: PropTypes.bool,
            UserListing: PropTypes.object
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            disabled: true,
        };
        this.toggle = this.toggle.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggle() {
        this.setState({
            shown: !this.state.shown
        });
    }

    onChange(e) {
        if (e.target.value && e.target.value.trim() != '') {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={cx(s.formGroup, 'row')}>
                <Col xs={12} sm={12} md={12} lg={12} className={'rtlWishListInput'}>
                    <FormControl {...input} placeholder={placeholder} type={type} className={className} />
                    {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                </Col>
            </FormGroup>
        );
    }

    async submitForm(values, dispatch) {
        const { mutate, profileId, wishListGroups, change, createWishListGroup, createWishList, listId } = this.props;
        if (values.name.trim() != '') {
            let updatedWishLists = wishListGroups;
            const { data } = await createWishListGroup({
                variables: values,
                /*refetchQueries: [{
                    query: getAllWishListGroupQuery,
                    variables: {
                        profileId
                    }
                }]*/
            });

            if (data && data.CreateWishListGroup) {
                if (data.CreateWishListGroup.status === 'success') {
                    this.setState({
                        shown: !this.state.shown
                    });
                    const { data: { CreateWishList } } = await createWishList({
                        variables: {
                            listId,
                            wishListGroupsId: data.CreateWishListGroup.id,
                            eventKey: true
                        },
                        refetchQueries: [{
                            query: getAllWishListGroupQuery,
                            variables: {
                                profileId
                            }
                        }]
                    });
                    await updatedWishLists.push(data.CreateWishListGroup.id);
                    await change('WishListModalForm', 'wishListGroups', updatedWishLists);
                    dispatch(reset('CreateWishList'));
                }
            }
        }
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, listId } = this.props;
        const { formatMessage } = this.props.intl;
        const { disabled, shown } = this.state;

        return (
            <div className={cx('inputFocusColor', s.paddingBottom)}>
                <form onSubmit={handleSubmit(this.submitForm)} autoComplete="off">
                    {
                        shown && <div className={s.btnSection}><a className={cx(s.createLinkCss, 'createLinkCssRTL')} onClick={this.toggle}>
                            <img src={createIcon} />  <FormattedMessage {...messages.createWishList} />
                        </a></div>
                    }
                    {
                        !shown && <div className={cx(s.textAignRight, 'textAlignLeftRtl')}>
                            <Field
                                name="name"
                                type="text"
                                component={this.renderFormControl}
                                placeholder={formatMessage(messages.name)}
                                className={cx(bt.commonControlInput, s.space1)}
                                onChange={this.onChange}
                            />
                            <FormGroup className={cx(s.spaceTop3, s.formGroup)}>
                                <Button className={cx(s.btnLink, 'arCreateWish')}
                                    disabled={submitting}
                                    onClick={this.toggle}>
                                    {formatMessage(messages.cancel)}
                                </Button>
                                <Button className={cx(bt.btnSecondaryFull)}
                                    type="submit"
                                    disabled={disabled}
                                >{formatMessage(messages.save)}
                                </Button>
                            </FormGroup>
                        </div>
                    }
                </form>
            </div>
        )
    }
}

CreateWishList = reduxForm({
    form: 'CreateWishList', // a unique name for this form
    validate,
    destroyOnUnmount: false
})(CreateWishList);

const selector = formValueSelector('WishListModalForm');

const mapState = (state) => ({
    listId: state.modalStatus.listId,
    profileId: state.account.data.profileId,
    wishListGroups: selector(state, 'wishListGroups')
});

const mapDispatch = {
    change
};

export default compose(injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
    graphql(gql`
        mutation CreateWishListGroup(
        $name: String!,
        $isPublic: String,
        ){
            CreateWishListGroup(
            name: $name,
            isPublic: $isPublic
            ) {
                status
                id
            }
        }
    `, {
        name: 'createWishListGroup'
    }),
    graphql(gql`
        mutation CreateWishList(
            $listId: Int!,
            $wishListGroupsId:Int,
            $eventKey:Boolean,
        ){
            CreateWishList(
                listId: $listId,
                wishListGroupId: $wishListGroupsId,
                eventKey: $eventKey,
            ) {
                status
            }
        }
    `, {
        name: 'createWishList'
    })
)(CreateWishList);