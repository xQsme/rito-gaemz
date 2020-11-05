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

export interface SingleRiftChampion { // singular rift champion on a single champion route 
    name: string,
    title: string,
    allytips: [],
    enemytips: [],
    image: string,
    skins: [],
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

export interface RiftChampionReducer extends BaseReducer 
{
    champion:{
        [key: string]: SingleRiftChampion,
    },
}
