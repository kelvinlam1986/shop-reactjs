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

const putCategory = (credentital, params, id) => {
  return fetch(Urls.GetCategories + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({ name: params.name })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (
          response.status === 404 ||
          response.status === 400 ||
          response.status === 500
        ) {
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

const postCategory = (credentital, params) => {
  return fetch(Urls.GetCategories, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    },
    body: JSON.stringify({ name: params.name })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (
          response.status === 404 ||
          response.status === 400 ||
          response.status === 500
        ) {
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

export { getCategories, putCategory, postCategory };
