import { REHYDRATE } from "redux-persist";

import {
  FAIL_RETURN_TFT_PROFILE,
  RETURN_TFT_PROFILE,
  START_TFT_PROFILE_REQUEST,
  RESET_PROFILES,
} from "../actions/types";

import type { TFTProfileReducer } from '../interfaces';

const INITIAL_STATE: TFTProfileReducer = {
  requested: false,
  error: false,
  rank: "",
  tier: "",
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
    case START_TFT_PROFILE_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };
    case RETURN_TFT_PROFILE:
      return {
        ...state,
        ...payload,
        requested: true,
        error: false,
      };
    case FAIL_RETURN_TFT_PROFILE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
