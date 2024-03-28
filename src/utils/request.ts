import { IIngredientsSuccess } from "../services/actions/ingredients";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../services/constants";
import { TIngredient, User } from "../services/types/data";
import { NORMA_API } from "./burger-api";
import { AppThunk } from "./dispatch";

type TServerResponse<T> = {
    success: boolean;
} & T;

export type TIngredientsResponse = TServerResponse<{
    data: TIngredient[]
}>

export const checkReponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint: RequestInfo, options: any) => {
    return fetch(`${NORMA_API}/${endpoint}`, options)
        .then(res => checkReponse(res))
}

export const getIngredients = (): AppThunk => (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetch(`${NORMA_API}/ingredients`)
        .then(res => checkReponse<TIngredientsResponse>(res))
        .then(res => dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data } as IIngredientsSuccess))
        .catch(err => dispatch({ type: GET_INGREDIENTS_FAILED }))
}

export type TRefreshToken = TServerResponse<{
    accessToken: string,
    refreshToken: string
}>

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
    .then(res => checkReponse<TRefreshToken>(res))
    .then((refreshData) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken); 
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
    });
};
  
export const fetchWithRefresh = async<T> (endpoint: RequestInfo, options: any) => {
    try {
        const res = await fetch(`${NORMA_API}/${endpoint}`, options);
        return await checkReponse<T>(res);
    } catch (err) {
        if ((err as { message: string }).message === "jwt expired") {
            const refreshData = await refreshToken();
            if (options.headers) {
                (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
            }
            const res = await fetch(`${NORMA_API}/${endpoint}`, options);
            return await checkReponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};

type TUser = TServerResponse<User>

export const getUser = () => {
    return fetchWithRefresh<TUser>('auth/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken')
        },
    })
}
