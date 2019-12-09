import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getBanks = (credential, params) => {
    const url = Urls.GetBanks + "/search";
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

const postBank = (credential, params) => {
    return fetch(Urls.PostBank, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            code: params.code,
            name: params.name,
            address: params.address,
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

const putBank = (credentital, params) => {
    return fetch(Urls.PutBank, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentital.access_token
        },
        body: JSON.stringify({
            code: params.code,
            name: params.name,
            address: params.address,
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

const deleteBank = (credential, params) => {
    return fetch(Urls.DeleteBank, {
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

export { getBanks, postBank, putBank, deleteBank };