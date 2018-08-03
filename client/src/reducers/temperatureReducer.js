import { 
    READ_TEMP
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case READ_TEMP:
            if (action.payload && action.payload.data) {
                result =  action.payload.data;
            }      
            break;
        default:
            // result = {
            //     value: 'Unknown',
            //     date: 'Unknown',
            // };
            break;
    }
    return result;
}
