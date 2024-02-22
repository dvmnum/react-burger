import { SET_AUTH_CHECKED, SET_USER } from "../actions/checkAuth"

const initialState = {
    user: null,
    isAuthChecked: true
}

export const authReducer = (state = initialState, action) => {
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