const express = require('express');
const router = express.Router();
const riftService = require('./rift-service');

router.get('/history/:server/:name', getSummonerMatchHistory);

module.exports = router;

interface Body {
    code: number
    data: object
}

export {};

async function getChampionMastery(serverNumber: number, name:string) {

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
