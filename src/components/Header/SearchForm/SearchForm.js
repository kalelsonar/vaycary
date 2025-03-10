
import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { submit as submitForm, change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { Field, reduxForm } from 'redux-form';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import DateRange from '../../Home/DateRange/DateRange';
import PlaceGeoSuggest from '../../Home/PlaceGeoSuggest/PlaceGeoSuggest';
import MobileDateRange from '../../Home/MobileDateRange/MobileDateRange';

import { changePersonalizedData } from '../../../actions/toggleControl';
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { setPersonalizedValues } from '../../../actions/personalized';
import history from '../../../core/history';
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';
import messages from '../../../locale/messages';

import bt from '../../commonStyle.css';
import s from './SearchForm.css';
class SearchForm extends React.Component {
  static propTypes = {
    setPersonalizedValues: PropTypes.any.isRequired,
    getSpecificSettings: PropTypes.any.isRequired,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      chosen: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      personCapacity: PropTypes.number,
      formatMessage: PropTypes.any,
      isOneTotalToggle: PropTypes.bool,
    }),
    settingsData: PropTypes.shape({
      listSettings: PropTypes.array.isRequired
    }).isRequired
  };

  static defaultProps = {
    listingFields: []
  };

  static defaultProps = {
    personalized: {
      location: null,
      lat: null,
      lng: null,
      startDate: null,
      endDate: null,
      personCapacity: null,
      chosen: null
    },
    settingsData: {
      listSettings: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileDevice: false,
      personCapacity: [],
      isLoad: false,
      smallDevice: false,
      verySmallDevice: false,
      isOneTotalToggle: false
    };
  }

  componentDidMount() {
    this.setState({ isLoad: false });
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields, personalized } = nextProps;
    const { setPersonalizedValues } = this.props;
    if (listingFields != undefined) {
      !personalized.personCapacity && setPersonalizedValues({ name: 'personCapacity', value: Number(listingFields?.personCapacity[0]?.startValue) });
      this.setState({
        personCapacity: listingFields.personCapacity
      });
    }
    if (personalized.isOneTotalToggle) this.setState({ isOneTotalToggle: personalized.isOneTotalToggle })
  }

  UNSAFE_componentWillMount() {
    const { listingFields, personalized } = this.props;
    if (listingFields != undefined) {
      this.setState({
        personCapacity: listingFields.personCapacity
      });
    }
    if (detectMobileBrowsers.isMobile() === true) {
      this.setState({ mobileDevice: true });
    }
    if (personalized.isOneTotalToggle) this.setState({ isOneTotalToggle: personalized.isOneTotalToggle })
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize = (e) => {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : true;
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 480px)').matches : false;
    this.setState({
      smallDevice,
      verySmallDevice
    });
  }

  handleClick = async () => {
    const { personalized, page, submitForm, setPersonalizedValues, change, changePersonalizedData } = this.props;
    let updatedURI, uri = '/s?';
    if (page != 'search' || (page == 'search' && (personalized?.chosen || personalized?.location))) {

      if (personalized?.chosen) {
        uri = uri + '&address=' + personalized?.location + '&chosen=' + personalized?.chosen;
      } else if (personalized?.location) {
        uri = uri + '&address=' + personalized?.location;
      }
      if (personalized?.startDate && personalized?.endDate) {
        setPersonalizedValues({ name: 'isOneTotalToggle', value: true });
        change('SearchForm', 'isOneTotalToggle', true);
        uri = uri + '&startdate=' + personalized?.startDate + '&enddate=' + personalized?.endDate;
      }
      if (personalized?.personCapacity && !isNaN(personalized?.personCapacity)) {
        uri = uri + '&guests=' + personalized?.personCapacity;
      }
      updatedURI = encodeURI(uri);
      history.push(updatedURI);
    } else {
      if (personalized?.startDate && personalized?.endDate) {
        setPersonalizedValues({ name: 'isOneTotalToggle', value: true });
        change('SearchForm', 'isOneTotalToggle', true);
      }
      await changePersonalizedData('SearchForm', 'currentPage', 1);
      await submitForm('SearchForm');
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </div>
    )
  }

  loadField = () => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('searchHeaderForm', s.divider, s.dividerLoading)}>
        <Field
          component={this.renderFormControl}
          label={formatMessage(messages.homeWhere)}
          className={cx(s.formControlInput, s.input, s.loadfield)}
          name="location"
        />
      </div>
    )
  }

  formValue = (e) => {
    const { setPersonalizedValues, changePersonalizedData } = this.props;
    changePersonalizedData('SearchForm', 'personCapacity', e);
    setPersonalizedValues({ name: 'personCapacity', value: Number(e) })
  }

  render() {
    const { setPersonalizedValues, viewListingHeader, guests, personalized, change } = this.props;
    const { formatMessage } = this.props.intl;
    const { personCapacity, smallDevice, verySmallDevice } = this.state;
    let rows = [], guestCount = 1;
    if (personCapacity?.[0] && personCapacity[0]?.startValue) {
      for (let i = personCapacity[0]?.startValue; i <= personCapacity[0]?.endValue; i++) {
        rows.push(<option value={i} key={i}>{i} {i > 1 ? personCapacity[0]?.otherItemName : personCapacity[0]?.itemName}</option>);
      }
    }
    if (personalized?.personCapacity) {
      guestCount = personalized?.personCapacity;
    } else if (personCapacity?.[0] && personCapacity[0].startValue) {
      guestCount = personCapacity[0]?.startValue;
    }

    if (!personalized?.personCapacity && viewListingHeader == 'viewListingHeader') guestCount = guests;

    return (
      <div className={cx('searchHeaderForm')}>
        <div>
          <div className={cx(s.grid, 'searchHeaderPaddingRTL')}>
            <div className={cx(s.location, 'tableCellRTL', s.divider)}>
              <PlaceGeoSuggest
                label={formatMessage(messages.homeWhere)}
                className={cx(s.formControlInput, s.input)}
                containerClassName={s.geoSuggestContainer}
                loadField={this.loadField}
              />
            </div>
            <div className={cx(s.dates, s.divider, s.dividerTop, 'dividerTopRTL')}>
              <span className={cx('homeDate', s.formControlInput, s.input, 'homeDateAR', 'headerSearchDate')}>
                {
                  !smallDevice && <DateRange
                    formName={'SearchForm'}
                    numberOfMonths={2}
                  />
                }

                {
                  smallDevice && <MobileDateRange
                    formName={'SearchForm'}
                    numberOfMonths={1}
                  />
                }

              </span>
            </div>
            <div className={cx(s.guests, s.guestPadding, s.mobilePadding, 'tableCellLeftRTL')}>

              <FormControl
                componentClass="select"
                className={cx(s.formControlSelect, s.input, s.inputPadding, 'inputPaddingAR')}
                onChange={(e) => { this.formValue(e.target.value) }}
                defaultValue={guestCount}
                value={guestCount}
              >
                {rows}
              </FormControl>
            </div>
            <div className={cx(s.search, s.noBroderRight, 'layOut5SearchBtnBottom', 'noBroderRightRTL')}>
              <Button className={cx(bt.btnPrimary, s.btnBlock, s.searchButton, 'layOut5SearchBtn')} onClick={this.handleClick}>
                <span>
                  <FontAwesome.FaSearch className={cx(s.iconStyle, 'textWhite')} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

SearchForm = reduxForm({
  form: 'HeaderSearchForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(SearchForm);

const mapState = (state) => ({
  personalized: state.personalized,
  settingsData: state.viewListing.settingsData,
  listingFields: state.listingFields.data,
  isOneTotalToggle: state.personalized.isOneTotalToggle,
});

const mapDispatch = {
  getSpecificSettings,
  setPersonalizedValues,
  submitForm,
  change,
  changePersonalizedData
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
)(SearchForm);