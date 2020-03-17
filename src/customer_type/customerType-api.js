import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getCustomerTypes = (credential, params) => {
    const url = Urls.GetCustomerTypes + "/search";
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            keyword: params.keyword,
            page: params.page,
            pageSize: params.pageSize
        })
    }).then(res => handleJSONResponse(res))
        .catch(err => {
            throw err;
        })
}

const postCustomerType = (credential, params) => {
    return fetch(Urls.PostCustomerType, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            code: params.code,
            name: params.name
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

const putCustomerType = (credentital, params) => {
    return fetch(Urls.PutCustomerType, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentital.access_token
        },
        body: JSON.stringify({
            code: params.code,
            name: params.name
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

const deleteCustomerType = (credential, params) => {
    return fetch(Urls.DeleteCustomerType, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            code: params.code
        })
    }).then(res => handleJSONResponse(res),
        err => handleJSONResponse(err))
        .catch(err => {
            throw err
        })
}


export { getCustomerTypes, postCustomerType, putCustomerType, deleteCustomerType };