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
                result = {
                    status: action.payload.data.return_value === 1,
                };
            }
            break;
        case TOGGLE_LIGHT:
            result = action.payload;
            break;
        default:
            result = {
                status: false,
            };
            break;
    }
    return result;
}
