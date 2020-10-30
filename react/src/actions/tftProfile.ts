import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    START_TFT_PROFILE_REQUEST,
    RETURN_TFT_PROFILE,
    FAIL_RETURN_TFT_PROFILE
} from './types';

const startRequest = () => ({
    type: START_TFT_PROFILE_REQUEST,
});

const returnProfile = (data:any) => ({
    type: RETURN_TFT_PROFILE,
    payload: data,
});

const failReturn = () => ({
    type: FAIL_RETURN_TFT_PROFILE,
});

export const requestTFTProfile = (region: number, summonerId:string)  => {
    return async (dispatch:Function) => {
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