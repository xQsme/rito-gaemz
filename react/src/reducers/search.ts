import { REHYDRATE } from "redux-persist";

import { RETURN_SUMMONERS, RESET_PROFILES } from "../actions/types";

interface SearchReducer {
  requested: boolean;
  rift: any;
  tft: any;
  lor: any;
  error: boolean;
}

const INITIAL_STATE: SearchReducer = {
  requested: false,
  rift: null,
  tft: null,
  lor: null,
  error: false,
};

export default function (state = INITIAL_STATE, { type, payload }: any) {
  switch (type) {
    case REHYDRATE:
      if (payload && payload.search) {
        return {
          ...INITIAL_STATE,
        };
      }
      return state;
    case RESET_PROFILES:
      return {
        ...INITIAL_STATE,
      };
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
