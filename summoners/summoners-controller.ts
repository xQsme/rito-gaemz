const express = require('express');
const router = express.Router();
const searchService = require('./summoners-service');

router.get('/:server/:name', getSummoners);

module.exports = router;

interface Body {
    code: number
    data: object
}

export {};

function getSummoners(req: any, res: any, next: any) {
    console.log('invoked summoners.getSummoners');
    const server:number = parseInt(req.params.server);
    const name:string = req.params.name;
    searchService.getSummoners(server, name)
    .then(
        (body: Body) => {
            res.status(body.code).json(body.data);
        }
    )
    .catch((err: object) => next(err));
}