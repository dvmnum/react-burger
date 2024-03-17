import { Action } from "@reduxjs/toolkit"
import { SET_AUTH_CHECKED, SET_USER } from "../actions/checkAuth"
import { User } from "../../utils/request"

type TAuth = {
    user: User | null,
    isAuthChecked: boolean
}

const initialState: TAuth = {
    user: null,
    isAuthChecked: false
}

export const authReducer = (state = initialState, action: any) => {
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