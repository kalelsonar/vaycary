
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationSearchForm.css';
import bt from '../../commonStyle.css';
import { reduxForm } from 'redux-form';

import {
  Button,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import ReactGoogleMapLoader from "react-google-maps-loader";

// Components
import PlaceGeoSuggest from '../PlaceGeoSuggest';

// Helper
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';

// Locale
import messages from '../../../locale/messages';

// History
import history from '../../../core/history';

// Config
import { googleMapAPI } from '../../../config';

//Imaage
import searchIcon from '/public/SiteIcons/searchIconHome.svg';
class LocationSearchForm extends React.Component {
  static propTypes = {
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      chosen: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      formatMessage: PropTypes.any,
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
      chosen: null
    },
    settingsData: {
      listSettings: []
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileDevice: false
    },
      this.handleClick = this.handleClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType
      });
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (detectMobileBrowsers.isMobile() === true) {
      this.setState({ mobileDevice: true });
    }
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType
      });
    }
  }

  handleClick() {
    const { personalized } = this.props;
    let updatedURI, uri = '/s?';

    if (personalized.chosen != null) {
      uri = uri + '&address=' + personalized.location + '&chosen=' + personalized.chosen;
    } else {
      if (personalized.location != null) {
        uri = uri + '&address=' + personalized.location;
      }
    }
    updatedURI = encodeURI(uri);
    history.push(updatedURI);
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
            <form>
              <div className={cx(s.searchFormContainer, 'homeSearchForm', 'homeLocationSearchForm', 'homeLocationSearchFormAR', 'searchFormContainerDark')}>
                <div>
                  <ReactGoogleMapLoader
                    params={{
                      key: googleMapAPI, // Define your api key here
                      libraries: "places", // To request multiple libraries, separate them with a comma
                    }}
                    render={googleMaps =>
                      googleMaps && (
                        <PlaceGeoSuggest
                          label={formatMessage(messages.homeWhere)}
                          className={cx(s.formControlInput, s.input)}
                          containerClassName={s.geoSuggestContainer}
                        />)}
                  />
                </div>
                <div className={cx(s.searchBtnContainer, 'searchBtnContainerAr')}>
                  <Button className={cx(bt.btnPrimary, s.btnBlock, s.btnLarge)} onClick={this.handleClick}>
                  <img src={searchIcon} className={cx(s.searchIconCommon, 'searchIconCommonTwoRTL')}/>
                    <span className={'hidden-xs'}>
                      <FormattedMessage {...messages.search} />
                    </span>
                  </Button>
                </div>
                {/* <div className={s.searchForm}>
                  <div className={cx(s.displayTable)}>
                    <div className={cx(s.displayTableRow)}>
                      <div className={cx(s.displayTableCell, s.locationSection)}>
                        <div className={cx(s.displayTable)}>
                          <div className={cx(s.displayTableRow)}>
                
                            <div className={cx(s.locationTableCell, s.displayTableCell)}>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div> */}
              </div>
            </form>
    );
  }
}

LocationSearchForm = reduxForm({
  form: 'SearchForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(LocationSearchForm);

const mapState = (state) => ({
  personalized: state.personalized,
  settingsData: state.viewListing.settingsData,
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(LocationSearchForm)));
