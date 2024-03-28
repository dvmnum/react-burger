import { WS_CONNECTION, WS_CONNECTION_CLOSED, WS_CONNECTION_FAILED, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants"

export type IFeedOrder = {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    name?: string
}

export type IFeed = {
    success: boolean,
    orders: IFeedOrder[],
    total: number,
    totatlToday: number
}

type TFeedState = {
    feed: IFeed | null,
    wsConnecting: boolean,
    wsConnectionSuccess: boolean,
    wsConnectionFailed: boolean,
}

const initialState: TFeedState = {
    feed: null,
    wsConnecting: false,
    wsConnectionSuccess: false,
    wsConnectionFailed: false,
}

export const wsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case WS_CONNECTION:
            return {
                ...state,
                wsConnecting: true,
            }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnecting: false,
                wsConnectionSuccess: true
            }
        case WS_CONNECTION_FAILED:
            return {
                ...state,
                wsConnecting: false,
                wsConnectionSuccess: false,
                wsConnectionFailed: true
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnecting: false,
                wsConnectionSuccess: false,
                wsConnectionFailed: false
            }
        case WS_GET_MESSAGE:
            return {
                ...state,
                feed: action.payload
            }
        default:
            return state;
    }
}