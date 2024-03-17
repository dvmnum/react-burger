import { REGISTER_FORM_SUBMIT, REGISTER_FORM_SUBMIT_FAILED, REGISTER_FORM_SUBMIT_SUCCESS, REGISTER_FORM_SET_VALUE } from "../actions/registration"

type TRegistration = {
    form: {
        email: string,
        password: string,
        name: string,
    },
    registrationRequest: boolean,
    registrationFailed: boolean,
}

const initialState: TRegistration = {
    form: {
        email: '',
        password: '',
        name: '',
    },
    registrationRequest: false,
    registrationFailed: false,
}

export const registrationReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case REGISTER_FORM_SET_VALUE: {
            return {
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