import { getOrderReducer, initialState } from "./getOrder";
import * as types from '../constants'

describe('getOrder', () => {
    it('should return the initial state', () => {
        expect(getOrderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            getOrderReducer(undefined, {
                type: types.GET_ORDER_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            getOrderReducer(undefined, {
                type: types.GET_ORDER_SUCCESS,
                payload: 'order_number'
            })
        ).toEqual({
            ...initialState,
            order: 'order_number',
            isLoading: false
        })
    })

    it('should handle GET_ORDER_FAILED', () => {
        expect(
            getOrderReducer(undefined, {
                type: types.GET_ORDER_FAILED,
            })
        ).toEqual({
            ...initialState,
            isLoading: false,
            hasError: true
        })
    })
})
