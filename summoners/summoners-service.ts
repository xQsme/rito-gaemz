const axios = require('axios');
const { EUW,  NA, KR, AMERICAS, ASIA, EUROPE } = require('../config');
const { key } = require('../secretconfig');

module.exports  = {
    getSummoners,
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

async function getSummoners(serverNumber: number, name:string) {
    const server = getServer(serverNumber);
    const region = getRegion(serverNumber);
    try{
        let rift = await axios.get('https://' + server + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + key);
        let tft = await axios.get('https://' + server + '/tft/summoner/v1/summoners/by-name/' + name + '?api_key=' + key);
        let queue = await axios.get('http://static.developer.riotgames.com/docs/lol/queues.json');
        let champions = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json');
        let itens = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/item.json');
        let summoners = await axios.get('http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/summoner.json');
        let lor:any = null;
        if((rift && rift.data && rift.data.puuid) || (tft && tft.data && tft.data.puuid)) {
            lor = await axios.get('https://' + region + '/riot/account/v1/accounts/by-puuid/' + (rift.data.puuid ? rift.data.puuid : tft.data.puuid) + '?api_key=' + key);
            let riftRankeds = await axios.get('https://' + server + '/lol/league/v4/entries/by-summoner/' + rift.data.id + '?api_key=' + key);
            rift.data.riftRankeds = riftRankeds.data ? riftRankeds.data : [];
            let tftRankeds = await axios.get('https://' + server + '/tft/league/v1/entries/by-summoner/' + rift.data.id + '?api_key=' + key);
            tft.data.tftRanked = tftRankeds.data[0];
            
            let games = await axios.get('https://' + server + '/lol/match/v4/matchlists/by-account/' + rift.data.accountId + '?api_key=' + key);

            if(games.data){
                let auxGames:any[] = [];
                games.data.matches.forEach(function(record:any){
                    auxGames.push({gameId:record.gameId,champion:record.champion,queue:record.queue});
                });

                let filterGames = auxGames.slice(0,10);
                let gamesWithDetails:any[] = [];

                filterGames.forEach(async function(record:any){
                    let gamedetails = await axios.get('https://' + server + '/lol/match/v4/matches/' + record.gameId + '?api_key=' + key);
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
                                let itens:any[] = [];
                                let stats = game.stats;
                                itens.push(stats.item0);
                                itens.push(stats.item1);
                                itens.push(stats.item2);
                                itens.push(stats.item3);
                                itens.push(stats.item4);
                                itens.push(stats.item5);
                                itens.push(stats.item6);

                                gamesWithDetails.push({
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
                                    itens:itens,
                                    duration:duration,
                                    date:gameDate,
                                    queueDetails:[],
                                    itemDetails:[],
                                    summonerDetails:[]
                                });
                            }
                        });
                    }
                });
                
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

                //itens
                let auxItem:any []= [];
                gamesWithDetails.forEach(function (record:any){
                    record.itens.forEach(function (itemId:any){
                        Object.keys(itens.data.data).forEach(function(key) {
                            if(key == itemId){
                                record.itemDetails.push(itens.data.data[key].name);
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
                console.log(rift.data);
                  
                return {
                    code: 202,
                    data: {rift: rift ? rift.data : null, tft: tft ? tft.data : null, lor: lor ? lor.data : null},
                }
            }
        }
        return {
            code: 202,
            data: {rift: rift ? rift.data : null, tft: tft ? tft.data : null, lor: lor},
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

export {};