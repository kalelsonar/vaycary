import { reset, change } from "redux-form";
import { getSearchResults, loadingSearchResults } from "./getSearchResults";
import GetSearchResults from "../../src/components/SearchListing/SearchResults/GetSearchResults.graphql"
import {
  SEARCH_LISTING_START,
  SEARCH_LISTING_SUCCESS,
  SEARCH_LISTING_ERROR,
} from "../constants";

export function searchListing({
  personCapacity,
  dates,
  geography,
  currentPage,
  geoType,
  lat,
  lng,
  sw_lat,
  sw_lng,
  ne_lat,
  ne_lng,
  location,
  totalPrice
}) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: SEARCH_LISTING_START });
    const searchByMap = getState()?.form?.SearchForm?.values?.searchByMap;
    dispatch(loadingSearchResults());
    dispatch(reset("SearchForm"));
    dispatch(change("SearchForm", "searchByMap", searchByMap))
    try {
      const { data } = await client.query({
        query: GetSearchResults,
        variables: {
          personCapacity: Number(personCapacity),
          dates,
          currentPage,
          geography,
          geoType,
          lat,
          lng,
          sw_lat,
          sw_lng,
          ne_lat,
          ne_lng,
          location,
          totalPrice
        },
        fetchPolicy: "network-only",
      });
      if (data?.SearchListing) {
        dispatch({ type: SEARCH_LISTING_SUCCESS });
        await Promise.all([
          dispatch(change("SearchForm", "personCapacity", personCapacity)),
          dispatch(change("SearchForm", "dates", dates)),
          dispatch(change("SearchForm", "geography", geography)),
          dispatch(change("SearchForm", "currentPage", currentPage)),
          dispatch(change("SearchForm", "geoType", geoType)),
          dispatch(change("SearchForm", "lat", lat)),
          dispatch(change("SearchForm", "lng", lng)),
          dispatch(change("SearchForm", "sw_lat", sw_lat)),
          dispatch(change("SearchForm", "sw_lng", sw_lng)),
          dispatch(change("SearchForm", "ne_lat", ne_lat)),
          dispatch(change("SearchForm", "ne_lng", ne_lng)),
          dispatch(change("SearchForm", "initialLoad", true)),
          dispatch(change("SearchForm", "markerHighlight", {})),
          // Default Map Show
          dispatch(change("SearchForm", "showMap", true)),
          dispatch(change("SearchForm", "totalPrice", totalPrice)),
        ]);
        dispatch(getSearchResults(data?.SearchListing));
      }
    } catch (error) {
      dispatch({
        type: SEARCH_LISTING_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
