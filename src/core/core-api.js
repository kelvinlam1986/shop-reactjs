import Urls from "./Url";
import handleJSONResponse from "../core/handleResponse";

const getBranchDefault = credentital => {
  return fetch(Urls.GetDefaultBranch, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    }
  })
    .then(response => handleJSONResponse(response))
    .catch(err => {
      throw err;
    });
};

export { getBranchDefault };
