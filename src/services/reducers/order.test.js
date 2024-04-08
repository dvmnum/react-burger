import { orderReducer, initialState } from "./order";
import * as types from '../constants'
import { bun } from "../test_constants";

describe('order', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SET_INGREDIENTS', () => {
        expect(
            orderReducer(undefined, {
                type: types.SET_INGREDIENTS,
                payload: bun
            })
        ).toEqual(
            {
                ...initialState,
                ingredients: bun
            }
        )
    })

    it('should handle ORDER_POST_REQUEST', () => {
        expect(
            orderReducer(undefined, {
                type: types.ORDER_POST_REQUEST,
                
            })
        ).toEqual({
            ...initialState,
            orderRequest: true,
            orderFailed: false
        })
    })

    it('should handle ORDER_POST_SUCCESS', () => {
        expect(
            orderReducer(undefined, {
                type: types.ORDER_POST_SUCCESS,
                payload: 'answer'
            })
        ).toEqual({
            ...initialState,
            orderRequest: false,
            answer: 'answer'
        })
    })

    it('should handle ORDER_POST_FAILED', () => {
        expect(
            orderReducer(undefined, {
                type: types.ORDER_POST_FAILED,
            })
        ).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: true
        })
    })

    it('should handle CLOSE_ORDER', () => {
        expect(
            orderReducer(undefined, {
                type: types.CLOSE_ORDER,
            })
        ).toEqual({
            ...initialState,
            ingredients: [],
            answer: {}
        })
    })
})
