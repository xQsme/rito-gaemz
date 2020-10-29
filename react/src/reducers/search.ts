import { REHYDRATE } from "redux-persist";

import { RETURN_SUMMONERS } from "../actions/types";

interface SearchReducer {
  requested: boolean;
  rift: any;
  tft: any;
  account: any;
  error: boolean;
}

const INITIAL_STATE: SearchReducer = {
  requested: false,
  rift: null,
  tft: null,
  account: null,
  error: false,
};

export default function (state = INITIAL_STATE, { type, payload }: any) {
  switch (type) {
    case REHYDRATE:
      if (payload && payload.tft) {
        return {
          ...INITIAL_STATE,
        };
      }
      return state;
    case RETURN_SUMMONERS:
      return {
        ...state,
        ...payload,
        requested: true,
        error: false,
      };
    default:
      return state;
  }
}
