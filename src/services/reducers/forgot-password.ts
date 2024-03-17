import { PASSWORD_FORGOT_SET_EMAIL, PASSWORD_FORGOT_SUBMIT, PASSWORD_FORGOT_SUBMIT_FAILED, PASSWORD_FORGOT_SUBMIT_SUCCESS } from "../actions/forgot-password"

type TForgotPassword = {
    form: {
        email: string,
    },
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,
}

const initialState: TForgotPassword = {
    form: {
        email: '',
    },
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action: any) => {
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