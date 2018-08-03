import { 
    READ_LIGHT,
    TOGGLE_LIGHT,
} from '../actions/index';

export default function(state = null, action) {
    let result = state;
    switch (action.type) {
        case READ_LIGHT:
            result =  action.payload;
            if (action.payload && action.payload.data) {
                result = action.payload.data;
            }
            break;
        case TOGGLE_LIGHT:
            result = action.payload;
            break;
        default:
            break;
    }
    return result;
}
