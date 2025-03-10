// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Redux actions
import { change } from 'redux-form';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import { GoogleMap, Circle, Marker } from '@react-google-maps/api';

import { googleMapAPI } from '../../config';

import { mapThemeStyle } from '../../helpers/mapThemeStyle';

import infoIcon from '/public/SiteIcons/information-button.svg';
import mapPinIcon from '/public/SiteIcons/map-pin-large.png';
import infoIconBlack from '/public/SiteIcons/information-button-black.svg';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PlaceMap.css';
import cx from 'classnames';

const containerStyle = {
  width: '100%',
  height: '100%'
};
class PlaceMap extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    isMapTouched: PropTypes.bool,
    onChange: PropTypes.any,
    change: PropTypes.any,
    mapSuccess: PropTypes.string,
    mapWarning: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      center: null,
      isMapTouched: false,
      markers: null,
      success: false,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#a4ddf5'
            }
          ]
        }
      ]
    };
    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
  }

  componentDidMount() {
    const { theme } = this.props;
    this.setState({
      styles: mapThemeStyle(theme)
    });

    const { lat, lng, isMapTouched } = this.props;
    this.setState({
      center: {
        lat: Number(lat),
        lng: Number(lng)
      },
      isMapTouched: isMapTouched
    });
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

  // UNSAFE_componentWillMount() {
  //   const { lat, lng, isMapTouched } = this.props;
  //   this.setState({
  //     center: {
  //       lat: Number(lat),
  //       lng: Number(lng)
  //     },
  //     isMapTouched: isMapTouched
  //   });
  // }

  geometryValue(value) {
    return value;
  }

  handleMarkerDragEnd(targetMarker) {
    const { isMapTouched } = this.state;
    const { onChange, change } = this.props;
    const center = {
      lat: targetMarker.latLng.lat(),
      lng: targetMarker.latLng.lng(),
      isMapTouched: true
    };
    this.setState({ center: center, isMapTouched: true });
    if (!isMapTouched) {
      this.setState({ success: true });
    }
    //onChange(this.geometryValue(center));
    change('ListPlaceStep1', 'lat', center.lat);
    change('ListPlaceStep1', 'lng', center.lng);
    change('ListPlaceStep1', 'isMapTouched', center.isMapTouched);
  }

  renderWarning(message) {
    const { isMapTouched, success } = this.state;
    if (!isMapTouched) {
      return (
        <div className={cx(s.alertContainer, s.alertDanger, 'alertDangerRtl')}>
          <img src={infoIcon} className={cx(s.dangerIcon, 'dangerIconRtl')} />
          <strong>
            <span>{message}</span>
          </strong>
        </div>
      );
    }
    if (isMapTouched && success) {
      return (
        <div className={cx(s.alertContainer, s.alertSuccess, 'alertDangerRtl')}>
          <img
            src={infoIconBlack}
            className={cx(s.dangerIcon, 'dangerIconRtl')}
          />
          <strong>
            <span>{message}</span>
          </strong>
        </div>
      );
    }
  }

  handleOnLoad = map => {
    if (!map) return;
    const { center } = this.state;
    const markers = [
      {
        position: new google.maps.LatLng(center.lat, center.lng)
      }
    ];
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    setTimeout(() => map.fitBounds(bounds), 500);
  };

  render() {
    const { isMapTouched, center, styles } = this.state;
    const { mapWarning, mapSuccess } = this.props;
    let message;

    if (!isMapTouched) {
      message = mapWarning;
    } else {
      message = mapSuccess;
    }
    return (
      <div className={s.positionRelative}>
        <div className={s.positionAbsolute}>{this.renderWarning(message)}</div>
        <div style={{ height: 554 }} className={s.tabViewMap}>
          <ReactGoogleMapLoader
            params={{
              key: googleMapAPI, // Define your api key here
              libraries: 'places,geometry,markedWithLabel' // To request multiple libraries, separate them with a comma
            }}
            render={googleMaps =>
              googleMaps && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  onLoad={this.handleOnLoad}
                  defaultZoom={14}
                  center={center}
                  options={{
                    backgroundColor: '',
                    scrollwheel: false,
                    maxZoom: 16,
                    minZoom: 11,
                    streetViewControl: false,
                    zoomControlOptions: {
                      position: google.maps.ControlPosition.LEFT_TOP
                    },
                    mapTypeControl: false,
                    styles: styles
                  }}
                >
                  <Circle
                    center={center}
                    radius={100}
                    options={{
                      fillColor: '#00d1c1',
                      strokeColor: '#007A87'
                    }}
                  />
                  <Marker
                    position={new google.maps.LatLng(center.lat, center.lng)}
                    draggable={true}
                    onDragEnd={event => this.handleMarkerDragEnd(event)}
                    icon={{
                      url: mapPinIcon,
                      scaledSize: new google.maps.Size(34, 55)
                    }}
                  />
                </GoogleMap>
              )
            }
          />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  theme: state.currency.theme
});

const mapDispatch = {
  change
};

export default withStyles(s)(connect(mapState, mapDispatch)(PlaceMap));
