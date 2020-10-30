import { BaseReducer } from "./general";

export interface TFTInsightsResult {
  units: any;
  totalMatches: number;
}

export interface TFTInsightsReducer extends BaseReducer, TFTInsightsResult {
  region: number;
}

export interface TFTProfileResult {
    rank: string;
    tier: string;
}

export interface TFTProfileReducer extends BaseReducer, TFTProfileResult {

}