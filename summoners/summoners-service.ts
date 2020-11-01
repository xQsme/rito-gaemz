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
    console.info("qweqweqweeqwqweqweqwe");
    const server = getServer(serverNumber);
    const region = getRegion(serverNumber);
    try{
        console.log("ashjgvdasghvdhgvasdgvhasgvdvasgd");
        let rift = await axios.get('https://' + server + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + key);
        let tft = await axios.get('https://' + server + '/tft/summoner/v1/summoners/by-name/' + name + '?api_key=' + key);
        let lor = null;
        if((rift && rift.data && rift.data.puuid) || (tft && tft.data && tft.data.puuid)) {
            lor = await axios.get('https://' + region + '/riot/account/v1/accounts/by-puuid/' + (rift.data.puuid ? rift.data.puuid : tft.data.puuid) + '?api_key=' + key);
            let riftRankeds = await axios.get('https://' + server + '/lol/league/v4/entries/by-summoner/' + rift.data.id + '?api_key=' + key);
            rift.data.rankeds = riftRankeds.data ? riftRankeds.data : [];
            
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
                            console.log(game.participantId);
                            console.log(userParticipantId);
                            if(parseInt(game.participantId) == userParticipantId){
                                console.log("asd");
                                let summoners:any[] = [];
                                summoners.push(game.spell1Id);
                                summoners.push(game.spell2Id);
                                let itens:any[] = [];
                                
                                let stats = game.stats;
                                gamesWithDetails.push({
                                    gameId:record.gameId,
                                    champion:record.champion,
                                    queue:record.queue,
                                    win:stats.win,
                                    kills:stats.kills,
                                    deaths:stats.deaths,
                                    assists:stats.assists,
                                    summoners:summoners,
                                    champLevel:stats.champLevel,
                                    itens:itens,
                                    duration:duration,
                                    date:gameDate
                                });
                            }
                        });
                    }
                });
                
                let queue = await axios.get('http://static.developer.riotgames.com/docs/lol/queues.json');
                gamesWithDetails.forEach(function (record:any){
                    console.log("entrei");
                    queue.data.forEach(function(data:any){
                        if(queue == data.queueId){
                            record.queueDetails.push({map:data.map,description:data.description});
                        }
                    })
                });

                rift.data.games = gamesWithDetails;
            }

            
        }
        return {
            code: 202,
            data: {rift: rift ? rift.data : null, tft: tft ? tft.data : null, lor: lor ? lor.data : null},
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