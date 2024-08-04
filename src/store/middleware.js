/* eslint-disable global-require */
import createSagaMiddleware from 'redux-saga';

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

export const middleware = [sagaMiddleware];
