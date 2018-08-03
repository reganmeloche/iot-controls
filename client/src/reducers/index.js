import { combineReducers } from 'redux';

// Register
import messageReducer from './messageReducer';
import temperatureReducer from './temperatureReducer';
import lightReducer from './lightReducer';

export default combineReducers({
  messages: messageReducer,
  temperature: temperatureReducer,
  light: lightReducer,
});
