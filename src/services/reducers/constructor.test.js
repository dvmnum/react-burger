import { constructorReducer, initialState } from "./constructor";
import * as types from '../constants'
import { bun, main_1, main_2 } from "../test_constants";

describe('constructor', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_BUN', () => {
        expect(
            constructorReducer(undefined, {
                type: types.ADD_BUN,
                payload: bun
            })
        ).toEqual(
            {
                bun: bun,
                ingredients: [],
            }
        )
    })

    it('should handle ADD_INGREDIENT', () => {
        expect(
            constructorReducer(undefined, {
                type: types.ADD_INGREDIENT,
                payload: main_1
            })
        ).toEqual({
            bun: null,
            ingredients: [main_1],
        })
    })

    it('should handle DELETE_INGREDIENT', () => {
        expect(
            constructorReducer({
                bun: null,
                ingredients: [main_1],
            }, {
                type: types.DELETE_INGREDIENT,
                payload: 12345
            })
        ).toEqual({
            bun: null,
            ingredients: [],
        })
    })

    it('should handle CONSTRUCTOR_REORDER', () => {
        expect(
            constructorReducer({
                bun: null,
                ingredients: [main_1, main_2],
            }, {
                type: types.CONSTRUCTOR_REORDER,
                hoverIndex: 0,
                dragIndex: 1
            })
        ).toEqual({
            bun: null,
            ingredients: [main_2, main_1],
        })
    })

    it('should handle CLEAR_INGREDIENTS', () => {
        expect(
            constructorReducer(undefined, {
                type: types.CLEAR_INGREDIENTS,
            })
        ).toEqual({
            bun: null,
            ingredients: [],
        })
    })
})
