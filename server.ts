require('rootpath')();
const express = require('express');
const path = require('path');
const app = express();
var server = require('http').createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');

//https config
const https = require("https"),
fs = require("fs");
const options = {
    key: fs.readFileSync("/caminho/chave/my-site-key.pem"),
    cert: fs.readFileSync("/caminho/certificado/chain.pem")
};

// start server
const port = 8000;
const running = server.listen(port, function () {
    console.log('Server listening on port ' + port);
});

//DONT CACHE PLEASE, TY
app.get('/', (req: any, res: any) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.join(__dirname, './react/build/index.html'));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/tft', require('./tft/tft-controller'));
app.use('/summoners', require('./summoners/summoners-controller'));
//Serve react pages
app.use(express.static(path.join(__dirname, './react/build/')));

//Catch All Route
app.get('/*', (req: any, res: any) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.join(__dirname, './react/build/index.html'));
});

//https server
https.createServer(options, app).listen(9090);