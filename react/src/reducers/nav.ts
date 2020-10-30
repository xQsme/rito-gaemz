import { REHYDRATE } from "redux-persist";

import { SET_TAB } from "../actions/types";

interface NavReducer {
  tab: number;
}

const INITIAL_STATE: NavReducer = {
  tab: 0
};

export default function (state = INITIAL_STATE, { type, payload }:any):NavReducer {
  switch (type) {
    case REHYDRATE:
      if (payload && payload.nav) {
        return {
          ...INITIAL_STATE,
        };
      }
      return state;
    case SET_TAB:
      return {
        tab: payload,
      };
    default:
      return state;
  }
}
