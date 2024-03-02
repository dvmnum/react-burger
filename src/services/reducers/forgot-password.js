import { PASSWORD_FORGOT_SET_EMAIL, PASSWORD_FORGOT_SUBMIT, PASSWORD_FORGOT_SUBMIT_FAILED, PASSWORD_FORGOT_SUBMIT_SUCCESS } from "../actions/forgot-password"

const initialState = {
    form: {
        email: '',
    },
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case PASSWORD_FORGOT_SET_EMAIL: {
            return {
                ...state,
                form: {
                    email: action.value
                }
            }
        }
        case PASSWORD_FORGOT_SUBMIT: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            }
        }
        case PASSWORD_FORGOT_SUBMIT_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
            }
        }
        case PASSWORD_FORGOT_SUBMIT_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true
            }
        }
        default: {
            return state;
        }
    }
}