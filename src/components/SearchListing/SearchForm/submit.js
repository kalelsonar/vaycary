// Fetch request
import fetch from '../../../core/fetch';

// Redux
import { getSearchResults, loadingSearchResults } from '../../../actions/getSearchResults';

async function submit(values, dispatch) {

  dispatch(loadingSearchResults());
  const query =
    `query(
      $offset: Int
      $loadCount: Int
      $personCapacity: Int,
      $dates: String,
      $currentPage: Int,
      $lat: Float,
      $lng: Float,
      $roomType: [Int],
      $bedrooms: Int,
      $bathrooms: Int,
      $beds: Int,
      $amenities: [Int],
      $safetyAmenities: [Int],
      $spaces: [Int],
      $houseRules: [Int],
      $priceRange: [Float],
      $geography: String,
      $bookingType: String,
      $geoType: String,
      $searchByMap: Boolean,
      $sw_lat: Float,
      $sw_lng: Float,
      $ne_lat: Float,
      $ne_lng: Float,
      $isOneTotalToggle: Boolean
    ){
      SearchListing(
        offset: $offset
        loadCount: $loadCount
        personCapacity: $personCapacity,
        dates: $dates,
        currentPage: $currentPage
        lat: $lat,
        lng: $lng,
        roomType: $roomType,
        bedrooms: $bedrooms,
        bathrooms: $bathrooms,
        beds: $beds,
        amenities: $amenities,
        safetyAmenities: $safetyAmenities,
        spaces: $spaces,
        houseRules: $houseRules,
        priceRange: $priceRange,
        geography: $geography,
        bookingType: $bookingType,
        geoType: $geoType,
        searchByMap: $searchByMap,
        sw_lat: $sw_lat,
        sw_lng: $sw_lng,
        ne_lat: $ne_lat,
        ne_lng: $ne_lng,
        isOneTotalToggle: $isOneTotalToggle
      ) {
        count
        searchCount
        results {
          id
          title
          personCapacity
          lat
          lng
          beds
          coverPhoto
          bookingType
          reviewsCount,
          reviewsStarRating,
          listPhotos {
            id
            name
            type
            status
          }
          listingData {
            basePrice
            currency
            minNight
            maxNight
            cleaningPrice
            weeklyDiscount
            monthlyDiscount
            checkInStart
            checkInEnd
            dates
            isOneTotalToggle
            oneTotalPrice
          }
          serviceFees{
            guestType
            guestValue
            currency
          }
          blockedDates{
            blockedDates
            calendarStatus
            isSpecialPrice
            dayStatus
          }
          settingsData {
            listsettings {
              id
              itemName
              itemDescription
            }
          }
          wishListStatus
          isListOwner
        }
      }
    }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data?.SearchListing) {
    dispatch(getSearchResults(data?.SearchListing));
  }

}

export default submit;
