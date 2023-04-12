// src/reducers/index.js
import { combineReducers } from 'redux';
import yourReducer from './yourReducer';

const rootReducer = combineReducers({
  yourReducer: yourReducer,
});

export default rootReducer;
