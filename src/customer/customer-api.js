import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";
import config from "../config";

const getCustomers = (credentital, params) => {
  const url = Urls.GetCustomers + "/search";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({
      branchId: config.defaultBranch,
      keyword: params.keyword,
      page: params.page,
      pageSize: params.pageSize
    })
  })
    .then(res => handleJSONResponse(res))
    .catch(err => {
      throw err;
    });
};

const putCustomer = (credentital, params, id) => {
  return fetch(Urls.PutCustomer + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({
      firstName: params.firstName,
      lastName: params.lastName,
      address: params.address,
      contact: params.contact
    })
  })
    .then(
      response => handleJSONResponse(response),
      error => handleJSONResponse(error)
    )
    .catch(err => {
      throw err;
    });
};

export { getCustomers, putCustomer };
