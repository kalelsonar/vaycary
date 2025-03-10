import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';


import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Button,
  Form,
  FormControl,
  Modal,
} from 'react-bootstrap';

// Helper
import validate from './validate';
import submit from './submit';

// Component
import DateRange from '../DateRange';
import Avatar from '../../Avatar';
import Loader from '../../Loader';

// Redux Action
import { contactHostClose } from '../../../actions/message/contactHostModal';

// Locale
import messages from '../../../locale/messages';

// Style
import s from './ContactHost.css';
import bt from '../../../components/commonStyle.css';

class ContactHost extends React.Component {
  static propTypes = {
    showContactHostModal: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    profileId: PropTypes.number.isRequired,
    personCapacity: PropTypes.number.isRequired,
    minNight: PropTypes.number,
    maxNight: PropTypes.number,
    maxDaysNotice: PropTypes.string,
    blockedDates: PropTypes.array,
    availability: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    contactHostClose: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    maximumStay: PropTypes.bool,
    country: PropTypes.string
  };

  static defaultProps = {
    showContactHostModal: false,
    id: 0,
    userId: null,
    profileId: 0,
    city: null,
    displayName: null,
    picture: null,
    personCapacity: 0,
    minNight: 0,
    maxNight: 0,
    blockedDates: [],
    availability: false,
    startDate: null,
    endDate: null,
    maximumStay: false,
    country: null
  };

  constructor(props) {
    super(props);
    this.renderGuests = this.renderGuests.bind(this);
    this.renderFormControlSelect = this.renderFormControlSelect.bind(this);
    this.renderFormControlTextArea = this.renderFormControlTextArea.bind(this);
    this.renderWarningBlock = this.renderWarningBlock.bind(this);
  }

  componentWillUnmount() {
    var root = document.getElementsByTagName('html')[0];
    root.classList.remove('scrollHidden');
  }

  renderGuests(personCapacity) {
    const { formatMessage } = this.props.intl;

    let rows = [];
    for (let i = 1; i <= personCapacity; i++) {
      rows.push(<option key={i} value={i}>{i} {i > 1 ? formatMessage(messages.guests) : formatMessage(messages.guest)}</option>);
    }
    return rows;
  }

  renderFormControlSelect({ input, label, meta: { touched, error }, children, className }) {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  renderFormControlTextArea({ input, label, meta: { touched, error }, children, className, placeholder }) {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={placeholder}
        >

          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderWarningBlock(content, error) {
    const { isLoading } = this.props;
    let bgClass;
    if (error) {
      bgClass = s.alertBlockError;
    } else {
      bgClass = s.alertBlockSuccess;
    }
    return (
      isLoading ? <div className={cx(s.alertBlock, s.space4)}><Loader type={'text'} /></div> :
        <div className={cx(s.alertBlock, bgClass, s.space4, 'bgBlackTwo')}>
          {content}
        </div>
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { showContactHostModal, contactHostClose } = this.props;
    const { id, personCapacity, minNight, maxNight, maxDaysNotice, blockedDates, country } = this.props;
    const { userId, profileId, picture, displayName, city } = this.props;
    const { availability, startDate, endDate, isLoading, maximumStay } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    let isDateChosen = startDate != null && endDate != null || false;

    let disabled;
    if (!isDateChosen || !availability) {
      disabled = true;
    } else {
      disabled = false;
    }
    //let loadingStatus = loading || isLoading || false;
    let loadingStatus = isLoading || false;
    return (
      <div className={s.root}>
        <Modal show={showContactHostModal} onHide={contactHostClose} animation={false} className={('contactHostModal')}>
          <Modal.Header className={('bgBlack')} closeButton>
            <Modal.Title className={s.title}><FormattedMessage {...messages.contactHost} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalGrid, 'bgBlack')}>
              <div className={cx(s.leftGrid, 'bgBlackTwo')}>
                <div className={s.alignCenter}>
                  <Avatar
                    source={picture}
                    height={108}
                    width={108}
                    title={displayName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={cx(s.mediaPhoto, s.mediaRound)}
                    profileId={profileId}
                  />
                  <h5 className={s.hostName}>{displayName}</h5>
                </div>
                <hr className={s.divider} />
                <div>
                  <p className={s.heading}><FormattedMessage {...messages.contactHostinfo1} />:</p>
                  <ul className={cx(s.listText, 'contactHostlistTextRTL')}>
                    <li>
                      <FormattedMessage {...messages.contactHostinfo2} /> {displayName} <FormattedMessage {...messages.contactHostinfo3} />
                    </li>
                    <li>
                      <FormattedMessage {...messages.contactHostinfo4} /> {city}<span className={'questionIconRTL'}>?</span>  <FormattedMessage {...messages.contactHostinfo5} />
                    </li>
                    <li>
                      <FormattedMessage {...messages.contactHostinfo6} />!
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <Loader
                  show={loadingStatus}
                  type={"page"}
                >
                  <div className={('bgBlack')}>
                    {
                      !isDateChosen && this.renderWarningBlock(<FormattedMessage {...messages.hostErrorMessage1} />)
                    }
                    {
                      !maximumStay && !availability && isDateChosen && this.renderWarningBlock(<FormattedMessage {...messages.hostErrorMessage2} />, "error")
                    }
                    {
                      isDateChosen && maximumStay && this.renderWarningBlock(<div><FormattedMessage {...messages.maximumStay} /> {maxNight} <FormattedMessage {...messages.nights} /></div>, "error")
                    }
                    {
                      availability && isDateChosen && this.renderWarningBlock(<FormattedMessage {...messages.hostErrorMessage3} />)
                    }
                    <div>
                      <label className={s.labelText}><FormattedMessage {...messages.contactHostDate} /></label>
                      <div>
                        <Form onSubmit={handleSubmit(submit)}>
                          <div className={cx('contactHost', s.space3)}>
                            <DateRange
                              listId={id}
                              minimumNights={minNight}
                              maximumNights={maxNight}
                              blockedDates={blockedDates}
                              formName={"ContactHostForm"}
                              maxDaysNotice={maxDaysNotice}
                              country={country}
                            />
                          </div>
                          <label className={s.labelText}><FormattedMessage {...messages.guests} /></label>
                          <Field name="personCapacity" component={this.renderFormControlSelect} className={cx(s.formControlSelect, 'contactHostSelect')} >
                            <option value="">{formatMessage(messages.chooseGuests)}</option>
                            {this.renderGuests(personCapacity)}
                          </Field>
                          <div className={s.spaceTop3}>
                            <label className={s.labelText}><FormattedMessage {...messages.messages} /></label>
                            <Field
                              name="content"
                              component={this.renderFormControlTextArea}
                              className={s.textBox}
                              placeholder={formatMessage(messages.textBoxMessage)}
                            />
                          </div>
                          <Button className={cx(bt.btnPrimary, bt.btnLarge, bt.fullWidth, s.spaceTop4)} type="submit" disabled={submitting || disabled}>
                            <FormattedMessage {...messages.sendMessage} />
                          </Button>
                        </Form>

                      </div>
                    </div>
                  </div>
                </Loader>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ContactHost = reduxForm({
  form: "ContactHostForm", // a unique name for this form
  validate
})(ContactHost);

// Decorate with connect to read form values
const selector = formValueSelector('ContactHostForm'); // <-- same as form name

const mapState = (state) => ({
  isLoading: state.viewListing.isLoading,
  showContactHostModal: state.viewListing.showContactHostModal,
  availability: state.viewListing.availability,
  maximumStay: state.viewListing.maximumStay,
  startDate: selector(state, 'startDate'),
  endDate: selector(state, 'endDate'),
});

const mapDispatch = {
  contactHostClose
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ContactHost)));

