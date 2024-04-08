import { currentIngredientReducer, initialState } from "./currentIngredient";
import * as types from '../constants'
import { bun } from "../test_constants";

describe('currentIngredient', () => {
    it('should return the initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SET_CURRENT_INGREDIENT', () => {
        expect(
            currentIngredientReducer(undefined, {
                type: types.SET_CURRENT_INGREDIENT,
                payload: bun
            })
        ).toEqual(
            {
                addedIngredient: bun
            }
        )
    })

    it('should handle REMOVE_CURRENT_INGREDIENT', () => {
        expect(
            currentIngredientReducer({
                addedIngredient: bun
            }, {
                type: types.REMOVE_CURRENT_INGREDIENT,
                payload: bun
            })
        ).toEqual({
            addedIngredient: null
        })
    })
})
