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

// return fetch("/api/posts/unlike", {
//   method: "PUT",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + credential.t
//   },
//   body: JSON.stringify({ userId: params.userId, postId: postId })
// })
//   .then(respsonse => {
//     return respsonse.json();
//   })
//   .catch(err => console.log(err));

export { getCategories, putCategory };
