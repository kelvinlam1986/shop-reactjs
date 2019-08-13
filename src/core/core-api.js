import Urls from "./Url";

const getBranchDefault = credentital => {
  return fetch(Urls.GetDefaultBranch, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          return response.json();
        } else {
          return Error(`Request rejected with status ${response.status}`);
        }
      }
    })
    .catch(err => {
      throw err;
    });
};

export { getBranchDefault };
