import { authReducer, initialState } from './checkAuth'
import * as types from '../constants'
import { user } from '../test_constants'

describe('checkAuth', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SET_AUTH_CHECKED', () => {
        expect(
            authReducer(undefined, {
                type: types.SET_AUTH_CHECKED,
                payload: true
            })
        ).toEqual(
            {
                user: null,
                isAuthChecked: true
            }
        )
    })

    it('should handle SET_USER', () => {
        expect(
            authReducer(undefined, {
                type: types.SET_USER,
                payload: user
            })
        ).toEqual({
            isAuthChecked: false,
            user: user,
        })
    })
})