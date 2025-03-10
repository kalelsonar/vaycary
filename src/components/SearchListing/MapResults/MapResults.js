import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { connect } from 'react-redux';
import { formValueSelector, change, submit as submitForm, reduxForm } from 'redux-form';
import { GoogleMap, InfoBox, Marker, OverlayView } from "@react-google-maps/api";

import ListingItem from '../ListingItem/ListingItem';
import RedoSearch from '../RedoSearch';
import CustomOverlayView from './CustomOverlayView';
import CurrencyConverter from '../../CurrencyConverter';

import submit from '../SearchForm/submit';
import { setPersonalizedValues } from '../../../actions/personalized';
import { searchListing } from '../../../actions/searchListing';
import { mapThemeStyle } from '../../../helpers/mapThemeStyle';
import { mapResults, getMarkerIcon, getPixelPositionOffset, containerStyle, refs } from '../../../helpers/mapResultsHelper';

import mapPinIcon from '/public/SiteIcons/map-pin-small.png';

import s from './MapResults.css';

class MapResults extends React.Component {

  static propTypes = {
    initialFilter: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      personCapacity: PropTypes.number,
      dates: PropTypes.string
    }),
    results: PropTypes.array,
    personalized: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    change: PropTypes.any,
    submitForm: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      bounds: {},
      searchByMapResults: false,
      isMapDrag: false,
      isMapZoom: false,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{
            color: '#a4ddf5'
          }]
        }
      ]
    };
  }

  componentDidMount() {
    const { results, initialFilter, personalized, theme } = this.props;
    const { hover, center } = this.state;
    let bounds = new google.maps.LatLngBounds(), southWest, northEast;
    if (initialFilter?.lat && initialFilter?.lng) {
      southWest = new google.maps.LatLng(initialFilter?.sw_lat, initialFilter?.sw_lng);
      northEast = new google.maps.LatLng(initialFilter?.ne_lat, initialFilter?.ne_lng);
      bounds.extend(southWest);
      bounds.extend(northEast);
    }
    let positions = [], defaultCordinates, data, centerValue;
    if (results?.length > 0) {
      results?.map((item) => {
        data = mapResults(item, hover);
        positions.push(data);
        bounds.extend(new google.maps.LatLng(item?.lat, item?.lng));
      })
      this.setState({ markers: positions, bounds });
    } else {
      if (personalized?.lat && personalized?.lng) {
        centerValue = {
          lat: personalized?.lat,
          lng: personalized?.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue?.lat, centerValue?.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter?.lat && initialFilter?.lng) {
        centerValue = {
          lat: initialFilter?.lat,
          lng: initialFilter?.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue?.lat, centerValue?.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else {
        defaultCordinates = new google.maps.LatLng(center?.lat, center?.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds });
      }
    }
    this.setState({
      styles: mapThemeStyle(theme)
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { results, initialFilter, searchByMapValue, markerHighlight, theme } = nextProps;
    const { searchByMapResults } = this.state;
    let { hover, center } = this.state, bounds = new google.maps.LatLngBounds(), southWest, northEast;
    this.setState({ searchByMapResults: searchByMapValue });
    let defaultCordinates, centerValue, positions = [], data, position;

    if (initialFilter?.lat && initialFilter?.lng) {
      southWest = new google.maps.LatLng(initialFilter?.sw_lat, initialFilter?.sw_lng);
      northEast = new google.maps.LatLng(initialFilter?.ne_lat, initialFilter?.ne_lng);
      bounds.extend(southWest);
      bounds.extend(northEast);
    }

    if (results?.length > 0) {
      results?.map((item) => {
        position = new google.maps.LatLng(item?.lat, item?.lng);
        if (markerHighlight) hover = markerHighlight?.id == item?.id ? true : false;
        bounds.extend(position);
        data = mapResults(item, hover);
        positions.push(data);
      });
      this.setState({
        markers: positions,
        bounds
      });
    } else {
      if (initialFilter?.lat && initialFilter?.lng) {
        centerValue = {
          lat: initialFilter?.lat,
          lng: initialFilter?.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue?.lat, centerValue?.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ bounds, center: centerValue });
        }
      } else {
        defaultCordinates = new google.maps.LatLng(center?.lat, center?.lng);
        bounds.extend(defaultCordinates);
        if (!searchByMapResults) {
          this.setState({ bounds });
        }
      }
      this.setState({ markers: [] });
    }
    this.setState({ styles: mapThemeStyle(theme) })
  }

  componentWillUnmount() {
    const { change } = this.props;
    change('initialLoad', true);
  }

  handleFitBounds = async (map) => {
    const { bounds } = this.state;
    const { initialLoad, initialFilter, results, personalized } = this.props;
    let southWest, northEast, boundsData, new_bounds;
    if (results?.length > 0) {
      boundsData = bounds;
    } else if (initialFilter?.lat && initialFilter?.lng) {
      new_bounds = new google.maps.LatLngBounds();
      southWest = new google.maps.LatLng(initialFilter?.sw_lat, initialFilter?.sw_lng);
      northEast = new google.maps.LatLng(initialFilter.ne_lat, initialFilter?.ne_lng);
      new_bounds.extend(southWest);
      new_bounds.extend(northEast);
      boundsData = new_bounds;
    } else if (personalized?.southWest && personalized?.northEast) {
      new_bounds = new google.maps.LatLngBounds();
      new_bounds.extend(personalized?.southWest);
      new_bounds.extend(personalized?.northEast);
      boundsData = new_bounds;
    } else {
      new_bounds = new google.maps.LatLngBounds();
      southWest = new google.maps.LatLng(9.854550803628602, 80.12749270688475);
      northEast = new google.maps.LatLng(46.588831619427665, -120.63917188786621);
      new_bounds.extend(southWest);
      new_bounds.extend(northEast);
      boundsData = new_bounds;
    }
    if (map && initialLoad && boundsData != {}) {
      map.fitBounds(boundsData);
    }
    refs.map = map;
  }

  getCenter = (e) => {
    let center, lat, lng;
    if (refs?.map) {
      center = refs?.map?.getCenter();
      lat = center?.lat();
      lng = center?.lng();
    }
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state && this.state.markers && this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
            icon: mapPinIcon,
            hovered: true
          };
        } else {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false
          };
        }
        return marker;
      }),
      center: {
        lat: targetMarker.lat,
        lng: targetMarker.lng
      },
      bounds: null
    });
  }

  handleMarkerClose = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon,
            hovered: false
          };
        }
        return marker;
      }),
    });
  }

  handleOnDragStart = async () => {
    const { change } = this.props;
    this.setState({
      isMapDrag: true
    });
    await change('initialLoad', true);
  }

  handleZoomChanged = async () => {
    const { change, submitForm, searchByMapValue, smallDevice } = this.props;
    const { isMapZoom } = this.state;
    if (refs?.map && isMapZoom === false) {
      this.setState({ isMapZoom: !isMapZoom });
    }

    let center, lat, lng, bounds, northEast, southWest, zoom;
    let new_sw, new_ne, new_bounds;

    if (refs?.map && isMapZoom) {
      center = refs?.map?.getCenter();
      zoom = refs?.map?.getZoom();
      lat = center?.lat();
      lng = center?.lng();
      bounds = refs?.map?.getBounds();
      northEast = bounds?.getNorthEast();
      southWest = bounds?.getSouthWest();
      new_sw = new google.maps.LatLng(southWest?.lat(), southWest?.lng());
      new_ne = new google.maps.LatLng(northEast?.lat(), northEast?.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);

      if (searchByMapValue) {
        await Promise.all([
          change('initialLoad', false),
          change('lat', lat),
          change('lng', lng),
          change('sw_lat', southWest.lat()),
          change('sw_lng', southWest.lng()),
          change('ne_lat', northEast.lat()),
          change('ne_lng', northEast.lng()),
          change('zoomLevel', zoom),
          change('currentPage', 1)
        ])
        await submitForm('SearchForm');
      }
    }
  }

  handleOnDragEnd = async () => {
    const { change, submitForm, searchByMapValue, setPersonalizedValues, smallDevice } = this.props;
    const { isMapDrag } = this.state;
    let center, lat, lng, bounds, northEast, southWest, new_sw, new_ne, new_bounds, zoom;

    if (refs?.map && isMapDrag) {
      center = refs?.map?.getCenter();
      zoom = refs?.map?.getZoom();
      lat = center?.lat();
      lng = center?.lng();
      bounds = refs?.map?.getBounds();
      northEast = bounds?.getNorthEast(); // Max
      southWest = bounds?.getSouthWest(); // Min
      new_sw = new google.maps.LatLng(southWest?.lat(), southWest?.lng());
      new_ne = new google.maps.LatLng(northEast.lat(), northEast?.lng());
      new_bounds = new google.maps.LatLngBounds(new_sw, new_ne);

      if (searchByMapValue || smallDevice) {
        await Promise.all([
          change('initialLoad', false),
          change('lat', lat),
          change('lng', lng),
          setPersonalizedValues({ name: 'lat', value: Number(lat) }),
          setPersonalizedValues({ name: 'lng', value: Number(lng) }),
          setPersonalizedValues({ name: 'southWest', value: new_sw }),
          setPersonalizedValues({ name: 'northEast', value: new_ne }),
          change('sw_lat', southWest.lat()),
          change('sw_lng', southWest.lng()),
          change('ne_lat', northEast.lat()),
          change('ne_lng', northEast.lng()),
          change('zoomLevel', zoom),
          change('currentPage', 1)
        ])
        await submitForm('SearchForm');
      }
    }
  }

  render() {
    const { markers, styles } = this.state;
    const { guests, totalPrice } = this.props;

    return (
      <div className={cx(s.mapCanvas, 'searchMap')}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          defaultZoom={12}
          onLoad={this.handleFitBounds}
          onDragStart={this.handleOnDragStart}
          onDragEnd={this.handleOnDragEnd}
          onZoomChanged={() => this.handleZoomChanged()}
          onBoundsChanged={this.handleFitBounds(refs.map)}
          clickableIcons={false}
          onCenterChanged={(e) => this.getCenter(e)}
          options={{
            minZoom: 2,
            maxZoom: 18,
            mapTypeControl: false,
            streetViewControl: false,
            navigationControl: false,
            backgroundColor: '',
            streetViewControl: false,
            zoomControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
            draggable: true,
            fullscreenControl: false,
            styles: styles
          }}
        >
          {markers?.map((marker, key) => {
            let icon = getMarkerIcon(marker);
            let pixelOffset = new google.maps.Size(-140, 0);
            return (
              <div key={key}>
                <Marker
                  position={marker.position}
                  clickable={true}
                  icon={{ url: icon, scale: 5 }}
                  onClick={() => this.handleMarkerClick(marker)}
                  key={Math.random()}
                  zIndex={100 + key}
                >
                  {
                    !marker.showInfo && <CustomOverlayView
                      position={{ lat: marker.lat, lng: marker.lng }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                      getPixelPositionOffset={getPixelPositionOffset}
                    >
                      <div className={cx(s.customMarkerContainer, { [s.hoveredMarker]: marker.hovered == true })}>
                        <div className={s.customMarkerPointBorder}></div>
                        <div className={cx(s.customMarkerContent, 'textWhite', 'bgBlack')}>
                          {
                            <CurrencyConverter
                              amount={totalPrice ? marker?.oneTotalPrice : marker?.basePrice}
                              from={marker?.currency}
                            />
                          }
                        </div>
                        <div className={cx(s.customMarkerPoint, 'bgBlack')}></div>
                      </div>
                    </CustomOverlayView>
                  }
                  {
                    marker?.showInfo && <InfoBox
                      onCloseClick={() => { this.handleMarkerClose(marker) }}
                      options={{
                        closeBoxURL: ``,
                        alignBottom: true,
                        boxStyle: {
                          width: "350px",
                          paddingTop: '50px',
                          paddingBottom: '35px',
                          minHeight: "145px",
                          maxWidth: "350px",
                          overflow: "hidden"
                        },
                        pixelOffset: pixelOffset,
                        enableEventPropagation: true,
                      }}
                      position={marker.position}
                      zIndex={330}
                    >
                      <div>
                        <ListingItem
                          id={marker?.id}
                          basePrice={marker?.basePrice}
                          currency={marker?.currency}
                          title={marker?.title}
                          beds={marker?.beds}
                          personCapacity={marker?.personCapacity}
                          roomType={marker?.roomType}
                          coverPhoto={marker?.coverPhoto}
                          listPhotos={marker?.listPhotos}
                          bookingType={marker?.bookingType}
                          reviewsCount={marker?.reviewsCount}
                          reviewsStarRating={marker?.reviewsStarRating}
                          wishListStatus={marker?.wishListStatus}
                          isListOwner={marker?.isListOwner}
                          onCloseClick={() => this.handleMarkerClose(marker)}
                          showMap={true}
                          personCount={guests}
                          oneTotalPrice={marker?.oneTotalPrice}
                        />
                      </div>
                    </InfoBox>
                  }
                </Marker>
              </div>
            )
          })}
          <></>
        </GoogleMap>
        <div className={s.responsiveView}>
          <RedoSearch />
        </div>
      </div>
    );
  }
}

MapResults = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(MapResults);

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state?.search?.data,
  personalized: state?.personalized,
  searchByMapValue: selector(state, 'searchByMap'),
  initialLoad: selector(state, 'initialLoad'),
  markerHighlight: selector(state, 'markerHighlight'),
  guests: Number(selector(state, 'personCapacity')),
  theme: state?.currency?.theme,
  totalPrice: state?.personalized?.totalPrice,
});

const mapDispatch = {
  change,
  submitForm,
  setPersonalizedValues,
  searchListing
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MapResults)));