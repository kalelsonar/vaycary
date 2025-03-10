import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LocationMap.css';
import {
  Row,
} from 'react-bootstrap';
import cx from 'classnames';
// Redux
import { connect } from 'react-redux';

// Google Places Map Component
//import GoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMapLoader from "react-google-maps-loader";

import { GoogleMap, Circle } from "@react-google-maps/api";

// Constants
import { googleMapAPI } from '../../../config';

// Locale
import messages from '../../../locale/messages';

// Redux Actions
import { SECONDARYCOLOR } from '../../../constants'
import { mapThemeStyle } from '../../../helpers/mapThemeStyle';

const containerStyle = {
  width: '100%',
  height: '100%'
};
class LocationMap extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: {},
      markers: null,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{
            color: '#a4ddf5'
          }]
        }
      ]
    }
  }

  componentDidMount() {
    const { theme } = this.props;
    this.setState({
      styles: mapThemeStyle(theme)
    })
  }

  componentDidUpdate(prevProps) {
    const { theme } = this.props;
    const { theme: prevTheme } = prevProps;
    if (theme !== prevTheme) {
      this.setState({
        styles: mapThemeStyle(theme)
      });
    }
  }

  UNSAFE_componentWillMount() {
    const { data } = this.props;
    let lat = data.lat;
    let lng = data.lng;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng),
      },
      smallDevice: false
    });
  }

  handleOnLoad = (map) => {
    const { center } = this.state;
    const markers = [{
      position: new google.maps.LatLng(center.lat, center.lng)
    }];
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };


  render() {
    const { center, styles } = this.state;
    const { data } = this.props;

    let firstName = data.user.profile.firstName;
    let city = data.city;
    let country = data.country;

    return (
      <Row className={cx(s.pageContent, 'viewListingMap')} >
        <div className={cx(s.space2, s.horizontalLineThrough)}>
          <h1 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.neighborhood} /></h1>
        </div>
        <div className={cx(s.space2)}>
          <div className={cx(s.locationNameCss)}>{firstName}{' '}<FormattedMessage {...messages.propertyLocated} />{' '}{city}, {country}</div>
          <div style={{ height: 350 }}>
            <ReactGoogleMapLoader
              params={{
                key: googleMapAPI, // Define your api key here
                libraries: "places,geometry"// To request multiple libraries, separate them with a comma
              }}
              render={googleMaps =>
                googleMaps && (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    defaultZoom={10}
                    center={center}
                    onLoad={this.handleOnLoad}
                    clickableIcons={false}
                    options={{
                      backgroundColor: '',
                      scrollwheel: false,
                      maxZoom: 16,
                      minZoom: 10,
                      borderRadius: '15px',
                      streetViewControl: false,
                      zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_TOP
                      },
                      mapTypeControl: false,
                      styles: styles
                    }}
                  >
                    <Circle
                      center={center}
                      radius={200}
                      options={{
                        fillColor: SECONDARYCOLOR,
                        strokeColor: SECONDARYCOLOR
                      }}
                    />
                  </GoogleMap>
                )}
            />
          </div>
          <div className={cx(s.locationSmallText)}><FormattedMessage {...messages.neighborhoodInfo} /></div>
          <div className={s.listingLine}></div>
        </div>
      </Row>
    );
  }
}

const mapState = (state) => ({
  theme: state.currency.theme
});

export default injectIntl(withStyles(s)(connect(mapState)(LocationMap)));
