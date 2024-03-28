import { WS_CONNECTION_CLOSED, WS_CONNECTION_FAILED, WS_CONNECTION, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants"
import { IFeed } from "../reducers/wsFeed"

export interface IFeedRequest {
    readonly type: typeof WS_CONNECTION
}

export interface IFeedSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IFeedFailed {
    readonly type: typeof WS_CONNECTION_FAILED
}

export interface IFeedClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IFeedMessage {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: IFeed
}

export type TFeedActions = 
    | IFeedRequest
    | IFeedSuccess
    | IFeedFailed
    | IFeedClosed
    | IFeedMessage