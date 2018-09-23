import { 
    CHECK_STATUS
} from '../actions/index';

export default function(state = null, action) {
    let result = state;

    switch (action.type) {
        case CHECK_STATUS:
            if (action.payload && action.payload.data) {
                result =  action.payload.data.status;
            }      
            break;
        default:
            break;
    }
    return result;
}
