const axios = require('axios');
const { EUW,  NA, KR, AMERICAS, ASIA, EUROPE } = require('../config');
const { key } = require('../secretconfig');
const imgPath = 'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/';

module.exports  = {
    getUnits
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