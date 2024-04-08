import { profileChangeReducer, initialState } from "./profile";
import * as types from '../constants'
import { user_w_password } from "../test_constants";

describe('profile', () => {
    it('should return the initial state', () => {
        expect(profileChangeReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle PROFILE_FORM_SET_VALUE', () => {
        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_FORM_SET_VALUE,
                field: 'email',
                value: 'test@mail.ru'
            })
        ).toEqual(
            {
                ...initialState,
                form: {
                    ...initialState.form,
                    email: 'test@mail.ru',
                }
            }
        )

        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_FORM_SET_VALUE,
                field: 'password',
                value: '123456789'
            })
        ).toEqual(
            {
                ...initialState,
                form: {
                    ...initialState.form,
                    password: '123456789',
                }
            }
        )

        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_FORM_SET_VALUE,
                field: 'name',
                value: 'tester'
            })
        ).toEqual(
            {
                ...initialState,
                form: {
                    ...initialState.form,
                    name: 'tester',
                }
            }
        )
    })

    it('should handle PROFILE_FORM_SUBMIT', () => {
        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_FORM_SUBMIT,
                
            })
        ).toEqual({
            ...initialState,
            profileChangeRequest: true,
            profileChangeFailed: false
        })
    })

    it('should handle PROFILE_FORM_SUBMIT_SUCCESS', () => {
        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_FORM_SUBMIT_SUCCESS,
                payload: user_w_password
            })
        ).toEqual({
            ...initialState,
            form: {
                email: user_w_password.user.email,
                password: user_w_password.user.password,
                name: user_w_password.user.name
            },
            profileChangeRequest: false
        })
    })

    it('should handle PROFILE_FORM_SUBMIT_FAILED', () => {
        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_FORM_SUBMIT_FAILED,
            })
        ).toEqual({
            ...initialState,
            profileChangeRequest: false,
            profileChangeFailed: true
        })
    })

    it('should handle PROFILE_LOGOUT_SUCCESS', () => {
        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_LOGOUT_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            form: {
                email: '',
                password: '',
                name: '',
            },
        })
    })

    it('should handle PROFILE_LOGOUT_FAILED', () => {
        expect(
            profileChangeReducer(undefined, {
                type: types.PROFILE_LOGOUT_FAILED,
            })
        ).toEqual({
            ...initialState,
            logOutFailed: true
        })
    })
})
