import { REQUEST_METHOD } from "../consts/requestMethodType";
import LocalStorage from "../context/storage/localStorage";
import { APPCONFIG } from '../app.config';


export const ServerRequest = (
    method = REQUEST_METHOD.GET,
    paramsHeaders = null,
    authorize = false,
    urlEndPoint = null,
    paramsUrl = null,
    dataBody = null,
    callbackSuccess = null,
    callbackNoSuccess = null,
    callbackError = null) => 
{

    let headers = new Headers({
        ...paramsHeaders
    });

    if (!paramsHeaders || !paramsHeaders["Content-Type"]) {
        headers.append("Content-Type", "application/json");
    }
    if (authorize) {
        const token = LocalStorage.get("accessToken");
        headers.append("Authorization", `Baerer ${token}`);
    }

    const attr = {
        method: method,
        headers: headers,
        body: (dataBody) ? JSON.stringify(dataBody) : null
    };
    const url = (paramsUrl) ? urlEndPoint + paramsUrl : urlEndPoint;
    const request = new Request(url, attr);

    fetch(request)
    .then((response) => {
        if (response.ok) {
            if (callbackSuccess !== null) callbackSuccess(response);
        }
        else {
            if (response.status === 401) { //Unauthorized
                const url = APPCONFIG.SITE.WEBAPP + 'unauthorized';
                window.location.href = url;
            }
            if (callbackNoSuccess !== null) callbackNoSuccess(response);
        }
    })
    .catch((error) => {
        if (callbackError !== null) callbackError(error);
    });

};

