const mqtt = require('mqtt');
const moment = require('moment');
const keys = require('../config/keys');

// TODO: Don't make this global
let readValues = {
    light: false,
    temp: {
        date: 'unknown',
        value: 'unknown',
    },
};

const SUBSCRIBE_TOPIC = 'device_call';
const PUBLISH_TOPIC = 'web_call';

// TODO: Start this separately and attach to the app?
const client = mqtt.connect(keys.mqttUrl);

const MessageLib = require('./messageLib');

module.exports = function (app) {
    client.on('connect', function () {
        client.subscribe(SUBSCRIBE_TOPIC, function (err) {
          if (err) {
            console.log('ERR', err);
          }
        });
    });

    client.on('message', function (topic, message) {                    
        const msg = message.toString();
        console.log('Received message: ', msg);
        if (msg[0] === 'T') {
            readValues.temp = {
                value: parseFloat(msg.slice(1)).toString(),
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            };
        }
        if (msg[0] === 'L') {
            readValues.light = (msg[1] === '1');
        }
    });

    app.post('/api/init', (req, res) => {
        console.log('Initializing...');
        res.status(201).send({ done: true });    
    });

    app.post('/api/light', (req, res) => {
        const { turnOn } = req.body;
        console.log(`Toggling light ${turnOn}...`);
        const val = turnOn ? 1 : 0;
        const message = `WL${val}`;

        client.publish(PUBLISH_TOPIC, message);
        res.status(201).send({ status: turnOn });
    });

    app.get('/api/light_req', (req, res) => {
        console.log('Requesting LED status');
        const query = 'RL0';
        client.publish(PUBLISH_TOPIC, query);
        res.status(200).send({ done: true });
    });

    app.get('/api/light', (req, res) => {
        console.log('Reading light...');
        res.status(200).send({ status: readValues.light });
    });

    app.post('/api/message', (req, res) => {
        console.log('Saving message to db...');
        MessageLib.save(req.body).then((result) => {
            res.status(201).send(result);
        });
    });

    app.get('/api/message', (req, res) => {
        console.log('Fetching message history...');
        MessageLib.getAll().then(result => {
            res.status(200).send(result);
        });
    });

    app.get('/api/temp_req', (req, res) => {
        console.log('Requesting Temp');
        const query = 'RT0';

        client.publish(PUBLISH_TOPIC, query);
        res.status(200).send({ done: true });
    });

    app.get('/api/temp', (req, res) => {
        console.log('Reading temp...');
        res.status(200).send(readValues.temp);
    });

    app.post('/api/control', (req, res) => {
        console.log(`Moving ${req.body.dir}...`);
        const { dir } = req.body;
        const message = `WM${dir}`;

        client.publish(PUBLISH_TOPIC, message);
        res.status(201).send({ done: true });
    });
}
