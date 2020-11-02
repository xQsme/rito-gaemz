import { BaseReducer } from "./general";

export interface RiftMasteryResult {}
export interface RiftHistoryResult {}
export interface RiftProfileReducer extends BaseReducer 
{
    masteries:any[],
    history:any[],
}
export interface RiftChampionsResult {
    units: {
        [key: string]: RiftChampion,
    }
}

export interface RiftChampion {

}

export interface RiftChampionsReducer extends BaseReducer 
{
    champions:{
        [key: string]: RiftChampion,
    },
}
