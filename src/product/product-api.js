import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getProducts = (credentital, params) => {
  const url =
    Urls.GetProducts +
    `&keyword=${params.keyword}&page=${params.page}&pageSize=${params.pageSize}`;
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

export { getProducts };
