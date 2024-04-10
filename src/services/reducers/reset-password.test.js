import { resetPasswordReducer, initialState } from "./reset-password";
import * as types from '../constants'

describe('reset-password', () => {
    it('should return the initial state', () => {
        expect(resetPasswordReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle PASSWORD_RESET_SET_VALUE', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: types.PASSWORD_RESET_SET_VALUE,
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
            resetPasswordReducer(undefined, {
                type: types.PASSWORD_RESET_SET_VALUE,
                field: 'token',
                value: '11111111'
            })
        ).toEqual(
            {
                ...initialState,
                form: {
                    ...initialState.form,
                    token: '11111111',
                }
            }
        )
    })

    it('should handle PASSWORD_RESET_SUBMIT', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: types.PASSWORD_RESET_SUBMIT,
            })
        ).toEqual({
            ...initialState,
            resetPasswordRequest: true,
            resetPasswordFailed: false
        })
    })

    it('should handle PASSWORD_RESET_SUBMIT_SUCCESS', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: types.PASSWORD_RESET_SUBMIT_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            resetPasswordRequest: false,
        })
    })

    it('should handle PASSWORD_RESET_SUBMIT_FAILED', () => {
        expect(
            resetPasswordReducer(undefined, {
                type: types.PASSWORD_RESET_SUBMIT_FAILED,
            })
        ).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true
        })
    })
})
