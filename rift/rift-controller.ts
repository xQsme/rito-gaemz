const express = require('express');
const router = express.Router();
const riftService = require('./rift-service');

router.get('/units/', getUnits);
router.get('/units/:name', getUnit);

module.exports = router;

interface Body {
    code: number
    data: object
}

export {};

async function getChampionMastery(serverNumber: number, name:string) {
}


function getUnits(req: any, res: any, next: any) {
    console.log('invoked rift.getUnits');
    riftService.getUnits()
    .then(
        (body: Body) => {
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}


function getUnit(req: any, res: any, next: any) {
    //TODO para unit individual
    console.log('invoked rift.getUnit');
    const name:string = req.params.name;
    riftService.getUnit(name)
    .then(
        (body: Body) => {
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}
