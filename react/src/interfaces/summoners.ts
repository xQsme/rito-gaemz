import type { BaseReducer, Nullable } from "./general";

export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  riftRankeds: riftRanked[];
  tftRanked: tftRanked[];
  history: History[];
  mastery: Mastery;
}

export interface Mastery{
  masteryArray: MasteryEntry[]
  masteryScore: number;
}

export interface MasteryEntry{
  championId: number,
  championLevel: number,
  championPoints: number,
  lastPlayTime: number,
  championPointsSinceLastLevel: number,
  championPointsUntilNextLevel: number,
  chestGranted: boolean,
  tokensEarned: number,
  summonerId: string,
  championName: string
}

export interface riftRanked {
  leagueId?: string;
  queueType?: string;
  tier?: string;
  rank?: string;
  summonerId?: string;
  summonerName?: string;
  leaguePoints?: number;
  wins?: number;
  losses?: number;
  veteran?: boolean;
  inactive?: boolean;
  freshBlood?: boolean;
  hotStreak?: boolean;
}

export interface History {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  games:Game[];
}

export interface Game {
  gameId: string;
  champion: string;
  queue: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  summoners: number[];
  champLevel: number;
  items: number[];
  duration: string;
  date:string;
  queueDetails:QueueDetail[];
  itemDetails:string[];
  summonerDetails:SummonerDetail[];
}

export interface QueueDetail {
  map:string;
  description:string;
}

export interface SummonerDetail {
  map:string;
  image:string;
}


export interface tftRanked {
  leagueId:	string;
  summonerId:	string;
  summonerName:	string;
  queueType:	string;
  tier:	string;
  rank:	string;	
  leaguePoints:	number;
  wins:	number;
  losses:	number;
  hotStreak:	boolean;
  veteran:	boolean;
  freshBlood:	boolean;
  inactive:	boolean;
  miniSeries: MiniSeries;
}

export interface MiniSeries {
  losses: Int16Array;
  progress: string;
  target: number;
  wins: number;
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
  requesting: boolean,
}
