import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getCountries = (credential, params) => {
    const url = Urls.GetCountry + "/search";
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
        });
}

const putCountry = (credential, params) => {
    return fetch(Urls.PutCountry, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            code: params.code,
            name: params.name
        })
    }).then(response => handleJSONResponse(response),
        err => handleJSONResponse(err)
    ).catch(err => console.log(err));
}

const postCountry = (credential, params) => {
    return fetch(Urls.PostCountry, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            code: params.code,
            name: params.name,
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

export { getCountries, putCountry, postCountry };