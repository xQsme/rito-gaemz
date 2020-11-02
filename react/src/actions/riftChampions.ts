import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    START_RIFT_CHAMPIONS_REQUEST,
    RETURN_RIFT_CHAMPIONS,
    FAIL_RETURN_RIFT_CHAMPIONS
} from './types';

import type { RiftChampionsResult } from '../interfaces';

const startRequest = ():{type:string} => ({
    type: START_RIFT_CHAMPIONS_REQUEST,
});

const returnChampions = (data:RiftChampionsResult):{type:string, payload:RiftChampionsResult} => ({
    type: RETURN_RIFT_CHAMPIONS,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_RIFT_CHAMPIONS,
});

export const requestRiftChampions = ()  => {
    return async (dispatch:(obj:{type:string, payload?: RiftChampionsResult}) => string) => {
        try {
            dispatch(startRequest());
            const result:any = await axios.get(ADDRESS + '/rift/units/');
            dispatch(returnChampions(result.data));
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

