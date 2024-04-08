import { loginReducer, initialState } from "./login";
import * as types from '../constants'
import { user } from "../test_constants";

describe('login', () => {
    it('should return the initial state', () => {
        expect(loginReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle LOGIN_FORM_SET_VALUE', () => {
        expect(
            loginReducer(undefined, {
                type: types.LOGIN_FORM_SET_VALUE,
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
            loginReducer(undefined, {
                type: types.LOGIN_FORM_SET_VALUE,
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
    })

    it('should handle LOGIN_FORM_SUBMIT', () => {
        expect(
            loginReducer(undefined, {
                type: types.LOGIN_FORM_SUBMIT,
                
            })
        ).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false
        })
    })

    it('should handle LOGIN_FORM_SUBMIT_FAILED', () => {
        expect(
            loginReducer(undefined, {
                type: types.LOGIN_FORM_SUBMIT_FAILED,
            })
        ).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true
        })
    })

    it('should handle LOGIN_FORM_SUBMIT_SUCCESS', () => {
        expect(
            loginReducer(undefined, {
                type: types.LOGIN_FORM_SUBMIT_SUCCESS,
                payload: user
            })
        ).toEqual({
            ...initialState,
            form: user,
            loginSuccess: true,
            loginRequest: false
        })
    })
})
