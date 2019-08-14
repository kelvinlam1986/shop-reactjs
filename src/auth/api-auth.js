import Urls from "../core/Url";

const signin = user => {
  return fetch(Urls.Token, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    credentials: "include",
    body: `username=${user.username}&password=${
      user.password
    }&client_id=ShopApi&grant_type=password&scope=offine_access profile email`
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 400) {
          return res.json();
        } else {
          return Error(`Request rejected with status ${res.status}`);
        }
      }
    })
    .catch(e => {
      throw e;
    });
};

export { signin };
