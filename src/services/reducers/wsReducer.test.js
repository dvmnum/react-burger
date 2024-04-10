import { wsFeedReducer, initialState } from "./wsReducer";
import * as types from '../constants'
import { connect, wsClose, wsError, wsMessage, wsOpen } from "../actions/wsActions";
import { bun } from "../test_constants";

describe('wsReducer', () => {
    it('should return the initial state', () => {
        expect(wsFeedReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle connect', () => {
        expect(
            wsFeedReducer(undefined, {
                type: connect,
            })
        ).toEqual(
            {
                ...initialState,
                status: types.WebsocketStatus.CONNECTING
            }
        )
    })

    it('should handle wsOpen', () => {
        expect(
            wsFeedReducer(undefined, {
                type: wsOpen
            })
        ).toEqual({
            ...initialState,
            status: types.WebsocketStatus.ONLINE,
            connectingError: ''
        })
    })

    it('should handle wsError', () => {
        expect(
            wsFeedReducer(undefined, {
                type: wsError,
                payload: 'error message'
            })
        ).toEqual({
            ...initialState,
            status: types.WebsocketStatus.OFFLINE,
            connectingError: 'error message'
        })
    })

    it('should handle wsClose', () => {
        expect(
            wsFeedReducer(undefined, {
                type: wsClose,
            })
        ).toEqual({
            ...initialState,
            status: types.WebsocketStatus.OFFLINE,
        })
    })

    it('should handle wsMessage', () => {
        expect(
            wsFeedReducer(undefined, {
                type: wsMessage,
                payload: bun
            })
        ).toEqual({
            ...initialState,
            feed: bun
        })
    })
})
