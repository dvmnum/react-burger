import { PASSWORD_RESET_SET_VALUE, PASSWORD_RESET_SUBMIT, PASSWORD_RESET_SUBMIT_FAILED, PASSWORD_RESET_SUBMIT_SUCCESS } from "../actions/reset-password"

const initialState = {
    form: {
        password: '',
        token: ''
    },
    resetPasswordRequest: false,
    resetPasswordFailed: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case PASSWORD_RESET_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value,
                }
            }
        }
        case PASSWORD_RESET_SUBMIT: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false
            }
        }
        case PASSWORD_RESET_SUBMIT_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
            }
        }
        case PASSWORD_RESET_SUBMIT_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true
            }
        }
        default: {
            return state;
        }
    }
}