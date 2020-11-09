import { BaseReducer } from "./general";

export interface RiftMasteryResult {}
export interface RiftHistoryResult {}
export interface RiftProfileReducer extends BaseReducer 
{
    masteries:any[],
    history:any[],
}

export interface RiftChampion { // singular rift champion on the full list of champions route
    //TODO - source is node -> rift-service.ts -> getUnits
}

export interface Stats {
    
}

export interface SingleRiftChampion { // singular rift champion on a single champion route 
    name: string,
    title: string,
    allytips: [],
    enemytips: [],
    image: string,
    skins: [],
    stats: {
        hp: number,
        hpperlevel: number,
        mp: number,
        mpperlevel: number,
        movespeed: number,
        armor: number,
        armorperlevel: number,
        spellblock: number,
        spellblockperlevel: number,
        attackrange: number,
        hpregen: number,
        hpregenperlevel: number,
        mpregen: number,
        mpregenperlevel: number,
        crit: number,
        critperlevel: number,
        attackdamage: number,
        attackdamageperlevel: number,
        attackspeedperlevel: number,
        attackspeed: number,
    },
}


export interface RiftChampionsResult {
    units: {
        [key: string]: RiftChampion,
    }
}

export interface RiftChampionsReducer extends BaseReducer 
{
    champions:{
        [key: string]: RiftChampion,
    },
}

export interface RiftChampionResult {
    unit: {
        [key: string]: SingleRiftChampion,
    }
}

export interface RiftChampionReducer extends BaseReducer, SingleRiftChampion
{
    // champion: SingleRiftChampion,
    // champion:{
    //     [key: string]: SingleRiftChampion,
    //     // [key: string]: any,
    // },
}