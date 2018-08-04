import { 
    FETCH_MESSAGES
} from '../actions/index';

export default function(state = [], action) {
    let result = state;
    switch (action.type) {
        case FETCH_MESSAGES:
            if (action.payload && action.payload.data) {
                result = action.payload.data;
            }
            break;
        default:
            break;
    }
    return result;
}
