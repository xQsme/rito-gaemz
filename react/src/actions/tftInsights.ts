import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    RETURN_TFT_INSIGHTS,
    FAIL_RETURN_TFT_INSIGHTS,
    CHANGE_TFT_INSIGHTS_REGION,
    START_TFT_INSIGHTS_REQUEST,
} from './types';

const startRequest = () => ({
    type: START_TFT_INSIGHTS_REQUEST,
});

const returnInsights = (data:any) => ({
    type: RETURN_TFT_INSIGHTS,
    payload: data,
});

const failReturn = () => ({
    type: FAIL_RETURN_TFT_INSIGHTS,
});

export const requestInsights = (region:number)  => {
    return async (dispatch:Function) => {
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

const returnRegion = (region:number) => ({
    type: CHANGE_TFT_INSIGHTS_REGION,
    payload: region,
});

export const changeTFTInsightsRegion = (region:number) => {
    return async (dispatch:Function) => {
        dispatch(returnRegion(region));
    };
}