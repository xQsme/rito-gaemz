import { REHYDRATE } from "redux-persist";

import {
  RETURN_RIFT_SINGLE_CHAMPION,
  FAIL_RETURN_RIFT_SINGLE_CHAMPION,
  START_RIFT_SINGLE_CHAMPION_REQUEST,
  RESET_PROFILES,
} from "../actions/types";

import type { RiftChampionReducer } from '../interfaces';

const INITIAL_STATE: RiftChampionReducer = {
  requested: false,
  error: false,
  champion: {}
  // unit: {
  //   name: "",
  //   title: "",
  //   allytips: [],
  //   enemytips: [],
  //   image: "",
  //   skins: [],
  // } ,
};



export default function (state = INITIAL_STATE, { type, payload }:any):RiftChampionReducer {
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
    case FAIL_RETURN_RIFT_SINGLE_CHAMPION:
      return {
        ...state,
        error: true,
      };

    case START_RIFT_SINGLE_CHAMPION_REQUEST:
      return {
        ...state,
        requested: false,
        error: false,
      };
    case RETURN_RIFT_SINGLE_CHAMPION:
       return {
        ...state,
        champion: payload.unit, 
        requested: true,
        error: false,
      };
   
    default:
      return state;
  }
}
