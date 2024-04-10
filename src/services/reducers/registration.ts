import { TRegistrationActions } from "../actions/registration";
import {
    REGISTER_FORM_SET_VALUE,
    REGISTER_FORM_SUBMIT,
    REGISTER_FORM_SUBMIT_FAILED,
    REGISTER_FORM_SUBMIT_SUCCESS
} from "../constants";

type TRegistrationState = {
    form: {
        email: string,
        password: string,
        name: string,
    },
    registrationRequest: boolean,
    registrationFailed: boolean,
}

export const initialState: TRegistrationState = {
    form: {
        email: '',
        password: '',
        name: '',
    },
    registrationRequest: false,
    registrationFailed: false,
}

export const registrationReducer = (state = initialState, action: TRegistrationActions): TRegistrationState => {
    switch(action.type) {
        case REGISTER_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value,
                }
            }
        }
        case REGISTER_FORM_SUBMIT: {
            return {
                ...state,
                registrationRequest: true,
                registrationFailed: false
            }
        }
        case REGISTER_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                registrationRequest: false
            }
        }
        case REGISTER_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationFailed: true
            }
        }
        default: {
            return state;
        }
    }
}