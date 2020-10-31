import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    START_TFT_PROFILE_REQUEST,
    RETURN_TFT_PROFILE,
    FAIL_RETURN_TFT_PROFILE
} from './types';

import type { TFTProfileResult } from '../interfaces';

const startRequest = ():{type:string} => ({
    type: START_TFT_PROFILE_REQUEST,
});

const returnProfile = (data:TFTProfileResult):{type:string, payload:TFTProfileResult} => ({
    type: RETURN_TFT_PROFILE,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_TFT_PROFILE,
});

export const requestTFTProfile = (region: number, summonerId:string)  => {
    return async (dispatch:(obj:{type:string, payload?: TFTProfileResult}) => string) => {
        try {
            dispatch(startRequest());
            const result:any = await axios.get(ADDRESS + '/tft/profile/' + region + '/' + summonerId);
            dispatch(returnProfile(result.data));
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