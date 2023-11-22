import {
  ALL_COUNTRIES,
  COUNTRY_BY_ID,
  COUNTRIES_BY_NAME,
  ALL_ACTIVITIES,
  ALL_CONTINENTS,
  SET_FILTERS,
  SEARCH_TERM,
} from "../Actions/ActionTypes";

const initialState = {
  allCountries: [],
  searchTerm: "",
  countrySearch: [],
  countryDetail: {},
  allActivities: [],
  allContinents: [],
  filters: {
    sortBy: "",
    continent: "",
    population: "",
    activities: [],
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
      };
    case COUNTRIES_BY_NAME:
      return {
        ...state,
        countrySearch: payload,
      };
    case COUNTRY_BY_ID:
      return {
        ...state,
        countryDetail: payload,
      };
    case ALL_ACTIVITIES:
      return {
        ...state,
        allActivities: payload,
      };

    case ALL_CONTINENTS:
      return {
        ...state,
        allContinents: payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
