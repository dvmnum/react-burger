import { forgotPasswordReducer, initialState } from "./forgot-password";
import * as types from '../constants'

describe('forgot-password', () => {
    it('should return the initial state', () => {
        expect(forgotPasswordReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle PASSWORD_FORGOT_SET_EMAIL', () => {
        expect(
            forgotPasswordReducer(undefined, {
                type: types.PASSWORD_FORGOT_SET_EMAIL,
                value: 'test@mail.ru'
            })
        ).toEqual(
            {
                ...initialState,
                form: {
                    email: 'test@mail.ru',
                },
            }
        )
    })

    it('should handle PASSWORD_FORGOT_SUBMIT', () => {
        expect(
            forgotPasswordReducer(undefined, {
                type: types.PASSWORD_FORGOT_SUBMIT,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: true
        })
    })

    it('should handle PASSWORD_FORGOT_SUBMIT_FAILED', () => {
        expect(
            forgotPasswordReducer(undefined, {
                type: types.PASSWORD_FORGOT_SUBMIT_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
        })
    })

    it('should handle PASSWORD_FORGOT_SUBMIT_SUCCESS', () => {
        expect(
            forgotPasswordReducer(undefined, {
                type: types.PASSWORD_FORGOT_SUBMIT_FAILED,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true
        })
    })
})
