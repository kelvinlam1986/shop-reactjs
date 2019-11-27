import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";
import config from "../config";

const getSuppliers = (credential, params) => {
    // const url = Urls.GetSuppliers +
    //     `&keyword=${params.keyword}&page=${params.page}&pageSize=${params.pageSize}`;
    const url = Urls.GetSuppliers + "/search"
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            branchId: config.defaultBranch,
            keyword: params.keyword,
            page: params.page,
            pageSize: params.pageSize
        }),
    }).then(res => handleJSONResponse(res))
        .catch(err => {
            throw err;
        })
}

const putSupplier = (credentital, params, id) => {
    return fetch(Urls.PutSupplier + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentital.access_token
        },
        body: JSON.stringify({
            name: params.name,
            address: params.address,
            contact: params.contact
        })
    })
        .then(
            response => handleJSONResponse(response),
            error => handleJSONResponse(error)
        )
        .catch(err => {
            throw err;
        });
};

const postSupplier = (credential, params) => {
    return fetch(Urls.PostSupplier, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            name: params.name,
            address: params.address,
            contact: params.contact,
            branchId: params.branchId
        })
    })
        .then(
            response => handleJSONResponse(response),
            error => handleJSONResponse(error)
        )
        .catch(err => {
            throw err;
        });
}

export { getSuppliers, putSupplier, postSupplier };