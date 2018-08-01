import axios from 'axios';
import moment from 'moment';
import keys from '../config/keys';

export const INIT = 'init';
export const SEND_MESSAGE = 'send_message';
export const FETCH_MESSAGES = 'fetch_messages';
export const READ_LIGHT = 'read_light';
export const TOGGLE_LIGHT = 'toggle_light';
export const READ_TEMP = 'read_temp';
export const CONTROL = 'control';

const basePath = `${keys.cloudHost}/${keys.deviceId}`;
const LEDPin = 2;

export function init() {
    console.log('Initializing...');
    const request = axios({
        method: 'get',
        url: `${basePath}/mode/${LEDPin}/o`,
    }).then((res) => {
        console.log('Done initializing');
    });
    
    return {
        type: INIT,
        payload: null,
    };
}

export function sendMessage(message) {
    console.log('Saving message to db...');

    return {
        type: SEND_MESSAGE,
        payload: null,
    };
}

export function fetchMessages() {
    console.log('Fetching message history...');
    return {
        type: FETCH_MESSAGES,
        payload: fakeMessages,
    };
}

export function readLight() {
    console.log('Reading light...');
    const request = axios({
        method: 'get',
        url: `${basePath}/digital/${LEDPin}`,
    });
    return {
        type: READ_LIGHT,
        payload: request,
    };
}

export function toggleLight(turnOn) {
    console.log(`Toggling light ${turnOn}...`);
    const val = turnOn ? 1 : 0;
    const request = axios({
        method: 'get',
        url: `${basePath}/digital/${LEDPin}/${val}`,
    });
    return {
        type: TOGGLE_LIGHT,
        payload: {
            status: turnOn,
        },
    };
}

export function readTemp() {
    console.log('Reading temp...');
    const result = {
        value: Math.round(Math.random() * 80 - 40).toString(),
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };

    return {
        type: READ_TEMP,
        payload: result,
    };
}

// dir = {up, down, left, right}
export function control(dir) {
    console.log(`Moving ${dir}...`);
    return {
        type: CONTROL,
        payload: null,
    };
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
]