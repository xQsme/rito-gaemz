import { SET_TAB } from "./types";

const returnTab = (tab: number) => ({
  type: SET_TAB,
  payload: tab,
});

export const setTab = (tab: number) => {
  return async (dispatch: Function) => {
    dispatch(returnTab(tab));
  };
};
