import Urls from "../core/Url";
import handleJSONResponse from "../core/handleResponse";

const getReceiptType = (credential, params) => {
    const url = Urls.GetReceiptTypes + "/search";
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

const postReceiptType = (credential, params) => {
    return fetch(Urls.PostReceiptType, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credential.access_token
        },
        body: JSON.stringify({
            code: params.code,
            receiptTypeInVietnamese: params.receiptTypeInVietnamese,
            receiptTypeInSecondLanguage: params.receiptTypeInSecondLanguage,
            showReceiptTypeInVietNamese: params.showReceiptTypeInVietNamese
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

const putReceiptType = (credentital, params) => {
    return fetch(Urls.PutReceiptType, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentital.access_token
        },
        body: JSON.stringify({
            code: params.code,
            receiptTypeInVietnamese: params.receiptTypeInVietnamese,
            receiptTypeInSecondLanguage: params.receiptTypeInSecondLanguage,
            showReceiptTypeInVietNamese: params.showReceiptTypeInVietNamese
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

const deleteReceiptType = (credential, params) => {
    return fetch(Urls.DeleteReceiptType, {
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


export { getReceiptType, postReceiptType, putReceiptType, deleteReceiptType };