import { registrationReducer, initialState } from "./registration";
import * as types from '../constants'
import { user_w_password } from "../test_constants";

describe('registration', () => {
    it('should return the initial state', () => {
        expect(registrationReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle REGISTER_FORM_SET_VALUE', () => {
        expect(
            registrationReducer(undefined, {
                type: types.REGISTER_FORM_SET_VALUE,
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
            registrationReducer(undefined, {
                type: types.REGISTER_FORM_SET_VALUE,
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
            registrationReducer(undefined, {
                type: types.REGISTER_FORM_SET_VALUE,
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

    it('should handle REGISTER_FORM_SUBMIT', () => {
        expect(
            registrationReducer(undefined, {
                type: types.REGISTER_FORM_SUBMIT,
                
            })
        ).toEqual({
            ...initialState,
            registrationRequest: true,
            registrationFailed: false
        })
    })

    it('should handle REGISTER_FORM_SUBMIT_SUCCESS', () => {
        expect(
            registrationReducer(undefined, {
                type: types.REGISTER_FORM_SUBMIT_SUCCESS,
                payload: user_w_password
            })
        ).toEqual({
            ...initialState,
            registrationRequest: false
        })
    })

    it('should handle REGISTER_FORM_SUBMIT_FAILED', () => {
        expect(
            registrationReducer(undefined, {
                type: types.REGISTER_FORM_SUBMIT_FAILED,
            })
        ).toEqual({
            ...initialState,
            registrationRequest: false,
            registrationFailed: true
        })
    })
})
