import { REHYDRATE } from "redux-persist";

import {
  RETURN_RIFT_SINGLE_CHAMPION,
  FAIL_RETURN_RIFT_SINGLE_CHAMPION,
  START_RIFT_SINGLE_CHAMPION_REQUEST,
  RESET_RIFT_CHAMPION,
} from "../actions/types";

import type { RiftChampionReducer } from '../interfaces';

const INITIAL_STATE: RiftChampionReducer = {
  requested: false,
  error: false,
  name: "",
  title: "",
  allytips: [],
  enemytips: [],
  image: "",
  skins: [],
  stats: {
    hp: 0,
    hpperlevel: 0,
    mp: 0,
    mpperlevel: 0,
    movespeed: 0,
    armor: 0,
    armorperlevel: 0,
    spellblock: 0,
    spellblockperlevel: 0,
    attackrange: 0,
    hpregen: 0,
    hpregenperlevel: 0,
    mpregen: 0,
    mpregenperlevel: 0,
    crit: 0,
    critperlevel: 0,
    attackdamage: 0,
    attackdamageperlevel: 0,
    attackspeedperlevel: 0,
    attackspeed: 0,
  },
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
    case RESET_RIFT_CHAMPION:
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
        ...payload.unit,
        stats: payload.unit.stats, 
        requested: true,
        error: false,
      };
      
   
    default:
      return state;
  }
}
