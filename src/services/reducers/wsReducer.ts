import { createReducer } from "@reduxjs/toolkit"
import { WebsocketStatus } from "../constants"
import { IFeed } from "../types/data"
import {
    connect,
    wsClose,
    wsError,
    wsMessage,
    wsOpen
} from "../actions/wsActions"

export type wsReducerState = {
    status: WebsocketStatus,
    connectingError: string,
    feed: IFeed | null
}

const initialState: wsReducerState = {
    status: WebsocketStatus.OFFLINE,
    connectingError: '',
    feed: null
}

export const wsFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connect, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
            state.connectingError = ''
        })
        .addCase(wsError, (state, action) => {
            state.status = WebsocketStatus.OFFLINE
            state.connectingError = action.payload
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsMessage, (state, action) => {
            state.feed = action.payload
        })
})