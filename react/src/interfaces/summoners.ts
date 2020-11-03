import type { BaseReducer, Nullable } from "./general";

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface Account {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SearchResult {
  rift: Nullable<Summoner>;
  tft: Nullable<Summoner>;
  lor: Nullable<Account>;
}

export interface SearchReducer extends BaseReducer, SearchResult {
  region: number;
}
