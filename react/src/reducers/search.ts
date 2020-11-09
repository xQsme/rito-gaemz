import { REHYDRATE } from "redux-persist";

import { RETURN_SUMMONERS, RESET_PROFILES } from "../actions/types";

import type { SearchReducer } from '../interfaces';

const INITIAL_STATE: SearchReducer = {
  requested: false,
  requesting: false,
  rift: null,
  tft: null,
  lor: null,
  error: false,
  region: 0,
};

export default function (state = INITIAL_STATE, { type, payload }:any):SearchReducer {
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
        requesting: true,
      };
    case RETURN_SUMMONERS:
      return {
        ...state,
        ...payload,
        requested: true,
        requesting: false,
        error: false,
      };
    default:
      return state;
  }
}
