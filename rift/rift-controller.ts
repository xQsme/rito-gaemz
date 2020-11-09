const express = require('express');
const router = express.Router();
const riftService = require('./rift-service');

router.get('/history/:server/:name', getSummonerMatchHistory);
router.get('/mastery/:server/:name', getChampionMastery);

module.exports = router;

interface Body {
    code: number
    data: object
}

export {};

async function getChampionMastery(req: any, res: any, next: any) {
    console.log('invoked summoners.getChampionMastery');
    const server:number = parseInt(req.params.server);
    const name:string = req.params.name;
    riftService.getMastery(server, name)
    .then(
        
        (body: Body) => {
            console.log(body.data)
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}

async function getSummonerMatchHistory(req: any, res: any, next: any) {
    console.log('invoked summoners.getSummonersHistory');
    const server:number = parseInt(req.params.server);
    const name:string = req.params.name;
    riftService.getHistory(server, name)
    .then(
        (body: Body) => {
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}
