import Urls from "../core/Url";
import { spinnerService } from "@simply007org/react-spinners";

const signin = user => {
  spinnerService.show("shop-spinner");
  return fetch(Urls.Token, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    credentials: "include",
    body: `username=${user.username}&password=${
      user.password
    }&client_id=ShopApi&grant_type=password&scope=offine_access profile email`
  })
    .then(res => {
      spinnerService.hideAll();
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
      spinnerService.hideAll();
      throw e;
    });
};

const signout = () => {
  return fetch(Urls.SignOut, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json)
    .catch(err => console.log(err));
};

export { signin, signout };
