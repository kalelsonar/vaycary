import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { change } from 'redux-form';

// Google Places Suggest Component
import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Constants
import { googleMapAPI } from '../../../config';

class PlaceGeoSuggest extends Component {

	static propTypes = {
		label: PropTypes.string,
		className: PropTypes.string,
		containerClassName: PropTypes.string,
		setPersonalizedValues: PropTypes.any,
		googleMaps: PropTypes.object,
		personalized: PropTypes.shape({
			location: PropTypes.string,
			lat: PropTypes.number,
			lng: PropTypes.number,
			geography: PropTypes.string
		})
	};

	static defaultProps = {
		personalized: {
			location: null
		}
	}

	constructor(props) {
		super(props);
		this.onSuggestSelect = this.onSuggestSelect.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}


	componentDidMount() {
		document.addEventListener('wheel', this.handleScroll);
		document.addEventListener('mousedown', this.handleBlur);
	}

	componentWillUnmount() {
		document.removeEventListener('wheel', this.handleScroll);
		document.removeEventListener('mousedown', this.handleBlur);
	}

	handleScroll() {
		var element = document.getElementById("geosuggest__input");
		if (element) {
			element.classList.remove("addTextOverflow");
			element.classList.add("removeTextOverflow");
		}
	}

	handleBlur() {
		var element = document.getElementById("geosuggest__input");
		if (element) {
			element.classList.remove("removeTextOverflow");
			element.classList.add("addTextOverflow");
		}
	}

	onSuggestSelect(data) {
		const { setPersonalizedValues } = this.props;
		let locationData = {};
		if (data && data.gmaps) {
			data.gmaps.address_components.map((item, key) => {
				if (item.types[0] == "administrative_area_level_1") {
					locationData["administrative_area_level_1_short"] = item.short_name;
					locationData["administrative_area_level_1_long"] = item.long_name;
				} else if (item.types[0] == "country") {
					locationData[item.types[0]] = item.short_name;
				} else {
					locationData[item.types[0]] = item.long_name;
				}
			});
			setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
			setPersonalizedValues({ name: 'location', value: data.label });
			setPersonalizedValues({ name: 'lat', value: data.location.lat });
			setPersonalizedValues({ name: 'lng', value: data.location.lng });
			setPersonalizedValues({ name: 'chosen', value: 1 });
		}
	}

	async onChange(value) {
		const { setPersonalizedValues, change } = this.props;

		if (value == '') {
			setPersonalizedValues({ name: 'location', value: null });
			setPersonalizedValues({ name: 'chosen', value: null });
			setPersonalizedValues({ name: 'geography', value: null });
			await change('SearchForm', 'location', null);
			await change('SearchForm', 'lat', null);
			await change('SearchForm', 'lng', null);
			await change('SearchForm', 'geography', null);
			await change('SearchForm', 'sw_lat', null);
			await change('SearchForm', 'sw_lng', null);
			await change('SearchForm', 'ne_lat', null);
			await change('SearchForm', 'ne_lng', null);
			await change('SearchForm', 'geoType', null);
			await change('SearchForm', 'currentPage', 1);
		}
	}

	render() {
		const { label, className, containerClassName, personalized, loadField } = this.props;
		return (
			<div>
				<ReactGoogleMapLoader
					params={{
						key: googleMapAPI, // Define your api key here
						libraries: "places", // To request multiple libraries, separate them with a comma
					}}
					render={googleMaps => {
						if (googleMaps) {
							return (
								<Geosuggest
									ref={el => this._geoSuggest = el}
									placeholder={label}
									inputClassName={className}
									className={containerClassName}
									initialValue={personalized.location}
									onChange={this.onChange}
									onSuggestSelect={this.onSuggestSelect}
									onKeyPress={e => {
										if (e.key === 'Enter') e.preventDefault();
									}
									}
									autoComplete={'off'}
								/>
							)
						} else if (loadField) {
							return loadField && loadField();
						} else {
							return null
						}
					}
					}
				/>
			</div>
		)
	}
}

const mapState = (state) => ({
	personalized: state.personalized
});

const mapDispatch = {
	setPersonalizedValues,
	change
};

export default withStyles(s)(connect(mapState, mapDispatch)(PlaceGeoSuggest));