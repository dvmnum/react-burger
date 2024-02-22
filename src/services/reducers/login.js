import { LOGIN_FORM_SET_VALUE, LOGIN_FORM_SUBMIT, LOGIN_FORM_SUBMIT_FAILED, LOGIN_FORM_SUBMIT_SUCCESS } from "../actions/login"

const initialState = {
    form: {
        email: '',
        password: '',
    },
    loginRequest: false,
    loginFailed: false,
}

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_FORM_SET_VALUE: {
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value,
                }
            }
        }
        case LOGIN_FORM_SUBMIT: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case LOGIN_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                loginRequest: false
            }
        }
        case LOGIN_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }
        default: {
            return state;
        }
    }
}