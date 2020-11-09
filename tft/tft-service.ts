import { AnyARecord } from "dns";
import { response } from "express";

const axios = require('axios');
const { EUW,  NA, KR, AMERICAS, ASIA, EUROPE } = require('../config');
const { key } = require('../secretconfig');

module.exports  = {
    getUnits,
    getHistory,
}

function getServer(serverNumber: number) {
    switch(serverNumber) {
        case 0:
            return EUW;
        case 1:
            return NA;
        case 2:
            return KR;
        default:
            return null;
    }
}

function getRegion(serverNumber: number) {
    switch(serverNumber) {
        case 0:
            return EUROPE;
        case 1:
            return AMERICAS;
        case 2:
            return ASIA;
        default:
            return null;
    }
}

const totalPlayers: number = 5;//5
const totalMatches: number = 3;//3
const topPlayers: number = 4;

async function getUnits(serverNumber: number) {
    const server = getServer(serverNumber);
    const region = getRegion(serverNumber);
    let unitsMatrix: any = {};
    let units:any = {}
    try{
        // const totalPlayers = 1;
        // let totalMatches = 1;
        // const topPlayers = 4;

        //Retrieve the best challenger players
        let response = await axios.get('https://' + server + '/tft/league/v1/challenger?api_key=' + key);

        const challengers = response.data.entries;
        challengers.sort((a: any,b: any) => {
            return b.leaguePoints - a.leaguePoints;
        });
    
        //Analize top players matches asynchronous
        let topChallengers =  [...Array(totalPlayers)];
        await Promise.all(
            topChallengers.map((o, i) => getPlayerStatistics(topChallengers[i], challengers[i].summonerId, server, region))
        ).then(unitsUsed => {
            // all values from all the statistics
            units = mergeUnitsMatrix(unitsUsed);
        });

        let allTotalMatches:number = totalMatches*totalPlayers;

        const unitsArray: any = [];

        for(let key in units) {
            const items:Object[] = [];
            for(let itemKey in units[key].items) {
                items.push({id: itemKey, count: units[key].items[itemKey], percent: (units[key].items[itemKey]/units[key].top*100).toFixed(0) + '%'});
            }
            items.sort((a: any,b: any) => {
                return b.count - a.count;
            });
            units[key].items = items.slice(0, 3);
            units[key].win = (units[key].win/allTotalMatches*100).toFixed(2) + '%';
            units[key].top = (units[key].top/allTotalMatches*100).toFixed(2) + '%';
            units[key].unit = key;
            unitsArray.push(units[key]);
        }

        return {
            code: 202,
            data: {units: unitsArray, totalMatches},
        }
    } catch (error) {
        if(error.response.data.status.status_code === 403) {
            return {
                code: 403,
                data: 'Error',
            }
        }
        return {
            code: 400,
            data: 'Error',
        }
    }
}


async function getPlayerStatistics(topChallengers:Object, summonerId:String, server:String, region:String){
    return new Promise<UnitObject>(async (resolve, reject) => {
            //Get summoner details
            let response = await axios.get('https://' + server + '/tft/summoner/v1/summoners/' + summonerId + '?api_key=' + key);
            //const summoner = {...challengers[0], ...response.data};
            const summoner = {...response.data};

            //Get summoner matches
            response = await axios.get('https://' + region + '/tft/match/v1/matches/by-puuid/' + summoner.puuid + '/ids?api_key=' + key);
            const matches = response.data;

            //Analize top players matches asynchronous
            let matchesPlayed =  [...Array(totalMatches)];
            await Promise.all(
                matchesPlayed.map((o, i) => getMatchesStatistics(matchesPlayed[i], matches[i], server, region))
            ).then((units)  => {
                let newUnits = mergeUnitsMatrix(units)

                return resolve(newUnits);
            });
        });
}

async function getMatchesStatistics(match:any, matchId:String, server:String, region:String){
    return new Promise<UnitObject>(async (resolve, reject) => {
        //Retrieve the info of all the players in the match
        let response = await axios.get('https://' + region + '/tft/match/v1/matches/' + matchId + '?api_key=' + key);
        const players = response.data.info.participants;

        players.sort((a: any,b: any) => {
            return a.placement - b.placement;
        });

        const matchTopUnits: string[] = [];
        const units: any = {};

        //Retrieve the info of the top players
        for(let j = 0; j < topPlayers; j++) {
            for(let k = 0; k < players[j].units.length; k++) {
                //if(players[j].units[k].items.length >= 2 && (players[j].units[k].tier === 3 || (players[j].units[k].tier === 2 && players[j].units[k].rarity >= 2))) { 
                const unit: string = players[j].units[k].character_id.split('TFT4_')[1];
                if(!units[unit]) {
                    units[unit] = {win: 0, top: 0, items: {}};
                }
                if(j === 0) {
                    units[unit].win++;
                }
                if(!matchTopUnits.includes(unit)) {
                    units[unit].top++;
                    matchTopUnits.push(unit);
                    for(let a = 0; a < players[j].units[k].items.length; a++) {
                        if(players[j].units[k].items[a] !== 999) {
                            units[unit].items[players[j].units[k].items[a]] = units[unit].items[players[j].units[k].items[a]] ? units[unit].items[players[j].units[k].items[a]] + 1 : 1;
                        }
                    }
                }
                //}
            }
        }
        return resolve(units);
    });
}

//Given a multi dimensional matrix of units, converts it into 1-D
interface Unit{
    win: number,
    top: number,
    items: Items
}

interface UnitObject{
    [key: string]: Unit
}

interface Items{
    [key: string]: number
}

function mergeUnitsMatrix(units: UnitObject[]){
    let newUnits:UnitObject = {}
    // Object.assign({}, units[0]);
    
    //Precorre os diferentes Matches
    for (let i=0; i<units.length; i++){
        //Precorre os champions {Jax, Teemo, ...}
        for (var champ in units[i]){

            if (!Object.prototype.hasOwnProperty.call(newUnits, champ)) {
                newUnits[champ] =  units[i][champ];
            }else{
                newUnits[champ].win = newUnits[champ].win + units[i][champ].win;
                newUnits[champ].top = newUnits[champ].top + units[i][champ].top;

                for (var item in units[i][champ].items) {

                    if (Object.prototype.hasOwnProperty.call(newUnits[champ].items, item)) {
                        newUnits[champ].items[item] = newUnits[champ].items[item] + units[i][champ].items[item]
                    }else{
                        newUnits[champ].items[item] = units[i][champ].items[item]
                    }
                }
            }
        }
    }
    return newUnits;
}

function getGameLength(seconds:number) {
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor(seconds%3600/60);
    let secs = Math.floor(seconds%60);

    return hours ? (((hours < 10) ? ('0' + hours) : hours) + ':' + ((minutes < 10) ? ('0' + minutes) : minutes) + ':' + ((secs < 10) ? ('0' + secs) : secs)) : (((minutes < 10) ? ('0' + minutes) : minutes) + ':' + ((secs < 10) ? ('0' + secs) : secs));
}

function sortTraits(traits:any[]) {
    traits.sort((a,b) => b.style-a.style);
}

async function getHistory(serverNumber: number, puuid: string) {
    const region = getRegion(serverNumber);
    try{
        let response = await axios.get('https://' + region + '/tft/match/v1/matches/by-puuid/' + puuid + '/ids?count=10&api_key=' + key);
        const promises:Promise<any>[] = [];
        response.data.forEach((matchId:string) => {
            promises.push(axios.get('https://' + region + '/tft/match/v1/matches/' + matchId + '?api_key=' + key).then((response:any) => { 
                return new Promise<any>(async (resolve, reject) => {
                    resolve(response.data);
                });
            }));
        });
        const results = await Promise.all(promises);
        const history:any[] = [];
        for(let i = 0; i < results.length; i++) {
            if(results[i].info.tft_set_number === 4) {
                for(let j = 0; j < results[i].info.participants.length; j++) {
                    if(results[i].info.participants[j].puuid === puuid) {
                        sortTraits(results[i].info.participants[j].traits)
                        let length = getGameLength(results[i].info.game_length);
                        history.push({length, ranked: results[i].info.queue_id === 1100, id: results[i].metadata.match_id, player: results[i].info.participants[j]});
                    }
                }
            }
        }
        return {
            code: 202,
            data: history,
        }
    } catch (error) {
        console.log(error);
        if(error.response.data.status.status_code === 403) {
            return {
                code: 403,
                data: 'Error',
            }
        }
        return {
            code: 400,
            data: 'Error',
        }
    }
}

export {};