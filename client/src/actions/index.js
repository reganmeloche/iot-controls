import axios from 'axios';
import sleep from 'sleep-promise'

export const INIT = 'init';
export const LOGIN = 'login';
export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';
export const CHECK_STATUS = 'check_status';
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

export function login(password) {
    const request = axios.post('/api/login', { username: 'bob', password: password.text })
    return {
        type: LOGIN,
        payload: request,
    };
}

export function fetchUser() {
    const request = axios.get('/api/fetch_user');
    return {
        type: FETCH_USER,
        payload: request,
    };
}

export function logout() {
    const request = axios.get('/api/logout');
    return {
        type: LOGOUT,
        payload: request,
    };
}

export async function checkStatus() {
    await axios.get('/api/status_req');
    await sleep(500);

    const request = axios.get('/api/status');
    return {
        type: CHECK_STATUS,
        payload: request,
    };
}

export function sendMessage(message) {
    message.text = message.text.substr(0, 16);
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

export async function readLight() {
    await axios.get('/api/light_req');
    await sleep(500);

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

export async function readTemp() {
    await axios.get('/api/temp_req');
    await sleep(500);
    
    const request = axios.get('/api/temp');
    return {
        type: READ_TEMP,
        payload: request,
    };
}

// dir = { r, l, f, b}
export function control(dir) {
    axios.post('/api/control', { dir });
    return {
        type: CONTROL,
        payload: null,
    };
}
