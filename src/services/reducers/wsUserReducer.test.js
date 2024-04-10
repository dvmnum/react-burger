import { wsFeedUserReducer, initialState } from "./wsUserReducer";
import * as types from '../constants'
import { bun } from "../test_constants";
import { userConnect, wsUserClose, wsUserError, wsUserMessage, wsUserOpen } from "../actions/wsUserActions";

describe('wsUserReducer', () => {
    it('should return the initial state', () => {
        expect(wsFeedUserReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle userConnect', () => {
        expect(
            wsFeedUserReducer(undefined, {
                type: userConnect,
            })
        ).toEqual(
            {
                ...initialState,
                status: types.WebsocketStatus.CONNECTING
            }
        )
    })

    it('should handle wsUserOpen', () => {
        expect(
            wsFeedUserReducer(undefined, {
                type: wsUserOpen
            })
        ).toEqual({
            ...initialState,
            status: types.WebsocketStatus.ONLINE,
            connectingError: ''
        })
    })

    it('should handle wsUserError', () => {
        expect(
            wsFeedUserReducer(undefined, {
                type: wsUserError,
                payload: 'error message'
            })
        ).toEqual({
            ...initialState,
            status: types.WebsocketStatus.OFFLINE,
            connectingError: 'error message'
        })
    })

    it('should handle wsUserClose', () => {
        expect(
            wsFeedUserReducer(undefined, {
                type: wsUserClose,
            })
        ).toEqual({
            ...initialState,
            status: types.WebsocketStatus.OFFLINE,
        })
    })

    it('should handle wsUserMessage', () => {
        expect(
            wsFeedUserReducer(undefined, {
                type: wsUserMessage,
                payload: bun
            })
        ).toEqual({
            ...initialState,
            feed: bun
        })
    })
})