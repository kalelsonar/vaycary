import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import validate from './validate';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { graphql, gql, compose } from 'react-apollo';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import messages from '../../../locale/messages';
import { closeWishListGroupModal } from '../../../actions/WishList/modalActions';
import getAllWishListGroupQuery from '../getAllWishListGroup.graphql';
import showToaster from '../../../helpers/showToaster';

import s from './WishListGroupForm.css';
import bt from '../../../components/commonStyle.css';

class AddWishListGroupForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
    formatMessage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null,
      wishListLabel: null,
      wishListSuccessLabel: null,
      wishListErrorLabel: null,
      isDisabled: true
    }
    this.submitForm = this.submitForm.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  componentDidMount() {
    const { valid } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fieldType, valid } = nextProps;
    const { formatMessage } = this.props.intl;
    const { wishListLabel } = this.state;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
    if (wishListLabel == null) {
      this.setState({
        wishListLabel: formatMessage(messages.wishList),
        wishListSuccessLabel: formatMessage(messages.wishListAdded),
        wishListErrorLabel: formatMessage(messages.somethingWentWrong)
      });
    }
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }

  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={cx(s.formGroup, 'row')}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <FormControl {...input} placeholder={placeholder} type={type} className={className} />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </Col>
      </FormGroup>
    );
  }


  async submitForm(values, dispatch) {
    const { mutate, profileId, closeWishListGroupModal } = this.props;
    const { wishListLabel, wishListSuccessLabel, wishListErrorLabel } = this.state;

    const { data } = await mutate({
      variables: values,
      refetchQueries: [{
        query: getAllWishListGroupQuery,
        variables: {
          profileId
        }
      }]
    });
    if (data && data.CreateWishListGroup) {
      if (data.CreateWishListGroup.status === 'success') {
        dispatch(reset('AddWishListGroupForm'));
        dispatch(closeWishListGroupModal);
        showToaster({ messageId: 'addWishlist', toasterType: 'success' })
      } else {
        showToaster({ messageId: 'commonError', toasterType: 'error' })
      }
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, closeWishListGroupModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { fieldType, isDisabled } = this.state;

    return (
      <div className={'inputFocusColor'}>
        <form onSubmit={handleSubmit(this.submitForm)}>
          {error && <strong>{formatMessage(error)}</strong>}

          <Field
            name="name"
            type="text"
            component={this.renderFormControl}
            placeholder={formatMessage(messages.name)}
            className={cx(bt.commonControlInput, s.space1)}
          />
          <div className={s.alignRight}>
            <a onClick={() => closeWishListGroupModal()} className={cx(s.cancelBtn, 'wishlistCancelRTL')}> {formatMessage(messages.deSelect)}</a>
            <Button className={(bt.btnSecondaryFull)} type="submit" disabled={isDisabled}>
              {formatMessage(messages.save)}
            </Button>
          </div>
        </form>
      </div>
    )
  }

}

AddWishListGroupForm = reduxForm({
  form: "AddWishListGroupForm", // a unique name for this form
  validate,
})(AddWishListGroupForm);

const mapState = (state) => ({
  profileId: state.account.data.profileId
});

const mapDispatch = {
  closeWishListGroupModal
};

export default compose(
  injectIntl,
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
        }
    }
  `)
)(AddWishListGroupForm);
