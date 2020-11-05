import { BaseReducer } from "./general";

export interface RiftMasteryResult {}
export interface RiftHistoryResult {}
export interface RiftProfileReducer extends BaseReducer 
{
    masteries:any[],
    history:any[],
}

