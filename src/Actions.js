import { dispatch } from "./AppDispatcher";

export default function actionsCreator (type) {
  return function(value) {
    console.log("Action", type, "value", value);
    dispatch({
      type: type,
      value: value
    });
  };
}

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const addNotification = actionsCreator(ADD_NOTIFICATION);

export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const deleteNotification = actionsCreator(DELETE_NOTIFICATION);

export const NEXT_TURN = "NEXT_TURN";
export const nextTurn = actionsCreator(NEXT_TURN);
