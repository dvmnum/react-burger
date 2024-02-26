import { NORMA_API } from "./burger-api";

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint, options) => {
    return fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse)
}