import { combineReducers } from 'redux';

import posts from './posts';

// put each reducer
// the reducer name here will match the state 
export const reducers = combineReducers({ posts });