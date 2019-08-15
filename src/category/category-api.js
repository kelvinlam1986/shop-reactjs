import Urls from "../core/Url";

const getCategories = (credentital, params) => {
  const url =
    Urls.GetCategories +
    `?keyword=${params.keyword}&page=${params.page}&pageSize=${
      params.pageSize
    }`;
  return fetch(url, {
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

export { getCategories };
