import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    START_RIFT_MASTERY_REQUEST,
    RETURN_RIFT_MASTERY,
    FAIL_RETURN_RIFT_MASTERY,
    START_RIFT_HISTORY_REQUEST,
    RETURN_RIFT_HISTORY,
    FAIL_RETURN_RIFT_HISTORY
} from './types';

import type { RiftMasteryResult } from '../interfaces';
import type { RiftHistoryResult } from '../interfaces';

const startMasteryRequest = ():{type:string} => ({
    type: START_RIFT_MASTERY_REQUEST,
});

const returnMastery = (data:RiftMasteryResult):{type:string, payload:RiftMasteryResult} => ({
    type: RETURN_RIFT_MASTERY,
    payload: data,
});

const failMasteryReturn = ():{type:string} => ({
    type: FAIL_RETURN_RIFT_MASTERY,
});

const startHistoryRequest = ():{type:string} => ({
    type: START_RIFT_HISTORY_REQUEST,
});

const returnHistory = (data:RiftHistoryResult):{type:string, payload:RiftHistoryResult} => ({
    type: RETURN_RIFT_HISTORY,
    payload: data,
});

const failReturnHistory = ():{type:string} => ({
    type: FAIL_RETURN_RIFT_HISTORY,
});

export const requestRiftMastery = (region: number, summonerId:string)  => {
    return async (dispatch:(obj:{type:string, payload?: RiftMasteryResult}) => string) => {
        try {
            dispatch(startMasteryRequest());
            const result:any = await axios.get(ADDRESS + '/rift/mastery/' + region + '/' + summonerId);
            dispatch(returnMastery(result.data));
            return '';
        } catch (error) {
            dispatch(failMasteryReturn());
            if(error && error.response && error.response.status === 403) {
                return '❌ API Key Expired!';
            } else {
                return '❌ Request Limit Reached!';
            }
        }
    };
};
export const requestRiftHistory = (region: number, summonerId:string)  => {
    return async (dispatch:(obj:{type:string, payload?: RiftHistoryResult}) => string) => {
        try {
            dispatch(startHistoryRequest());
            const result:any = await axios.get(ADDRESS + '/history/' + region + '/' + summonerId);
            dispatch(returnHistory(result.data));
            return '';
        } catch (error) {
            dispatch(failReturnHistory());
            if(error && error.response && error.response.status === 403) {
                return '❌ API Key Expired!';
            } else {
                return '❌ Request Limit Reached!';
            }
        }
    };
};

