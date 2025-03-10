import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm, change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';

import Loader from '../../../../components/Loader';

import { closeCommentModal } from '../../../../actions/modalActions';

import validate from './validate';

import messages from '../../../../locale/messages';

import s from './CommentModal.css';
import bt from "../../../../components/commonStyle.css";

class CommentModal extends Component {
  static propTypes = {
    closeCommentModal: PropTypes.func.isRequired,
    commentModal: PropTypes.bool
  };

  static defaultProps = {
    commentModal: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.submitForm = this.submitForm.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listId } = nextProps;
    const { change } = this.props;
    change("listId", listId);
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.textAreaFormGroup}>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl
          {...input}
          className={className}
          placeholder={label}
          componentClass={"textarea"}
          maxlength={250}
        />
      </FormGroup>
    )
  }

  async submitForm(e) {
    const { handleDecline } = this.props;
    handleDecline(e.listId, e.comment);
  }

  render() {
    const { closeCommentModal, commentModal, handleSubmit, submitting, publishListLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Modal show={commentModal} onHide={closeCommentModal} dialogClassName={cx(s.logInModalContainer, "adminModal")} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.declinedReason} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.modalRoot}>
              <form onSubmit={handleSubmit(this.submitForm)}>
                <Field name="comment" className={s.textareaInput} component={this.renderFormControlTextArea} label={formatMessage(messages.comment)} placeholder={formatMessage(messages.comment)} />
                <Loader
                  type={"button"}
                  buttonType={"submit"}
                  className={cx(bt.btnPrimary, bt.btnLarge, "arButtonLoader", "commonLoaderFlex")}
                  containerClass="singleButtonFlexEnd"
                  disabled={submitting}
                  show={publishListLoading}
                  label={formatMessage(messages.submit)}
                />
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

CommentModal = reduxForm({
  form: 'CommentForm', // a unique name for this form
  validate
})(CommentModal);

const mapState = (state) => ({
  commentModal: state.adminModalStatus.commentModal,
  comment: state.adminModalStatus.comment,
  listId: state.adminModalStatus.listId,
  publishListLoading: state.location.publishListLoading,
});

const mapDispatch = {
  closeCommentModal,
  change
};

export default compose(
  withStyles(s),
  injectIntl,
  connect(mapState, mapDispatch),
)(CommentModal);

