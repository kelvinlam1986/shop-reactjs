import Urls from "./Url";
import { spinnerService } from "@simply007org/react-spinners";

const getBranchDefault = () => {
  spinnerService.show("shop-spinner");
  return fetch(Urls.GetDefaultBranch, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      spinnerService.hideAll();
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
      spinnerService.hideAll();
      throw err;
    });
};

export { getBranchDefault };
