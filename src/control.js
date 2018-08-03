const axios = require('axios');
const moment = require('moment');
const keys = require('../config/keys');

const basePath = `${keys.cloudHost}/${keys.deviceId}`;
const LEDPin = 2;

module.exports = function (app) {
    
    app.post('/api/init', (req, res) => {
        console.log('Initializing...');
        axios.get(`${basePath}/mode/${LEDPin}/o`)
            .then(() => {
                console.log('Done initializing');
                res.status(201).send({ done: true });
            }).catch((err) => { throw err});
    });

    app.post('/api/light', (req, res) => {
        const { turnOn } = req.body;
        console.log(`Toggling light ${turnOn}...`);
        const val = turnOn ? 1 : 0;
        return axios.get(`${basePath}/digital/${LEDPin}/${val}`)
            .then((result) => {
                res.status(201).send({ status: turnOn });
            }).catch((err) => { throw err});
    });

    app.get('/api/light', (req, res) => {
        console.log('Reading light...');
        return axios.get(`${basePath}/digital/${LEDPin}`)
            .then((result) => {
                returnResult = {
                    status: result.return_value === 1,
                };
                res.status(200).send(returnResult);
            }).catch((err) => { throw err});

    });

    app.post('/api/message', (req, res) => {
        console.log('Saving message to db...');
        // Save to db
        res.status(201).send({ done: true });
    });

    app.get('/api/message', (req, res) => {
        console.log('Fetching message history...');
        // Get from db
        res.status(200).send({ messages: fakeMessages });
    });

    app.get('/api/temp', (req, res) => {
        console.log('Reading temp...');
        const result = {
            value: Math.round(Math.random() * 80 - 40).toString(),
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        };
    
        res.status(200).send(result);
    });

    app.post('/api/control', (req, res) => {
        console.log(`Moving ${req.body.dir}...`);
        res.status(201).send({ done: true });
    });
}

let fakeMessages = [
    {
        date: "2018-04-01 1:32:23PM",
        text: "Hello there!",
    },
    {
        date: "2018-05-01 1:29:03PM",
        text: "Do dooo doooo",
    },
    {
        date: "2018-07-12 11:02:03AM",
        text: "TESTING!!",
    },
];