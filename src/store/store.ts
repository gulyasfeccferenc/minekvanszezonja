import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';


import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
    process.env.NODE_ENV !== 'production'
    && logger,
    sagaMiddleware
].filter(Boolean);

// @ts-ignore
const composeEnhancer: any = (process.env.NODE_ENV !== 'production'  && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

// @ts-ignore
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);
