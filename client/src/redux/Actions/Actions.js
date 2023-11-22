import axios from "axios";
import {
  ALL_ACTIVITIES,
  ALL_COUNTRIES,
  COUNTRIES_BY_NAME,
  COUNTRY_BY_ID,
  ALL_CONTINENTS,
  SET_FILTERS,
  SEARCH_TERM,
} from "../../redux/Actions/ActionTypes";

const URLSERVER = "http://localhost:3001";

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URLSERVER}/countries`);
      const countries = response.data;
      dispatch({
        type: ALL_COUNTRIES,
        payload: countries,
      });
    } catch (error) {
      console.error("Error al obtener todos los paises", error);
    }
  };
};

export const getCountryByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URLSERVER}/countries/name?name=${name}`
      );
      dispatch({
        type: COUNTRIES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener el pais por nombre", error);
    }
  };
};

export const resetCountryByName = () => {
  return async (dispatch) => {
    dispatch({
      type: COUNTRIES_BY_NAME,
      payload: [],
    });
  };
};

export const resetFilters = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_FILTERS,
      payload: {
        sortBy: "",
        continent: "",
        population: "",
        activities: [],
      },
    });
  };
};

export const getCountryById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URLSERVER}/countries/${id}`);
      console.log("entrando a la action");
      dispatch({
        type: COUNTRY_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener el detalle del pais", error);
    }
  };
};
export const getAllActivities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URLSERVER}/activities`);
      dispatch({
        type: ALL_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener todas las actividades", error);
    }
  };
};

/*----------Nuevas Action para los filtros---------------------*/

export const getAllContinents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URLSERVER}/countries`);
      // Utilizar un Set para extraer continentes únicos
      const continentesSet = new Set(
        response.data.map((objeto) => objeto.continent)
      );

      // Convertir el Set a un array
      const continentes = Array.from(continentesSet);
      // console.log("vista de la action", continentes);

      dispatch({
        type: ALL_CONTINENTS,
        payload: continentes,
      });
    } catch (error) {
      console.error("Error al obtener todos los continentes", error);
    }
  };
};

export const setFilters = (payload) => ({
  type: SET_FILTERS,
  payload,
});

export const setSearchTerm = (payload) => ({
  type: SEARCH_TERM,
  payload,
});

export const createActivity = async (body) => {
  console.log("body", body);

  try {
    const response = await axios.post(`${URLSERVER}/activities`, body);
    console.log("response", response);
  } catch (error) {
    console.error("Error al crear la actividad", error);
  }
};
