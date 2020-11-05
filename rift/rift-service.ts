const axios = require('axios');
const { EUW,  NA, KR, AMERICAS, ASIA, EUROPE } = require('../config');
const { key } = require('../secretconfig');
const imgPath = 'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/';

module.exports  = {
    getUnits,
    getUnit,
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

async function getUnits() {
    try{
        let units = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json');
        if (units && units.data) {
            
            
            
            // units.data.data.forEach((element:any) => {
            //     console.log(element);
            // });
            Object.keys(units.data.data).forEach((key) => {
                units.data.data[key].image.path = imgPath + units.data.data[key].image.full;
            })
            //     (unit: { 'image': { path: string, full: string } }) => { // path criado por nós
            // //     unit.image.path = imgPath + unit.image.full; 
            // });
        }

        // http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/Aatrox.png
        //console.log(units);
        return {
            code: 202,
            data: {units: units ? units.data.data : null},
        }
        
    } catch (error) {
        console.log(error);
        if(error.response.data.status.status_code === 403) {
            return {
                code: 403,
                data: 'Error',
            }
        }
        if(error.response.data.status.status_code === 404) {
            return {
                code: 404,
                data: 'Error',
            }
        }
        return {
            code: 400,
            data: 'Error',
        }
    }
}

async function getUnit(name: string) {
    try{
        let unitReturn = null;
        console.log(name);
        let unit = await axios.get(`http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion/${name}.json`);
        if (unit && unit.data) {
            
            unitReturn = {
                "name": unit.data.data[name].name,
                "title": unit.data.data[name].title,
                "allytips": unit.data.data[name].allytips,
                "enemytips": unit.data.data[name].enemytips,
            }
            
            
            // units.data.data.forEach((element:any) => {
            //     console.log(element);
            // });
            
            //     (unit: { 'image': { path: string, full: string } }) => { // path criado por nós
            // //     unit.image.path = imgPath + unit.image.full; 
            // });
        }

        // http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/Aatrox.png
        //console.log(units);
        return {
            code: 202,
            data: {unit: unitReturn ? unitReturn : null},
        }
        
    } catch (error) {
        console.log(error);
        if(error.response.data.status.status_code === 403) {
            return {
                code: 403,
                data: 'Error',
            }
        }
        if(error.response.data.status.status_code === 404) {
            return {
                code: 404,
                data: 'Error',
            }
        }
        return {
            code: 400,
            data: 'Error',
        }
    }
}

async function getHistory(serverNumber: number, name:string) {
    const server = getServer(serverNumber);
    const region = getRegion(serverNumber);
    try{
        let rift = await axios.get('https://' + server + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + key);

        if(rift && rift.data && rift.data.puuid) {
            let queue = await axios.get('http://static.developer.riotgames.com/docs/lol/queues.json');
            let champions = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json');
            let items = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/item.json');
            let summoners = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/summoner.json');

            let games = await axios.get('https://' + server + '/lol/match/v4/matchlists/by-account/' + rift.data.accountId + '?api_key=' + key);

            if(games.data){
                let auxGames:any[] = [];
                games.data.matches.forEach(function(record:any){
                    auxGames.push({gameId:record.gameId,champion:record.champion,queue:record.queue});
                });

                let filterGames = auxGames.slice(0,10);
                let gamesWithDetails:any[] = [];
                let promiseArray:any[] = [];
                
                filterGames.forEach(function(record:any){
                   promiseArray.push(getGameData(filterGames,gamesWithDetails,record,server,name));
                })

                await Promise.all(promiseArray).then((values) => {
                    gamesWithDetails = values;
                    gamesWithDetails.forEach(function (record:any){
                    queue.data.forEach(function(data:any){
                        if(parseInt(record.queue) == data.queueId){
                            record.queueDetails.push({map:data.map,description:data.description});
                        }
                    })
                    })
                    rift.data.games = gamesWithDetails;
                    //champion
                    Object.keys(champions.data.data).forEach(function(key) {
                        let champKey = champions.data.data[key].key;
                        gamesWithDetails.forEach(function (record:any){
                            if(champKey == record.champion){
                                record.champion = key;
                            }
                        });
                    })

                    //items
                    let auxItem:any []= [];
                    gamesWithDetails.forEach(function (record:any){
                        record.items.forEach(function (itemId:any){
                            Object.keys(items.data.data).forEach(function(key) {
                                if(key == itemId){
                                    record.itemDetails.push(items.data.data[key].name);
                                }
                            })
                        })
                    })

                    //summoners
                    gamesWithDetails.forEach(function (record:any){
                        record.summoners.forEach(function (summonerId:any){
                            Object.keys(summoners.data.data).forEach(function(key) {
                                let summonerKey = summoners.data.data[key].key;

                                if(summonerKey == summonerId){
                                    record.summonerDetails.push({
                                        name:key,
                                        image:'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/spell/'+key+'.png'
                                    })
                                }
                            })
                        })
                    })
                });
                
                console.log(rift.data);
                return {
                    code: 202,
                    data: {rift: rift ? rift.data : null},
                }
                  
                
            }
        }
    } catch (error) {
        console.log(error);
        if(error.response.data.status.status_code === 403) {
            return {
                code: 403,
                data: 'Error',
            }
        }
        if(error.response.data.status.status_code === 404) {
            return {
                code: 404,
                data: 'Error',
            }
        }
        return {
            code: 400,
            data: 'Error',
        }
    }
}

async function getGameData(filterGames:any[],gamesWithDetails:any[],record:any,server:any,name:any){
    return new Promise(async function(resolve,reject){
        var gameA:any;
        axios.get('https://' + server + '/lol/match/v4/matches/' + record.gameId + '?api_key=' + key).then(function (gamedetails:any) {
            let gamesArray:any[]= [];
            let userParticipantId = 0;
            if(gamedetails.data){
                let time = gamedetails.data.gameDuration;
                let minutes = Math.floor(time / 60);
                let seconds = time - minutes * 60;
                let duration = minutes + ':'+ seconds;
                let gameDate = new Date(gamedetails.data.gameCreation);
                gamedetails.data.participantIdentities.forEach(function (game:any){
                    if(game.player.summonerName == name){
                        userParticipantId = game.participantId;
                    }
                })
    
                gamedetails.data.participants.forEach(function (game:any){
                    if(parseInt(game.participantId) == userParticipantId){
                        let summoners:any[] = [];
                        summoners.push(game.spell1Id);
                        summoners.push(game.spell2Id);
                        let items:any[] = [];
                        let stats = game.stats;
                        items.push(stats.item0);
                        items.push(stats.item1);
                        items.push(stats.item2);
                        items.push(stats.item3);
                        items.push(stats.item4);
                        items.push(stats.item5);
                        items.push(stats.item6);

                        gameA ={
                            gameId:record.gameId,
                            champion:record.champion,
                            queue:record.queue,
                            win:stats.win,
                            kills:stats.kills,
                            deaths:stats.deaths,
                            assists:stats.assists,
                            kda:(stats.kills+stats.assists)/stats.deaths,
                            cs:stats.totalMinionsKilled,
                            summoners:summoners,
                            champLevel:stats.champLevel,
                            items:items,
                            duration:duration,
                            date:gameDate,
                            queueDetails:[],
                            itemDetails:[],
                            summonerDetails:[]
                        };
                        
                        resolve(gameA);
                    }
                });
            }
        });
    })
}