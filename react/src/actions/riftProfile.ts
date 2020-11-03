import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    START_RIFT_MASTERY_REQUEST,
    RETURN_RIFT_MASTERY,
    FAIL_RETURN_RIFT_MASTERY
} from './types';

import type { RiftMasteryResult } from '../interfaces';

const startRequest = ():{type:string} => ({
    type: START_RIFT_MASTERY_REQUEST,
});

const returnMastery = (data:RiftMasteryResult):{type:string, payload:RiftMasteryResult} => ({
    type: RETURN_RIFT_MASTERY,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_RIFT_MASTERY,
});

export const requestRiftMastery = (region: number, summonerId:string)  => {
    return async (dispatch:(obj:{type:string, payload?: RiftMasteryResult}) => string) => {
        try {
            dispatch(startRequest());
            const result:any = await axios.get(ADDRESS + '/rift/mastery/' + region + '/' + summonerId);
            dispatch(returnMastery(result.data));
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

