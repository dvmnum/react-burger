import { TProfileActions } from "../actions/profile";
import {
    PROFILE_FORM_SET_VALUE,
    PROFILE_FORM_SUBMIT,
    PROFILE_FORM_SUBMIT_FAILED,
    PROFILE_FORM_SUBMIT_SUCCESS,
    PROFILE_LOGOUT_FAILED,
    PROFILE_LOGOUT_SUCCESS
} from "../constants";

type TProfileState = {
    form: {
        email: string,
        password: string,
        name: string,
    },
    logOutFailed: boolean,
    profileChangeRequest: boolean,
    profileChangeFailed: boolean,
}

export const initialState: TProfileState = {
    form: {
        email: '',
        password: '',
        name: '',
    },
    logOutFailed: false,
    profileChangeRequest: false,
    profileChangeFailed: false,
}

export const profileChangeReducer = (state = initialState, action: TProfileActions): TProfileState => {
    switch(action.type) {
        case PROFILE_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value,
                }
            }
        }
        case PROFILE_FORM_SUBMIT: {
            return {
                ...state,
                profileChangeRequest: true,
                profileChangeFailed: false
            }
        }
        case PROFILE_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    email: action.payload.user.email,
                    password: action.payload.user.password,
                    name: action.payload.user.name
                },
                profileChangeRequest: false
            }
        }
        case PROFILE_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                profileChangeRequest: false,
                profileChangeFailed: true
            }
        }
        case PROFILE_LOGOUT_SUCCESS: {
            return {
                ...state,
                form: {
                    email: '',
                    password: '',
                    name: '',
                },
            }
        }
        case PROFILE_LOGOUT_FAILED: {
            return {
                ...state,
                logOutFailed: true
            }
        }
        default: {
            return state;
        }
    }
}