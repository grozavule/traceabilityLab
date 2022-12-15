require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Rollbar = require('rollbar');

const {SERVER_PORT, ROLLBAR_TOKEN} = process.env;

// include and initialize the rollbar library with your access token
var rollbar = new Rollbar({
  accessToken: ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.static('node_modules/axios/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/axios', (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules/axios/dist/axios.min.js'));
});

app.get('/fake', (req, res) => {
    try {
        fakeFunction();
        res.sendStatus(200);
    } catch(error) {
        rollbar.error(`fakeFunction doesn't exist`);
        res.sendStatus(400);
    }
});

app.get('/warning', (req, res) => {
    rollbar.warning(`The warning endpoint has been accessed`);
    res.sendStatus(200);
});

app.get('/critical', (req, res) => {
    rollbar.critical(`The critical endpoint has been accessed`);
    res.sendStatus(400);
});

app.listen(SERVER_PORT, () => console.log(`Server running on Port ${SERVER_PORT}`));