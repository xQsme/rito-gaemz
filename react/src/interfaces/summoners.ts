import { BaseReducer } from './general';

export interface SearchResult {
    rift: any;
    tft: any;
    lor: any;
}

export interface SearchReducer extends BaseReducer, SearchResult {
    region: number;
}