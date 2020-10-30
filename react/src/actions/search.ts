import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    RETURN_SUMMONERS,
    FAIL_RETURN_SUMMONERS,
    CHANGE_SUMMONERS_REGION,
    RESET_PROFILES,
} from './types';

import type { SearchResult } from '../interfaces';

const returnSummoners = (data:SearchResult):{type:string, payload:any} => ({
    type: RETURN_SUMMONERS,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_SUMMONERS,
});

const resetProfiles = ():{type:string} => ({
    type: RESET_PROFILES,
});

export const requestSummoners = (region:number, name:string)  => {
    return async (dispatch:(obj:{type:string, payload?: SearchResult}) => string) => {
        try {
            dispatch(resetProfiles());
            const result:any = await axios.get(ADDRESS + '/summoners/' + region + '/' + name);
            dispatch(returnSummoners({...result.data, region}));
            return '';
        } catch (error) {
            dispatch(failReturn());
            if(error && error.response && error.response.status === 403) {
                return '❌ API Key Expired!';
            } else if(error && error.response && error.response.status === 404) {
                return '❌ Summoner Not Found!';
            } else {
                return '❌ Request Limit Reached!';
            }
        }
    };
};

export const changeSearchRegion = (region:number) => {
    return async (dispatch:(obj:{type:string, payload?: number}) => void) => {
        dispatch({
            type: CHANGE_SUMMONERS_REGION,
            payload: region,
        });
    };
}