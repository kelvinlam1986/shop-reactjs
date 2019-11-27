import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getCategories = (credentital, params) => {
  const url =
    Urls.GetCategories + "/search"

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({
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

const putCategory = (credentital, params, id) => {
  return fetch(Urls.GetCategories + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({ name: params.name })
  })
    .then(
      response => handleJSONResponse(response),
      err => handleJSONResponse(err)
    )
    .catch(err => {
      throw err;
    });
};

const postCategory = (credentital, params) => {
  return fetch(Urls.GetCategories, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({ name: params.name })
  })
    .then(
      response => handleJSONResponse(response),
      err => handleJSONResponse(err)
    )
    .catch(err => {
      throw err;
    });
};

export { getCategories, putCategory, postCategory };
