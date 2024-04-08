import { createReducer } from "@reduxjs/toolkit"
import { WebsocketStatus } from "../constants"
import { IFeed } from "../types/data"
import {
    userConnect,
    wsUserClose,
    wsUserError,
    wsUserMessage,
    wsUserOpen
} from "../actions/wsUserActions"

export type wsUserReducerState = {
    status: WebsocketStatus,
    connectingError: string,
    feed: IFeed | null
}

export const initialState: wsUserReducerState = {
    status: WebsocketStatus.OFFLINE,
    connectingError: '',
    feed: null
}

export const wsFeedUserReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userConnect, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsUserOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
            state.connectingError = ''
        })
        .addCase(wsUserError, (state, action) => {
            state.status = WebsocketStatus.OFFLINE
            state.connectingError = action.payload
        })
        .addCase(wsUserClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsUserMessage, (state, action) => {
            state.feed = action.payload
        })
})