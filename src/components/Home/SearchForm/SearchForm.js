
import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
  Button,
  Grid,
  Row,
  Col,
  FormControl
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
// Components
import DateRange from '../DateRange';
import PlaceGeoSuggest from '../PlaceGeoSuggest';
import MobileDateRange from '../MobileDateRange';

// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { setPersonalizedValues } from '../../../actions/personalized';

// Helper
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';
// History
import history from '../../../core/history';
// Locale
import messages from '../../../locale/messages';

//Imaage
import searchIcon from '/public/SiteIcons/searchIconHome.svg';

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
    },
      this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
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
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity
      });
    }
    if (personalized?.isOneTotalToggle) this.setState({ isOneTotalToggle: personalized?.isOneTotalToggle })
  }

  UNSAFE_componentWillMount() {
    const { getSpecificSettings, listingFields, personalized } = this.props;
    this.setState({ isLoad: true });
    if (detectMobileBrowsers.isMobile() === true) {
      this.setState({ mobileDevice: true });
    }
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity
      });
    }
    if (personalized?.isOneTotalToggle) this.setState({ isOneTotalToggle: personalized?.isOneTotalToggle })
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }


  handleResize(e) {
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 767px)').matches : true;
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 480px)').matches : false;

    this.setState({
      smallDevice,
      verySmallDevice
    });
  }

  handleClick() {
    const { personalized, setPersonalizedValues, change } = this.props;
    let updatedURI, uri = '/s?';

    if (personalized?.chosen) {
      uri = uri + '&address=' + personalized?.location + '&chosen=' + personalized?.chosen;
    } else {
      if (personalized?.location) {
        uri = uri + '&address=' + personalized?.location;
      }
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

  render() {

    const { location, dates, settingsData, setPersonalizedValues, personalized, layout5Css } = this.props;
    const { formatMessage } = this.props.intl;
    const { personCapacity, smallDevice, isLoad } = this.state;
    let rows = [], startValue, endValue; const isBrowser = typeof window !== 'undefined';

    if (personCapacity?.[0] && personCapacity[0]?.startValue) {
      for (let i = personCapacity[0]?.startValue; i <= personCapacity[0]?.endValue; i++) {
        rows.push(<option value={i} key={i}>{i} {i > 1 ? personCapacity[0]?.otherItemName : personCapacity[0]?.itemName}</option>);
        startValue = personCapacity[0]?.startValue;
        endValue = personCapacity[0]?.endValue;
      }
    }
    // const smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;

    return (
      <div className={'layout5Css'}>
        <div className={cx(s.searchFormInputs, 'homeSearchForm', 'verticalsearchform', 'layout5Searchform')}>
          <div className={cx(s.searchForm, 'layout5SearchformRadiaus')}>
            <div className={cx(s.table)}>
              <div className={cx(s.tableRow)}>
                <div className={cx(s.tableCell, s.location, 'tableCellRTL', 'layout5SearchformLocation', 'layout5DateWidth', 'layout5AllPadding', 'tableCellRemoveBorder')}>
                  <label className={s.label}>
                    <span> <FormattedMessage {...messages.where} /></span>
                  </label>
                  {
                    !isLoad && <PlaceGeoSuggest
                      label={formatMessage(messages.homeWhere)}
                      className={cx(s.formControlInput, s.input)}
                      containerClassName={s.geoSuggestContainer}
                    />
                  }
                  {
                    isLoad && <Field
                      component={this.renderFormControl}
                      label={formatMessage(messages.homeWhere)}
                      className={cx(s.formControlInput, s.input)}
                      name="location"
                    />
                  }
                </div>
                <div className={cx(s.tableCell, s.dates, 'layout5SearchformLocationTwo', 'layout5DateWidth', 'layout5AllPadding')}>
                  <label className={s.label}>
                    <span> <FormattedMessage {...messages.when} /></span>
                  </label>
                  <span className={cx('homeDate', s.formControlInput, s.input, 'homeDateAR', 'homeSerachDate')}>
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
                <div className={cx(s.tableCell, s.guests, s.guestPadding, s.mobilePadding, 'tableCellLeftRTL', 'layOut5SearchFormGuest', 'layout5AllPadding')}>
                  <label className={cx(s.selectPadding, s.label, 'inputSpace')}>
                    <span> <FormattedMessage {...messages.guest} /></span>
                  </label>
                  <FormControl
                    componentClass="select"
                    className={cx(s.formControlSelect, s.input, s.inputPadding, 'inputPaddingAR', 'inputSpace', 'inputPaddingRTL')}
                    onChange={(e) => setPersonalizedValues({ name: 'personCapacity', value: Number(e.target.value) })}
                    defaultValue={personalized.personCapacity}
                    value={personalized.personCapacity}
                  >
                    {rows}
                  </FormControl>
                </div>
                <div className={cx(s.tableCell, s.search, s.noBroderRight, 'layOut5SearchBtnBottom', 'noBroderRightRTL')}>
                  <Button className={cx(bt.btnPrimary, s.btnBlock, s.searchButton, 'layOut5SearchBtn')} onClick={this.handleClick}>
                    <span>
                      <img src={searchIcon} className={cx(s.searchIconCommon, 'searchIconCommonRTL')} />
                    </span>
                    <FormattedMessage {...messages.search} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

SearchForm = reduxForm({
  form: 'HomeSearchForm', // a unique name for this form
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
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  (connect(mapState, mapDispatch))
)(SearchForm);