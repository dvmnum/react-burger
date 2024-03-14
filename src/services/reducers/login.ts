import { LOGIN_FORM_SET_VALUE, LOGIN_FORM_SUBMIT, LOGIN_FORM_SUBMIT_FAILED, LOGIN_FORM_SUBMIT_SUCCESS } from "../actions/login"

type TLogin = {
    form: {
        email: string,
        password: string,
    },
    loginRequest: boolean,
    loginSuccess: boolean,
    loginFailed: boolean,
}

const initialState: TLogin = {
    form: {
        email: '',
        password: '',
    },
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
}

export const loginReducer = (state = initialState, action: any) => {
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
                form: action.payload,
                loginSuccess: true,
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