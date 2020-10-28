import { REHYDRATE } from 'redux-persist';

import {
    RETURN_INSIGHTS,
    FAIL_RETURN_INSIGHTS,
    CHANGE_REGION,
} from '../actions/types';

interface TFTInsightsReducer {
    requested: boolean,
    units: any,
    totalMatches: number,
    region: number,
    error: boolean,
}

const INITIAL_STATE:TFTInsightsReducer = {
    requested: false,
    units: [],
    totalMatches: 1,
    region: 0,
    error: false,
};

export default function (state = INITIAL_STATE, { type, payload }:any) {
    switch (type) {
        case REHYDRATE:
            if (payload && payload.tft) {
                return {
                    ...INITIAL_STATE,
                };
            }
            return state;
        case RETURN_INSIGHTS:
            return {
                ...state,
                ...payload,
                requested: true,
                error: false,
            };
        case FAIL_RETURN_INSIGHTS:
            return{
                ...state,
                error: true,
            }
        case CHANGE_REGION:
            return {
                ...state,
                region: payload,
                requested: false,
                error: false,
            }
        default:
            return state;
    }
}
