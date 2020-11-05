import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    RETURN_RIFT_SINGLE_CHAMPION,
    FAIL_RETURN_RIFT_SINGLE_CHAMPION,
    START_RIFT_SINGLE_CHAMPION_REQUEST
} from './types';

import type { RiftChampionResult } from '../interfaces';

const startRequest = ():{type:string} => ({
    type: START_RIFT_SINGLE_CHAMPION_REQUEST,
});

const returnChampion = (data:RiftChampionResult):{type:string, payload:RiftChampionResult} => ({
    type: RETURN_RIFT_SINGLE_CHAMPION,
    payload: data,
});

const failReturn = ():{type:string} => ({
    type: FAIL_RETURN_RIFT_SINGLE_CHAMPION,
});

export const requestRiftChampion = (name: string)  => {
    return async (dispatch:(obj:{type:string, payload?: RiftChampionResult}) => string) => {
        try {
            dispatch(startRequest());
            const result:any = await axios.get(ADDRESS + '/rift/units/' + name );
            dispatch(returnChampion(result.data));
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

