import { combineReducers } from 'redux';

// Register
import loginReducer from './loginReducer';
import statusReducer from './statusReducer';
import messageReducer from './messageReducer';
import temperatureReducer from './temperatureReducer';
import lightReducer from './lightReducer';

export default combineReducers({
  loggedIn: loginReducer,
  status: statusReducer,
  messages: messageReducer,
  temperature: temperatureReducer,
  light: lightReducer,
});
