import {
  GET_BRANCH,
  GET_BRANCH_SUCCESS,
  GET_BRANCH_FAILED,
  REDIRECT_TO_LOGIN
} from "./core-action-creator";

const coreInitialState = {
  branch: null,
  loading: false,
  redirectToLogin: false,
  error: ""
};

const coreReducer = (state = coreInitialState, action) => {
  switch (action.type) {
    case GET_BRANCH:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_BRANCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        branch: action.payload.branch,
        error: ""
      });
    case GET_BRANCH_FAILED:
      return Object.assign({}, state, {
        loading: false,
        branch: null,
        error: action.payload.error
      });

    case REDIRECT_TO_LOGIN:
      return Object.assign({}, state, {
        redirectToLogin: true
      });
    default:
      return state;
  }
};

export default coreReducer;
