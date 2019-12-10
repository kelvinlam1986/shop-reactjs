const GET_COUNTRIES = "GET_COUNTRIES";
const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
const GET_COUNTRIES_FAILED = "GET_COUNTRIES_FAILED";
const SET_LOADING_COUNTRY = "SET_LOADING_COUNTRY";

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

export {
    SET_LOADING_COUNTRY,
    GET_COUNTRIES,
    GET_COUNTRIES_FAILED,
    GET_COUNTRIES_SUCCESS,
    setLoadingCountry,
    getCountriesAction,
    getCountriesActionFailed,
    getCountriesActionSuccess
};

