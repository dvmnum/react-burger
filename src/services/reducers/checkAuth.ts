import { TCheckAuthActions } from "../actions/checkAuth"
import { SET_AUTH_CHECKED, SET_USER } from "../constants"
import { TAuth } from "../types/data"

export const initialState: TAuth = {
    user: null,
    isAuthChecked: false
}

export const authReducer = (state = initialState, action: TCheckAuthActions): TAuth => {
    switch(action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case SET_AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: action.payload
            }
        }
        default: {
            return state
        }
    }
}