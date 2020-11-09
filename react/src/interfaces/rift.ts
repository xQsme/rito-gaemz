import { BaseReducer } from "./general";

export interface RiftMasteryResult {}
export interface RiftHistoryResult {}
export interface RiftProfileReducer extends BaseReducer 
{
    mastery:any[],
    history:any[],
}

