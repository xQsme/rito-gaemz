import { BaseReducer } from "./general";

export interface TFTItem {
  id: string;
  count: number;
  percent: string;
}

export interface Unit {
  win: string;
  top: string;
  items: TFTItem[];
  unit: string;
}

export interface TFTInsightsResult {
  units: Unit[];
  totalMatches: number;
}

export interface TFTInsightsReducer extends BaseReducer, TFTInsightsResult {
  region: number;
}

export type TFTProfileResult = TFTMatch[];

export interface TFTMatch {
  id: number,
  player: TFTParticipant,
};

export interface TFTProfileReducer extends BaseReducer {
  history: TFTProfileResult,
}

export interface TFTParticipant {
  companion: {
    content_ID: string,
    skin_ID: number,
    species: string,
  },
  gold_left: number,
  last_round: number,
  level: number,
  placement: number,
  players_eliminated: number,
  puuid: string,
  time_eliminated: number,
  total_damage_to_players: number,
  traits: TFTTrait[],
  units: TFTUnit[],
}

export interface TFTTrait {
  name: string,
  num_units: number,
  style: number
  tier_current: number,
  tier_total: number,
}

export interface TFTUnit {
  character_id: string
  name: string
  items: number[],
  rarity: number,
  tier: number
}