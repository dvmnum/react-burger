import { ingredientsReducer, initialState } from "./ingredients";
import * as types from '../constants'
import { bun } from "../test_constants";

describe('ingredients', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.GET_INGREDIENTS_REQUEST,
            })
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.GET_INGREDIENTS_SUCCESS,
                payload: bun
            })
        ).toEqual({
            ...initialState,
            ingredients: bun,
            isLoading: false,
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.GET_INGREDIENTS_FAILED,
            })
        ).toEqual({
            ...initialState,
            isLoading: false,
            hasError: true
        })
    })
})
