const express = require('express');
const router = express.Router();
const tftService = require('./tft-service');

router.get('/units/:server', getUnits);
router.get('/history/:server/:summonerId', getHistory);

module.exports = router;

interface Body {
    code: number
    data: object
}

export {};

function getUnits(req: any, res: any, next: any) {
    console.log('invoked tft.getUnits');
    const server = parseInt(req.params.server);
    tftService.getUnits(server)
    .then(
        (body: Body) => {
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}

function getHistory(req: any, res: any, next: any) {
    console.log('invoked tft.getHistory');
    const server = parseInt(req.params.server);
    const summonerId = req.params.summonerId;
    tftService.getHistory(server, summonerId)
    .then(
        (body: Body) => {
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}