import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

const middleWares = [
    process.env.NODE_ENV !== 'production'
    && logger,
    thunk
].filter(Boolean);

// @ts-ignore
const composeEnhancer: any = (process.env.NODE_ENV !== 'production'  && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

// @ts-ignore
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
