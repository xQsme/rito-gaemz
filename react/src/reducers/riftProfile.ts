import { REHYDRATE } from "redux-persist";

import {
  FAIL_RETURN_RIFT_MASTERY,
  RETURN_RIFT_MASTERY,
  START_RIFT_MASTERY_REQUEST,
  RESET_PROFILES,
  START_RIFT_PROFILE_REQUEST,
  RETURN_RIFT_PROFILE,
  FAIL_RETURN_RIFT_PROFILE,
  START_RIFT_HISTORY_REQUEST,
  RETURN_RIFT_HISTORY,
  FAIL_RETURN_RIFT_HISTORY
} from "../actions/types";

import type { RiftProfileReducer } from '../interfaces';

const INITIAL_STATE: RiftProfileReducer = {
  requested: false,
  error: false,
  masteries: [],
  history:[]
};

export default function (state = INITIAL_STATE, { type, payload }:any):RiftProfileReducer {
  switch (type) {
    case REHYDRATE:
      if (payload && payload.riftProfile) {
        return {
          ...INITIAL_STATE,
        };
      }
      return state;
    case RESET_PROFILES:
      return {
        ...INITIAL_STATE,
      };

    case START_RIFT_PROFILE_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };

    case START_RIFT_HISTORY_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };

    case RETURN_RIFT_MASTERY:
       return {
        ...state,
        ...payload,
        requested: true,
        error: false,
      };
   
    case FAIL_RETURN_RIFT_PROFILE:
      return {
        ...state,
        error: true,
      };
    case START_RIFT_MASTERY_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };
   
    case RETURN_RIFT_HISTORY:
      return {
        ...state,
        history: payload.rift,
        requested: true,
        error: false,
      };

    case RETURN_RIFT_PROFILE:
      return {
        ...state,
        ...payload,
        requested: true,
        error: false,
      };
      
    case FAIL_RETURN_RIFT_MASTERY:
      return {
        ...state,
        error: true,
      };

    case FAIL_RETURN_RIFT_HISTORY:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
