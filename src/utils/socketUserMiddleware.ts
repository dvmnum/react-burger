import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "./dispatch";
import { refreshToken } from "./request";

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>
}

export const socketUserMiddleware = (
    wsActions: TwsActionTypes,
    withTokenRefresh: boolean
): Middleware<{}, RootState> => {
    return ((store) => {
      let socket: WebSocket | null = null;
      let url: string | null = null;
  
      return next => (action) => {
        const { dispatch } = store;
        const token = localStorage.getItem('accessToken')?.replace('Bearer ', '')

        const {
            wsConnect,
            wsDisconnect,
            wsSendMessage,
            wsConnecting,
            onOpen,
            onClose,
            onError,
            onMessage
        } = wsActions;

        if (wsConnect.match(action)) {
            url = action.payload
            socket = new WebSocket(`${url}?token=${token}`);
        }
        if (socket) {
            socket.onopen = event => {
                dispatch(onOpen());
            };
    
            socket.onerror = event => {
                dispatch(onError(event.type.toString()));
            };
    
            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);
    
                if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                    refreshToken().then((refreshData) => {
                      const wssUrl = new URL(url!);
                      wssUrl.searchParams.set(
                        "token",
                        refreshData.accessToken.replace("Bearer ", "")
                      );
                      socket = new WebSocket(wssUrl);
                    });
                } else {
                    dispatch(onMessage(parsedData));
                }
            };
    
            socket.onclose = event => {
                dispatch(onClose());
            };

            if (wsDisconnect.match(action)) {
                socket.close()
                dispatch(onClose());
            }
    
            // if (type === wsSendMessage) {
            //     const message = action.payload;
            //     socket.send(JSON.stringify(message));
            // }
        }
  
        next(action);
      };
    });
  };