import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";
import config from "../config";

const getProducts = (credentital, params) => {
  const url = Urls.GetProducts + "/search";
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

const getSelectionCategories = (credentital, params) => {
  const url = Urls.GetCategories + "/all";
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    }
  }).then((res => handleJSONResponse(res)))
    .catch(err => {
      throw err;
    })
}

const getSelectionSuppliers = (credentital, params) => {
  const url = Urls.GetSupplierSelection;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentital.access_token
    }
  }).then(res => handleJSONResponse(res))
    .catch(err => {
      throw err
    })
}

const putProduct = (credential, params, id) => {
  return fetch(Urls.PutProduct + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + credential.access_token
    },
    body: JSON.stringify({
      serial: params.serial,
      name: params.name,
      description: params.description,
      categoryId: params.categoryId,
      supplierId: params.supplierId,
      price: params.price,
      reOrder: params.reorder
    })
  }).then(response => handleJSONResponse(response),
    error => handleJSONResponse(error)
  ).catch(err => { throw err; })
}

export { getProducts, getSelectionCategories, getSelectionSuppliers, putProduct };
