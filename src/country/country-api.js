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

export { getCountries };