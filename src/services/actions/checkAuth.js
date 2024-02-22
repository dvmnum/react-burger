import { NORMA_API } from "../../utils/burger-api"
import { api } from "../../utils/request"

export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED'
export const SET_USER = 'SET_USER'

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value
})

export const setUser = (value) => ({
    type: SET_USER,
    payload: value
})

export const getUser = () => {
    return (dispatch) => {
        return api.getUser().then((res) => {
            dispatch(setUser(res.user))
        })
    }
}

export const login = () => {
    return (dispatch) => {
        return `${NORMA_API}/auth`.login().then((res) => {
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch(setUser(res.user))
            dispatch(setAuthChecked(true))
        })
    }
}

export const checkUserAuth = () => {
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