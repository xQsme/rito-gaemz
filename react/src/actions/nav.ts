import { SET_TAB } from "./types";

export const setTab = (tab: number) => {
  return async (dispatch:(obj:{type:string, payload: number}) => void) => {
    dispatch({
      type: SET_TAB,
      payload: tab,
    });
  };
};
