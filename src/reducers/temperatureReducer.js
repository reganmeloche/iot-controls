import { 
    READ_TEMP
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case READ_TEMP:
            result =  action.payload;
            break;
        default:
            result = {
                value: 'Unknown',
                date: 'Unknown',
            };
            break;
    }
    return result;
}
