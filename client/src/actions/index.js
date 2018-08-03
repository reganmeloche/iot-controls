import axios from 'axios';

export const INIT = 'init';
export const SEND_MESSAGE = 'send_message';
export const FETCH_MESSAGES = 'fetch_messages';
export const READ_LIGHT = 'read_light';
export const TOGGLE_LIGHT = 'toggle_light';
export const READ_TEMP = 'read_temp';
export const CONTROL = 'control';


export function init() {
    axios.post(`/api/init`, {});
    return {
        type: INIT,
        payload: null,
    };
}

export function sendMessage(message) {
    axios.post(`/api/message`, message);
    return {
        type: SEND_MESSAGE,
        payload: null,
    };
}

export function fetchMessages() {
    const request = axios.get('/api/message');
    return {
        type: FETCH_MESSAGES,
        payload: request,
    };
}

export function readLight() {
    const request = axios.get('/api/light');
    return {
        type: READ_LIGHT,
        payload: request,
    };
}

export function toggleLight(turnOn) {
    const request = axios.post('/api/light', { turnOn });
    return {
        type: TOGGLE_LIGHT,
        payload: request,
    };
}

export function readTemp() {
    const request = axios.get('/api/temp');

    return {
        type: READ_TEMP,
        payload: request,
    };
}

// dir = {up, down, left, right}
export function control(dir) {
    axios.post('/api/control', { dir });
    return {
        type: CONTROL,
        payload: null,
    };
}
