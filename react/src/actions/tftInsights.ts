import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    RETURN_TFT_INSIGHTS,
    FAIL_RETURN_TFT_INSIGHTS,
    CHANGE_TFT_INSIGHTS_REGION,
    START_TFT_INSIGHTS_REQUEST,
} from './types';

import type { TFTInsightsResult } from '../interfaces';

const startRequest = ():{type:string} => ({
    type: START_TFT_INSIGHTS_REQUEST,
});

const returnInsights = (data:TFTInsightsResult):{type:string, payload:TFTInsightsResult} => ({
    type: RETURN_TFT_INSIGHTS,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_TFT_INSIGHTS,
});

export const requestInsights = (region:number)  => {
    return async (dispatch:(obj:{type:string, payload?: TFTInsightsResult}) => string) => {
        try {
            dispatch(startRequest());
            const result:any = await axios.get(ADDRESS + '/tft/units/' + region);
            dispatch(returnInsights(result.data));
            return '';
        } catch (error) {
            dispatch(failReturn());
            if(error && error.response && error.response.status === 403) {
                return '❌ API Key Expired!';
            } else {
                return '❌ Request Limit Reached!';
            }
        }
    };
};

export const changeTFTInsightsRegion = (region:number) => {
    return async (dispatch:(obj:{type:string, payload?: number}) => void) => {
        dispatch({
            type: CHANGE_TFT_INSIGHTS_REGION,
            payload: region,
        });
    };
}