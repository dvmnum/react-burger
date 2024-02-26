import { NORMA_API } from "./burger-api";

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint, options) => {
    return fetch(`${NORMA_API}/${endpoint}`, options).then(checkReponse)
}

export const refreshToken = () => {
    return fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
    .then(checkReponse)
    .then((refreshData) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken); 
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
    });
};
  
export const fetchWithRefresh = async (endpoint, options) => {
    try {
        const res = await fetch(`${NORMA_API}/${endpoint}`, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(`${NORMA_API}/${endpoint}`, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const getUser = () => {
    return request('auth/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken')
        },
    })
}

export const api = { getUser }