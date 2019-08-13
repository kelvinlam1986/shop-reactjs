const GET_BRANCH = "GET_BRANCH";
const GET_BRANCH_SUCCESS = "GET_BRANCH_SUCCESS";
const GET_BRANCH_FAILED = "GET_BRANCH_FAILED";
const REDIRECT_TO_LOGIN = "REDIRECT_TO_LOGIN";

const getBranchAction = () => {
  return { type: GET_BRANCH };
};

const getBranchActionSuccess = data => {
  return { type: GET_BRANCH_SUCCESS, payload: { branch: data } };
};

const getBranchActionFailed = error => {
  return { type: GET_BRANCH_FAILED, payload: { error: error } };
};

const redirectToLoginAction = () => {
  return { type: REDIRECT_TO_LOGIN };
};

export {
  GET_BRANCH,
  GET_BRANCH_SUCCESS,
  GET_BRANCH_FAILED,
  REDIRECT_TO_LOGIN,
  getBranchAction,
  getBranchActionSuccess,
  getBranchActionFailed,
  redirectToLoginAction
};
