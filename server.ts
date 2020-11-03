require('rootpath')();
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 8000;
const running = server.listen(port, function () {
    console.log('Server listening on port ' + port);
});

//DONT CACHE PLEASE, TY
app.get('/', (req: any, res: any) => {
    res.set('Cache-Control', 'no-store');
    res.sendFile(path.join(__dirname, './react/build/index.html'));
});

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

//Redirect HTTPS
if(process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use (function (req, res, next) {
            if (req.secure) {
                // request was via https, so do no special handling
                next();
            } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
            }
    });
}
