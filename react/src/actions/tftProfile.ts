import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    START_TFT_HISTORY_REQUEST,
    RETURN_TFT_HISTORY,
    FAIL_RETURN_TFT_HISTORY
} from './types';

import type { TFTProfileResult } from '../interfaces';

const startRequest = ():{type:string} => ({
    type: START_TFT_HISTORY_REQUEST,
});

const returnHistory = (data:TFTProfileResult):{type:string, payload:TFTProfileResult} => ({
    type: RETURN_TFT_HISTORY,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_TFT_HISTORY,
});

export const requestTFTHistory = (region: number, summonerId:string)  => {
    return async (dispatch:(obj:{type:string, payload?: TFTProfileResult}) => string) => {
        try {
            dispatch(startRequest());
            const result:any = await axios.get(ADDRESS + '/tft/history/' + region + '/' + summonerId);
            dispatch(returnHistory(result.data));
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