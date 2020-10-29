import axios from 'axios';
import ADDRESS from '../constants/server';

import {
    RETURN_SUMMONERS,
    FAIL_RETURN_SUMMONERS,
    CHANGE_SUMMONERS_REGION,
} from './types';

const returnSummoners = (data:any) => ({
    type: RETURN_SUMMONERS,
    payload: data,
});

const failReturn = () => ({
    type: FAIL_RETURN_SUMMONERS,
});

export const requestSummoners = (region:number, name:string)  => {
    return async (dispatch:Function) => {
        try {
            const result:any = await axios.get(ADDRESS + '/summoners/' + region + '/' + name);
            dispatch(returnSummoners(result.data));
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
    type: CHANGE_SUMMONERS_REGION,
    payload: region,
});

export const changeSearchRegion = (region:number) => {
    return async (dispatch:Function) => {
        dispatch(returnRegion(region));
    };
}