import { REHYDRATE } from "redux-persist";

import {
  FAIL_RETURN_TFT_HISTORY,
  RETURN_TFT_HISTORY,
  START_TFT_HISTORY_REQUEST,
  RESET_PROFILES,
} from "../actions/types";

import type { TFTProfileReducer } from '../interfaces';

const INITIAL_STATE: TFTProfileReducer = {
  requested: false,
  error: false,
  history: [],
};

export default function (state = INITIAL_STATE, { type, payload }:any):TFTProfileReducer {
  switch (type) {
    case REHYDRATE:
      if (payload && payload.tftProfile) {
        return {
          ...INITIAL_STATE,
        };
      }
      return state;
    case RESET_PROFILES:
      return {
        ...INITIAL_STATE,
      };
    case START_TFT_HISTORY_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };
    case RETURN_TFT_HISTORY:
      return {
        ...state,
        history: payload,
        requested: true,
        error: false,
      };
    case FAIL_RETURN_TFT_HISTORY:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
