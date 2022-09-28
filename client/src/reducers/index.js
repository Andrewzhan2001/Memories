import { combineReducers } from 'redux';

import posts from './posts';

// put each reducer
export const reducers = combineReducers({ posts });