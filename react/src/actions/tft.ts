import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    RETURN_INSIGHTS,
    FAIL_RETURN_INSIGHTS,
    CHANGE_REGION,
} from './types';

const returnInsights = (data:any) => ({
    type: RETURN_INSIGHTS,
    payload: data,
});

const failReturn = () => ({
    type: FAIL_RETURN_INSIGHTS,
});

export const requestInsights = (region:number)  => {
    return async (dispatch:Function) => {
        try {
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
    type: CHANGE_REGION,
    payload: region,
});

export const changeRegion = (region:number) => {
    return async (dispatch:Function) => {
        dispatch(returnRegion(region));
    };
}