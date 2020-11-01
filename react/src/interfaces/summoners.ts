import type { BaseReducer, Nullable } from "./general";

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  rankeds: Ranked[];
}

export interface Ranked {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
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
