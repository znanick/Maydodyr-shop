import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import combinedReducer from './reducers/reducers.js';

export default () => {
  const store = createStore(combinedReducer, applyMiddleware(logger));
  return store;
};