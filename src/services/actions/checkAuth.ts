import { NORMA_API } from "../../utils/burger-api"
import { User, api } from "../../utils/request"

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED'
export const SET_USER = 'SET_USER'

export const setAuthChecked = (value: boolean) => ({
    type: SET_AUTH_CHECKED,
    payload: value
})

export const setUser = (value: User | null) => ({
    type: SET_USER,
    payload: value
})

export const getUser = () => {
    // @ts-ignore
    return (dispatch) => {
        return api.getUser().then((res: any) => {
            dispatch(setUser(res.user))
        })
    }
}

export const checkUserAuth = () => {
    // @ts-ignore
    return (dispatch) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser())
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
}