import { createAction } from "@reduxjs/toolkit";
import { IFeed } from "../types/data";

export const userConnect = createAction<string, 'FEED_USER_CONNECT'>('FEED_USER_CONNECT')
export const userDisconnect = createAction('FEED_USER_DISCONNECT')
export const wsUserConnecting = createAction('FEED_WS_USER_CONNECTING')
export const wsUserOpen = createAction('FEED_WS_USER_OPEN')
export const wsUserClose = createAction('FEED_WS_USER_CLOSE')
export const wsUserMessage = createAction<IFeed, 'FEED_WS_USER_MESSAGE'>('FEED_WS_USER_MESSAGE')
export const wsUserError = createAction<string, 'FEED_WS_USER_ERROR'>('FEED_WS_USER_ERROR')

export type TwsActions = ReturnType<typeof userConnect>
    | ReturnType<typeof userDisconnect>
    | ReturnType<typeof wsUserConnecting>
    | ReturnType<typeof wsUserClose>
    | ReturnType<typeof wsUserMessage>
    | ReturnType<typeof wsUserError>
    | ReturnType<typeof wsUserOpen>