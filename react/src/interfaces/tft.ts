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

export interface TFTProfileResult {
  rank: string;
  tier: string;
}

export interface TFTProfileReducer extends BaseReducer, TFTProfileResult {}
