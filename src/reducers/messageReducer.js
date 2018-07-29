import { 
    FETCH_MESSAGES
} from '../actions/index';

export default function(state = [], action) {
    let result = state;
    switch (action.type) {
        case FETCH_MESSAGES:
            result = action.payload;
            break;
        default:
            result = fakeMessages;
            break;
    }
    return result;
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