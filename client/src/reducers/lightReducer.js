import { 
    READ_LIGHT,
    TOGGLE_LIGHT,
} from '../actions/index';

export default function(state = null, action) {
    let result = state;
    switch (action.type) {
        case READ_LIGHT:
            if (action.payload && action.payload.data) {
                result = action.payload.data;
            }
            break;
        case TOGGLE_LIGHT:
            if (action.payload && action.payload.data) {
                result = action.payload.data;
            }
            break;
        default:
            break;
    }
    return result;
}
