import {compose, createStore, applyMiddleware, Middleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

/* Will be handy with implementing redux-persist
type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}*/

const middleWares = [
    process.env.NODE_ENV == 'production'
    && logger,
    thunk,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = (process.env.NODE_ENV !== 'production'
        && window
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
