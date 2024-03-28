import { AppThunk } from "../../utils/dispatch";
import { getUser } from "../../utils/request"
import {
    SET_AUTH_CHECKED,
    SET_USER
} from "../constants"
import { User } from "../types/data"

export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean;
}

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: User | null
}

export type TCheckAuthActions = 
    | ISetAuthChecked
    | ISetUser

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
    type: SET_AUTH_CHECKED,
    payload: value
})

export const setUser = (value: User | null): ISetUser => ({
    type: SET_USER,
    payload: value
})

export const checkUserAuth = (): AppThunk => (dispatch) => {
    if (localStorage.getItem('accessToken')) {
        return getUser()
            .then((res: any) => {
                dispatch(setUser(res.user))
            })
            .catch(() => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                dispatch(setUser(null))
            })
            .finally(() => dispatch(setAuthChecked(true)))
    } else {
        dispatch(setAuthChecked(true))
    }
}