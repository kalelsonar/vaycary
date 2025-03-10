import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import FooterButton from './FooterButton';
import SidePanel from './SidePanel';
import InputFieldComponent from '../Common/FormField/InputFieldComponent';

import validateStep2 from './validateStep2';
import updateStep2 from './updateStep2';
import messages from '../../locale/messages';

import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';

class Description extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      chars_left: 250
    };
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentDidMount() {
    const { title } = this.props;
    let max_chars = title ? 250 - title.length : 250;
    this.setState({
      chars_left: max_chars
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { valid } = nextProps;
    const { title } = nextProps;
    let max_chars = title ? 250 - title.length : 250;
    this.setState({
      chars_left: max_chars
    });
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange(event) {
    var input = event.target.value;
    let max_chars = 250;
    this.setState({
      chars_left: max_chars - input.length
    });
  }

  render() {
    const { handleSubmit, previousPage, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, chars_left } = this.state;

    return (
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepTwoCommonHeading)}
          landingContent={formatMessage(messages.placeTitlePanel)}
        />
        <form onSubmit={handleSubmit}>
          <div className={s.landingMainContent}>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.placeTitle} />
              </ControlLabel>
              <Field name="title"
                type="text"
                component={InputFieldComponent}
                placeholder={formatMessage(messages.titleLabel)}
                inputClass={cx(s.formControlInput, s.jumboInput)}
                onChange={this.handleChange}
                chars_left={chars_left}
              />
            </FormGroup>
            <FormGroup className={s.space5}>
              <ControlLabel className={cx(s.landingLabel, 'textWhite')}>
                <FormattedMessage {...messages.description} />
              </ControlLabel>
              <Field name="description"
                component={InputFieldComponent}
                componentClass="textarea"
                inputClass={s.textareaInput}
                placeholder={formatMessage(messages.descriptionLabel)}
              />
            </FormGroup>
          </div>
          <FooterButton
            disabled={isDisabled}
            previousPage={previousPage}
            previousPagePath={"photos"}
            type={"submit"}
            formPage={formPage}
            step={step}
          />
        </form >
      </div >

    );
  }
}

Description = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Description);

const selector = formValueSelector('ListPlaceStep2');

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  title: selector(state, 'title')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Description)));