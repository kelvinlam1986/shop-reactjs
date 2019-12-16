const GET_COUNTRIES = "GET_COUNTRIES";
const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
const GET_COUNTRIES_FAILED = "GET_COUNTRIES_FAILED";
const SET_LOADING_COUNTRY = "SET_LOADING_COUNTRY";
const LOAD_CURRENT_COUNTRY = "LOAD_CURRENT_COUNTRY";
const RESET_CURRENT_COUNTRY = "RESET_CURRENT_COUNTRY";
const RESET_NEW_COUNTRY = "RESET_NEW_COUNTRY";

const setLoadingCountry = isLoading => {
    return {
        type: SET_LOADING_COUNTRY,
        isLoading: isLoading
    };
};

const getCountriesAction = params => {
    return {
        type: GET_COUNTRIES,
        params: params
    };
};

const getCountriesActionSuccess = data => {
    return {
        type: GET_COUNTRIES_SUCCESS,
        payload: {
            countries: data.items,
            totalPages: data.totalPage,
            page: data.page + 1
        }
    };
};

const getCountriesActionFailed = error => {
    return { type: GET_COUNTRIES_FAILED, payload: { error: error } };
};

const loadCurrentCountry = currentCountry => {
    return { type: LOAD_CURRENT_COUNTRY, payload: { currentCountry } };
};

const resetCurrentCountry = () => {
    return { type: RESET_CURRENT_COUNTRY };
};

const resetNewCountry = () => {
    return { type: RESET_NEW_COUNTRY };
}

export {
    SET_LOADING_COUNTRY,
    GET_COUNTRIES,
    GET_COUNTRIES_FAILED,
    GET_COUNTRIES_SUCCESS,
    LOAD_CURRENT_COUNTRY,
    RESET_CURRENT_COUNTRY,
    RESET_NEW_COUNTRY,
    setLoadingCountry,
    getCountriesAction,
    getCountriesActionFailed,
    getCountriesActionSuccess,
    loadCurrentCountry,
    resetCurrentCountry,
    resetNewCountry
};

