const GET_BRANCH = "GET_BRANCH";
const GET_BRANCH_SUCCESS = "GET_BRANCH_SUCCESS";
const GET_BRANCH_FAILED = "GET_BRANCH_FAILED";
const REDIRECT_TO_LOGIN = "REDIRECT_TO_LOGIN";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const getBranchAction = () => {
  return { type: GET_BRANCH };
};

const getBranchActionSuccess = data => {
  return { type: GET_BRANCH_SUCCESS, payload: { branch: data } };
};

const getBranchActionFailed = error => {
  return { type: GET_BRANCH_FAILED, payload: { error: error } };
};

const loginRequest = (user, history) => {
  return { type: LOGIN_REQUEST, user, history };
};

const loginSuccess = username => {
  return {
    type: LOGIN_SUCCESS,
    payload: { username: username }
  };
};

const loginFailed = error => {
  return { type: LOGIN_FAILED, payload: { error: error } };
};

const redirectToLoginAction = () => {
  return { type: REDIRECT_TO_LOGIN };
};

export {
  GET_BRANCH,
  GET_BRANCH_SUCCESS,
  GET_BRANCH_FAILED,
  REDIRECT_TO_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  getBranchAction,
  getBranchActionSuccess,
  getBranchActionFailed,
  redirectToLoginAction,
  loginRequest,
  loginSuccess,
  loginFailed
};
