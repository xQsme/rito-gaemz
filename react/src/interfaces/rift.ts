import { BaseReducer } from "./general";

export interface RiftMasteryResult {}
export interface RiftProfileReducer extends BaseReducer 
{
    masteries:any[],
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