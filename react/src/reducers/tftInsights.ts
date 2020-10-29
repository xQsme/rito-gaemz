import { REHYDRATE } from 'redux-persist';

import {
    RETURN_TFT_INSIGHTS,
    FAIL_RETURN_TFT_INSIGHTS,
    CHANGE_TFT_INSIGHTS_REGION,
    START_TFT_INSIGHTS_REQUEST,
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
        case START_TFT_INSIGHTS_REQUEST:
            return {
                ...state,
                requested: false,
                error: false,
            }
        case RETURN_TFT_INSIGHTS:
            return {
                ...state,
                ...payload,
                requested: true,
                error: false,
            };
        case FAIL_RETURN_TFT_INSIGHTS:
            return{
                ...state,
                error: true,
            }
        case CHANGE_TFT_INSIGHTS_REGION:
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
