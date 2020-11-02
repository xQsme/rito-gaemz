import { REHYDRATE } from "redux-persist";

import {
  RETURN_RIFT_CHAMPIONS,
  FAIL_RETURN_RIFT_CHAMPIONS,
  START_RIFT_CHAMPIONS_REQUEST,
  RESET_PROFILES,
} from "../actions/types";

import type { RiftChampionsReducer } from '../interfaces';

const INITIAL_STATE: RiftChampionsReducer = {
  requested: false,
  error: false,
  champions: {},
};

export default function (state = INITIAL_STATE, { type, payload }:any):RiftChampionsReducer {
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
    case START_RIFT_CHAMPIONS_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };
    case RETURN_RIFT_CHAMPIONS:
       return {
        ...state,
        champions: payload.units, 
        requested: true,
        error: false,
      };
    case FAIL_RETURN_RIFT_CHAMPIONS:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
