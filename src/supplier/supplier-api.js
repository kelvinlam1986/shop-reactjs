import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getSuppliers = (credential, params) => {
    const url = Urls.GetSuppliers +
        `&keyword=${params.keyword}&page=${params.page}&pageSize=${params.pageSize}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        }
    }).then(res => handleJSONResponse(res))
        .catch(err => {
            throw err;
        })
}

export { getSuppliers };