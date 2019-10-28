import {createStore, applyMiddleware} from 'redux';
import appReducer from './_reducers/index';
import {logger, promise} from './middleware';

const store = createStore(appReducer, applyMiddleware(logger, promise));

export default store;
