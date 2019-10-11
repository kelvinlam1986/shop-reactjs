import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getCategories = (credentital, params) => {
  const url =
    Urls.GetCategories +
    `?keyword=${params.keyword}&page=${params.page}&pageSize=${params.pageSize}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    }
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
