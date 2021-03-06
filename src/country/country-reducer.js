import {
    SET_LOADING_COUNTRY,
    GET_COUNTRIES,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILED,
    LOAD_CURRENT_COUNTRY,
    RESET_CURRENT_COUNTRY,
    RESET_NEW_COUNTRY
} from "./country-action-creator"

const countryInitialState = {
    countries: [],
    loading: false,
    error: "",
    totalPages: 0,
    page: 1,
    currentCountry: {
        code: "",
        name: ""
    },
    addNewCountry: {
        code: "",
        name: ""
    }
}

const countryReducer = (state = countryInitialState, action) => {
    switch (action.type) {
        case SET_LOADING_COUNTRY:
            return Object.assign({}, state, {
                loading: action.isLoading
            });
        case GET_COUNTRIES:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_COUNTRIES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                countries: action.payload.countries,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                error: ""
            });
        case GET_COUNTRIES_FAILED:
            return Object.assign({}, state, {
                loading: false,
                countries: null,
                error: action.payload.error
            });
        case LOAD_CURRENT_COUNTRY:
            return Object.assign({}, state, {
                currentCountry: action.payload.currentCountry
            });
        case RESET_CURRENT_COUNTRY:
            return Object.assign({}, state, {
                currentCountry: {
                    code: "",
                    name: "",
                }
            });
        case RESET_NEW_COUNTRY:
            return Object.assign({}, state, {
                addNewCountry: {
                    code: "",
                    name: "",
                }
            });
        default:
            return state;

    }
}

export default countryReducer;